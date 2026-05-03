"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "./language-context"
import { LanguageSwitcher } from "./language-switcher"
import { useVisualMode } from "./visual-mode-context"

export default function Sidebar() {
  const { t } = useLanguage()
  const { mode, toggleMode } = useVisualMode()
  const pathname = usePathname()
  const router = useRouter()

  function goToWorkSection(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    if (pathname === "/") {
      window.history.replaceState(null, "", "/#trabajos")
      const target = document.getElementById("trabajos")
      target?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }

    router.push("/#trabajos")
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 border-r border-neon-green bg-black p-6 z-50 overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 -translate-x-full"
      id="sidebar"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <Link href="/" className="block mb-10 w-full">
            <div className="flex items-center w-full py-2">
              <div className="mr-3 w-12 h-12 md:w-14 md:h-14 border border-neon-green flex items-center justify-center shrink-0">
                <span className="text-neon-green text-sm md:text-base">T.P</span>
              </div>

              <div className="h-12 md:h-14 flex flex-col justify-center leading-none min-w-0">
                <span
                  className="glitch text-neon-green font-bold text-[14px] md:text-[16px] truncate"
                  data-text={"TOM\u00c1S_PER\u00d3"}
                >{"TOM\u00c1S_PER\u00d3"}</span>
                <span className="text-neon-cyan text-[10px] md:text-[11px] truncate">GEN_MARKETER.exe</span>
              </div>
            </div>
          </Link>


          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="sidebar-link">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/about" className="sidebar-link">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href="/#trabajos" className="sidebar-link" onClick={goToWorkSection}>
                  {t("work")}
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="sidebar-link">
                  TIMELINE
                </Link>
              </li>
              <li>
                <Link href="/work/ai-experiments" className="sidebar-link">
                  {t("ai_experiments")}
                </Link>
              </li>
              <li>
                <Link href="/magaiba" className="sidebar-link">
                  MAGAIBA (WEB3 + AI)
                </Link>
              </li>
              <li>
                <a href="mailto:tomaspero@gmail.com" className="sidebar-link">
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
          <Link href="/agents.md" target="_blank" rel="noopener noreferrer" className="sidebar-agent-link">
            AGENT_MODE
          </Link>
          <div className="text-xs text-neon-green">{"\u00a9 1986-2025 TOM\u00c1S PER\u00d3"}</div>
        </div>
      </div>
    </aside>
  )
}





