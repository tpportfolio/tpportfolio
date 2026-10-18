"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// EXPLORATION (fork explore/r35): applies ?font=... to the whole site (kept for the browser session)
// and shows a small bar to switch fonts and summary variants. Off unless one of them was chosen.

const FONT_KEY = "tp_explore_font"

const fonts = ["system", "geist", "jetbrains", "martian", "kode", "azeret", "spline", "redhat", "chivo", "fira", "doto"]
const summaries = ["none", "terminal", "strip", "cards", "typed", "details"]

export function ExploreControls() {
  const params = useSearchParams()
  const pathname = usePathname()
  const [font, setFont] = useState<string | null>(null)

  useEffect(() => {
    let next = params.get("font")
    try {
      if (next) window.sessionStorage.setItem(FONT_KEY, next)
      else next = window.sessionStorage.getItem(FONT_KEY)
    } catch {
      // noop
    }
    setFont(next)
    if (next && next !== "system") document.documentElement.dataset.font = next
    else delete document.documentElement.dataset.font
  }, [params])

  const summary = params.get("resumen")
  if (!font && !summary) return null

  const link = (key: string, value: string) => {
    const q = new URLSearchParams(params.toString())
    q.set(key, value)
    return `${pathname}?${q.toString()}`
  }

  return (
    <div className="explore-bar" role="navigation" aria-label="Exploración">
      <a href="/drafts/explore" className="explore-bar-home">
        EXPLORE
      </a>
      {pathname === "/" ? (
        <span>
          resumen:
          {summaries.map((s) => (
            <a key={s} href={link("resumen", s)} aria-current={(summary ?? "none") === s ? "true" : undefined}>
              {s}
            </a>
          ))}
        </span>
      ) : null}
      <span>
        font:
        {fonts.map((f) => (
          <a key={f} href={link("font", f)} aria-current={(font ?? "system") === f ? "true" : undefined}>
            {f}
          </a>
        ))}
      </span>
    </div>
  )
}
