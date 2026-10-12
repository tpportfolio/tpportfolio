import { NextResponse } from "next/server"

import { detectAssistantLanguage, getAssistantCorpus, retrieveAssistantContext, type AssistantLang } from "@/lib/assistant-corpus"
import { aiExperienceAnswer } from "@/lib/site-content"

export const runtime = "nodejs"

type ChatHistoryItem = {
  role: "user" | "assistant"
  text: string
}

// Free-plan Groq models, tried in order. Each one has its own free quota (requests per day and
// tokens per minute), so falling through on a rate limit or a decommissioned model keeps the
// assistant online at no cost.
const DEFAULT_MODEL = "openai/gpt-oss-120b"
const MODEL_CHAIN = [DEFAULT_MODEL, "openai/gpt-oss-20b", "qwen/qwen3.8-27b"]

// Input and context budgets: the free plan allows 8,000 tokens per minute per model.
const MAX_MESSAGE_CHARS = 600
const MAX_HISTORY_ITEM_CHARS = 700
const MAX_ROUTE_CHARS = 120
const MAX_CONTEXT_CHARS = 9000

// Best-effort per-visitor limits (per server instance) so one client cannot drain the daily quota.
const RATE_WINDOW_MS = 60_000
const RATE_MAX_PER_WINDOW = 8
const RATE_DAY_MS = 24 * 60 * 60 * 1000
const RATE_MAX_PER_DAY = 60
const RATE_MAX_TRACKED_CLIENTS = 2000

// Answers to questions asked without history are reused for a while (suggestion chips repeat a lot).
const ANSWER_CACHE_TTL_MS = 6 * 60 * 60 * 1000
const ANSWER_CACHE_MAX_ENTRIES = 200

type AssistantSourceRef = { route: string; section: string; title: string }
type CachedAnswer = { answer: string; sources: AssistantSourceRef[]; expiresAt: number }
type ClientUsage = { windowStart: number; windowCount: number; dayStart: number; dayCount: number }

const answerCache = new Map<string, CachedAnswer>()
const clientUsage = new Map<string, ClientUsage>()
const MESSAGE_RELAY_PATTERNS = [
  "dejar un mensaje",
  "dejale un mensaje",
  "pasale un mensaje",
  "pasarle un mensaje",
  "mandale un mensaje",
  "deja un mensaje",
  "tell tomas",
  "leave a message",
  "pass a message",
  "forward this message",
  "send tomas a message",
  "tell him this",
]

function fallbackMessage(language: AssistantLang, kind: "offline" | "no-context" | "busy") {
  if (kind === "busy") {
    return language === "es"
      ? "Estoy recibiendo muchas consultas en este momento. Probá de nuevo en un minuto."
      : "I am getting a lot of questions right now. Please try again in a minute."
  }

  if (kind === "offline") {
    return language === "es"
      ? "El assistant está momentáneamente offline. Falta configuración del proveedor o hubo un error aguas arriba."
      : "The assistant is temporarily offline. The provider is not configured or an upstream error occurred."
  }

  return language === "es"
    ? "No tengo suficiente contexto para responder eso con precisión desde el portfolio actual."
    : "I do not have enough context to answer that accurately from the current portfolio."
}

function relayLimitationMessage(language: AssistantLang) {
  return language === "es"
    ? "No puedo guardar, reenviar ni entregarle mensajes a Tomás. Hoy CLIPPY.EXE solo responde preguntas con la base de conocimiento del portfolio. Si querés contactarlo, usá la sección o página de contacto del sitio."
    : "I cannot store, forward, or deliver messages to Tomás. Right now CLIPPY.EXE only answers questions using the portfolio knowledge base. If you want to contact him, please use the contact section or contact page on the site."
}

function isRelayRequest(message: string) {
  const normalized = message
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

  return MESSAGE_RELAY_PATTERNS.some((pattern) => normalized.includes(pattern))
}

function isCareerQuestion(message: string) {
  const normalized = message
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

  return /\b(experiencia|experience|trayectoria|carrera|background|career)\b/.test(normalized)
}

function isAiCareerQuestion(message: string) {
  const normalized = message
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

  const asksAboutCareer = isCareerQuestion(normalized)
  const mentionsAi = /\b(?:ia|ai|lora|morfeo)\b|inteligencia artificial|artificial intelligence/.test(normalized)

  return asksAboutCareer && mentionsAi
}

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown"
}

function isRateLimited(clientKey: string, now: number) {
  const usage = clientUsage.get(clientKey)

  if (!usage) {
    if (clientUsage.size >= RATE_MAX_TRACKED_CLIENTS) {
      for (const [key, value] of clientUsage) {
        if (now - value.dayStart > RATE_DAY_MS) clientUsage.delete(key)
      }
      if (clientUsage.size >= RATE_MAX_TRACKED_CLIENTS) clientUsage.clear()
    }
    clientUsage.set(clientKey, { windowStart: now, windowCount: 1, dayStart: now, dayCount: 1 })
    return false
  }

  if (now - usage.windowStart > RATE_WINDOW_MS) {
    usage.windowStart = now
    usage.windowCount = 0
  }
  if (now - usage.dayStart > RATE_DAY_MS) {
    usage.dayStart = now
    usage.dayCount = 0
  }
  if (usage.windowCount >= RATE_MAX_PER_WINDOW || usage.dayCount >= RATE_MAX_PER_DAY) return true

  usage.windowCount += 1
  usage.dayCount += 1
  return false
}

function buildCacheKey(language: AssistantLang, currentRoute: string, message: string) {
  const normalized = message
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()

  return `${language}|${currentRoute}|${normalized}`
}

function readCachedAnswer(key: string, now: number) {
  const cached = answerCache.get(key)
  if (!cached) return null
  if (cached.expiresAt <= now) {
    answerCache.delete(key)
    return null
  }
  return cached
}

function storeCachedAnswer(key: string, value: CachedAnswer) {
  if (answerCache.size >= ANSWER_CACHE_MAX_ENTRIES) {
    const oldest = answerCache.keys().next().value
    if (oldest !== undefined) answerCache.delete(oldest)
  }
  answerCache.set(key, value)
}

function buildSystemPrompt(language: AssistantLang) {
  return [
    "You are CLIPPY.EXE, the portfolio assistant of Tomás Peró.",
    "You answer only from the supplied context.",
    "Never invent projects, dates, clients, roles, tools or personal facts.",
    "For employers, roles and dates, rely on the context block marked [SECTION: career]: each role keeps exactly the years written on its own line. Never move, merge or extend date ranges from one role to another.",
    "Never claim that you can store, forward, deliver, remember, or pass messages to Tomás unless the supplied context explicitly says that feature exists.",
    "If a user asks you to leave a message for Tomás, clearly state that you cannot do that and direct them to the contact section instead.",
    "If context is insufficient, say so briefly and clearly.",
    "Keep the tone direct, precise and useful. Answer in at most 120 words unless the user asks for detail.",
    "Format for a small plain-text chat window: short paragraphs or simple lists whose lines start with \"- \". Never use tables, headings, code blocks, bold or any other Markdown markup.",
    "Use the language of the user's message. If detection is ambiguous, use the provided UI language fallback.",
    language === "es" ? "Responder 100% en español." : "Respond 100% in English.",
  ].join(" ")
}

function buildUserPrompt({
  message,
  language,
  currentRoute,
  history,
  context,
}: {
  message: string
  language: AssistantLang
  currentRoute: string
  history: ChatHistoryItem[]
  context: string
}) {
  const serializedHistory =
    history.length > 0
      ? history.map((item) => `${item.role.toUpperCase()}: ${item.text}`).join("\n")
      : language === "es"
        ? "Sin historial previo."
        : "No previous history."

  return [
    `UI_LANGUAGE_FALLBACK: ${language}`,
    `CURRENT_ROUTE: ${currentRoute}`,
    "",
    "CONTEXT:",
    context,
    "",
    "RECENT_HISTORY:",
    serializedHistory,
    "",
    `QUESTION: ${message}`,
  ].join("\n")
}

type GroqResult = { answer: string } | { answer: null; reason: "rate-limited" | "unavailable" }

async function askGroq({
  apiKey,
  model,
  message,
  language,
  currentRoute,
  history,
  context,
}: {
  apiKey: string
  model: string
  message: string
  language: AssistantLang
  currentRoute: string
  history: ChatHistoryItem[]
  context: string
}): Promise<GroqResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25000)

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
      signal: controller.signal,
      body: JSON.stringify({
        model,
        temperature: 0.3,
        reasoning_effort: "low",
        include_reasoning: false,
        max_completion_tokens: 900,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(language),
          },
          {
            role: "user",
            content: buildUserPrompt({
              message,
              language,
              currentRoute,
              history,
              context,
            }),
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      const providerMessage = errorBody?.error?.message
      console.error("CLIPPY Groq request failed", {
        model,
        status: response.status,
        message: typeof providerMessage === "string" ? providerMessage.slice(0, 300) : undefined,
      })
      return { answer: null, reason: response.status === 429 ? "rate-limited" : "unavailable" }
    }

    const json = await response.json()
    const answer = json?.choices?.[0]?.message?.content
    if (typeof answer === "string" && answer.trim().length > 0) {
      return { answer: answer.trim() }
    }

    console.error("CLIPPY Groq returned no text", {
      model,
      finishReason: json?.choices?.[0]?.finish_reason,
      contentType: typeof answer,
    })
    return { answer: null, reason: "unavailable" }
  } catch (error) {
    console.error("CLIPPY Groq request error", {
      model,
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 300) : "Unknown error",
    })
    return { answer: null, reason: "unavailable" }
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        message?: string
        currentRoute?: string
        uiLanguage?: AssistantLang
        history?: ChatHistoryItem[]
      }
    | null

  const message = typeof body?.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_CHARS) : ""
  const currentRoute =
    typeof body?.currentRoute === "string" && body.currentRoute.startsWith("/")
      ? body.currentRoute.slice(0, MAX_ROUTE_CHARS)
      : "/"
  const uiLanguage: AssistantLang = body?.uiLanguage === "en" ? "en" : "es"
  const history = Array.isArray(body?.history)
    ? body.history
        .filter(
          (item): item is ChatHistoryItem =>
            (item?.role === "user" || item?.role === "assistant") && typeof item?.text === "string",
        )
        .slice(-6)
        .map((item) => ({ role: item.role, text: item.text.slice(0, MAX_HISTORY_ITEM_CHARS) }))
    : []

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 })
  }

  const language = detectAssistantLanguage(message, uiLanguage)
  if (isRelayRequest(message)) {
    return NextResponse.json({
      answer: relayLimitationMessage(language),
      language,
      sources: [
        {
          route: "/contact",
          section: "contact",
          title: language === "es" ? "Contacto" : "Contact",
        },
      ],
      hadContext: true,
      available: true,
    })
  }

  if (isAiCareerQuestion(message)) {
    return NextResponse.json({
      answer: aiExperienceAnswer[language],
      language,
      sources: [
        {
          route: "/work/ai-experiments",
          section: "ai-lab",
          title: language === "es" ? "Experimentos de IA" : "AI Experiments",
        },
        {
          route: "/timeline",
          section: "timeline",
          title: "PARADISE.LA",
        },
      ],
      hadContext: true,
      available: true,
    })
  }

  const { chunks, sources } = await retrieveAssistantContext(message, {
    currentRoute,
    uiLanguage,
  })

  if (isCareerQuestion(message)) {
    const timeline = (await getAssistantCorpus())
      .filter((chunk) => chunk.section === "timeline" && chunk.lang === language)
      .map((chunk) => chunk.text)
    if (timeline.length > 0) {
      return NextResponse.json({
        answer: timeline.join("\n"),
        language,
        sources: [{
          route: "/timeline",
          section: "timeline",
          title: language === "es" ? "Trayectoria" : "Career timeline",
        }],
        hadContext: true,
        available: true,
      })
    }
  }

  if (chunks.length === 0) {
    return NextResponse.json({
      answer: fallbackMessage(language, "no-context"),
      language,
      sources: [],
      hadContext: false,
      available: true,
    })
  }

  const apiKey = process.env.GROQ_API_KEY?.trim()

  // The career chunk comes first; the rest is added while it fits the context budget.
  const contextBlocks: string[] = []
  let contextChars = 0
  for (const chunk of chunks) {
    const block = `[ROUTE: ${chunk.route}] [SECTION: ${chunk.section}] [TITLE: ${chunk.title}]\n${chunk.text}`
    if (contextBlocks.length > 0 && contextChars + block.length > MAX_CONTEXT_CHARS) continue
    contextBlocks.push(block)
    contextChars += block.length
  }
  const context = contextBlocks.join("\n\n---\n\n")

  if (!apiKey) {
    return NextResponse.json({
      answer: fallbackMessage(language, "offline"),
      language,
      sources,
      hadContext: true,
      available: false,
    })
  }

  const now = Date.now()
  const cacheKey = history.length === 0 ? buildCacheKey(language, currentRoute, message) : null
  const cached = cacheKey ? readCachedAnswer(cacheKey, now) : null
  if (cached) {
    return NextResponse.json({
      answer: cached.answer,
      language,
      sources: cached.sources,
      hadContext: true,
      available: true,
    })
  }

  if (isRateLimited(getClientKey(request), now)) {
    return NextResponse.json(
      {
        answer: fallbackMessage(language, "busy"),
        language,
        sources: [],
        hadContext: true,
        available: false,
      },
      { status: 429, headers: { "Retry-After": "60" } },
    )
  }

  let answer: string | null = null
  let everyModelRateLimited = true
  for (const model of MODEL_CHAIN) {
    const result = await askGroq({
      apiKey,
      model,
      message,
      language,
      currentRoute,
      history,
      context,
    })

    if (result.answer !== null) {
      answer = result.answer
      break
    }
    if (result.reason !== "rate-limited") everyModelRateLimited = false
  }

  if (answer && cacheKey) {
    storeCachedAnswer(cacheKey, { answer, sources, expiresAt: now + ANSWER_CACHE_TTL_MS })
  }

  return NextResponse.json({
    answer: answer ?? fallbackMessage(language, everyModelRateLimited ? "busy" : "offline"),
    language,
    sources,
    hadContext: true,
    available: Boolean(answer),
  })
}
