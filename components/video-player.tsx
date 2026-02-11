"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  description?: string
}

export function VideoPlayer({
  src,
  poster = "/placeholder.svg?height=400&width=600",
  title,
  description,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
        setCurrentTime(video.currentTime)
      }
    }

    const handleDurationChange = () => {
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("durationchange", handleDurationChange)

    return () => {
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("durationchange", handleDurationChange)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width

    video.currentTime = pos * video.duration
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="terminal mt-8">
      <div className="terminal-header">
        <span>{title || "VIDEO_PLAYBACK"}</span>
      </div>
      <div className="terminal-content p-0" ref={containerRef}>
        <div className="relative">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-auto"
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Overlay controls that appear on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
            <button
              onClick={togglePlay}
              className="bg-neon-green bg-opacity-20 text-neon-green hover:bg-opacity-40 rounded-full p-4"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>

          {/* Bottom controls bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
            {/* Progress bar */}
            <div className="h-1 bg-gray-700 mb-2 cursor-pointer" onClick={handleProgressClick}>
              <div className="h-full bg-neon-green" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlay}
                  className="text-neon-green hover:text-neon-cyan"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  onClick={toggleMute}
                  className="text-neon-green hover:text-neon-cyan"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <span className="text-neon-green text-xs">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                onClick={toggleFullscreen}
                className="text-neon-green hover:text-neon-cyan"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          </div>
        </div>

        {description && (
          <div className="p-4 border-t border-neon-green">
            <p className="text-neon-cyan text-sm">{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
