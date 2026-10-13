"use client"

import React, { useEffect, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useLanguage } from "./language-context"

// The one container for video across the site. Its look lives in app/globals.css (VIDEO WINDOW block).
//   VideoWindowFrame: the window itself (title bar with the three lights, body, status foot).
//                     Exported also as WindowFrame for windows that hold text instead of video.
//   VideoScreen:      the 16:9 screen on its black frame.
//   VideoWindow:      frame + screen + title and description; with more than one video it adds
//                     the previous / next buttons, the segment bar and the thumbnails.

export interface VideoItem {
  id: string
  type: "youtube" | "vimeo"
  videoId: string
  isPlaylist?: boolean
  title: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
}

type VideoSource = Pick<VideoItem, "videoId"> & Partial<Pick<VideoItem, "type" | "isPlaylist">>

const two = (n: number) => String(n).padStart(2, "0")

export const videoCountLabel = (count: number) => `${count} ${count === 1 ? "video" : "videos"}`

function embedSrc(video: VideoSource, autoPlay: boolean) {
  if (video.type === "vimeo") return `https://player.vimeo.com/video/${video.videoId}${autoPlay ? "?autoplay=1" : ""}`
  if (video.isPlaylist) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${video.videoId}${autoPlay ? "&autoplay=1" : ""}`
  }
  return `https://www.youtube.com/embed/${video.videoId}?rel=0${autoPlay ? "&autoplay=1" : ""}`
}

/** Only single YouTube videos have a still to show. */
function hasPoster(video: VideoSource) {
  return video.type !== "vimeo" && !video.isPlaylist
}

interface VideoWindowFrameProps {
  title: string
  id?: string
  /** Small text at the right of the title bar (e.g. "4/4"). */
  meta?: ReactNode
  /** Hangs from the title (e.g. a notice badge). */
  titleOverlay?: ReactNode
  /** Last element of the title bar (e.g. a close button). */
  barEnd?: ReactNode
  footLeft?: ReactNode
  footRight?: ReactNode
  className?: string
  bodyClassName?: string
  children: ReactNode
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
}

export function VideoWindowFrame({
  title,
  id,
  meta,
  titleOverlay,
  barEnd,
  footLeft = "OK",
  footRight,
  className,
  bodyClassName,
  children,
  onKeyDown,
}: VideoWindowFrameProps) {
  return (
    <section id={id} className={`vw ${className ?? ""}`} aria-label={title} onKeyDown={onKeyDown}>
      <header className="vw-bar">
        <span className="vw-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="vw-title-box">
          <span className="vw-title-in">
            <span className="vw-title">{title}</span>
            {titleOverlay ? <span className="vw-title-overlay">{titleOverlay}</span> : null}
          </span>
        </span>
        {meta ? <span className="vw-meta">{meta}</span> : null}
        {barEnd}
      </header>
      <div className={`vw-body ${bodyClassName ?? ""}`}>{children}</div>
      <footer className="vw-foot">
        <span>{footLeft}</span>
        <span>{footRight}</span>
      </footer>
    </section>
  )
}

/** The same window around any other content (text, lists, cards). */
export const WindowFrame = VideoWindowFrame

interface VideoScreenProps {
  video: VideoSource
  title: string
  /** Skip the still and start playing right away (use it only after a click from the visitor). */
  autoPlay?: boolean
}

export function VideoScreen({ video, title, autoPlay = false }: VideoScreenProps) {
  const { language } = useLanguage()
  const [started, setStarted] = useState(false)
  const showFrame = autoPlay || started || !hasPoster(video)
  const [poster, setPoster] = useState(`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`)

  // Every video has the medium still; swap in the large one only when it exists
  // (YouTube answers a missing still with a 120px grey placeholder, not with an error).
  useEffect(() => {
    if (showFrame) return
    const large = new window.Image()
    large.onload = () => {
      if (large.naturalWidth > 120) setPoster(large.src)
    }
    large.src = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
    return () => {
      large.onload = null
    }
  }, [video.videoId, showFrame])

  return (
    <div className="vw-screen-wrap">
      <div className="vw-screen">
        {showFrame ? (
          <iframe
            src={embedSrc(video, autoPlay || started)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt="" />
            <button
              type="button"
              className="vw-play"
              onClick={() => setStarted(true)}
              aria-label={`${language === "es" ? "Reproducir" : "Play"}: ${title}`}
            >
              <Play size={22} fill="currentColor" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

interface VideoWindowProps {
  items: VideoItem[]
  title?: string
  /** Controlled position; leave it out and the window keeps its own. */
  index?: number
  onIndexChange?: (index: number) => void
  autoPlay?: boolean
  /** Thumbnails row. Defaults to on when there is more than one video. */
  thumbnails?: boolean
  meta?: ReactNode
  barEnd?: ReactNode
  className?: string
  /** Extra content under the description (e.g. a link). */
  children?: ReactNode
}

export function VideoWindow({
  items,
  title,
  index,
  onIndexChange,
  autoPlay = false,
  thumbnails,
  meta,
  barEnd,
  className,
  children,
}: VideoWindowProps) {
  const { language } = useLanguage()
  const [ownIndex, setOwnIndex] = useState(0)
  const total = items.length
  const currentIndex = Math.min(index ?? ownIndex, total - 1)
  const current = items[currentIndex]
  const isList = total > 1
  const showThumbnails = thumbnails ?? isList

  if (!current) return null

  const select = (next: number) => {
    const wrapped = (next + total) % total
    setOwnIndex(wrapped)
    onIndexChange?.(wrapped)
  }

  return (
    <VideoWindowFrame
      title={title || "VIDEO_ARCHIVE"}
      meta={meta ?? (isList ? `${currentIndex + 1}/${total}` : undefined)}
      barEnd={barEnd}
      footRight={videoCountLabel(total)}
      className={className}
      onKeyDown={(event) => {
        if (!isList || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return
        // Handled here: a dialog around the window must not step a second time.
        event.stopPropagation()
        select(currentIndex + (event.key === "ArrowRight" ? 1 : -1))
      }}
    >
      <VideoScreen key={current.id} video={current} title={current.title[language]} autoPlay={autoPlay} />

      <div className="vw-info">
        <h3 className="vw-video-title">{current.title[language]}</h3>
        <p className="vw-video-desc">{current.description[language]}</p>
        {children ? <div className="vw-video-extra">{children}</div> : null}
        {isList ? (
          <div className="vw-nav">
            <button
              type="button"
              className="vw-btn"
              onClick={() => select(currentIndex - 1)}
              aria-label={language === "es" ? "Video anterior" : "Previous video"}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <span className="vw-seg" aria-hidden="true">
              {items.map((item, i) => (
                <i key={item.id} data-on={i <= currentIndex ? "" : undefined} />
              ))}
            </span>
            <span className="vw-count" aria-live="polite">
              {two(currentIndex + 1)} / {two(total)}
            </span>
            <button
              type="button"
              className="vw-btn"
              onClick={() => select(currentIndex + 1)}
              aria-label={language === "es" ? "Video siguiente" : "Next video"}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      {showThumbnails ? (
        <ul className="vw-list">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                className="vw-thumb"
                aria-current={i === currentIndex ? "true" : undefined}
                aria-label={`${language === "es" ? "Ver" : "View"}: ${item.title[language]}`}
                onClick={() => select(i)}
              >
                <span className="vw-thumb-pic">
                  {hasPoster(item) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} alt="" loading="lazy" />
                  ) : (
                    <Play size={20} aria-hidden="true" />
                  )}
                </span>
                <span className="vw-thumb-ix">{two(i + 1)}</span>
                <span className="vw-thumb-title">{item.title[language]}</span>
                <span className="vw-thumb-meta">
                  {item.type === "vimeo" ? "Vimeo" : item.isPlaylist ? "YouTube · Playlist" : "YouTube"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </VideoWindowFrame>
  )
}
