"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VideoCarousel } from "@/components/video-carousel"
import { useLanguage } from "@/components/language-context"
import { agencyVideos } from "@/lib/work-videos"

type L = { es: string; en: string }

const roles: { anchor: string; header: string; intro: L; bullets: L[] }[] = [
  {
    anchor: "jwt",
    header: "JUN 2008-MAR 2011 // J. WALTER THOMPSON (JWT/GLUE): ACCOUNT EXECUTIVE",
    intro: {
      es: "Fui ejecutivo de cuentas BTL: campañas, activaciones y eventos para marcas de consumo masivo, banca, telecomunicaciones y retail.",
      en: "BTL account executive: campaigns, activations and events for mass-consumption, banking, telecom and retail brands.",
    },
    bullets: [
      {
        es: "Campañas nacionales para Claro, Ford y Johnson & Johnson.",
        en: "National campaigns for Claro, Ford and Johnson & Johnson.",
      },
      {
        es: "Rebranding y relanzamiento de Cerveza Imperial (CCU), con la activación Sesiones Imperial.",
        en: "Cerveza Imperial (CCU) rebrand and relaunch, including the Sesiones Imperial activation.",
      },
      {
        es: "Embajadores Nokia N-Series: programa de convocatoria a emprendedores tecnológicos.",
        en: "Nokia N-Series Ambassadors: a call for tech entrepreneurs.",
      },
      {
        es: "Coordiné producción de spots, eventos y promociones masivas, y lanzamientos con múltiples stakeholders.",
        en: "Coordinated the production of commercials, events and mass promotions, and launches with multiple stakeholders.",
      },
      {
        es: "Trabajé de manera directa con clientes y proveedores.",
        en: "Worked directly with clients and suppliers.",
      },
    ],
  },
  {
    anchor: "altheim",
    header: "JUN 2007-JUN 2008 // ALTHEIM COMUNICACIONES: ACCOUNT ASSISTANT",
    intro: {
      es: "Mi primer trabajo formal, en una agencia boutique con campañas ATL, BTL y 360°.",
      en: "My first formal job, at a boutique agency running ATL, BTL and 360° campaigns.",
    },
    bullets: [
      {
        es: "Asistí a directores de cuenta y armé presentaciones y reportes para clientes.",
        en: "Assisted account directors and prepared presentations and reports for clients.",
      },
      {
        es: "Aprendí de forma transversal en todas las áreas de la agencia.",
        en: "Learned across all areas of the agency.",
      },
      {
        es: "Sugerí la idea de la acción Beldent Splash en el superclásico River-Boca de 2007, y se produjo.",
        en: "Suggested the idea of the Beldent Splash stunt at the 2007 River-Boca derby, and it was produced.",
      },
    ],
  },
]

export default function AgencyExperiencePage() {
  const { t, language } = useLanguage()
  const lang = language === "es" ? "es" : "en"

  return (
    <main className="min-h-screen py-8 px-4 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>PROJECT_ID: AGENCY EXPERIENCE // TIMESTAMP: 2007-2011 // SECURITY_CLEARANCE: GRANTED</span>
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
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-neon-green font-cyber">/AGENCY_EXPERIENCE</h1>
        <div className="text-xl text-neon-cyan mb-2 font-cyber">JUN 2007-MAR 2011</div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>
      </div>

      {/* Agency Videos Carousel */}
      <VideoCarousel items={agencyVideos} title="AGENCY_SHOWCASE" />

      <div className="space-y-8 max-w-4xl mt-8">
        <div className="terminal">
          <div className="terminal-header">PROJECT_OVERVIEW</div>
          <div className="terminal-content">
            <p>{t("agency_overview")}</p>
          </div>
        </div>

        {roles.map((role) => (
          <div className="terminal scroll-mt-24" id={role.anchor} key={role.anchor}>
            <div className="terminal-header">{role.header}</div>
            <div className="terminal-content">
              <p>{role.intro[lang]}</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                {role.bullets.map((item) => (
                  <li key={item.en}>{item[lang]}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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
