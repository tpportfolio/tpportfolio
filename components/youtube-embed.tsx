"use client"

import React from "react"
import { useLanguage } from "./language-context"

interface YouTubeEmbedProps {
  videoId: string
  isPlaylist?: boolean
  aspectClassName?: string
  title?: string
}

export function YouTubeEmbed({ videoId, isPlaylist = false, aspectClassName = "aspect-video", title }: YouTubeEmbedProps) {
  const { language } = useLanguage()
  const embedUrl = isPlaylist
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${videoId}`
    : `https://www.youtube.com/embed/${videoId}`
  const frameTitle = title ?? (language === "es" ? "Reproductor de video de YouTube" : "YouTube video player")

  return (
    <div className={`${aspectClassName} w-full`}>
      <iframe
        src={embedUrl}
        title={frameTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  )
}
