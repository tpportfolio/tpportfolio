"use client"

import Link from "next/link"
import { useLanguage } from "./language-context"
import { LanguageSwitcher } from "./language-switcher"

export default function Sidebar() {
  const { t } = useLanguage()

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 border-r border-neon-green bg-black p-6 z-50 overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 -translate-x-full"
      id="sidebar"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <Link href="/" className="block mb-10 w-full">
            <div className="flex items-center w-full px-2 py-2">
              <div className="mr-3 w-12 h-12 md:w-14 md:h-14 border border-neon-green flex items-center justify-center shrink-0">
                <span className="text-neon-green text-sm md:text-base">T.P</span>
              </div>

              <div className="h-12 md:h-14 flex flex-col justify-center leading-none min-w-0">
                <span
                  className="glitch text-neon-green font-bold text-[14px] md:text-[16px] truncate"
                  data-text="TOMÁS_PERÓ"
                >
                  TOMÁS_PERÓ
                </span>
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
                <Link href="/" className="sidebar-link">
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

        <div className="mb-6">
          <LanguageSwitcher />
          <div className="mt-4 text-xs text-neon-green">© 1986-2025 TOMÁS PERÓ</div>
        </div>
      </div>
    </aside>
  )
}
