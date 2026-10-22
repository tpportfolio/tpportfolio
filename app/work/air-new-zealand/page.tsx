"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VideoCarousel } from "@/components/video-carousel"
import { useLanguage } from "@/components/language-context"
import { airNewZealandVideos } from "@/lib/work-videos"
import { WindowFrame } from "@/components/video-window"
import { CaseResults, type CaseResult } from "@/components/case-results"

type L = { es: string; en: string }

const stats: { value: L; label: L }[] = [
  {
    value: { es: "4", en: "4" },
    label: { es: "mercados: AR, BR, CL, UY", en: "markets: AR, BR, CL, UY" },
  },
  {
    value: { es: "5 años", en: "5-year" },
    label: { es: "plan de negocios regional", en: "regional business plan" },
  },
  {
    value: { es: "5", en: "5" },
    label: { es: "agencias, una sola voz de marca", en: "agencies, one brand voice" },
  },
  {
    value: { es: "USD 500K+", en: "USD 500K+" },
    label: { es: "presupuesto regional anual", en: "annual regional budget" },
  },
]

const groups: { header: string; items: L[] }[] = [
  {
    header: "STRATEGY_AND_LAUNCH",
    items: [
      {
        es: "Fui responsable del lanzamiento de la marca en la región y ejecuté la estrategia de salida al mercado de una nueva ruta de larga distancia, construyendo awareness de marca y relevancia cultural.",
        en: "Responsible for the brand launch in the region; executed the market launch strategy for a new long-haul route, building brand awareness and cultural relevance.",
      },
      {
        es: "Co-desarrollé el plan de negocios a 5 años para Sudamérica, alineando estrategia de marca, comercial y de alianzas.",
        en: "Co-developed the 5-year business plan for the South America region, aligning brand, commercial and partnership strategy.",
      },
      {
        es: "Lideré el posicionamiento de marca y las campañas 360° integradas (B2C y B2B) en cuatro mercados: Argentina, Brasil, Chile y Uruguay.",
        en: "Led brand positioning and integrated 360° campaigns (B2C and B2B) across four markets: Argentina, Brazil, Chile and Uruguay.",
      },
    ],
  },
  {
    header: "PARTNERSHIPS_AND_SPONSORSHIPS",
    items: [
      {
        es: "Sponsorships y alianzas con Tourism New Zealand, All Blacks, UAR (Unión Argentina de Rugby), Agustín Pichot, Auckland Airport y ESPN.",
        en: "Sponsorships and partnerships with Tourism New Zealand, All Blacks, UAR (Unión Argentina de Rugby), Agustín Pichot, Auckland Airport and ESPN.",
      },
      {
        es: "Alianzas con OTAs (Despegar, Almundo) y con los programas de TV Resto del Mundo (Canal 13) y Por el Mundo (Telefe).",
        en: "Alliances with OTAs (Despegar, Almundo) and the TV shows Resto del Mundo (Canal 13) and Por el Mundo (Telefe).",
      },
      {
        es: "Supervisé las relaciones públicas y el vínculo de largo plazo con periodistas e influencers: contenido editorial y viajes FAM a Nueva Zelanda.",
        en: "Oversaw PR and long-term relationships with journalists and influencers: editorial content and FAM trips to New Zealand.",
      },
      {
        es: "Di soporte a los canales B2B y al trade marketing.",
        en: "Supported B2B channels and trade marketing.",
      },
    ],
  },
  {
    header: "AGENCIES_AND_EXECUTION",
    items: [
      {
        es: "Lideré cinco agencias al mismo tiempo bajo una sola voz de marca: creatividad (Don), PR (Muchnik), medios (FG) y activaciones (Ideapolis y Human).",
        en: "Led five agencies at the same time under one brand voice: creative (Don), PR (Muchnik), media (FG) and activations (Ideapolis and Human).",
      },
      {
        es: "Gestioné un presupuesto anual de marketing regional de más de USD 500K, incluyendo el seguimiento financiero de campañas y alianzas y la alineación del P&L.",
        en: "Managed an annual regional marketing budget of over USD 500K, including financial tracking of campaigns and alliances and P&L alignment.",
      },
      {
        es: "Reporté KPIs: ROI, performance de medios, awareness de marca y efectividad de las alianzas.",
        en: "Reported KPIs: ROI, media performance, brand awareness and partnership effectiveness.",
      },
    ],
  },
]

const results: L[] = [
  {
    es: "Contribuí al lanzamiento exitoso de la ruta y a la consolidación de la marca, con buenos load factors estacionales.",
    en: "Contributed to a successful route launch and brand consolidation, with strong seasonal load factors.",
  },
]

// Outcome first: shown at the top of the page.
const caseResults: CaseResult[] = [
  { value: { es: "3x", en: "3x" }, label: { es: "visitantes desde Argentina en 2 años (+225% el primer año)", en: "visitors from Argentina in 2 years (+225% in the first year)" } },
  { value: { es: "50% → 24%", en: "50% → 24%" }, label: { es: "personas que veían la distancia como una barrera, antes y después", en: "people who saw distance as a barrier, before and after" } },
  { value: { es: "USD 500K+", en: "USD 500K+" }, label: { es: "presupuesto anual, 4 mercados y 5 agencias bajo una sola voz de marca", en: "annual budget, 4 markets and 5 agencies under one brand voice" } },
]

export default function AirNewZealandPage() {
  const { t, language } = useLanguage()
  const lang = language === "es" ? "es" : "en"

  return (
    <main className="min-h-screen py-8 px-4 md:px-12">
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
        <div className="text-xl text-neon-cyan mb-2 font-cyber">
          DEC 2015-JUN 2020 // Marketing Specialist &amp; Market Development
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>
      </div>

      <CaseResults items={caseResults} />

      {/* Air NZ Videos Carousel */}
      <VideoCarousel items={airNewZealandVideos} title="AIR_NZ_SHOWCASE" />

      <div className="space-y-8 mt-8">
        <WindowFrame title="PROJECT_OVERVIEW">
          <div className="vw-text">
            <p>{t("air_nz_overview")}</p>
          </div>
        </WindowFrame>

        {groups.map((group) => (
          <WindowFrame title={group.header} key={group.header}>
            <div className="vw-text">
              <ul className="list-disc pl-5 space-y-2">
                {group.items.map((item) => (
                  <li key={item.en}>{item[lang]}</li>
                ))}
              </ul>
            </div>
          </WindowFrame>
        ))}

        <WindowFrame title="RESULTS">
          <div className="vw-text">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {stats.map((stat) => (
                <div key={stat.value.en + stat.label.en} className="border border-neon-green/40 p-3 text-center min-w-0">
                  <div className="font-cyber text-2xl text-neon-green break-words">{stat.value[lang]}</div>
                  <div className="text-xs mt-1">{stat.label[lang]}</div>
                </div>
              ))}
            </div>
            <ul className="list-disc pl-5 space-y-2">
              {results.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
          </div>
        </WindowFrame>
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
