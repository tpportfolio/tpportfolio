"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "./language-context"
import { useVisualMode } from "./visual-mode-context"
import type { VideoItem } from "./video-carousel"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"
import styles from "./timeline-orbit.module.css"

type Lang = "es" | "en"

interface TimelineOrbitProps {
  /** Small cyan label at the top of the planet (dates). */
  year: string
  /** Company / project name, the largest text of the planet. */
  name: string
  /** Short role line shown inside the planet. */
  role: string
  /** Optional tag shown under the year (e.g. "SIDE PROJECT"). */
  tag?: string
  /** Videos orbiting the planet. Empty: the planet is drawn alone, with no ring. */
  videos: VideoItem[]
  /** Fraction (0-1) that sets the start angle, so neighbouring planets are not in phase. */
  phase?: number
  /** Revolve counter-clockwise instead of clockwise. */
  reverse?: boolean
  /** Seconds per lap. */
  duration?: number
  /** Placement classes for the stage (grid column, alignment). */
  className?: string
}

function youtubeSrc(video: VideoItem) {
  if (video.type === "vimeo") return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`
  if (video.isPlaylist) return `https://www.youtube.com/embed/videoseries?list=${video.videoId}&autoplay=1`
  return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`
}

function thumbSrc(video: VideoItem) {
  return `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`
}

/** Keep a satellite's title label inside the visible area (viewport, and the main column next to the sidebar). */
function fitLabel(sat: HTMLElement) {
  const label = sat.querySelector<HTMLElement>("[data-label]")
  if (!label) return
  label.style.setProperty("--lx", "0px")
  label.dataset.below = "false"
  let rect = label.getBoundingClientRect()
  if (rect.top < 8) {
    label.dataset.below = "true"
    rect = label.getBoundingClientRect()
  }
  const main = sat.closest("main")?.getBoundingClientRect()
  const minX = Math.max(8, (main?.left ?? 0) + 8)
  const maxX = document.documentElement.clientWidth - 8
  let dx = 0
  if (rect.left < minX) dx = minX - rect.left
  else if (rect.right > maxX) dx = maxX - rect.right
  label.style.setProperty("--lx", `${Math.round(dx)}px`)
}

export function TimelineOrbit({
  year,
  name,
  role,
  tag,
  videos,
  phase = 0,
  reverse = false,
  duration = 34,
  className = "",
}: TimelineOrbitProps) {
  const { language } = useLanguage()
  const { mode } = useVisualMode()
  const lang = (language === "en" ? "en" : "es") as Lang
  const hasVideos = videos.length > 0

  const rootRef = useRef<HTMLDivElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Run the orbit only while the planet is near the viewport.
  useEffect(() => {
    const el = rootRef.current
    if (!hasVideos || !el || typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting))
      },
      { rootMargin: "120px" },
    )
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

  const playLabel = lang === "es" ? "Reproducir video" : "Play video"
  const current = openIndex !== null ? videos[openIndex] : null
  const startAngle = (((phase % 1) + 1) % 1) * 360

  const rootStyle = {
    "--dur": `${duration}s`,
    "--dir": reverse ? "reverse" : "normal",
  } as CSSProperties

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${className}`}
      style={rootStyle}
      data-mode={mode}
      data-visible={visible ? "true" : "false"}
      data-open={openIndex !== null ? "true" : "false"}
    >
      {hasVideos && <span className={styles.ring} aria-hidden="true" />}

      <div className={styles.planet}>
        <div className={styles.core}>
          <p className={`${styles.year} font-cyber`}>{year}</p>
          {tag && <p className={styles.tag}>{tag}</p>}
          <h3 className={`${styles.name} font-cyber`}>{name}</h3>
          <p className={styles.role}>{role}</p>
        </div>
      </div>

      {hasVideos && (
        <ul className={styles.spin}>
          {videos.map((video, index) => {
            const angle = startAngle + (index * 360) / videos.length
            return (
              <li key={video.id} className={styles.slot} style={{ "--a": `${angle.toFixed(2)}deg` } as CSSProperties}>
                <div
                  className={styles.sat}
                  onPointerEnter={(e) => fitLabel(e.currentTarget)}
                  onFocus={(e) => fitLabel(e.currentTarget)}
                >
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
                  <span className={styles.label} data-label="" aria-hidden="true">
                    {video.title[lang]}
                  </span>
                </div>
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
