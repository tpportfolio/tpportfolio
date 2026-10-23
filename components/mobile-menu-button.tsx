"use client"

import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "./language-context"
import { useVisualMode } from "./visual-mode-context"

export function MobileMenuButton() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { mode } = useVisualMode()
  const { language } = useLanguage()

  useEffect(() => {
    const handleState = (event: Event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail
      setOpen(Boolean(detail?.open))
    }

    window.addEventListener("tp-mobile-menu-state", handleState as EventListener)

    return () => {
      window.removeEventListener("tp-mobile-menu-state", handleState as EventListener)
    }
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      const delta = y - lastY
      // Always show near the top; otherwise hide on scroll down, show on scroll up
      if (y < 80) {
        setHidden(false)
        lastY = y
      } else if (Math.abs(delta) >= 8) {
        setHidden(delta > 0)
        lastY = y
      }
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent("tp-mobile-menu-toggle"))
  }

  const buttonToneClass =
    mode === "light"
      ? "border-[#c57b45] bg-[#fff2e3] text-[#8b4315] shadow-[0_0_16px_rgba(180,83,9,0.14)]"
      : "border-neon-green bg-black text-neon-green"

  // Stay reachable by keyboard: focus-visible forces the button back into view
  const scrollVisibilityClass = hidden
    ? "-translate-y-[150%] opacity-0 pointer-events-none focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:pointer-events-auto"
    : "translate-y-0 opacity-100"

  return (
    <button
      className={`mobile-menu-button fixed left-4 top-8 z-[60] h-11 w-11 items-center justify-center rounded-md border transition-[transform,opacity] duration-200 motion-reduce:transition-none lg:hidden ${buttonToneClass} ${scrollVisibilityClass} ${
        open ? "hidden" : "flex"
      }`}
      onClick={toggleSidebar}
      aria-label={
        language === "es"
          ? open ? "Cerrar menú" : "Abrir menú"
          : open ? "Close menu" : "Open menu"
      }
      aria-expanded={open}
      aria-controls="sidebar"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
