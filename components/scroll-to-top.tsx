"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // A link to a subsection (/work/agency-experience#jwt) must land on that subsection, not on the top.
    const hash = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : ""
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    let frame = 0
    let attempts = 0
    const scrollToTarget = () => {
      const target = document.getElementById(hash)
      if (target) {
        target.scrollIntoView({ block: "start" })
        return
      }
      // The target can mount a moment after the route change.
      attempts += 1
      if (attempts < 30) {
        frame = window.requestAnimationFrame(scrollToTarget)
      } else {
        window.scrollTo(0, 0)
      }
    }
    scrollToTarget()

    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
