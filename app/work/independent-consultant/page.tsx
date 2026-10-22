"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VideoCarousel } from "@/components/video-carousel"
import { useLanguage } from "@/components/language-context"
import { useVisualMode } from "@/components/visual-mode-context"
import { consultantVideos } from "@/lib/work-videos"
import { WindowFrame } from "@/components/video-window"
import { CaseResults, type CaseResult } from "@/components/case-results"

type L = { es: string; en: string }

type Engagement = {
  // Id of the block in the page, so other pages can link to it (e.g. /timeline).
  anchor: string
  company: string
  title: string
  dates: string
  sector: L
  bullets: L[]
  // Optional internal link wrapped around the company name.
  companyHref?: string
  links?: { href: string; label: L }[]
}

const overviewScope: L[] = [
  {
    es: "Diseño posicionamiento de marca y marcos de mensajes para expansiones multimercado.",
    en: "I design brand positioning and messaging frameworks for multi-market expansion.",
  },
  {
    es: "Lidero estrategias go-to-market integradas que alinean contenido, PR y alianzas.",
    en: "I lead integrated go-to-market strategies that align content, PR and partnerships.",
  },
  {
    es: "Construyo ecosistemas de influencers y colaboraciones de marca para generar awareness y engagement.",
    en: "I build influencer ecosystems and brand collaborations to drive awareness and engagement.",
  },
  {
    es: "Desarrollo marcos narrativos y arquitecturas de mensajes para fundadores y equipos ejecutivos.",
    en: "I develop narrative frameworks and messaging architectures for founders and executive teams.",
  },
  {
    es: "Oriento la ejecución cross-funcional entre Producto, Growth, Marca y agencias externas.",
    en: "I orchestrate cross-functional execution across Product, Growth, Brand and external agencies.",
  },
]

const keyAchievements: L[] = [
  {
    es: "Paradise.la: reduje los ciclos de concepto a entrega de más de 2 semanas a 3–4 días en producciones piloto, con pipelines de IA, playbooks y SOPs.",
    en: "Paradise.la: cut concept-to-delivery cycles from 2+ weeks to 3–4 days on pilot productions, with AI pipelines, playbooks and SOPs.",
  },
  {
    es: "Airtm: creé y lancé Airtalks, un podcast de marca que construyó autoridad con freelancers y creadores de LATAM.",
    en: "Airtm: created and launched Airtalks, a branded podcast that built brand authority with freelancers and creators across LATAM.",
  },
  {
    es: "Stone Movistar: armé la arquitectura de marca, los pilares de contenido y las alianzas con streamers y creadores para el lanzamiento del club de esports y streaming de Diego \"Peque\" Schwartzman y Torneos.",
    en: "Stone Movistar: built the brand architecture, content pillars and streamer and creator partnerships for the launch of the esports and streaming club founded by Diego \"Peque\" Schwartzman and Torneos.",
  },
  {
    es: "DrGea.com: estructuré las comunicaciones de lanzamiento para la expansión regional de la plataforma de telemedicina en Colombia, Argentina, México y Perú.",
    en: "DrGea.com: structured launch communications for the regional expansion of the telemedicine platform in Colombia, Argentina, Mexico and Peru.",
  },
  {
    es: "Go Broadway!: definí la estrategia de marketing, marca y PR para el lanzamiento en LATAM de Backstage, la plataforma online de castings para artistas escénicos, con nota en La Nación.",
    en: "Go Broadway!: defined the marketing, brand and PR strategy for the LATAM launch of Backstage, the online casting platform for performing artists, with press coverage in La Nación.",
  },
]

const engagements: Engagement[] = [
  {
    anchor: "paradise-la",
    company: "PARADISE.LA",
    title: "AI & CONTENT CONSULTANT & PRODUCER",
    dates: "JUL 2024-JAN 2026",
    companyHref: "/work/ai-experiments#ejemplos-trabajos-ia-2025",
    sector: { es: "LATAM | Producción audiovisual", en: "LATAM | Audiovisual production" },
    bullets: [
      {
        es: "Consultoría estratégica para la transición de la productora hacia la producción creativa con IA: ayudé a una marca de contenido a repensar sus workflows, su oferta y sus capacidades creativas.",
        en: "Strategic consulting for the studio's transition to AI-enabled creative production: helped a content brand rethink its workflows, offering and creative capabilities.",
      },
      {
        es: "Mapeé los procesos de producción existentes y diseñé pipelines asistidos por IA (imagen, video, audio) aplicados a proyectos reales de clientes.",
        en: "Mapped existing production processes and designed AI-assisted pipelines (image, video, audio) applied to real client projects.",
      },
      {
        es: "Curé y validé el stack generativo según las necesidades y el presupuesto de cada proyecto.",
        en: "Curated and validated the generative stack against project needs and budget.",
      },
      {
        es: "Capacité equipos y entregué investigación, playbooks y SOPs; armé prototipos para pitches y tratamientos creativos.",
        en: "Trained teams and delivered research, playbooks and SOPs; built prototypes for pitches and creative treatments.",
      },
      {
        es: "Resultado: ciclos de concepto a entrega reducidos de más de 2 semanas a 3–4 días en producciones piloto.",
        en: "Result: concept-to-delivery cycles cut from 2+ weeks to 3–4 days on pilot productions.",
      },
      {
        es: "También trabajé en el refresh de marca, el roadmap y la estructura de talentos.",
        en: "Also worked on the brand refresh, roadmap and talent structure.",
      },
    ],
  },
  {
    anchor: "drgea",
    company: "DRGEA.COM",
    title: "HEAD OF COMMUNICATIONS",
    dates: "FEB 2023-APR 2024",
    sector: { es: "LATAM | Healthtech y telemedicina", en: "LATAM | Healthtech & telemedicine" },
    bullets: [
      {
        es: "Definí la narrativa de marca regional, la arquitectura de mensajes y la estrategia de comunicación de una plataforma de telemedicina en Colombia, Argentina, México y Perú.",
        en: "Defined the regional brand narrative, messaging architecture and communications strategy for a telemedicine platform in Colombia, Argentina, Mexico and Peru.",
      },
      {
        es: "Lideré la estrategia de comunicaciones, PR y KOLs.",
        en: "Led communications, PR and KOL strategy.",
      },
      {
        es: "Alineé a los stakeholders de producto, marketing, IT y medicina para mantener la consistencia de marca.",
        en: "Aligned product, marketing, IT and medical stakeholders for brand consistency.",
      },
      {
        es: "Estructuré las comunicaciones de lanzamiento de la expansión regional.",
        en: "Structured launch communications for regional expansion.",
      },
    ],
  },
  {
    anchor: "sinerlogic",
    company: "SINERLOGIC",
    title: "MARKETING & BRANDING CONSULTANT",
    dates: "2022-2023",
    sector: { es: "LATAM | Logística B2B", en: "LATAM | B2B logistics" },
    bullets: [
      {
        es: "Identidad de marca, mensajes y propuesta de valor para una empresa de logística B2B.",
        en: "Brand identity, messaging and value proposition for a B2B logistics company.",
      },
      {
        es: "Arquitectura de comunicación multicanal y estrategia de redes sociales.",
        en: "Multichannel communication architecture and social media strategy.",
      },
      {
        es: "Coordinación de pauta junto a Zlatan Agency.",
        en: "Paid media coordination together with Zlatan Agency.",
      },
    ],
  },
  {
    anchor: "airtm",
    company: "AIRTM",
    title: "GROWTH MARKETING + R&D",
    dates: "SEP 2021-JUL 2022",
    sector: { es: "LATAM | Fintech", en: "LATAM | Fintech" },
    bullets: [
      {
        es: "Experimentos regionales de adquisición (ads, contenido, funnels con influencers) que conectaron el posicionamiento de marca con crecimiento medible.",
        en: "Regional acquisition experiments (ads, content, influencer-led funnels) connecting brand positioning with measurable growth.",
      },
      {
        es: "Creé y lancé Airtalks, un podcast de marca que construyó autoridad de marca con freelancers y creadores de LATAM (producción y búsqueda de talentos).",
        en: "Created and launched Airtalks, a branded podcast that built brand authority with freelancers and creators across LATAM (production and talent research).",
      },
      {
        es: "Optimicé el funnel de adquisición con analítica de performance e iteración de mensajes.",
        en: "Optimised the acquisition funnel through performance analytics and messaging iteration.",
      },
      {
        es: "Programas de KOLs e influencers, pivot del target hacia freelancers e iniciativas web3.",
        en: "KOL and influencer programmes, a target pivot towards freelancers, and web3 initiatives.",
      },
    ],
  },
  {
    anchor: "stone-movistar",
    company: "STONE MOVISTAR",
    title: "BRAND & MARKETING CONSULTANT",
    dates: "JUL 2020-DEC 2021",
    sector: { es: "LATAM | Esports y streaming", en: "LATAM | Esports & streaming" },
    bullets: [
      {
        es: "Estrategia de lanzamiento y go-to-market del club de esports y streaming fundado por el tenista Diego \"Peque\" Schwartzman y Torneos.",
        en: "Launch and go-to-market strategy for the esports and streaming club founded by tennis player Diego \"Peque\" Schwartzman and Torneos.",
      },
      {
        es: "Arquitectura de marca, pilares de contenido y posicionamiento en esports.",
        en: "Brand architecture, content pillars and esports positioning.",
      },
      {
        es: "Alianzas con streamers y creadores (por ejemplo Delfi Pignatiello, Luquitas Rodríguez y Lit Killah).",
        en: "Partnerships with streamers and creators (e.g. Delfi Pignatiello, Luquitas Rodríguez and Lit Killah).",
      },
      {
        es: "Eventos, formatos y activaciones gaming para el crecimiento de la comunidad: una marca nativa de la cultura gamer y de creadores.",
        en: "Events, formats and gaming activations for community growth: a brand native to gaming and creator culture.",
      },
    ],
  },
  {
    anchor: "go-broadway",
    company: "GO BROADWAY!",
    title: "MARKETING CONSULTANT",
    dates: "AUG 2020-NOV 2020",
    sector: { es: "LATAM | Entretenimiento y artes escénicas", en: "LATAM | Entertainment & performing arts" },
    bullets: [
      {
        es: "Estrategia de marketing, marca y PR para el lanzamiento en LATAM de Backstage, una plataforma online de castings para artistas escénicos.",
        en: "Marketing, brand and PR strategy for the LATAM launch of Backstage, an online casting platform for performing artists.",
      },
      {
        es: "Planes mensuales de marketing y comunicación, campañas multicanal y coordinación de un equipo creativo cross-funcional.",
        en: "Monthly marketing and communications plans, multichannel campaigns and a cross-functional creative team.",
      },
      {
        es: "Alianzas con Ticketek y 47st.",
        en: "Partnerships with Ticketek and 47st.",
      },
    ],
    links: [
      {
        href: "https://join.backstage.com/latam/",
        label: { es: "Sitio de lanzamiento de Backstage LATAM", en: "Backstage LATAM launch site" },
      },
      {
        href: "https://www.lanacion.com.ar/espectaculos/personajes/se-lanzo-backstage-plataforma-acceso-castings-otros-nid2495799/",
        label: { es: "Nota en La Nación", en: "Press coverage in La Nación" },
      },
    ],
  },
]

const copy = {
  overviewHeading: {
    es: "CONSULTOR DE MARCA, MARKETING E IA | JUL 2020 - PRESENTE",
    en: "BRAND, MARKETING & AI CONSULTANT | JUL 2020 - PRESENT",
  },
  overviewSub: {
    es: "LATAM | Estrategia de marca · Marketing cultural · Tecnología creativa",
    en: "LATAM | Brand strategy · Cultural marketing · Creative technology",
  },
  overviewBody: {
    es: "Desde 2020 trabajo como consultor independiente de marca, marketing e IA para empresas de fintech, healthtech, esports y medios de LATAM. Trabajo en el cruce entre estrategia de marca, marketing cultural y tecnología creativa: defino posicionamiento y narrativa, los llevo a campañas go-to-market integradas y sumo workflows con IA para acelerar y elevar la producción creativa de equipos de marca, agencias y estudios.",
    en: "Since 2020 I have worked as an independent brand, marketing and AI consultant for fintech, healthtech, esports and media companies across LATAM. I work at the intersection of brand strategy, cultural marketing and creative technology: I define positioning and narrative, turn them into integrated go-to-market campaigns, and add AI workflows to speed up and raise the creative output of brand teams, agencies and studios.",
  },
  clients: {
    es: "Clientes clave: Paradise.la, DrGea.com, Sinerlogic, Airtm, Stone Movistar, Go Broadway!.",
    en: "Key clients: Paradise.la, DrGea.com, Sinerlogic, Airtm, Stone Movistar, Go Broadway!.",
  },
}

// Outcome first: shown at the top of the page.
const caseResults: CaseResult[] = [
  { value: { es: "3–4 días", en: "3–4 days" }, label: { es: "de concepto a entrega con IA en Paradise.la (antes, más de 2 semanas)", en: "from concept to delivery with AI at Paradise.la (before, over 2 weeks)" } },
  { value: { es: "6 marcas", en: "6 brands" }, label: { es: "en lanzamiento o transición en LATAM desde 2020", en: "at launch or in transition across LATAM since 2020" } },
  { value: { es: "Airtalks", en: "Airtalks" }, label: { es: "podcast de marca creado y lanzado para Airtm", en: "branded podcast created and launched for Airtm" } },
]

export default function IndependentConsultantPage() {
  const { t, language } = useLanguage()
  const { mode } = useVisualMode()
  const lang = language === "es" ? "es" : "en"
  const headingColor = mode === "light" ? "text-[#b45309]" : "text-white"

  return (
    <main className="min-h-screen py-8 px-4 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>PROJECT_ID: INDEPENDENT CONSULTANT // TIMESTAMP: 2020-PRESENT // SECURITY_CLEARANCE: GRANTED</span>
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
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-neon-green font-cyber">/INDEPENDENT_CONSULTANT</h1>
        <div className="text-xl text-neon-cyan mb-2 font-cyber">JUL 2020-PRESENT // Brand, Marketing &amp; AI Consultant</div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>
      </div>

      <CaseResults items={caseResults} />

      {/* Consulting Videos Carousel */}
      <VideoCarousel items={consultantVideos} title="CONSULTING_SHOWCASE" />

      <div className="space-y-8 mt-8">
        <WindowFrame title="PROJECT_OVERVIEW">
          <div className="vw-text">
            <p className={`mb-2 font-bold ${headingColor}`}>{copy.overviewHeading[lang]}</p>
            <p className="mb-2">{copy.overviewSub[lang]}</p>
            <p className="mb-4">{copy.overviewBody[lang]}</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              {overviewScope.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
            <p>{copy.clients[lang]}</p>
          </div>
        </WindowFrame>

        <WindowFrame title="KEY_ACHIEVEMENTS">
          <div className="vw-text">
            <ul className="list-disc pl-5 space-y-2">
              {keyAchievements.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
          </div>
        </WindowFrame>

        <WindowFrame title="ENGAGEMENTS">
          <div className="vw-text space-y-8">
            {engagements.map((eng) => (
              <div className="space-y-2 scroll-mt-24" id={eng.anchor} key={eng.anchor}>
                <p className={`font-bold ${headingColor}`}>
                  {eng.companyHref ? (
                    <Link href={eng.companyHref} className="underline hover:text-neon-magenta">
                      {eng.company}
                    </Link>
                  ) : (
                    eng.company
                  )}{" "}
                  | {eng.title} | {eng.dates}
                </p>
                <p className="text-neon-cyan">{eng.sector[lang]}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {eng.bullets.map((item) => (
                    <li key={item.en}>{item[lang]}</li>
                  ))}
                </ul>
                {eng.links && (
                  <ul className="list-disc pl-5 space-y-1">
                    {eng.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-neon-magenta"
                        >
                          {link.label[lang]}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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
