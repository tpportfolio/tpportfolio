"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-context"

export default function WaltDisneyCompanyPage() {
  const { t, language } = useLanguage()

  return (
    <main className="min-h-screen py-8 px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>PROJECT_ID: THE WALT DISNEY COMPANY // TIMESTAMP: 2011-2015 // SECURITY_CLEARANCE: GRANTED</span>
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center text-neon-cyan hover:text-neon-magenta mb-8 font-cyber text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("return_to_mainframe")}
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-neon-green font-cyber">/DISNEY</h1>
        <div className="text-xl text-neon-cyan mb-2 font-cyber">2011-2015</div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="terminal">
          <div className="terminal-header">PROJECT_OVERVIEW</div>
          <div className="terminal-content">
            <p>{t("disney_overview")}</p>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-header">HIGHLIGHTS</div>
          <div className="terminal-content">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                {language === "es"
                  ? "Desarrollé y ejecuté campañas para series y películas"
                  : "Development and execution of campaigns for series and movies"}
              </li>
              <li>
                {language === "es"
                  ? "Coordiné con equipos de US y agencias locales para implementar campañas"
                  : "Coordination with US teams and local agencies for campaign implementation"}
              </li>
              <li>
                {language === "es"
                  ? "Trabajé con modelos de negocio como SVOD, TVOD, EST y FVOD con clientes como iTunes, Netflix, Google Play y Microsoft."
                  : "Work with business models such as SVOD, TVOD, EST, FVOD with clients such as iTunes, Netﬂix, Google Play, Microsoft..."}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
        <p className="mt-6 text-xs text-neon-green">
          © 1986-{new Date().getFullYear()} TOMÁS PERÓ // SESSION_TIMEOUT: 30:00 // END_TRANSMISSION
        </p>
      </div>
    </main>
  )
}
