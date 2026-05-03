"use client"

import type { ReactNode } from "react"

export function RetroPanel({
  title,
  statusRight,
  headerAccessory,
  headerOverlay,
  children,
  highlight,
  accent,
  className,
}: {
  title: string
  statusRight?: string
  headerAccessory?: ReactNode
  headerOverlay?: ReactNode
  children: ReactNode
  highlight?: boolean
  accent?: "default" | "cyan" | "blue" | "amber"
  className?: string
}) {
  const tone = accent ?? (highlight ? "cyan" : "default")

  const frameClass =
    tone === "amber"
      ? "border-[#f59e0b] shadow-[#f59e0b]/25 hover:shadow-[#f59e0b]/45"
      : tone === "blue"
      ? "border-[#5aa9ff] shadow-[#5aa9ff]/25 hover:shadow-[#5aa9ff]/45"
      : tone === "cyan"
        ? "border-cyan-400 shadow-cyan-400/40 hover:shadow-cyan-400/70"
        : "border-neon-green shadow-neon-green/20 hover:shadow-neon-green/40"

  const headerClass =
    tone === "amber"
      ? "bg-gradient-to-r from-[#231204] to-[#7a3d08] border-[#f59e0b]"
      : tone === "blue"
      ? "bg-gradient-to-r from-[#07142f] to-[#154b9c] border-[#5aa9ff]"
      : tone === "cyan"
        ? "bg-cyan-950 border-cyan-400"
        : "bg-gradient-to-r from-gray-900 to-gray-800 border-neon-green"

  const footerClass =
    tone === "amber"
      ? "bg-[#231204] border-[#f59e0b]"
      : tone === "blue"
      ? "bg-[#07142f] border-[#5aa9ff]"
      : tone === "cyan"
        ? "bg-cyan-950 border-cyan-400"
        : "bg-gray-900 border-neon-green"

  const titleClass =
    tone === "amber" ? "text-[#f59e0b]" : tone === "blue" ? "text-[#8dc5ff]" : tone === "cyan" ? "text-neon-cyan" : "text-neon-green"

  const statusClass =
    tone === "amber" ? "text-[#f59e0b]" : tone === "blue" ? "text-[#8dc5ff]" : tone === "cyan" ? "text-cyan-400" : "text-neon-green"

  const lightOneClass = tone === "amber" ? "bg-[#ffd166]" : tone === "blue" ? "bg-[#8dc5ff]" : tone === "cyan" ? "bg-cyan-400" : "bg-red-500"
  const lightTwoClass = tone === "amber" ? "bg-[#f59e0b]" : tone === "blue" ? "bg-[#d8eeff]" : tone === "cyan" ? "bg-cyan-200" : "bg-yellow-500"
  const lightThreeClass = tone === "amber" ? "bg-[#b45309]" : tone === "blue" ? "bg-[#1d6fe0]" : tone === "cyan" ? "bg-cyan-600" : "bg-green-500"

  return (
    <div
      className={`retro-panel relative rounded-sm overflow-visible border bg-black shadow-lg transition-all duration-300
        ${frameClass}
        ${className || ""}`}
    >
      <div
        className={`relative flex items-center justify-between p-2 border-b
          ${headerClass}`}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <div className="relative flex items-center min-w-0">
            <div className={`w-3 h-3 rounded-full mr-2 ${lightOneClass}`}></div>
            <div className={`w-3 h-3 rounded-full mr-2 ${lightTwoClass}`}></div>
            <div className={`w-3 h-3 rounded-full mr-2 ${lightThreeClass}`}></div>
            <span className={`truncate text-xl md:text-xl font-bold ${titleClass}`}>{title}</span>
            {headerOverlay ? (
              <div className="pointer-events-none absolute left-full top-full z-30 ml-1 -translate-y-[62%]">
                {headerOverlay}
              </div>
            ) : null}
          </div>
          {headerAccessory ? <div className="min-w-0">{headerAccessory}</div> : null}
        </div>
        <div className={`shrink-0 text-xs ${statusClass}`}>{statusRight || "Done"}</div>
      </div>

      <div className="p-4">{children}</div>

      <div
        className={`p-1 border-t flex justify-between
          ${footerClass}`}
      >
        <span className={`text-xs ${statusClass}`}>OK</span>
        <span className={`text-xs ${statusClass}`}>{statusRight || ""}</span>
      </div>
    </div>
  )
}
