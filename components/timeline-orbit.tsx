"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "./language-context"
import { useVisualMode } from "./visual-mode-context"
import type { VideoItem } from "./video-carousel"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"
import styles from "./timeline-orbit.module.css"

// Distance (px) between the card border and the centre line of the orbit path.
// Keep in sync with --sat-gap in timeline-orbit.module.css.
const GAP = 24

type Lang = "es" | "en"

interface TimelineOrbitProps {
  videos: VideoItem[]
  className?: string
  /** Fraction (0-1) added to the lap phase so neighbouring cards do not move in sync. */
  phase?: number
  /** Render prop: receives the mobile thumbnail row (or null) to place inside the card. */
  children: (mobileRow: ReactNode) => ReactNode
}

/** Rounded rectangle, GAP px outside of a w x h box, clockwise from the top edge. */
function buildOrbitPath(w: number, h: number) {
  const r = GAP
  const x0 = -GAP
  const y0 = -GAP
  const x1 = w + GAP
  const y1 = h + GAP
  const d = [
    `M${x0 + r} ${y0}`,
    `H${x1 - r}`,
    `A${r} ${r} 0 0 1 ${x1} ${y0 + r}`,
    `V${y1 - r}`,
    `A${r} ${r} 0 0 1 ${x1 - r} ${y1}`,
    `H${x0 + r}`,
    `A${r} ${r} 0 0 1 ${x0} ${y1 - r}`,
    `V${y0 + r}`,
    `A${r} ${r} 0 0 1 ${x0 + r} ${y0}`,
    "Z",
  ].join(" ")
  const perimeter = 2 * (w + 2 * GAP - 2 * r) + 2 * (h + 2 * GAP - 2 * r) + 2 * Math.PI * r
  return { d, perimeter }
}

function youtubeSrc(video: VideoItem) {
  if (video.type === "vimeo") return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`
  if (video.isPlaylist) return `https://www.youtube.com/embed/videoseries?list=${video.videoId}&autoplay=1`
  return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`
}

function thumbSrc(video: VideoItem) {
  return `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`
}

export function TimelineOrbit({ videos, className = "", phase = 0, children }: TimelineOrbitProps) {
  const { language } = useLanguage()
  const { mode } = useVisualMode()
  const lang = (language === "en" ? "en" : "es") as Lang
  const hasVideos = videos.length > 0

  const rootRef = useRef<HTMLDivElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const [supported, setSupported] = useState<boolean | null>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const [visible, setVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Feature detection (client only).
  useEffect(() => {
    if (!hasVideos) return
    const ok = typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("offset-path", "path('M0 0')")
    setSupported(ok)
  }, [hasVideos])

  // Measure the card. offsetWidth/Height ignore the reveal transform, so this is correct before and after reveal.
  useEffect(() => {
    const el = rootRef.current
    if (!hasVideos || !el || typeof ResizeObserver === "undefined") return
    const measure = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [hasVideos])

  // Run the animation only while the card is near the viewport.
  useEffect(() => {
    const el = rootRef.current
    if (!hasVideos || !el || typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting))
    }, { rootMargin: "120px" })
    io.observe(el)
    return () => io.disconnect()
  }, [hasVideos])

  const open = useCallback((index: number, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger
    setOpenIndex(index)
  }, [])

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => (current === null ? current : (current + delta + videos.length) % videos.length))
    },
    [videos.length],
  )

  if (!hasVideos) {
    return <div className={className}>{children(null)}</div>
  }

  const playLabel = lang === "es" ? "Reproducir video" : "Play video"
  const geometry = size ? buildOrbitPath(size.w, size.h) : null
  const duration = geometry ? Math.min(45, Math.max(30, geometry.perimeter / 46)) : 38
  const current = openIndex !== null ? videos[openIndex] : null

  const renderThumb = (video: VideoItem, index: number) => (
    <button
      type="button"
      className={styles.satBtn}
      aria-label={`${playLabel}: ${video.title[lang]}`}
      onClick={(e) => open(index, e.currentTarget)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbSrc(video)} alt="" loading="lazy" decoding="async" draggable={false} />
      <span className={styles.play} aria-hidden="true" />
    </button>
  )

  const mobileRow = (
    <div className="md:hidden mt-4 pt-3 border-t border-neon-green/30">
      <p className="text-xs text-neon-cyan mb-2">&gt; VIDEOS</p>
      <div className="flex flex-wrap gap-3">
        {videos.map((video, index) => (
          <div key={video.id} className={styles.rowItem}>
            {renderThumb(video, index)}
          </div>
        ))}
      </div>
    </div>
  )

  const layerStyle = geometry
    ? ({ "--path": `path("${geometry.d}")`, "--dur": `${duration.toFixed(1)}s` } as CSSProperties)
    : undefined

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${className}`}
      data-mode={mode}
      data-visible={visible ? "true" : "false"}
      data-open={openIndex !== null ? "true" : "false"}
    >
      {children(mobileRow)}

      {/* Desktop orbit layer: only after mount + measure, so SSR and mobile never render it. */}
      {supported !== null && geometry && (
        <ul className={`${styles.layer} hidden md:block`} style={layerStyle} data-static={supported ? "false" : "true"}>
          {videos.map((video, index) => {
            const delay = -(((index / videos.length + phase) % 1) * duration)
            const satStyle = {
              "--delay": `${delay.toFixed(2)}s`,
              "--slot": (index + 1) / (videos.length + 1),
            } as CSSProperties
            return (
              <li key={video.id} className={styles.sat} style={satStyle}>
                {renderThumb(video, index)}
                <span className={styles.label} aria-hidden="true">
                  {video.title[lang]}
                </span>
              </li>
            )
          })}
        </ul>
      )}

      <Dialog open={openIndex !== null} onOpenChange={(isOpen) => !isOpen && setOpenIndex(null)}>
        <DialogContent
          className="w-[calc(100vw-2rem)] max-w-3xl max-h-[92vh] overflow-y-auto gap-3 rounded-none border bg-black p-4 text-white sm:rounded-none"
          style={{ borderColor: "#39ff14", boxShadow: "0 0 18px rgba(57, 255, 20, 0.45)" }}
          onOpenAutoFocus={(e) => {
            // Focus the dialog itself: if focus lands in the YouTube iframe, Escape never reaches the page.
            e.preventDefault()
            ;(e.currentTarget as HTMLElement | null)?.focus()
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
            lastTriggerRef.current?.focus()
          }}
          onKeyDown={(e) => {
            if (videos.length < 2) return
            if (e.key === "ArrowRight") step(1)
            else if (e.key === "ArrowLeft") step(-1)
          }}
        >
          {current && (
            <>
              <DialogTitle className="font-cyber text-lg md:text-xl text-neon-green pr-8 leading-snug">
                {current.title[lang]}
              </DialogTitle>
              <div className="aspect-video w-full border border-neon-green/40 bg-black">
                <iframe
                  key={current.id}
                  src={youtubeSrc(current)}
                  title={current.title[lang]}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <DialogDescription className="text-sm text-white/80 leading-relaxed">
                {current.description[lang]}
              </DialogDescription>
              {videos.length > 1 && (
                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="inline-flex items-center gap-1 border border-neon-green/60 px-3 py-1 text-sm text-neon-green hover:bg-neon-green/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ff]"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    {lang === "es" ? "Anterior" : "Previous"}
                  </button>
                  <span className="text-xs text-neon-cyan" aria-live="polite">
                    {(openIndex ?? 0) + 1} / {videos.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="inline-flex items-center gap-1 border border-neon-green/60 px-3 py-1 text-sm text-neon-green hover:bg-neon-green/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ff]"
                  >
                    {lang === "es" ? "Siguiente" : "Next"}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
