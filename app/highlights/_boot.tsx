"use client"

import { useEffect, useState } from "react"

// The boot as texture, not as a gate: the page is already rendered underneath, the overlay lets
// every click and scroll through, it leaves by itself in about 1.5 s (CSS, so it also leaves
// without JavaScript), and any key, scroll, wheel or touch makes it go at once.
// Shown once per browser session.

const SEEN_KEY = "tp_v2_boot"

const lines = [
  "Portfolio TP access required: validating creative signal...",
  "WARNING: human creativity detected.",
  "Request: approved.",
  "OPENING PORTFOLIO.",
]

export function BootTexture() {
  const [gone, setGone] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SEEN_KEY)) {
        setGone(true)
        return
      }
      window.sessionStorage.setItem(SEEN_KEY, "1")
    } catch {
      // noop
    }

    const leave = () => setLeaving(true)
    const events = ["keydown", "wheel", "touchstart", "pointerdown", "scroll"] as const
    events.forEach((name) => window.addEventListener(name, leave, { passive: true, once: true }))
    const done = window.setTimeout(() => setGone(true), 1700)
    return () => {
      events.forEach((name) => window.removeEventListener(name, leave))
      window.clearTimeout(done)
    }
  }, [])

  useEffect(() => {
    if (!leaving) return
    const t = window.setTimeout(() => setGone(true), 220)
    return () => window.clearTimeout(t)
  }, [leaving])

  if (gone) return null

  return (
    <>
      {/* Repeat visits in the same session: hide it before the first paint. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${SEEN_KEY}"))document.documentElement.classList.add("v2-boot-seen")}catch(e){}`,
        }}
      />
      <div className="v2-boot" data-leaving={leaving ? "" : undefined} aria-hidden="true">
        <div className="v2-boot-lines">
          {lines.map((line, i) => (
            <p key={line} style={{ animationDelay: `${120 + i * 230}ms` }} data-last={i === lines.length - 1 ? "" : undefined}>
              {i === lines.length - 1 ? line : `> ${line}`}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}
