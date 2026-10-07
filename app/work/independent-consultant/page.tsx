"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { useVisualMode } from "@/components/visual-mode-context"

export default function IndependentConsultantPage() {
  const { t, language } = useLanguage()
  const { mode } = useVisualMode()

  return (
    <main className="min-h-screen py-8 px-12">
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
        <div className="text-xl text-neon-cyan mb-2 font-cyber">2020-PRESENT // Brand & Content Consultant</div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="terminal">
          <div className="terminal-header">PROJECT_OVERVIEW</div>
          <div className="terminal-content">
            {language === "es" ? (
              <>
                <p className={`mb-2 font-bold ${mode === "light" ? "text-[#b45309]" : "text-white"}`}>
                  CONSULTOR DE MARKETING INDEPENDIENTE | Jul’20 – Presente
                </p>
                <p className="mb-2">LATAM | Marca, Estrategia y Crecimiento</p>
                <p className="mb-4">
                  Consultor estratégico en marketing, branding y crecimiento digital con más de 18 años de experiencia trabajando con marcas, startups y agencias a nivel global. Trabajé en industrias como entretenimiento, fintech, esports y gaming, healthtech y producción creativa. Mi interés principal hoy es brindar consultorías, capacitaciones y apoyo en la creación de contenido potenciado por IA. Me integro directamente en equipos de marketing, marcas y agencias para acelerar la producción, iterar, reducir la fricción operativa y elevar la calidad en pipelines reales de imagen, video, audio y texto.
                </p>
              </>
            ) : (
              <>
                <p className={`mb-2 font-bold ${mode === "light" ? "text-[#b45309]" : "text-white"}`}>
                  INDEPENDENT MARKETING CONSULTANT | Jul’20 – Present
                </p>
                <p className="mb-2">LATAM | Brand, Strategy and Growth</p>
                <p className="mb-4">
                  Strategic consultant in marketing, branding, and digital growth with more than 18 years of experience working with brands, startups, and agencies globally. I have worked across entertainment, fintech, esports and gaming, healthtech, and creative production. My main focus today is consulting, training, and supporting AI-powered content creation. I integrate directly into marketing teams, brands, and agencies to accelerate production, iterate faster, reduce operational friction, and raise quality across real-world image, video, audio, and text pipelines.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-header">HIGHLIGHTED PROJECTS</div>
          <div className="terminal-content">
            <ul className="list-disc pl-5 space-y-2">
              {language === "es" ? (
                <>
                  <li>
                    <b>
                      <Link
                        href="/work/ai-experiments#ejemplos-trabajos-ia-2025"
                        className="underline hover:text-neon-magenta"
                      >
                        Paradise.la (Jul 2024–Jan 2026)
                      </Link>
                      :
                    </b>{" "}
                    Consultoría estratégica para la transición de una productora tradicional hacia una infraestructura audiovisual potenciada por IA. Implementación de flujos de trabajo generativos abarcando creación de video, clonación de voces y locuciones sintéticas. Diseño de experimentos de contenido para escalar la velocidad de producción y explorar nuevas capacidades narrativas.
                  </li>
                  <li><b>DrGea.com (2023-2024):</b> Definición y ejecución del marco narrativo y la estrategia regional de comunicación para Colombia, Perú, Argentina y México.</li>
                  <li><b>Sinerlogic (2022-2023):</b> Consultoría en identidad de marca, mensajería y propuesta de valor para logística B2B.</li>
                  <li><b>Airtm (2021-2022):</b> Coordinación del equipo regional de growth marketing, ejecutando iniciativas en producto, ventas, paid media, BD y tecnología.</li>
                  <li><b>Stone Movistar (2020-2021):</b> Estrategia de lanzamiento, posicionamiento en esports, contenido y partnerships con streamers y creadores.</li>
                  <li><b>Go Broadway! (2020):</b> Estrategia mensual de marketing y comunicación, campañas multicanal, coordinación creativa y lanzamiento de Backstage.com en LATAM.</li>
                </>
              ) : (
                <>
                  <li>
                    <b>
                      <Link
                        href="/work/ai-experiments#ejemplos-trabajos-ia-2025"
                        className="underline hover:text-neon-magenta"
                      >
                        Paradise.la (Jul 2024–Jan 2026)
                      </Link>
                      :
                    </b>{" "}
                    Strategic consulting for the transition of a traditional production company into an AI-powered audiovisual infrastructure. Implementation of generative workflows across video creation, voice cloning, and synthetic narration. Design of content experiments to scale production speed and explore new narrative capabilities.
                  </li>
                  <li><b>DrGea.com (2023-2024):</b> Definition and execution of the narrative framework and regional communications strategy across Colombia, Peru, Argentina, and Mexico.</li>
                  <li><b>Sinerlogic (2022-2023):</b> Consulting on brand identity, messaging, and value proposition for a B2B logistics company.</li>
                  <li><b>Airtm (2021-2022):</b> Coordination of the regional growth marketing team across product, sales, paid media, BD, and technology.</li>
                  <li><b>Stone Movistar (2020-2021):</b> Launch strategy, esports positioning, content development, and partnerships with streamers and creators.</li>
                  <li><b>Go Broadway! (2020):</b> Monthly marketing and communications strategy, multichannel campaigns, creative coordination, and Backstage.com launch across LATAM.</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-header">KEY ACHIEVEMENTS</div>
          <div className="terminal-content">
            <ul className="list-disc pl-5 space-y-2">
              {language === "es" ? (
                <>
                  <li>Aumenté la visibilidad de marca para múltiples startups y marcas mediante estrategias de contenido, PR y programas de influencers.</li>
                  <li>Construí y ejecuté frameworks de adquisición multicanal, mejorando engagement y conversión.</li>
                  <li>Creé modelos de marketing B2B y B2C escalables para expansión regional.</li>
                </>
              ) : (
                <>
                  <li>Increased brand visibility for multiple startups and brands through content-led strategies, PR, and influencer programs.</li>
                  <li>Built and executed multi-channel acquisition frameworks that improved engagement and conversion.</li>
                  <li>Created scalable B2B and B2C marketing models to support regional expansion.</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-header">MORE INFORMATION</div>
          <div className="terminal-content space-y-8">
            {language === "es" ? (
              <>
                <div className="space-y-2">
                  <p className="font-bold">PARADISE.LA | AI & CONTENT CONSULTANT & PRODUCER | JUL 2024 A ENE 2026</p>
                  <p>LATAM | Producción Creativa e IA</p>
                  <p>Consultoría de transición operativa hacia una productora audiovisual potenciada por IA.</p>
                  <p>Desarrollo del refresh de marca, roadmap, talentos.</p>
                  <p>Colaboración interfuncional entre equipos creativos y de producción.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">DRGEA.COM | HEAD DE COMUNICACIONES | FEB 2023 A ABR 2024</p>
                  <p>LATAM | HealthTech y Telemedicina</p>
                  <p>Definición y ejecución del marco narrativo y la estrategia regional de comunicación para Colombia, Perú, Argentina y México. Diseño de iniciativas de PR, influencers y contenido digital.</p>
                  <p>Liderazgo del go to market alineando el posicionamiento de la marca con los objetivos de negocio. Coordinación de mensajes y planificación de medios con equipos multidisciplinarios.</p>
                  <p>Impulso de iniciativas de marketing B2B y B2C para la construcción de audiencia. Coordinación con agencia de performance y equipo de tecnología.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">SINERLOGIC | CONSULTOR DE MARKETING Y BRANDING | 2022 A 2023</p>
                  <p>LATAM | Servicios Digitales</p>
                  <p>Consultoría en identidad de marca, mensajería y propuesta de valor para logística B2B. Soporte en la creación de una arquitectura de comunicación multicanal.</p>
                  <p>Desarrollo de la estrategia de redes sociales orientada a la visibilidad de la marca y el posicionamiento en el mercado de servicios digitales. Coordinación de pauta en conjunto con Zlatan Agency.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">AIRTM | GROWTH MARKETING E INNOVACIÓN | SEP 2021 A JUL 2022</p>
                  <p>LATAM | Fintech y Web3</p>
                  <p>Coordinación del equipo regional de growth marketing, ejecutando iniciativas en producto, ventas, paid media, BD y tecnología.</p>
                  <p>Investigación del mercado y competidores en pos de optimizar estrategias de adquisición y posicionamiento.</p>
                  <p>Lideré programas de KOL/influencers y activaciones de marca.</p>
                  <p>Lanzamiento del podcast Airtalks en Argentina amplificando la visibilidad de la marca y el engagement de la comunidad.</p>
                  <p>Creé, testeé y optimicé activos creativos multicanal para KPIs de crecimiento.</p>
                  <p className="mt-2 font-bold">Logros:</p>
                  <p>Mejoré tasas de conversión mediante análisis y testing de funnels.</p>
                  <p>Lancé Airtalks en Argentina, amplificando visibilidad de marca y engagement con influencers.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">Stone Movistar - Consultor de Marketing | 2020-2021</p>
                  <p>LATAM | Esports, Contenido & Entretenimiento</p>
                  <p>Trabajé en la fase startup de la organización fundada por Diego "Peque" Schwartzman & Torneos.</p>
                  <p>Desarrollé la estrategia de lanzamiento: pilares de contenido, identidad de marca e ideas de activación.</p>
                  <p>Analicé industria y competencia para definir posicionamiento en esports.</p>
                  <p>Propuse y coordiné partnerships con streamers y creadores (ej. Delfi Pignatiello, Luquitas Rodríguez, Lit Killah).</p>
                  <p>Ideé eventos, contenidos y formatos con figuras clave.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">Go Broadway! - Consultor de Marketing | Ago '20 - Nov '20</p>
                  <p>LATAM | Entretenimiento & Artes Escénicas</p>
                  <p>Desarrollé estrategias mensuales de marketing y comunicación, incluyendo conceptos creativos y calendarios de contenido.</p>
                  <p>Gestioné campañas en redes, email, web y alianzas.</p>
                  <p>Coordiné un equipo creativo cross-funcional (diseño, edición, TikTok, CM, podcast, atención al cliente).</p>
                  <p>Gestioné partnerships con Ticketek y 47st, con iniciativas co-brandeadas.</p>
                  <p>Organicé reportes, analítica y supervisé contenido digital.</p>
                  <p>Lancé Backstage.com en LATAM..</p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="font-bold">PARADISE.LA | AI & CONTENT CONSULTANT & PRODUCER | JUL 2024 TO JAN 2026</p>
                  <p>LATAM | Creative Production & AI</p>
                  <p>Operational transition consulting for an audiovisual production company evolving into an AI-powered structure.</p>
                  <p>Development of the brand refresh, roadmap, and talent structure.</p>
                  <p>Cross-functional collaboration between creative and production teams.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">DRGEA.COM | HEAD OF COMMUNICATIONS | FEB 2023 TO APR 2024</p>
                  <p>LATAM | HealthTech & Telemedicine</p>
                  <p>Definition and execution of the narrative framework and regional communications strategy across Colombia, Peru, Argentina, and Mexico. Design of PR, influencer, and digital content initiatives.</p>
                  <p>Led the go-to-market process, aligning brand positioning with business goals. Coordinated messaging and media planning with multidisciplinary teams.</p>
                  <p>Drove B2B and B2C marketing initiatives for audience building. Coordinated with performance agency and technology team.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">SINERLOGIC | MARKETING & BRANDING CONSULTANT | 2022 TO 2023</p>
                  <p>LATAM | Digital Services</p>
                  <p>Consulting on brand identity, messaging, and value proposition for a B2B logistics company. Support in building a multichannel communication architecture.</p>
                  <p>Development of the social media strategy focused on brand visibility and market positioning in digital services. Media coordination together with Zlatan Agency.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">AIRTM | GROWTH MARKETING & INNOVATION | SEP 2021 TO JUL 2022</p>
                  <p>LATAM | Fintech & Web3</p>
                  <p>Coordinated the regional growth marketing team, executing initiatives across product, sales, paid media, BD, and technology.</p>
                  <p>Researched market dynamics and competitors to optimize acquisition and positioning strategies.</p>
                  <p>Led KOL/influencer programs and brand activations.</p>
                  <p>Launched the Airtalks podcast in Argentina, amplifying brand visibility and community engagement.</p>
                  <p>Created, tested, and optimized multichannel creative assets for growth KPIs.</p>
                  <p className="mt-2 font-bold">Key Achievements:</p>
                  <p>Improved conversion rates through funnel analysis and testing.</p>
                  <p>Launched Airtalks in Argentina, amplifying brand visibility and influencer engagement.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">Stone Movistar - Marketing Consultant | 2020-2021</p>
                  <p>LATAM | Esports, Content & Entertainment</p>
                  <p>Worked during the startup phase of the organization founded by Diego "Peque" Schwartzman & Torneos.</p>
                  <p>Developed the launch strategy: content pillars, brand identity, and activation ideas.</p>
                  <p>Analyzed industry and competitors to define esports positioning.</p>
                  <p>Proposed and coordinated partnerships with streamers and creators (e.g. Delfi Pignatiello, Luquitas Rodríguez, Lit Killah).</p>
                  <p>Ideated events, content formats, and activations with key figures.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">Go Broadway! - Marketing Consultant | Aug '20 - Nov '20</p>
                  <p>LATAM | Entertainment & Performing Arts</p>
                  <p>Developed monthly marketing and communications strategies, including creative concepts and content calendars.</p>
                  <p>Managed campaigns across social media, email, web, and partnerships.</p>
                  <p>Coordinated a cross-functional creative team (design, editing, TikTok, community management, podcast, customer support).</p>
                  <p>Managed partnerships with Ticketek and 47st, including co-branded initiatives.</p>
                  <p>Organized reporting, analytics, and digital content oversight.</p>
                  <p>Launched Backstage.com in LATAM.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
