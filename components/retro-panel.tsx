"use client"

import type { ReactNode } from "react"
import { VideoWindowFrame } from "./video-window"

// Same props as before; it now draws the site window in the panel's accent colour.
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
  return (
    <VideoWindowFrame
      title={title}
      tone={accent ?? (highlight ? "cyan" : "default")}
      titleOverlay={headerOverlay}
      meta={
        <>
          {headerAccessory}
          {statusRight || "Done"}
        </>
      }
      footRight={statusRight || ""}
      className={className}
    >
      <div>{children}</div>
    </VideoWindowFrame>
  )
}
