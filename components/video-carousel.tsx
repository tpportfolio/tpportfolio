"use client"

import React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { YouTubeEmbed } from "./youtube-embed"
import { useLanguage } from "./language-context"
import { RetroPanel } from "./retro-panel"

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

interface VideoCarouselProps {
  items: VideoItem[]
  title?: string
  variant?: "terminal" | "retro"
}

export function VideoCarousel({ items, title, variant = "terminal" }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { language } = useLanguage()

  const currentItem = items[currentIndex]

  const nextItem = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation()
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const prevItem = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevItem()
      if (e.key === "ArrowRight") nextItem()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const body = (
      <div className={variant === "terminal" ? "terminal-content p-0 overflow-hidden" : "p-0 overflow-hidden"}>
        <div className="relative w-full flex justify-center items-center bg-black">
          <div className="w-full max-w-2xl aspect-video">
            {currentItem.type === "youtube" && (
              <YouTubeEmbed videoId={currentItem.videoId} isPlaylist={currentItem.isPlaylist} />
            )}
          </div>

          <button
            onClick={prevItem}
            onKeyDown={e => (e.key === "Enter" || e.key === " " ? prevItem(e) : undefined)}
            tabIndex={0}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-neon-green hover:text-neon-cyan p-1 rounded-full z-20 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
            aria-label="Previous item"
            type="button"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextItem}
            onKeyDown={e => (e.key === "Enter" || e.key === " " ? nextItem(e) : undefined)}
            tabIndex={0}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-neon-green hover:text-neon-cyan p-1 rounded-full z-20 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
            aria-label="Next item"
            type="button"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className={variant === "terminal" ? "p-4 border-t border-neon-green" : "p-4 border-t border-neon-green/40"}>
          <h3 className="text-neon-cyan text-xl mb-2">{currentItem.title[language]}</h3>
          <p className="text-white">{currentItem.description[language]}</p>
        </div>

        <div
          className={
            variant === "terminal"
              ? "p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 border-t border-neon-green overflow-x-auto"
              : "p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 border-t border-neon-green/40 overflow-x-auto"
          }
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              onKeyDown={e => (e.key === "Enter" || e.key === " " ? setCurrentIndex(index) : undefined)}
              tabIndex={0}
              className={`relative h-26 overflow-hidden border ${
                index === currentIndex ? "border-neon-cyan" : "border-neon-green border-opacity-30"
              } focus:outline-none focus:ring-2 focus:ring-neon-cyan`}
              aria-label={`View ${item.title[language]}`}
              type="button"
            >
              <img
                src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`}
                alt={item.title[language]}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
  )

  if (variant === "retro") {
    return (
      <RetroPanel title={title || "VIDEO_ARCHIVE"} statusRight={`${currentIndex + 1}/${items.length}`}>
        {body}
      </RetroPanel>
    )
  }

  return (
    <div className="terminal mt-8">
      <div className="terminal-header flex justify-between items-center">
        <span className="text-2xl">{title || "VIDEO_ARCHIVE"}</span>
        <div className="text-xs text-neon-green">
          {currentIndex + 1}/{items.length}
        </div>
      </div>
      {body}
    </div>
  )
}
