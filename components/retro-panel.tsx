"use client"

import type { ReactNode } from "react"

export function RetroPanel({
  title,
  statusRight,
  children,
  highlight,
  className,
}: {
  title: string
  statusRight?: string
  children: ReactNode
  highlight?: boolean
  className?: string
}) {
  return (
    <div
      className={`retro-panel relative rounded-sm overflow-hidden border bg-black shadow-lg transition-all duration-300
        ${highlight ? "border-cyan-400 shadow-cyan-400/40 hover:shadow-cyan-400/70" : "border-neon-green shadow-neon-green/20 hover:shadow-neon-green/40"}
        ${className || ""}`}
    >
      <div
        className={`flex items-center justify-between p-2 border-b
          ${highlight ? "bg-cyan-950 border-cyan-400" : "bg-gradient-to-r from-gray-900 to-gray-800 border-neon-green"}`}
      >
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${highlight ? "bg-cyan-400" : "bg-red-500"}`}></div>
          <div className={`w-3 h-3 rounded-full mr-2 ${highlight ? "bg-cyan-200" : "bg-yellow-500"}`}></div>
          <div className={`w-3 h-3 rounded-full mr-2 ${highlight ? "bg-cyan-600" : "bg-green-500"}`}></div>
          <span className={`text-xl md:text-xl font-bold ${highlight ? "text-neon-cyan" : "text-neon-green"}`}>{title}</span>
        </div>
        <div className={`text-xs ${highlight ? "text-cyan-400" : "text-neon-green"}`}>{statusRight || "Done"}</div>
      </div>

      <div className="p-4">{children}</div>

      <div
        className={`p-1 border-t flex justify-between
          ${highlight ? "bg-cyan-950 border-cyan-400" : "bg-gray-900 border-neon-green"}`}
      >
        <span className={`text-xs ${highlight ? "text-cyan-400" : "text-neon-green"}`}>OK</span>
        <span className={`text-xs ${highlight ? "text-cyan-400" : "text-neon-green"}`}>{statusRight || ""}</span>
      </div>
    </div>
  )
}
