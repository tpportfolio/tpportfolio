"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { useLanguage } from "./language-context"
import { useVisualMode } from "./visual-mode-context"
import { VideoWindow, type VideoItem } from "./video-window"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"
import styles from "./timeline-orbit.module.css"

type Lang = "es" | "en"

interface TimelineOrbitProps {
  /** Small cyan label at the top of the planet (dates). */
  year: string
  /** Company / project name, the largest text of the planet. */
  name: string
  /** Optional tag shown under the year (e.g. "SIDE PROJECT"). */
  tag?: string
  /** Where the planet face leads: the whole face is one link. */
  href: string
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
  tag,
  href,
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
  const viewLabel = `${lang === "es" ? "Ver" : "View"} ${name}`
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
        {/* One link over the whole face; the satellites are separate buttons stacked above it. */}
        <Link href={href} className={styles.planetLink} aria-label={viewLabel}>
          <div className={styles.core}>
            <p className={`${styles.year} font-cyber`}>{year}</p>
            {tag && <p className={styles.tag}>{tag}</p>}
            <h3 className={`${styles.name} font-cyber`}>{name}</h3>
          </div>
        </Link>
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
                    <img
                      src={thumbSrc(video)}
                      alt={`${lang === "es" ? "Miniatura del video" : "Video thumbnail"}: ${video.title[lang]}`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
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
          className="block w-[calc(100vw-2rem)] max-w-3xl gap-0 border-0 bg-transparent p-0 shadow-none sm:rounded-none [&>button]:hidden"
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
              <DialogTitle className="sr-only">{current.title[lang]}</DialogTitle>
              <DialogDescription className="sr-only">{current.description[lang]}</DialogDescription>
              <VideoWindow
                items={videos}
                title={name}
                index={openIndex ?? 0}
                onIndexChange={setOpenIndex}
                autoPlay
                thumbnails={false}
                className="vw--modal"
                barEnd={
                  <DialogClose className="vw-close" aria-label={lang === "es" ? "Cerrar" : "Close"}>
                    <X size={16} aria-hidden="true" />
                  </DialogClose>
                }
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
