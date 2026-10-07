"use client"

import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useVisualMode } from "./visual-mode-context"

export function MobileMenuButton() {
  const [open, setOpen] = useState(false)
  const { mode } = useVisualMode()

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

  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent("tp-mobile-menu-toggle"))
  }

  const buttonToneClass =
    mode === "light"
      ? "border-[#c57b45] bg-[#fff2e3] text-[#8b4315] shadow-[0_0_16px_rgba(180,83,9,0.14)]"
      : "border-neon-green bg-black text-neon-green"

  return (
    <button
      className={`mobile-menu-button fixed left-4 top-8 z-[60] h-11 w-11 items-center justify-center rounded-md border lg:hidden ${buttonToneClass} ${
        open ? "hidden" : "flex"
      }`}
      onClick={toggleSidebar}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="sidebar"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
