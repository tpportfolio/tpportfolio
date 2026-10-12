"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import { TimelineOrbit } from "@/components/timeline-orbit"
import type { VideoItem } from "@/components/video-carousel"
import {
  airNewZealandVideos,
  airtmVideos,
  altheimVideos,
  jwtVideos,
  magaibaVideos,
  paradiseVideos,
  stoneMovistarVideos,
} from "@/lib/work-videos"
import React, { useEffect, useRef } from "react"

type Localized = { es: string; en: string }

interface TimelineEntry {
  id: string
  year: string
  title: string
  role: Localized
  description: Localized
  /** Which side of the centre line the card sits on (desktop). */
  side: "left" | "right"
  /** Videos orbiting the card. Omit for cards without videos. */
  videos?: VideoItem[]
  /** Render the next entry on the same row, facing this one. */
  sharesRowWithNext?: boolean
  /** Small tag shown next to the year. */
  tag?: string
  /** Link shown at the end of the card. */
  link?: { href: string; label: Localized }
  /** Role text holds several lines (one role per line). */
  multiRole?: boolean
  showCovidBefore?: boolean
}

type RowKind = "single" | "pairLeft" | "pairRight"

export default function Timeline() {
  const { t, language } = useLanguage()
  const lang = (language === "en" ? "en" : "es") as "es" | "en"
  const timelineRef = useRef<HTMLDivElement>(null)

  // Timeline data, in display order. MAGAIBA shares a row with DrGea (left of it, facing it).
  const timelineItems: TimelineEntry[] = [
    {
      id: "paradise",
      year: "JUL 2024-JAN 2026",
      title: "PARADISE.LA",
      role: {
        es: "AI & Content Consultant & Producer",
        en: "AI & Content Consultant & Producer",
      },
      description: {
        es: "Asesoré a la productora en su transición hacia la producción creativa con IA: mapeé sus procesos, diseñé pipelines de imagen, video y audio aplicados a proyectos reales de clientes y armé playbooks y SOPs para capacitar a los equipos. En producciones piloto bajé el ciclo de concepto a entrega de más de 2 semanas a 3–4 días.",
        en: "I advised the studio on its transition to AI-enabled creative production: I mapped its processes, designed image, video and audio pipelines applied to real client projects, and built playbooks and SOPs to train the teams. On pilot productions I cut concept-to-delivery cycles from 2+ weeks to 3–4 days.",
      },
      side: "left",
      videos: paradiseVideos,
    },
    {
      id: "magaiba",
      year: "2024",
      title: "$MAGAIBA",
      role: {
        es: "Community, Comms & AI Content",
        en: "Community, Comms & AI Content",
      },
      description: {
        es: "Side project: participé de la comunicación de $MAGAIBA, la primera memecoin argentina que se viralizó a nivel global, y creé RADIO MAGAIBA, un canal de YouTube 24/7 con canciones generadas con IA.",
        en: "Side project: I took part in the communications of $MAGAIBA, the first Argentine memecoin to go globally viral, and created RADIO MAGAIBA, a 24/7 YouTube channel with AI-generated songs.",
      },
      side: "left",
      videos: magaibaVideos,
      sharesRowWithNext: true,
      tag: "SIDE PROJECT",
      link: { href: "/magaiba", label: { es: "VER PROYECTO", en: "VIEW PROJECT" } },
    },
    {
      id: "drgea",
      year: "FEB 2023-APR 2024",
      title: "DRGEA.COM",
      role: {
        es: "Head of Communications",
        en: "Head of Communications",
      },
      description: {
        es: "Definí la narrativa de marca, la arquitectura de mensajes y la estrategia de comunicación, PR y KOLs de una plataforma de telemedicina en Colombia, Argentina, México y Perú. Alineé a producto, marketing, IT y equipo médico para sostener la consistencia de marca y estructuré las comunicaciones del lanzamiento regional.",
        en: "I defined the brand narrative, messaging architecture and communications, PR and KOL strategy for a telemedicine platform in Colombia, Argentina, Mexico and Peru. I aligned product, marketing, IT and medical stakeholders to keep the brand consistent and structured the communications for the regional launch.",
      },
      side: "right",
    },
    {
      id: "airtm",
      year: "SEP 2021-JUL 2022",
      title: "AIRTM",
      role: {
        es: "Growth Marketing + R&D",
        en: "Growth Marketing + R&D",
      },
      description: {
        es: "En una fintech pionera en dólares digitales, armé experimentos regionales de adquisición (ads, contenido y funnels con influencers) que conectaban el posicionamiento de marca con crecimiento medible. Creé y lancé Airtalks, el podcast de marca para freelancers y creadores de LATAM, y empujé el pivot de target hacia freelancers y las iniciativas web3.",
        en: "At a pioneering digital-dollars fintech, I ran regional acquisition experiments (ads, content and influencer-led funnels) that tied brand positioning to measurable growth. I created and launched Airtalks, the branded podcast for LATAM freelancers and creators, and pushed the target pivot towards freelancers and the web3 initiatives.",
      },
      side: "left",
      videos: airtmVideos,
    },
    {
      id: "stone-movistar",
      year: "JUL 2020-DEC 2021",
      title: "STONE MOVISTAR",
      role: {
        es: "Brand & Marketing Consultant",
        en: "Brand & Marketing Consultant",
      },
      description: {
        es: "Armé el lanzamiento y la estrategia de go-to-market del club de esports y streaming fundado por el tenista Diego “Peque” Schwartzman y Torneos: arquitectura de marca, pilares de contenido y posicionamiento en esports. Trabajé alianzas con streamers y creadores, y eventos, formatos y activaciones gaming para hacer crecer la comunidad.",
        en: "I built the launch and go-to-market strategy for the esports and streaming club founded by tennis player Diego “Peque” Schwartzman and Torneos: brand architecture, content pillars and esports positioning. I worked on partnerships with streamers and creators, plus events, formats and gaming activations to grow the community.",
      },
      side: "right",
      videos: stoneMovistarVideos,
    },
    {
      id: "go-broadway",
      year: "AUG-NOV 2020",
      title: "GO BROADWAY!",
      role: {
        es: "Marketing Consultant",
        en: "Marketing Consultant",
      },
      description: {
        es: "Definí la estrategia de marketing, marca y PR para el lanzamiento en Latinoamérica de Backstage, una plataforma online de castings para artistas escénicos. Armé los planes mensuales de marketing y comunicación, campañas multicanal y alianzas con Ticketek y 47st.",
        en: "I defined the marketing, brand and PR strategy for the LATAM launch of Backstage, an online casting platform for performing artists. I built the monthly marketing and communications plans, multichannel campaigns and partnerships with Ticketek and 47st.",
      },
      side: "left",
    },
    {
      id: "air-new-zealand",
      year: "DEC 2015-JUN 2020",
      title: "AIR NEW ZEALAND",
      role: {
        es: "Marketing Specialist & Market Development",
        en: "Marketing Specialist & Market Development",
      },
      description: {
        es: "Lideré el marketing regional para Sudamérica (Argentina, Brasil, Chile y Uruguay): lancé la marca en la región, co-desarrollé el plan de negocios a 5 años y manejé un presupuesto anual de más de USD 500K. Conduje cinco agencias de creatividad, PR, medios y activaciones bajo una sola voz de marca, y gestioné alianzas con Tourism New Zealand, All Blacks y UAR, entre otras.",
        en: "I led regional marketing for South America (Argentina, Brazil, Chile and Uruguay): I launched the brand in the region, co-developed the 5-year business plan and managed an annual budget of over USD 500K. I ran five creative, PR, media and activation agencies under a single brand voice, and managed partnerships with Tourism New Zealand, the All Blacks and UAR, among others.",
      },
      side: "right",
      videos: airNewZealandVideos,
      showCovidBefore: true, // Add marker before this item
    },
    {
      id: "disney",
      year: "MAR 2011-DEC 2015",
      title: "THE WALT DISNEY COMPANY",
      role: {
        es: "Promotions Coordinator (MAR 2011-MAY 2014)\nDigital Distribution Sales Coordinator (MAY 2014-DEC 2015)\nDisney Labs: Corporate Entrepreneur (MAY 2014-DEC 2015)",
        en: "Promotions Coordinator (MAR 2011-MAY 2014)\nDigital Distribution Sales Coordinator (MAY 2014-DEC 2015)\nDisney Labs: Corporate Entrepreneur (MAY 2014-DEC 2015)",
      },
      description: {
        es: "Acá empezó mi carrera de marca: coordiné promociones 360° y alianzas de marca para toda Latinoamérica en todas las líneas de negocio de Disney, y después pasé a distribución digital (SVOD, TVOD, EST y FVOD) para el resto de Latinoamérica. Dediqué el 20% de mi tiempo a Disney Labs, el primer programa de emprendimiento corporativo de Disney Latinoamérica.",
        en: "My brand career started here: I coordinated 360° promotions and brand partnerships for all of Latin America across every Disney line of business, then moved into digital distribution (SVOD, TVOD, EST and FVOD) for the rest of Latin America. I spent 20% of my time on Disney Labs, Disney Latin America's first corporate entrepreneurship programme.",
      },
      side: "left",
      multiRole: true,
    },
    {
      id: "jwt",
      year: "JUN 2008-MAR 2011",
      title: "J. WALTER THOMPSON",
      role: {
        es: "Account Executive",
        en: "Account Executive",
      },
      description: {
        es: "Fui ejecutivo de cuentas BTL: gestioné campañas, activaciones y eventos para marcas de consumo masivo, banca, telcos y retail. Trabajé en el rebranding y relanzamiento de Cerveza Imperial (CCU), en Sesiones Imperial y en el programa de Embajadores Nokia N-Series.",
        en: "I was a BTL account executive: I managed campaigns, activations and events for mass-consumption, banking, telco and retail brands. I worked on the Cerveza Imperial (CCU) rebrand and relaunch, Sesiones Imperial and the Nokia N-Series Ambassadors programme.",
      },
      side: "right",
      videos: jwtVideos,
    },
    {
      id: "altheim",
      year: "JUN 2007-JUN 2008",
      title: "ALTHEIM COMUNICACIONES",
      role: {
        es: "Account Assistant",
        en: "Account Assistant",
      },
      description: {
        es: "Mi primer trabajo formal, en una agencia boutique, como asistente de cuentas en campañas ATL, BTL y 360°. Sugerí la idea de la acción de Beldent Splash en el superclásico River-Boca de 2007, y se produjo.",
        en: "My first formal job, at a boutique agency, as an account assistant on ATL, BTL and 360° campaigns. I suggested the Beldent Splash stunt at the 2007 River-Boca derby, and it was produced.",
      },
      side: "left",
      videos: altheimVideos,
    },
  ]

  // Group entries into rows: one entry per row, except entries that share a row with the next one.
  const rows: TimelineEntry[][] = []
  for (let i = 0; i < timelineItems.length; i++) {
    const entry = timelineItems[i]
    if (entry.sharesRowWithNext && i + 1 < timelineItems.length) {
      rows.push([entry, timelineItems[i + 1]])
      i++
    } else {
      rows.push([entry])
    }
  }

  useEffect(() => {
    // Matrix rain effect
    const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // The canvas is fixed, so it only needs to cover the viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Characters for matrix rain
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*()=+{}[]"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    // Draw matrix rain
    const drawMatrix = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0" // Green text
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)]

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // Move drop down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    // Animation loop
    const matrixInterval = setInterval(drawMatrix, 50)

    // Reveal timeline items on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe all timeline items
    const revealTargets = document.querySelectorAll(".timeline-item")
    revealTargets.forEach((item) => observer.observe(item))

    return () => {
      clearInterval(matrixInterval)
      window.removeEventListener("resize", resizeCanvas)
      observer.disconnect()
    }
  }, [])

  const renderCard = (entry: TimelineEntry, entryIndex: number, kind: RowKind) => {
    const isLeft = entry.side === "left"
    const isPair = kind !== "single"

    // Mobile: single column, the line and markers sit on the left edge (left-2, items have pl-8).
    // Desktop: markers sit on the centre line; in a pair the item is 5/12 wide, so the centre is 120% / -20% of it.
    const markerPosition =
      kind === "pairLeft"
        ? "left-2 md:left-[120%]"
        : kind === "pairRight"
          ? "left-2 md:left-[-20%]"
          : "left-2 md:left-1/2"

    const itemLayout = isPair
      ? "mb-16 md:mb-0 md:w-5/12"
      : `mb-16 flex ${isLeft ? "justify-start" : "justify-end"}`
    const slide = isLeft ? "md:translate-x-[-50px]" : "md:translate-x-[50px]"
    const cardLayout = isPair
      ? "w-full"
      : `w-full md:w-5/12 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`

    return (
      <div
        key={entry.id}
        className={`timeline-item relative z-[15] hover:z-[30] focus-within:z-[30] ${itemLayout} pl-8 md:pl-0 opacity-0 transition-all duration-1000 transform ${slide}`}
        style={{ width: isPair ? undefined : "100%" }}
      >
        {/* Year marker */}
        <div
          className={`absolute ${markerPosition} transform -translate-x-1/2 w-5 h-5 bg-black border-2 border-neon-green rounded-full z-20`}
          style={{ top: "25px" }}
        ></div>

        <TimelineOrbit videos={entry.videos ?? []} className={cardLayout} phase={(entryIndex * 0.29) % 1}>
          {(mobileVideos) => (
            <div className="terminal">
              <div className="terminal-header">
                <span className="text-neon-cyan py-1 inline-block">{entry.year}</span>
                {entry.tag && (
                  <span className="ml-3 align-middle inline-block border border-neon-cyan px-2 py-0.5 text-xs text-neon-cyan">
                    {entry.tag}
                  </span>
                )}
              </div>
              <div className="terminal-content">
                <h3 className="text-2xl text-neon-green mb-1 font-bold break-words">{entry.title}</h3>
                <h4
                  className={`${entry.multiRole ? "text-base space-y-1" : "text-xl"} text-neon-cyan mb-4 whitespace-pre-line`}
                >
                  {entry.role[lang]}
                </h4>
                <p className="text-white">{entry.description[lang]}</p>
                {entry.link && (
                  <Link
                    href={entry.link.href}
                    className="mt-4 inline-block border border-neon-green px-3 py-1 text-sm font-cyber text-neon-green transition-colors hover:bg-neon-green/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ff]"
                  >
                    {entry.link.label[lang]} &rarr;
                  </Link>
                )}
                {mobileVideos}
              </div>
            </div>
          )}
        </TimelineOrbit>
      </div>
    )
  }

  let entryCounter = 0

  return (
    <main className="py-8 px-4 md:px-12 relative">
      <canvas id="matrix-canvas" className="fixed top-0 left-0 w-full h-full z-0 opacity-20"></canvas>

      <div className="marquee-container mb-6 relative z-10">
        <div className="marquee">
          <span>TOMÁS PERÓ: TIMELINE // CAREER PATH // PROFESSIONAL JOURNEY //</span>
        </div>
      </div>

      <section className="mb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neon-green font-cyber glitch" data-text={t("timeline")}>
          {t("timeline")}
        </h1>
        <h2 className="text-xl text-neon-cyan mb-4 font-cyber">CAREER_PROGRESSION.exe</h2>
      </section>

      <section className="max-w-5xl mx-auto relative z-10" ref={timelineRef}>
        {/* Center line (left edge on mobile) */}
        <div className="absolute left-2 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-neon-green z-10"></div>

        {/* Timeline items */}
        <div className="relative">
          {rows.map((row) => {
            const first = row[0]
            const marker = first.showCovidBefore && (
              <div className="timeline-item mb-16 ml-8 md:ml-0 flex justify-start md:justify-center opacity-0 transition-all duration-1000 relative z-20">
                <div className="terminal-header bg-red-900 px-4 py-2 rounded-lg border border-red-500">
                  <span className="text-white font-bold covid-glitch-digital" data-text="2020: COVID OUTBREAK">2020: COVID OUTBREAK</span>
                </div>
              </div>
            )

            if (row.length === 2) {
              const [left, right] = row
              const leftIndex = entryCounter++
              const rightIndex = entryCounter++
              return (
                <React.Fragment key={first.id}>
                  {marker}
                  <div className="md:mb-16 md:flex md:items-start md:justify-between">
                    {renderCard(left, leftIndex, "pairLeft")}
                    {renderCard(right, rightIndex, "pairRight")}
                  </div>
                </React.Fragment>
              )
            }

            return (
              <React.Fragment key={first.id}>
                {marker}
                {renderCard(first, entryCounter++, "single")}
              </React.Fragment>
            )
          })}
        </div>
      </section>
    </main>
  )
}
