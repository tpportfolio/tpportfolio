import { NextResponse } from "next/server"

import { detectAssistantLanguage, getAssistantCorpus, retrieveAssistantContext, type AssistantLang } from "@/lib/assistant-corpus"
import { aiExperienceAnswer } from "@/lib/site-content"

export const runtime = "nodejs"

type ChatHistoryItem = {
  role: "user" | "assistant"
  text: string
}

const DEFAULT_MODEL = "openai/gpt-oss-120b"
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

function fallbackMessage(language: AssistantLang, kind: "offline" | "no-context") {
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

function buildSystemPrompt(language: AssistantLang) {
  return [
    "You are CLIPPY.EXE, the portfolio assistant of Tomás Peró.",
    "You answer only from the supplied context.",
    "Never invent projects, dates, clients, roles, tools or personal facts.",
    "Never claim that you can store, forward, deliver, remember, or pass messages to Tomás unless the supplied context explicitly says that feature exists.",
    "If a user asks you to leave a message for Tomás, clearly state that you cannot do that and direct them to the contact section instead.",
    "If context is insufficient, say so briefly and clearly.",
    "Keep the tone direct, precise and useful.",
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
}) {
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
        max_completion_tokens: 1200,
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
        status: response.status,
        message: typeof providerMessage === "string" ? providerMessage.slice(0, 300) : undefined,
      })
      return null
    }

    const json = await response.json()
    const answer = json?.choices?.[0]?.message?.content
    if (typeof answer === "string" && answer.trim().length > 0) {
      return answer.trim()
    }

    console.error("CLIPPY Groq returned no text", {
      finishReason: json?.choices?.[0]?.finish_reason,
      contentType: typeof answer,
    })
    return null
  } catch (error) {
    console.error("CLIPPY Groq request error", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 300) : "Unknown error",
    })
    return null
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

  const message = body?.message?.trim()
  const currentRoute = typeof body?.currentRoute === "string" ? body.currentRoute : "/"
  const uiLanguage: AssistantLang = body?.uiLanguage === "en" ? "en" : "es"
  const history = Array.isArray(body?.history)
    ? body.history
        .filter((item): item is ChatHistoryItem => item?.role === "user" || item?.role === "assistant")
        .slice(-6)
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
          title: "Contact",
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
  const model = DEFAULT_MODEL
  const context = chunks
    .map(
      (chunk) =>
        `[ROUTE: ${chunk.route}] [SECTION: ${chunk.section}] [TITLE: ${chunk.title}]\n${chunk.text}`,
    )
    .join("\n\n---\n\n")

  if (!apiKey) {
    return NextResponse.json({
      answer: fallbackMessage(language, "offline"),
      language,
      sources,
      hadContext: true,
      available: false,
    })
  }

  const answer = await askGroq({
    apiKey,
    model,
    message,
    language,
    currentRoute,
    history,
    context,
  })

  return NextResponse.json({
    answer: answer ?? fallbackMessage(language, "offline"),
    language,
    sources,
    hadContext: true,
    available: Boolean(answer),
  })
}
