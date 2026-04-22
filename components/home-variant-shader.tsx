"use client"

import { useEffect, useRef } from "react"
import type { VisualMode } from "@/components/visual-mode-context"

interface HomeVariantShaderProps {
  mode: VisualMode
}

type BlobConfig = {
  xSeed: number
  ySeed: number
  xSpeed: number
  ySpeed: number
  xAmplitude: number
  yAmplitude: number
  radius: number
  pulse: number
  color: string
}

const DARK_BLOBS: BlobConfig[] = [
  { xSeed: 0.12, ySeed: 0.25, xSpeed: 0.00017, ySpeed: 0.00011, xAmplitude: 0.22, yAmplitude: 0.18, radius: 0.24, pulse: 0.14, color: "rgba(0, 255, 145, 0.09)" },
  { xSeed: 0.58, ySeed: 0.18, xSpeed: 0.00011, ySpeed: 0.00009, xAmplitude: 0.18, yAmplitude: 0.22, radius: 0.2, pulse: 0.11, color: "rgba(0, 208, 128, 0.06)" },
  { xSeed: 0.72, ySeed: 0.64, xSpeed: 0.00009, ySpeed: 0.00014, xAmplitude: 0.24, yAmplitude: 0.18, radius: 0.28, pulse: 0.15, color: "rgba(0, 255, 102, 0.04)" },
]

const LIGHT_BLOBS: BlobConfig[] = [
  { xSeed: 0.14, ySeed: 0.22, xSpeed: 0.00011, ySpeed: 0.00008, xAmplitude: 0.19, yAmplitude: 0.16, radius: 0.24, pulse: 0.08, color: "rgba(224, 137, 37, 0.16)" },
  { xSeed: 0.68, ySeed: 0.28, xSpeed: 0.00008, ySpeed: 0.00012, xAmplitude: 0.16, yAmplitude: 0.18, radius: 0.2, pulse: 0.06, color: "rgba(186, 88, 23, 0.12)" },
  { xSeed: 0.56, ySeed: 0.74, xSpeed: 0.0001, ySpeed: 0.00007, xAmplitude: 0.2, yAmplitude: 0.14, radius: 0.22, pulse: 0.07, color: "rgba(244, 174, 78, 0.1)" },
]

export function HomeVariantShader({ mode }: HomeVariantShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const parent = canvas.parentElement
    if (!parent) return

    let rafId = 0

    const resize = () => {
      const width = parent.clientWidth || window.innerWidth
      const height = parent.clientHeight || window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const resizeObserver = new ResizeObserver(() => resize())

    const drawBackdrop = (width: number, height: number, elapsed: number) => {
      const palette = mode === "light"
        ? {
            base: "rgba(246, 236, 222, 0.62)",
            vignette: "rgba(70, 33, 12, 0.045)",
            grid: "rgba(168, 94, 31, 0.06)",
            scanline: "rgba(255, 255, 255, 0.06)",
            noise: "rgba(78, 38, 14, 0.018)",
            blobs: LIGHT_BLOBS,
          }
        : {
            base: "rgba(0, 0, 0, 0.82)",
            vignette: "rgba(0, 0, 0, 0.36)",
            grid: "rgba(0, 255, 140, 0.026)",
            scanline: "rgba(255, 255, 255, 0.012)",
            noise: "rgba(0, 255, 120, 0.008)",
            blobs: DARK_BLOBS,
          }

      context.clearRect(0, 0, width, height)
      context.fillStyle = palette.base
      context.fillRect(0, 0, width, height)

      for (const blob of palette.blobs) {
        const x = width * (blob.xSeed + Math.sin(elapsed * blob.xSpeed + blob.xSeed * 13) * blob.xAmplitude)
        const y = height * (blob.ySeed + Math.cos(elapsed * blob.ySpeed + blob.ySeed * 17) * blob.yAmplitude)
        const radius = Math.min(width, height) * (blob.radius + Math.sin(elapsed * 0.0004 + blob.xSeed * 29) * blob.pulse)

        const gradient = context.createRadialGradient(x, y, 0, x, y, Math.max(radius, 10))
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(0.45, blob.color.replace(/0\.[0-9]+\)/, mode === "light" ? "0.05)" : "0.025)"))
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        context.fillStyle = gradient
        context.beginPath()
        context.arc(x, y, Math.max(radius, 10), 0, Math.PI * 2)
        context.fill()
      }

      context.strokeStyle = palette.grid
      context.lineWidth = 1
      const step = mode === "light" ? 56 : 52
      for (let x = 0; x <= width; x += step) {
        context.beginPath()
        context.moveTo(x + 0.5, 0)
        context.lineTo(x + 0.5, height)
        context.stroke()
      }
      for (let y = 0; y <= height; y += step) {
        context.beginPath()
        context.moveTo(0, y + 0.5)
        context.lineTo(width, y + 0.5)
        context.stroke()
      }

      context.fillStyle = palette.scanline
      for (let y = 0; y <= height; y += 5) {
        context.fillRect(0, y, width, 1)
      }

      context.fillStyle = palette.noise
      for (let i = 0; i < 90; i += 1) {
        const x = (Math.sin(elapsed * 0.00031 + i * 11.7) * 0.5 + 0.5) * width
        const y = (Math.cos(elapsed * 0.00041 + i * 7.3) * 0.5 + 0.5) * height
        context.fillRect(x, y, 1.1, 1.1)
      }

      const vignette = context.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.16, width / 2, height / 2, Math.max(width, height) * 0.78)
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)")
      vignette.addColorStop(1, palette.vignette)
      context.fillStyle = vignette
      context.fillRect(0, 0, width, height)
    }

    const render = (time: number) => {
      const width = parent.clientWidth || window.innerWidth
      const height = parent.clientHeight || window.innerHeight
      drawBackdrop(width, height, time)
      rafId = window.requestAnimationFrame(render)
    }

    resize()
    resizeObserver.observe(parent)

    if (prefersReducedMotion) {
      const width = parent.clientWidth || window.innerWidth
      const height = parent.clientHeight || window.innerHeight
      drawBackdrop(width, height, 0)
    } else {
      rafId = window.requestAnimationFrame(render)
    }

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      resizeObserver.disconnect()
    }
  }, [mode])

  return <canvas ref={canvasRef} className="home-variant-shader" aria-hidden />
}
