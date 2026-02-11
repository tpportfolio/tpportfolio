"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react"

interface MediaItem {
  id: number
  type: "image" | "video"
  src: string
  alt: string
  caption: string
  tool?: string
}

interface MediaGalleryProps {
  items: MediaItem[]
  title?: string
}

export function MediaGallery({ items, title = "MEDIA_ARCHIVE" }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const currentItem = items[currentIndex]

  const nextItem = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  return (
    <div className="terminal mt-8">
      <div className="terminal-header flex justify-between items-center">
        <span>{title}</span>
        <div className="flex gap-2">
          <button
            onClick={toggleFullscreen}
            className="text-neon-green hover:text-neon-cyan transition-colors"
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {fullscreen ? <X size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>
      <div
        className={`terminal-content p-0 overflow-hidden ${
          fullscreen ? "fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col" : "relative"
        }`}
      >
        {fullscreen && (
          <div className="p-4 flex justify-between items-center border-b border-neon-green">
            <h3 className="text-neon-green">{currentItem.caption}</h3>
            <button
              onClick={toggleFullscreen}
              className="text-neon-green hover:text-neon-cyan transition-colors"
              aria-label="Exit fullscreen"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className={`relative ${fullscreen ? "flex-1 flex items-center justify-center" : "h-[400px]"}`}>
          {currentItem.type === "image" ? (
            <div className="relative w-full h-full">
              <Image
                src={currentItem.src || "/placeholder.svg"}
                alt={currentItem.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-xs text-neon-green font-mono">
                {currentItem.tool && <span className="mr-2">TOOL: {currentItem.tool}</span>}
                <span>FILE_ID: {currentItem.id.toString().padStart(3, "0")}</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <video
                src={currentItem.src}
                controls
                className="w-full h-full object-contain"
                poster="/placeholder.svg?height=400&width=600"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-xs text-neon-green font-mono">
                {currentItem.tool && <span className="mr-2">TOOL: {currentItem.tool}</span>}
                <span>FILE_ID: {currentItem.id.toString().padStart(3, "0")}</span>
              </div>
            </div>
          )}

          <button
            onClick={prevItem}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-neon-green hover:text-neon-cyan p-1 rounded-full"
            aria-label="Previous item"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextItem}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-neon-green hover:text-neon-cyan p-1 rounded-full"
            aria-label="Next item"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {!fullscreen && (
          <div className="p-4 border-t border-neon-green">
            <div className="flex justify-between items-center">
              <p className="text-neon-cyan">{currentItem.caption}</p>
              <p className="text-xs text-neon-green">
                {currentIndex + 1}/{items.length}
              </p>
            </div>
          </div>
        )}

        {!fullscreen && (
          <div className="p-4 grid grid-cols-5 gap-2 border-t border-neon-green">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-16 overflow-hidden border ${
                  index === currentIndex ? "border-neon-cyan" : "border-neon-green border-opacity-30"
                }`}
                aria-label={`View ${item.alt}`}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 10vw"
                  />
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <span className="text-neon-green text-xs">VIDEO</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
