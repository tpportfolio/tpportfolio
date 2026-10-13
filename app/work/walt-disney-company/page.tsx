"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { WindowFrame } from "@/components/video-window"

type L = { es: string; en: string }

type Role = {
  header: string
  intro: L
  bullets: L[]
}

const stats: { value: string | L; label: L }[] = [
  { value: "100+", label: { es: "promociones por año", en: "promotions per year" } },
  { value: { es: "70.000", en: "70,000" }, label: { es: "unidades de DVD en una sola promoción", en: "DVD units in a single promotion" } },
  { value: "4", label: { es: "modelos de negocio digitales", en: "digital business models" } },
  { value: "20%", label: { es: "de mi tiempo en Disney Labs", en: "of my time on Disney Labs" } },
]

const roles: Role[] = [
  {
    header: "MAR 2011-MAY 2014 // PROMOTIONS COORDINATOR",
    intro: {
      es: "Lideré promociones de marca 360° y alianzas con terceros para Latinoamérica, siempre dentro de los lineamientos de la marca Disney.",
      en: "I led 360° brand promotions and third-party partnerships for Latin America, always within the Disney brand guidelines.",
    },
    bullets: [
      {
        es: "Trabajé con todas las líneas de negocio de Disney: Studios, Home Entertainment (Disney, Fox y Sony), Disney Media, Walt Disney Records, Disney Interactive, Parks, Disney Consumer Products y Marvel.",
        en: "Worked across all Disney lines of business: Studios, Home Entertainment (Disney, Fox and Sony), Disney Media, Walt Disney Records, Disney Interactive, Parks, Disney Consumer Products and Marvel.",
      },
      {
        es: "Identifiqué oportunidades promocionales y de marketing para partners actuales y potenciales en Argentina y Latinoamérica, con propiedades y franquicias de Disney, Marvel, Pixar y Lucasfilm.",
        en: "Identified promotional and marketing opportunities for current and potential partners in Argentina and Latin America, with Disney, Marvel, Pixar and Lucasfilm properties and franchises.",
      },
      {
        es: "Diseñé, ejecuté y coordiné campañas promocionales integradas locales y regionales, y construí alianzas comerciales de largo plazo para amplificar los lanzamientos de las franquicias.",
        en: "Designed, executed and coordinated local and regional integrated promotional campaigns, and built long-term commercial partnerships to amplify franchise launches.",
      },
      {
        es: "Gestioné las aprobaciones de todo el material de marca con el marketing regional y la casa central de Burbank, garantizando el cumplimiento de las guías de marca globales: cuidé la marca Disney para que cada proyecto las respetara.",
        en: "Managed approvals of all branded materials with regional marketing and the Burbank headquarters, guaranteeing global brand compliance: I protected the Disney brand so every project followed its guidelines.",
      },
      {
        es: "Reporté resultados y ROI de cada iniciativa a los stakeholders regionales.",
        en: "Reported the results and ROI of each initiative to regional stakeholders.",
      },
    ],
  },
  {
    header: "MAY 2014-DEC 2015 // DIGITAL DISTRIBUTION SALES COORDINATOR",
    intro: {
      es: "Pasé de las promociones con partners de retail y medios a la distribución digital de contenido de Disney, Marvel, Pixar y Lucasfilm.",
      en: "I moved from retail and media promotions to the digital distribution of Disney, Marvel, Pixar and Lucasfilm content.",
    },
    bullets: [
      {
        es: "Gestioné la estrategia de distribución digital para el resto de Latinoamérica (RoLA) con contenido de Disney, Marvel, Pixar y Lucasfilm.",
        en: "Managed the digital distribution strategy for the Rest of Latin America (RoLA) region for Disney, Marvel, Pixar and Lucasfilm content.",
      },
      {
        es: "Sostuve alianzas comerciales con Netflix, Apple/iTunes, Google Play, Microsoft y operadores de telecomunicaciones; entre integradores y operadores: Vubiquity, GreyJuiceLab, Cablevisión, Claro y Arnet.",
        en: "Held commercial partnerships with Netflix, Apple/iTunes, Google Play, Microsoft and telecom operators; integrators and operators included Vubiquity, GreyJuiceLab, Cablevisión, Claro and Arnet.",
      },
      {
        es: "Trabajé con los modelos de negocio SVOD, TVOD, EST y FVOD.",
        en: "Worked across the SVOD, TVOD, EST and FVOD business models.",
      },
      {
        es: "Coordiné calendarios mensuales de lanzamientos, campañas de lanzamiento e iniciativas de catálogo entre mercados; negocié ubicaciones y aseguré la presencia de la marca en los planes de marketing de los partners.",
        en: "Coordinated monthly release calendars, launch campaigns and catalogue initiatives across markets; negotiated placements and secured brand presence in partners' marketing plans.",
      },
      {
        es: "Desarrollé estrategias de precios, bundles y promociones para ganar visibilidad en las tiendas y generar impacto comercial; coordiné el calendario de marketing competitivo, los acuerdos de storefront, las aprobaciones de campañas y la comunicación con terceros.",
        en: "Developed pricing, bundling and promotional strategies for storefront visibility and commercial impact; coordinated the competitive marketing calendar, storefront deals, campaign approvals and third-party communications.",
      },
    ],
  },
  {
    header: "MAY 2014-DEC 2015 // DISNEY LABS: CORPORATE ENTREPRENEUR (20%)",
    intro: {
      es: "En paralelo, fui seleccionado para el primer programa de emprendedurismo corporativo de Disney Latinoamérica, una incubadora interna de innovación, y le dediqué el 20% de mi tiempo.",
      en: "In parallel, I was selected for Disney Latin America's first corporate entrepreneurship programme, an internal innovation incubator, and dedicated 20% of my time to it.",
    },
    bullets: [
      {
        es: "En equipos multidisciplinarios y multirregionales, diseñé y validé conceptos de producto nuevos con Lean Startup, Agile, Design Thinking y customer journey mapping.",
        en: "In multidisciplinary, cross-regional teams, designed and validated new product concepts with Lean Startup, Agile, Design Thinking and customer-journey mapping.",
      },
      {
        es: "Construí prototipos MVP funcionales y los presenté por videollamada al C-suite regional y al liderazgo global (incluido el chairman global) para conseguir financiamiento.",
        en: "Built functional MVP prototypes and pitched them by video call to the regional C-suite and global leadership (including the global chairman) to obtain funding.",
      },
      {
        es: "Una señal temprana de mi perfil dual de marca y tecnología.",
        en: "An early signal of my dual brand and technology profile.",
      },
    ],
  },
]

const highlights: L[] = [
  {
    es: "Más de 100 promociones por año, incluyendo clientes nuevos.",
    en: "100+ promotions per year, including new clients.",
  },
  {
    es: "Récord de ventas: 70.000 unidades de DVD vendidas en una sola promoción con Solo Deportes (retail).",
    en: "Record sales: 70,000 DVD units sold in a single promotion with Solo Deportes (retail).",
  },
  {
    es: "Todas las líneas de negocio de Disney en Latinoamérica: Studios, Home Entertainment, Disney Media, Walt Disney Records, Disney Interactive, Parks, Disney Consumer Products y Marvel.",
    en: "All Disney lines of business in Latin America: Studios, Home Entertainment, Disney Media, Walt Disney Records, Disney Interactive, Parks, Disney Consumer Products and Marvel.",
  },
  {
    es: "Propiedades y franquicias: Disney, Marvel, Pixar y Lucasfilm.",
    en: "Properties and franchises: Disney, Marvel, Pixar and Lucasfilm.",
  },
  {
    es: "Partners de distribución digital: Netflix, Apple/iTunes, Google Play, Microsoft y operadores de telecomunicaciones.",
    en: "Digital distribution partners: Netflix, Apple/iTunes, Google Play, Microsoft and telecom operators.",
  },
  {
    es: "Modelos de negocio: SVOD, TVOD, EST y FVOD.",
    en: "Business models: SVOD, TVOD, EST and FVOD.",
  },
  {
    es: "Presenté MVPs al C-suite regional y al liderazgo global para conseguir financiamiento.",
    en: "Pitched MVPs to the regional C-suite and global leadership to obtain funding.",
  },
]

const takeaway: L[] = [
  {
    es: "Guardianía de marca: aprendí a proteger una marca global, trabajando con guías estrictas y con aprobaciones sistemáticas junto a la casa central de Burbank.",
    en: "Brand guardianship: I learned to protect a global brand, working with strict guidelines and systematic approvals with the Burbank headquarters.",
  },
  {
    es: "Alianzas que amplifican: construir partnerships comerciales de largo plazo para potenciar los lanzamientos de las franquicias.",
    en: "Partnerships that amplify: building long-term commercial partnerships to boost franchise launches.",
  },
  {
    es: "Métodos de innovación: Lean Startup, Agile, Design Thinking y customer journey mapping, aplicados a conceptos de producto reales y presentados al liderazgo global.",
    en: "Innovation methods: Lean Startup, Agile, Design Thinking and customer-journey mapping, applied to real product concepts and pitched to global leadership.",
  },
]

const takeawayClosing: L = {
  es: "Disciplina de marca y pensamiento de producto desde el primer día: la base de cómo trabajo hoy.",
  en: "Brand discipline and product thinking from day one: the foundation of how I work today.",
}

export default function WaltDisneyCompanyPage() {
  const { t, language } = useLanguage()
  const lang = language === "es" ? "es" : "en"

  return (
    <main className="min-h-screen py-8 px-4 md:px-12">
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
        <div className="text-xl text-neon-cyan mb-2 font-cyber">
          MAR 2011-DEC 2015 // Promotions · Digital Distribution · Disney Labs
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>
      </div>

      <div className="space-y-8">
        <WindowFrame title="PROJECT_OVERVIEW">
          <div className="vw-text">
            <p>{t("disney_overview")}</p>
          </div>
        </WindowFrame>

        {roles.map((role) => (
          <WindowFrame title={role.header} key={role.header}>
            <div className="vw-text">
              <p>{role.intro[lang]}</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                {role.bullets.map((item) => (
                  <li key={item.en}>{item[lang]}</li>
                ))}
              </ul>
            </div>
          </WindowFrame>
        ))}

        <WindowFrame title="HIGHLIGHTS">
          <div className="vw-text">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {stats.map((stat) => (
                <div key={stat.label.en} className="border border-neon-green/40 p-3 text-center min-w-0">
                  <div className="font-cyber text-2xl text-neon-green break-words">{typeof stat.value === "string" ? stat.value : stat.value[lang]}</div>
                  <div className="text-xs mt-1">{stat.label[lang]}</div>
                </div>
              ))}
            </div>
            <ul className="list-disc pl-5 space-y-2">
              {highlights.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
          </div>
        </WindowFrame>

        <WindowFrame title="BRAND_TAKEAWAY">
          <div className="vw-text">
            <ul className="list-disc pl-5 space-y-2">
              {takeaway.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
            <p className="mt-4 text-neon-cyan">{takeawayClosing[lang]}</p>
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
