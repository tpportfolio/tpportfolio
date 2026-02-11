"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselItem {
  id: string
  title: string
  subtitle?: string
  type: "youtube" | "instagram"
  embedUrl: string
}

const items: CarouselItem[] = [
  {
    id: "paradise-la",
    title: "PARADISE.LA",
    type: "instagram",
    embedUrl: "https://www.instagram.com/p/DI4naQlS0Ri/embed",
  },
  {
    id: "airtm",
    title: "AIRTM",
    subtitle: "Airtalks",
    type: "youtube",
    embedUrl: "https://www.youtube.com/embed/-AYh5w57SKE?si=dj0AaCV1pwB_-OYb",
  },
  {
    id: "stone-movistar",
    title: "STONE MOVISTAR",
    type: "youtube",
    embedUrl: "https://www.youtube.com/embed/8D_zTKNNf0U?si=SwJdIks-o3nFQV9n&start=48",
  },
]

export function ContentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentItem = items[currentIndex]

  const nextItem = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  return (
    <section className="w-full flex flex-col items-center mb-8">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={prevItem} className="p-2 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-neon-green">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-lg md:text-2xl font-bold text-neon-green">{currentItem.title}</span>
          {currentItem.subtitle && <span className="text-xs text-neon-cyan mt-1">{currentItem.subtitle}</span>}
        </div>
        <button onClick={nextItem} className="p-2 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-neon-green">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="w-full flex justify-center">
        {currentItem.type === "youtube" ? (
          <iframe
            width="400"
            height="225"
            src={currentItem.embedUrl}
            title={currentItem.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-xl shadow-lg border border-neon-green"
          />
        ) : (
          <iframe
            src={currentItem.embedUrl}
            width="400"
            height="480"
            allowTransparency={true}
            frameBorder="0"
            scrolling="no"
            allow="encrypted-media"
            title={currentItem.title}
            className="rounded-xl shadow-lg border border-neon-green bg-white"
          />
        )}
      </div>
      <div className="mt-2 text-xs text-neon-green">
        {currentIndex + 1}/{items.length}
      </div>
    </section>
  )
}
