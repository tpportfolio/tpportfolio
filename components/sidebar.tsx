"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "./language-context"
import { LanguageSwitcher } from "./language-switcher"
import { useVisualMode } from "./visual-mode-context"

export default function Sidebar() {
  const { t } = useLanguage()
  const { mode, toggleMode } = useVisualMode()
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeSidebar = () => setIsMobileOpen(false)

  useEffect(() => {
    const handleToggle = () => setIsMobileOpen((current) => !current)

    window.addEventListener("tp-mobile-menu-toggle", handleToggle as EventListener)

    return () => {
      window.removeEventListener("tp-mobile-menu-toggle", handleToggle as EventListener)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", isMobileOpen)
    window.dispatchEvent(new CustomEvent("tp-mobile-menu-state", { detail: { open: isMobileOpen } }))

    return () => {
      document.body.classList.remove("mobile-menu-open")
    }
  }, [isMobileOpen])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  function goToWorkSection(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    closeSidebar()

    if (pathname === "/") {
      window.history.replaceState(null, "", "/#trabajos")
      const target = document.getElementById("trabajos")
      target?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }

    router.push("/#trabajos")
  }

  const mobileCloseToneClass =
    mode === "light"
      ? "border-[#c57b45] bg-[#fff2e3] text-[#8b4315] shadow-[0_0_16px_rgba(180,83,9,0.14)]"
      : "border-neon-green bg-black text-neon-green"

  return (
    <>
      {isMobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-[2px] lg:hidden"
          onClick={closeSidebar}
        />
      ) : null}
      <aside
        className={`fixed left-0 top-0 z-50 h-dvh w-screen max-w-full overflow-y-auto border-r-0 border-neon-green bg-black px-5 pb-6 pt-6 transition-transform duration-300 lg:h-screen lg:w-64 lg:border-r lg:p-6 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="sidebar"
      >
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-md border lg:hidden ${mobileCloseToneClass}`}
          onClick={closeSidebar}
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex min-h-full flex-col justify-between">
          <div>
            <Link href="/" className="block mb-12 w-full" onClick={closeSidebar}>
              <div className="flex min-h-[4.75rem] w-full items-center gap-4 py-1">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-neon-green sm:h-16 sm:w-16 lg:h-14 lg:w-14">
                  <span className="text-neon-green text-base">T.P</span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <span className="sidebar-brand-title glitch text-neon-green font-bold" data-text={"TOM\u00c1S_PER\u00d3"}>
                    {"TOM\u00c1S_PER\u00d3"}
                  </span>
                  <span className="sidebar-brand-subtitle text-neon-cyan">GEN_MARKETER.exe</span>
                </div>
              </div>
            </Link>

            <nav className="mt-10">
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="sidebar-link" onClick={closeSidebar}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="sidebar-link" onClick={closeSidebar}>
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link href="/#trabajos" className="sidebar-link" onClick={goToWorkSection}>
                    {t("work")}
                  </Link>
                </li>
                <li>
                  <Link href="/timeline" className="sidebar-link" onClick={closeSidebar}>
                    TIMELINE
                  </Link>
                </li>
                <li>
                  <Link href="/work/ai-experiments" className="sidebar-link" onClick={closeSidebar}>
                    {t("ai_experiments")}
                  </Link>
                </li>
                <li>
                  <Link href="/magaiba" className="sidebar-link sidebar-link--controlled-wrap" onClick={closeSidebar}>
                    MAGAIBA (WEB3 + AI)
                  </Link>
                </li>
                <li>
                  <a href="mailto:tomaspero@gmail.com" className="sidebar-link" onClick={closeSidebar}>
                    {t("contact")}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mb-6 sidebar-footer-stack">
            <div className="sidebar-mode-inline">
              <span className={`sidebar-mode-label ${mode === "light" ? "sidebar-mode-label--active" : ""}`}>LIGHT</span>
              <button
                type="button"
                role="switch"
                aria-checked={mode === "light"}
                aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
                className={`sidebar-mode-switch sidebar-mode-switch--${mode}`}
                onClick={toggleMode}
              >
                <span className="sidebar-mode-switch__track" aria-hidden>
                  <span className="sidebar-mode-switch__thumb" />
                </span>
              </button>
              <span className={`sidebar-mode-label ${mode === "dark" ? "sidebar-mode-label--active" : ""}`}>DARK</span>
            </div>
            <LanguageSwitcher />
            <Link href="/agents.md" target="_blank" rel="noopener noreferrer" className="sidebar-agent-link" onClick={closeSidebar}>
              AGENT_MODE
            </Link>
            <div className="text-xs text-neon-green">{"\u00a9 1986-2025 TOM\u00c1S PER\u00d3"}</div>
          </div>
        </div>
      </aside>
    </>
  )
}
