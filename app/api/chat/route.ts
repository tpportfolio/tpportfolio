import { NextResponse } from "next/server"

import { detectAssistantLanguage, retrieveAssistantContext, type AssistantLang } from "@/lib/assistant-corpus"

export const runtime = "nodejs"

type ChatHistoryItem = {
  role: "user" | "assistant"
  text: string
}

const DEFAULT_MODEL = "openai/gpt-oss-120b"

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

function buildSystemPrompt(language: AssistantLang) {
  return [
    "You are the8bureau assistant, the portfolio assistant of Tomás Peró.",
    "You answer only from the supplied context.",
    "Never invent projects, dates, clients, roles, tools or personal facts.",
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
        max_completion_tokens: 700,
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
      return null
    }

    const json = await response.json()
    const answer = json?.choices?.[0]?.message?.content
    return typeof answer === "string" && answer.trim().length > 0 ? answer.trim() : null
  } catch {
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
  const { chunks, sources } = await retrieveAssistantContext(message, {
    currentRoute,
    uiLanguage,
  })

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
  const model = process.env.GROQ_MODEL?.trim() || DEFAULT_MODEL
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
