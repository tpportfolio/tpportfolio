"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { Loader2, MessageSquareText, SendHorizontal, Sparkles, X } from "lucide-react"

import { useLanguage } from "@/components/language-context"
import { useVisualMode } from "@/components/visual-mode-context"

type AssistantSource = {
  route: string
  section: string
  title: string
}

type AssistantMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  sources?: AssistantSource[]
  ts: string
}

type ChatResponse = {
  answer: string
  language: "es" | "en"
  sources: AssistantSource[]
  hadContext: boolean
  available: boolean
}

const UI_COPY = {
  es: {
    welcome: "Hola. Soy the8bureau assistant. Puedo responder sobre Tomás, su trayectoria, proyectos, servicios, AI experiments y tools.",
    statusReady: "READY",
    statusThinking: "THINKING",
    title: "the8bureau assistant",
    subtitle: "portfolio knowledge base",
    placeholder: "Preguntame sobre el portfolio...",
    send: "Enviar",
    enterToSend: "ENTER para enviar",
    open: "Abrir assistant",
    close: "Cerrar assistant",
    sourceLabel: "Fuentes",
    fallback: "No tengo suficiente contexto para responder eso con precisión desde el portfolio actual.",
    offline: "El assistant está momentáneamente offline. Falta configuración del proveedor o hubo un error aguas arriba.",
  },
  en: {
    welcome: "Hi. I'm the8bureau assistant. I can answer about Tomás, his background, projects, services, AI experiments and tools.",
    statusReady: "READY",
    statusThinking: "THINKING",
    title: "the8bureau assistant",
    subtitle: "portfolio knowledge base",
    placeholder: "Ask about the portfolio...",
    send: "Send",
    enterToSend: "ENTER to send",
    open: "Open assistant",
    close: "Close assistant",
    sourceLabel: "Sources",
    fallback: "I do not have enough context to answer that accurately from the current portfolio.",
    offline: "The assistant is temporarily offline. The provider is not configured or an upstream error occurred.",
  },
} as const

function timestamp() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function FloatingAssistant() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const { mode } = useVisualMode()
  const copy = UI_COPY[language === "en" ? "en" : "es"]

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [pulse, setPulse] = useState(false)
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: copy.welcome,
      ts: timestamp(),
    },
  ])

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages((current) => {
      if (current.length === 1 && current[0]?.id === "welcome") {
        return [{ ...current[0], text: copy.welcome }]
      }
      return current
    })
  }, [copy.welcome])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (open) return
    const id = window.setInterval(() => setPulse((current) => !current), 2200)
    return () => window.clearInterval(id)
  }, [open])

  const shellClass = useMemo(
    () =>
      mode === "light"
        ? "border border-[#b45309] bg-[#fff7ee] text-[#4a220b] shadow-[0_0_24px_rgba(180,83,9,0.18)]"
        : "border border-neon-green/40 bg-black/95 text-neon-green shadow-[0_0_30px_rgba(57,255,20,0.14)]",
    [mode],
  )

  const headerClass = mode === "light" ? "border-b border-[#d9a06b] bg-[#fff0df]" : "border-b border-neon-green/20 bg-[#03150d]"
  const inputClass =
    mode === "light"
      ? "border-[#c57b45] bg-[#fffaf4] text-[#4a220b] placeholder:text-[#a36638]"
      : "border-neon-green/25 bg-black text-neon-green placeholder:text-neon-green/35"
  const bubbleUserClass = mode === "light" ? "border-[#c57b45] bg-[#fff1e2] text-[#53250c]" : "border-neon-cyan/30 bg-[#041b12] text-neon-cyan"
  const bubbleBotClass = mode === "light" ? "border-[#d7b084] bg-[#fff8f0] text-[#4a220b]" : "border-neon-green/20 bg-black/40 text-neon-green"

  async function send() {
    const message = input.trim()
    if (!message || loading) return

    const userMessage: AssistantMessage = {
      id: makeId(),
      role: "user",
      text: message,
      ts: timestamp(),
    }

    const history = [...messages, userMessage]
      .slice(-6)
      .map((item) => ({ role: item.role, text: item.text }))

    setMessages((current) => [...current, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          currentRoute: pathname,
          uiLanguage: language,
          history,
        }),
      })

      const data = (await res.json()) as Partial<ChatResponse> & { error?: string }
      const answer = typeof data.answer === "string" && data.answer.trim().length > 0 ? data.answer : res.ok ? copy.fallback : copy.offline

      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          text: answer,
          sources: Array.isArray(data.sources) ? data.sources : [],
          ts: timestamp(),
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          text: copy.offline,
          ts: timestamp(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open ? <button type="button" aria-label={copy.close} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/30" /> : null}

      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-5 md:right-5">
        {open ? (
          <div className={`pointer-events-auto flex h-[min(72vh,34rem)] w-[min(92vw,25rem)] flex-col overflow-hidden rounded-sm ${shellClass}`}>
            <div className={`flex items-center gap-3 px-4 py-3 ${headerClass}`}>
              <div className="relative h-11 w-11 shrink-0">
                <Image src="/clippy-character.png" alt="the8bureau assistant" fill sizes="44px" className="object-contain" priority={false} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-cyber text-xs uppercase tracking-[0.18em] text-neon-cyan">{copy.title}</div>
                <div className={`mt-1 text-[11px] uppercase tracking-[0.14em] ${mode === "light" ? "text-[#8b4315]" : "text-neon-green/60"}`}>
                  {loading ? copy.statusThinking : copy.subtitle}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={copy.close}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-sm border ${
                  mode === "light"
                    ? "border-[#c57b45] text-[#8b4315] hover:bg-[#f5e4d2]"
                    : "border-neon-green/25 text-neon-green hover:bg-neon-green/10"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`rounded-sm border px-3 py-3 text-sm leading-relaxed ${message.role === "user" ? bubbleUserClass : bubbleBotClass}`}>
                    <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.12em]">
                      <span className={`font-cyber ${message.role === "user" ? "text-neon-magenta" : "text-neon-cyan"}`}>
                        {message.role === "user" ? "YOU" : copy.title}
                      </span>
                      <span className={mode === "light" ? "text-[#9b6b42]" : "text-neon-green/40"}>{message.ts}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    {message.role === "assistant" && message.sources?.length ? (
                      <div className="mt-3">
                        <div className={`mb-2 text-[10px] uppercase tracking-[0.16em] ${mode === "light" ? "text-[#8b4315]" : "text-neon-green/55"}`}>
                          {copy.sourceLabel}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {message.sources.map((source) => (
                            <a
                              key={`${message.id}-${source.route}-${source.section}`}
                              href={source.route}
                              className={`rounded-sm border px-2 py-1 text-[11px] ${
                                mode === "light"
                                  ? "border-[#c57b45] text-[#7a3511] hover:bg-[#f5e4d2]"
                                  : "border-neon-green/25 text-neon-cyan hover:bg-neon-cyan/10"
                              }`}
                            >
                              {source.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}

                {loading ? (
                  <div className={`rounded-sm border px-3 py-3 text-sm ${bubbleBotClass}`}>
                    <div className="flex items-center gap-2 font-cyber text-xs uppercase tracking-[0.14em] text-neon-cyan">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {copy.statusThinking}
                    </div>
                  </div>
                ) : null}

                <div ref={scrollRef} />
              </div>
            </div>

            <div className={`border-t px-4 py-3 ${headerClass}`}>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      void send()
                    }
                  }}
                  placeholder={copy.placeholder}
                  disabled={loading}
                  className={`h-11 flex-1 rounded-sm border px-3 text-sm outline-none ${inputClass}`}
                />
                <button
                  type="button"
                  onClick={() => void send()}
                  disabled={loading || input.trim().length === 0}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-sm border ${
                    mode === "light"
                      ? "border-[#b45309] bg-[#f7ead8] text-[#8b4315] disabled:opacity-50"
                      : "border-neon-green/30 bg-[#04150d] text-neon-green disabled:opacity-50"
                  }`}
                  aria-label={copy.send}
                >
                  <SendHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className={`mt-2 text-[10px] uppercase tracking-[0.14em] ${mode === "light" ? "text-[#9b6b42]" : "text-neon-green/45"}`}>
                {copy.enterToSend}
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={copy.open}
          className="pointer-events-auto relative inline-flex h-20 w-20 items-center justify-center md:h-24 md:w-24"
        >
          <span
            className={`absolute inset-0 rounded-full blur-xl ${
              mode === "light" ? "bg-[#e8c19a]/60" : pulse ? "bg-neon-green/20" : "bg-neon-green/10"
            }`}
          />
          <div className="relative h-20 w-20 transition-transform hover:scale-[1.04] md:h-24 md:w-24">
            <Image src="/clippy-character.png" alt="Open the8bureau assistant" fill sizes="96px" className="object-contain" priority={false} />
          </div>
          {!open ? (
            <span
              className={`absolute right-2 top-2 inline-flex h-4 w-4 items-center justify-center rounded-full border ${
                mode === "light" ? "border-[#b45309] bg-[#f6d2aa] text-[#8b4315]" : "border-neon-green/30 bg-[#052415] text-neon-green"
              }`}
            >
              <Sparkles className="h-2.5 w-2.5" />
            </span>
          ) : null}
          {!open ? (
            <span
              className={`absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                mode === "light" ? "border-[#b45309] bg-[#fff6ed] text-[#8b4315]" : "border-neon-cyan/30 bg-black text-neon-cyan"
              }`}
            >
              <MessageSquareText className="h-3.5 w-3.5" />
            </span>
          ) : null}
        </button>
      </div>
    </>
  )
}
