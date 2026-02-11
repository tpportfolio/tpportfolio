"use client"

import React from "react"

interface YouTubeEmbedProps {
  videoId: string
  isPlaylist?: boolean
}

export function YouTubeEmbed({ videoId, isPlaylist = false }: YouTubeEmbedProps) {
  const embedUrl = isPlaylist
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${videoId}`
    : `https://www.youtube.com/embed/${videoId}`

  return (
    <div className="aspect-video w-full">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  )
}
