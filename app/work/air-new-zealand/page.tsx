"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VideoCarousel, type VideoItem } from "@/components/video-carousel"
import { useLanguage } from "@/components/language-context"

export default function AirNewZealandPage() {
  const { t, language } = useLanguage()

  const details = {
    es: [
      "Lideré el armado de estrategia y plan de negocios a 5 años para Sudamérica (AR, BR, CL, UY).",
      "Gestioné sponsorships y partnerships (All Blacks, Agustín Pichot, Auckland Airport, Tourism New Zealand).",
      "Desarrollé alianzas con OTAs (Despegar, Almundo, etc.), UAR, ESPN y programas/medios (Resto del Mundo, Por el Mundo).",
      "Monitoreé campañas y reporté métricas (KPIs, ROI, análisis de medios).",
      "Trabajé día a día con agencias de PR, creatividad, medios, activaciones y otros partners.",
      "Impulsé PR y relaciones con periodistas e influencers: contenido editorial, viajes FAM a Nueva Zelanda, etc.",
      "Soporté canales B2B y trade marketing con materiales, aprobaciones y co-marketing con terceros.",
      "Planifiqué y controlé el presupuesto regional (incluyendo P&L).",
    ],
    en: [
      "Led strategy and a 5-year business plan for the South American region (AR, BR, CL, UY).",
      "Managed sponsorships and partnerships (All Blacks, Agustín Pichot, Auckland Airport, Tourism New Zealand).",
      "Built alliances with OTAs (Despegar, Almundo, etc.), UAR, ESPN and TV/media shows (Resto del Mundo, Por el Mundo).",
      "Monitored campaigns and reported metrics (KPIs, ROI, media analysis).",
      "Worked day-to-day with PR, creative, media and activation agencies, plus other partners.",
      "Drove PR and long-term relationships with journalists and influencers: editorial content, NZ media FAM trips, etc.",
      "Supported B2B and trade marketing channels with materials, approvals and co-marketing with third parties.",
      "Planned and controlled the regional marketing budget (including P&Ls).",
    ],
  }

  // YouTube videos for Air New Zealand
  const airNzVideos: VideoItem[] = [
    {
      id: "air-nz-wrapup",
      type: "youtube",
      videoId: "mcP1v2cEVsQ",
      title: {
        es: "2015-2020 - Air New Zealand Wrap-up",
        en: "2015-2020 - Air New Zealand Wrap-up",
      },
      description: {
        es: "Edición propia de reel de trabajos realizados para Air New Zealand, a modo de resumen de videos para redes, comercial, acciones con influencers, partnerships, promociones… un poco de todo!",
        en: "Own editing of reel of work done for Air New Zealand, as a summary of videos for networks, commercials, actions with influencers, partnerships, promotions... a little bit of everything!",
      },
    },
    {
      id: "nzen13horas",
      type: "youtube",
      videoId: "KAtyKBzURkY",
      title: {
        es: "#NZen13horas - Activación mediática",
        en: "#NZen13horas - Media Activation",
      },
      description: {
        es: "Cobertura y activación especial en medios con el hashtag #NZen13horas para Air New Zealand.",
        en: "Special media coverage and activation with the hashtag #NZen13horas for Air New Zealand.",
      },
    },
    {
      id: "running31short",
      type: "youtube",
      videoId: "j9EMsw2BVtA",
      title: {
        es: "RUNNING 31 - Corto",
        en: "RUNNING 31 - Short",
      },
      description: {
        es: "Versión corta del video RUNNING 31 para Air New Zealand.",
        en: "Short version of the RUNNING 31 video for Air New Zealand.",
      },
    },
    {
      id: "running31long",
      type: "youtube",
      videoId: "V-mZMRXx2Es",
      title: {
        es: "RUNNING 31 - Largo",
        en: "RUNNING 31 - Long",
      },
      description: {
        es: "Versión larga del video RUNNING 31 para Air New Zealand.",
        en: "Long version of the RUNNING 31 video for Air New Zealand.",
      },
    },
  ]

  return (
    <main className="min-h-screen py-8 px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>PROJECT_ID: AIR NEW ZEALAND // TIMESTAMP: 2015-2020 // SECURITY_CLEARANCE: GRANTED</span>
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
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-neon-green font-cyber">/AIR_NEW_ZEALAND</h1>
        <div className="text-xl text-neon-cyan mb-2 font-cyber">2015-2020 // Market Dev / Marketing Specialist</div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>
      </div>

      {/* Air NZ Videos Carousel */}
      <VideoCarousel items={airNzVideos} title="AIR_NZ_SHOWCASE" />

      <div className="space-y-8 max-w-4xl mt-8">
        <div className="terminal">
          <div className="terminal-header">PROJECT_OVERVIEW</div>
          <div className="terminal-content">
            <p>{t("air_nz_overview")}</p>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-header">DETAILS</div>
          <div className="terminal-content">
            <ul className="list-disc pl-5 space-y-2">
              {(language === "es" ? details.es : details.en).map((item) => (
                <li key={item}>{item}</li>
              ))}
</ul>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
        <p className="mt-6 text-xs text-neon-green">© 1986-{new Date().getFullYear()} TOMÁS PERÓ // SESSION_TIMEOUT: 30:00 // END_TRANSMISSION
        </p>
      </div>
    </main>
  )
}
