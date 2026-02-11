"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/components/language-context"

type Segment = {
  text: string
  bold?: boolean
  className?: string
  href?: string
}

type Props = {
  textEs: string
  textEn?: string
  segmentsEs?: Segment[]
  segmentsEn?: Segment[]
  speedMs?: number
  startDelayMs?: number
  fontSizePx?: number
  cursorSizePx?: number
  className?: string
  forceReveal?: boolean
  onDone?: () => void
}

export default function Typewriter({
  textEs,
  textEn,
  segmentsEs,
  segmentsEn,
  speedMs = 10.8,
  startDelayMs = 250,
  fontSizePx = 30.5,
  cursorSizePx = 14,
  className,
  forceReveal = false,
  onDone,
}: Props) {
  const { language } = useLanguage()

  const activeSegments = useMemo(() => {
    if (language === "en" && segmentsEn && segmentsEn.length) return segmentsEn
    if (language !== "en" && segmentsEs && segmentsEs.length) return segmentsEs
    return undefined
  }, [language, segmentsEn, segmentsEs])

  const fullText = useMemo(() => {
    if (activeSegments) return activeSegments.map((s) => s.text).join("")
    if (language === "en" && textEn) return textEn
    return textEs
  }, [activeSegments, language, textEn, textEs])

  const [out, setOut] = useState("")
  const [done, setDone] = useState(false)

  const timeoutRef = useRef<any>(null)
  const intervalRef = useRef<any>(null)

  const clearTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    timeoutRef.current = null
    intervalRef.current = null
  }

  useEffect(() => {
    clearTimers()
    setOut("")
    setDone(false)
    let i = 0

    if (forceReveal) {
      setOut(fullText)
      setDone(true)
      return
    }

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i += 1
        setOut(fullText.slice(0, i))
        if (i >= fullText.length) {
          clearTimers()
          setDone(true)
        }
      }, speedMs)
    }, startDelayMs)

    return () => {
      clearTimers()
    }
  }, [fullText, speedMs, startDelayMs, forceReveal])

  useEffect(() => {
    if (done) onDone?.()
  }, [done, onDone])

  const rendered = useMemo(() => {
    if (!activeSegments) return out
    let remaining = out.length
    return activeSegments
      .map((seg, idx) => {
        if (remaining <= 0) return null
        const part = seg.text.slice(0, Math.min(remaining, seg.text.length))
        remaining -= part.length
        if (!part) return null
        const cls = `${seg.bold ? "font-bold" : ""} ${seg.className ?? ""}`.trim()
        if (seg.href) {
          return (
            <a
              key={idx}
              href={seg.href}
              className={`${cls} underline hover:text-neon-cyan`.trim() || undefined}
            >
              {part}
            </a>
          )
        }
        return (
          <span key={idx} className={cls || undefined}>
            {part}
          </span>
        )
      })
      .filter(Boolean)
  }, [activeSegments, out])

  return (
    <div className={`mt-0 w-full text-left ${className ?? ""}`.trim()}>
      <div
        className="font-mono leading-relaxed whitespace-pre-line"
        style={{
          fontSize: fontSizePx,
          lineHeight: 1.19,
          fontWeight: 400,
          color: "#00ff00",
          textShadow: "none",
        }}
      >
        {rendered}
        <span
          aria-hidden
          className={`inline-block align-middle ml-1 ${done ? "cursor-blink" : ""}`.trim()}
          style={{ width: cursorSizePx, height: cursorSizePx, background: "#00ff00", boxShadow: "none", opacity: 0.9 }}
        />
      </div>
    </div>
  )
}
