"use client"

import { useLanguage } from "@/components/language-context"
import React, { useEffect, useRef } from "react"

export default function Timeline() {
  const { t, language } = useLanguage()
  const timelineRef = useRef<HTMLDivElement>(null)

  // Timeline data
  const timelineItems = [
    {
      year: "2024-PRESENT",
      title: "PARADISE.LA",
      role: {
        es: "Content Manager & Producer",
        en: "Content Manager & Producer",
      },
      description: {
        es: "Lideré la transformación de Paradise hacia una productora de contenidos audiovisuales impulsada por inteligencia artificial, creando contenidos multiplataforma para clientes locales, regionales y globales.",
        en: "Leading the transformation of Paradise into an AI-driven audiovisual content production company, creating multiplatform content for local, regional, and global clients."
      },
    },
    {
      year: "2023-2024",
      title: "DRGEA",
      role: {
        es: "Head of Communications",
        en: "Head of Communications",
      },
      description: {
        es: "Como Head of Comms, diseñé y ejecuté la estrategia de comunicación para el lanzamiento regional de una solución tecnológica para el área de salud. Co-creé un plan de growth y trabajé en el product-market fit.",
        en: "As Head of Comms, I designed and executed the communication strategy for the regional launch of a tech solution for the healthcare sector. Co-created a growth plan and developed the product market fit."
      },
    },
    {
      year: "2021-2022",
      title: "AIRTM",
      role: {
        es: "Growth Supervisor",
        en: "Growth Supervisor",
      },
      description: {
        es: "Coordiné un equipo de growth marketing y lideré iniciativas de R&D para LATAM en una fintech pionera en permitir el acceso a dólares digitales. Highlights: pivot de target a freelancers, ideación y creación de un podcast, e iniciativas en web3.",
        en: "Coordinated a growth marketing team and led R&D initiatives for LATAM at a pioneering fintech enabling access to digital dollars. Highlights: Pivoted target to freelancers, ideated and launched a podcast, and led web3 initiatives."
      },
    },
    {
      year: "2020-2021",
      title: "STONE MOVISTAR",
      role: {
        es: "New Business Manager",
        en: "New Business Manager",
      },
      description: {
        es: "Lideré el lanzamiento y la estrategia de content marketing para un equipo de esports fundado por el tenista Diego “Peque” Schwartzman, Torneos y otros socios.",
        en: "Launch, coordination, and leadership of content marketing strategy for an esports team founded by tennis player Diego 'Peque' Schwartzman, tournaments, and other partners."
      },
    },
    {
      year: "2020-2020",
      title: "GO BROADWAY",
      role: {
        es: "Digital Marketing Consultant",
        en: "Digital Marketing Consultant",
      },
      description: {
        es: "Trabajé como Account Manager y realicé consultoría estratégica para una academia internacional de teatro musical. Lideré el lanzamiento de “BACKSTAGE” en Latinoamérica.",
        en: "Account Manager and strategic consulting for an international musical theater academy. Launched 'BACKSTAGE' in Latin America."
      },
    },
    {
      year: "2015-2020",
      title: "AIR NEW ZEALAND",
      role: {
        es: "Market Dev / Marketing Specialist",
        en: "Market Dev / Marketing Specialist",
      },
      description: {
        es: "Fui responsable del lanzamiento de marca en la región y armé el plan a 5 años. Lideré el desarrollo de mercado y estrategias de marketing B2C y B2B para Sudamérica. Gestioné alianzas, sponsorships, activaciones y agencias (PR, creatividad, medios y otros).",
        en: "Responsible for the brand launch in the region, developed the 5-year plan. Led market development and B2C/B2B marketing strategies for all South American markets. Partnerships, sponsorships, activations. Managed PR, creative, media, activations, and more."
      },
      showCovidBefore: true // Add marker before this item
    },
    {
      year: "2011-2015",
      title: "THE WALT DISNEY COMPANY",
      role: {
        es: "Marketing / Sales / Promotions",
        en: "Marketing / Sales / Promotions",
      },
      description: {
        es: "Trabajé en 2 roles en áreas diferentes, y fui seleccionado para participar de una iniciativa de intrapreneurship.",
        en: "Worked in 2 roles in different areas, and was selected to participate in an intrapreneurship initiative."
      },
    },
    {
      year: "2008-2011",
      title: "J. WALTER THOMPSON",
      role: {
        es: "Account Executive",
        en: "Account Executive",
      },
      description: {
        es: "Me desempeñé como ejecutivo de cuentas BTL: gestioné campañas, activaciones y eventos para marcas de consumo masivo, banca, telcos y retail.",
        en: "BTL Account Executive, managed campaigns, activations, and events for mass consumption, banking, telco, and retail brands."
      },
    },
    {
      year: "2007-2008",
      title: "ALTHEIM COMUNICACIONES",
      role: {
        es: "Account Assistant",
        en: "Account Assistant",
      },
      description: {
        es: "Me desempeñé como asistente de cuentas (fue mi primera experiencia laboral formal en una agencia boutique), trabajando en campañas ATL, BTL y 360°.",
        en: "Account Assistant, first formal work experience in a boutique agency, ATL, BTL, and 360° campaigns."
      },
    },
  ]

  useEffect(() => {
    // Matrix rain effect
    const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.body.scrollHeight
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
    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item) => observer.observe(item))

    return () => {
      clearInterval(matrixInterval)
      window.removeEventListener("resize", resizeCanvas)
      observer.disconnect()
    }
  }, [])

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
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-neon-green z-10"></div>

        {/* Timeline items */}
        <div className="relative">
          {timelineItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.showCovidBefore && (
                <div key="covid-marker" className="timeline-item mb-16 flex justify-center opacity-0 transition-all duration-1000 relative z-20">
                  <div className="terminal-header bg-red-900 px-4 py-2 rounded-lg border border-red-500">
                    <span className="text-white font-bold covid-glitch-digital" data-text="2020: COVID OUTBREAK">2020: COVID OUTBREAK</span>
                  </div>
                </div>
              )}
              <div
                className={`timeline-item mb-16 flex justify-${index % 2 === 0 ? "start" : "end"} opacity-0 transition-all duration-1000 transform ${index % 2 === 0 ? "translate-x-[-50px]" : "translate-x-[50px]"}`}
                style={{ width: "100%" }}
              >
              <div className={`w-5/12 ${index % 2 === 0 ? "mr-auto" : "ml-auto"}`}>
                {/* Year marker */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-black border-2 border-neon-green rounded-full z-20`}
                  style={{ top: "25px" }}
                ></div>

                {/* Content */}
                <div className="terminal">
                  <div className="terminal-header">
                    <span className="text-neon-cyan py-1 inline-block">{item.year}</span>
                  </div>
                  <div className="terminal-content">
                    <h3 className="text-2xl text-neon-green mb-1 font-bold">{item.title}</h3>
                    <h4 className="text-xl text-neon-cyan mb-4">{item.role[language as "es" | "en"]}</h4>
                    <p className="text-white">{item.description[language as "es" | "en"]}</p>
                  </div>
                </div>
              </div>
            </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  )
}
