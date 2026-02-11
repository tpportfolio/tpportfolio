"use client"

import { Menu } from "lucide-react"
import { useEffect } from "react"

export function MobileMenuButton() {
  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar")
    if (sidebar) {
      sidebar.classList.toggle("-translate-x-full")
    }
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      const target = event.target as HTMLElement

      if (sidebar && !sidebar.contains(target) && !target.closest(".mobile-menu-button")) {
        sidebar.classList.add("-translate-x-full")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <button
      className="mobile-menu-button fixed top-4 left-4 z-50 lg:hidden bg-black p-2 rounded-md border border-neon-green text-neon-green"
      onClick={toggleSidebar}
      aria-label="Toggle menu"
    >
      <Menu size={24} />
    </button>
  )
}
