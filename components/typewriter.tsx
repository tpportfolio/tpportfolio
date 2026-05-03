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
  mobileFontSizePx?: number
  cursorSizePx?: number
  className?: string
  align?: "left" | "center"
  forceReveal?: boolean
  onDone?: () => void
  color?: string
  cursorColor?: string
}

function decodeUnicodeEscapes(value: string) {
  return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
}

export default function Typewriter({
  textEs,
  textEn,
  segmentsEs,
  segmentsEn,
  speedMs = 10.8,
  startDelayMs = 250,
  fontSizePx = 30.5,
  mobileFontSizePx,
  cursorSizePx = 14,
  className,
  align = "left",
  forceReveal = false,
  onDone,
  color = "#00ff00",
  cursorColor = "#00ff00",
}: Props) {
  const { language } = useLanguage()

  const activeSegments = useMemo(() => {
    const source = language === "en" && segmentsEn?.length ? segmentsEn : language !== "en" && segmentsEs?.length ? segmentsEs : undefined
    if (!source) return undefined
    return source.map((segment) => ({ ...segment, text: decodeUnicodeEscapes(segment.text) }))
  }, [language, segmentsEn, segmentsEs])

  const fullText = useMemo(() => {
    if (activeSegments) return activeSegments.map((s) => s.text).join("")
    if (language === "en" && textEn) return decodeUnicodeEscapes(textEn)
    return decodeUnicodeEscapes(textEs)
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

  const reserveRendered = useMemo(() => {
    if (!activeSegments) return fullText
    return activeSegments.map((seg, idx) => {
      const cls = `${seg.bold ? "font-bold" : ""} ${seg.className ?? ""}`.trim()
      return (
        <span key={idx} className={cls || undefined}>
          {seg.text}
        </span>
      )
    })
  }, [activeSegments, fullText])

  const alignmentClass = align === "center" ? "text-center" : "text-left"
  const resolvedFontSize = mobileFontSizePx ? `clamp(${mobileFontSizePx}px, 3vw, ${fontSizePx}px)` : fontSizePx

  return (
    <div className={`mt-0 w-full ${alignmentClass} ${className ?? ""}`.trim()}>
      <div
        className={`relative font-mono leading-relaxed whitespace-pre-line ${alignmentClass}`.trim()}
        style={{
          fontSize: resolvedFontSize,
          lineHeight: 1.19,
          fontWeight: 400,
          color,
          textShadow: "none",
        }}
      >
        <div aria-hidden className={`invisible pointer-events-none select-none ${alignmentClass}`.trim()}>
          {reserveRendered}
        </div>
        <div className={`absolute inset-0 ${alignmentClass}`.trim()}>
          {rendered}
          <span
            aria-hidden
            className={`inline-block align-middle ml-1 ${done ? "cursor-blink" : ""}`.trim()}
            style={{ width: cursorSizePx, height: cursorSizePx, background: cursorColor, boxShadow: "none", opacity: 0.9 }}
          />
        </div>
      </div>
    </div>
  )
}
