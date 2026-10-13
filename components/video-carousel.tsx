"use client"

import React from "react"
import { VideoWindow, type VideoItem } from "./video-window"

export type { VideoItem }

interface VideoCarouselProps {
  items: VideoItem[]
  title?: string
  className?: string
}

export function VideoCarousel({ items, title, className = "mt-8" }: VideoCarouselProps) {
  return <VideoWindow items={items} title={title} className={className} />
}
