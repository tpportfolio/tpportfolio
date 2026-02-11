"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-context"

export default function IndependentConsultantPage() {
  const { t, language } = useLanguage()

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
                <p className="text-white mb-2 font-bold">CONSULTOR DE MARKETING INDEPENDIENTE | Jul’20 – Presente</p>
                <p className="mb-2">📍 LATAM | Marca, Estrategia & Crecimiento</p>
                <p className="mb-4">
                  Brindo consultoría estratégica en marketing, branding y crecimiento digital para startups y marcas alrededor del mundo. Cuento con experiencia en fintech, esports, entretenimiento, health-tech y producción creativa.
                  <br /><br />
                  Actualmente ofrezco consultorías, capacitaciones, y creación de contenido potenciado por IA.
                  <br />
                  Me integro a equipos de marketing, marcas o agencias para acelerar producción, iterar, reducir fricción y elevar la calidad en pipelines reales (imagen, video, audio y texto).
                </p>
              </>
            ) : (
              <>
                <p className="text-white mb-2 font-bold">INDEPENDENT MARKETING CONSULTANT | Jul’20 – Present</p>
                <p className="mb-2">📍 LATAM | Brand Marketing, Strategy & Growth</p>
                <p className="mb-4">Providing strategic marketing, branding, and digital growth consulting for startups and established brands across LATAM. Working with companies in industries including fintech, esports, entertainment, healthtech, and creative production.</p>
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
                        Paradise.la (2025)
                      </Link>
                      :
                    </b>{" "}
                    Lideré la transición del estudio de producción hacia una productora potenciada por IA.
                  </li>
                  <li><b>DrGea.com (2023-2024):</b> Diseñé y ejecuté la estrategia de comunicación y lanzamiento en Colombia, Perú, Argentina y México.</li>
                  <li><b>Sinerlogic (2022-2023):</b> Brindé consultoría estratégica en branding, mensaje y roadmap de crecimiento para logística B2B.</li>
                  <li><b>Airtm (2021-2022):</b> Coordiné y lideré el equipo regional de growth marketing (funnels de adquisición, activaciones con influencers y desarrollo creativo).</li>
                  <li><b>Stone Movistar (2020-2021):</b> Esports & contenido: trabajé en estrategia de lanzamiento, análisis competitivo y propuestas de influencers/contenido.</li>
                  <li><b>Go Broadway! (2020):</b> Lideré iniciativas de marca: estrategia de marketing, calendario de contenido, coordinación creativa y PR/alianzas. Lanzamiento de Backstage.com en LATAM.</li>
                </>
              ) : (
                <>
                  <li><b>Paradise.la (2025):</b> Leading the transition of the production studio into an AI powered production house.</li>
                  <li><b>DrGea.com (2023-2024):</b> Developed and executed multi-country communication and launch strategy across Colombia, Peru, Argentina, and Mexico.</li>
                  <li><b>Sinerlogic (2022-2023):</b> Provided strategic consulting in branding, messaging, and growth roadmap for B2B logistics.</li>
                  <li><b>Airtm (2021-2022):</b> Coordinated and lead regional growth marketing team, working with acquisition funnels, influencer activations, and creative development.</li>
                  <li><b>Stone Movistar (2020-2021):</b> Esports & content team: worked in the go-to-market strategy, competitive analysis, and influencer/content proposals.</li>
                  <li><b>Go Broadway! (2020):</b> Lead brand initiatives: Full marketing strategy, social media content calendar, creative coordination, and PR/partnerships. Backstage.com launch in Latin America.</li>
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
                <div>
                  <p className="font-bold">Paradise.la – Consultor de Marketing Estratégico | 2024–2025</p>
                  <p>📍 LATAM | Producción Creativa & IA</p>
                  <ul className="list-disc pl-5">
                    <li>Lideré la transición de la compañía hacia una productora audiovisual potenciada por IA.</li>
                    <li>Desarrollé el refresh de marca, posicionamiento, roadmap de comunicación y estrategia digital.</li>
                    <li>Colaboré con equipos creativos, de producción y tecnología para integrar IA en los flujos de trabajo.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">DRGEA.COM – Head de Comunicaciones | Feb’23 – Abr’24</p>
                  <p>📍 LATAM | HealthTech & Telemedicina</p>
                  <ul className="list-disc pl-5">
                    <li>Definí y ejecuté la estrategia regional de comunicación para Colombia, Perú, Argentina y México.</li>
                    <li>Diseñé estrategias de PR, influencers y contenido digital para aumentar awareness.</li>
                    <li>Lideré el go-to-market, alineando comunicación y crecimiento con objetivos de negocio.</li>
                    <li>Coordiné mensajes, planificación de medios y seguimiento de KPIs con equipos multidisciplinarios.</li>
                    <li>Impulsé iniciativas de marketing B2B y B2C.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">Sinerlogic – Consultor de Marketing & Branding | 2022–2023</p>
                  <p>📍 LATAM | Servicios Digitales</p>
                  <ul className="list-disc pl-5">
                    <li>Brindé consultoría estratégica en identidad de marca, mensaje y propuesta de valor para logística B2B.</li>
                    <li>Apoyé la creación de la estrategia de comunicación multicanal.</li>
                    <li>Desarrollé la estrategia de redes sociales orientada al crecimiento.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">AIRTM – Growth Marketing & I+D | 2021 – 2022</p>
                  <p>📍 LATAM | Fintech & Web3</p>
                  <ul className="list-disc pl-5">
                    <li>Coordiné un equipo regional de growth marketing, ejecutando iniciativas en producto, ventas, paid media, BD y tecnología.</li>
                    <li>Investigué mercado y competencia para optimizar estrategias de adquisición y posicionamiento.</li>
                    <li>Gestioné programas de KOL/influencers y activaciones de marca (ej. Airtalks).</li>
                    <li>Creé, testeé y optimicé activos creativos multicanal para KPIs de crecimiento.</li>
                  </ul>
                  <p className="mt-2 font-bold">Logros:</p>
                  <ul className="list-disc pl-8">
                    <li>Mejoré tasas de conversión mediante análisis y testing de funnels.</li>
                    <li>Lancé Airtalks en Argentina, amplificando visibilidad de marca y engagement con influencers.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">Stone Movistar – Consultor de Marketing | 2020-2021</p>
                  <p>📍 LATAM | Esports, Contenido & Entretenimiento</p>
                  <ul className="list-disc pl-5">
                    <li>Trabajé en la fase startup de la organización fundada por Diego "Peque" Schwartzman & Torneos.</li>
                    <li>Desarrollé la estrategia de lanzamiento: pilares de contenido, identidad de marca e ideas de activación.</li>
                    <li>Analicé industria y competencia para definir posicionamiento en esports.</li>
                    <li>Propuse y coordiné partnerships con streamers y creadores (ej. Delfi Pignatiello, Luquitas Rodríguez, Lit Killah).</li>
                    <li>Ideé eventos, contenidos y formatos con figuras clave.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">Go Broadway! – Consultor de Marketing | Ago’20 – Nov’20</p>
                  <p>📍 LATAM | Entretenimiento & Artes Escénicas</p>
                  <ul className="list-disc pl-5">
                    <li>Desarrollé estrategias mensuales de marketing y comunicación, incluyendo conceptos creativos y calendarios de contenido.</li>
                    <li>Gestioné campañas en redes, email, web y alianzas.</li>
                    <li>Coordiné un equipo creativo cross-funcional (diseño, edición, TikTok, CM, podcast, atención al cliente).</li>
                    <li>Gestioné partnerships con Ticketek y 47st, con iniciativas co-brandeadas.</li>
                    <li>Organicé reportes, analítica y supervisé contenido digital.</li>
                    <li>Lancé Backstage.com en LATAM.</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="font-bold">Paradise.la – Strategic Marketing Consultant | 2024–2025</p>
                  <p>📍 LATAM | Creative Production & AI</p>
                  <ul className="list-disc pl-5">
                    <li>Leading the company’s transition into an AI-powered audiovisual production house.</li>
                    <li>Developing brand refresh, positioning, communication roadmap, and digital strategy.</li>
                    <li>Collaborating with creative, production, and tech teams to integrate AI tools into workflows.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">DRGEA.COM – Head of Communications | Feb’23 – Apr’24</p>
                  <p>📍 LATAM | HealthTech & Telemedicine</p>
                  <ul className="list-disc pl-5">
                    <li>Defined and executed the regional communication strategy for Colombia, Peru, Argentina, and Mexico.</li>
                    <li>Designed PR, influencer, and digital content strategies to increase brand awareness.</li>
                    <li>Led go-to-market planning, aligning communication and growth initiatives with business goals.</li>
                    <li>Coordinated messaging, media planning, and KPI tracking with multidisciplinary teams.</li>
                    <li>B2B and B2C marketing initiatives.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">Sinerlogic – Marketing & Branding Consultant | 2022–2023</p>
                  <p>📍 LATAM | Digital Services</p>
                  <ul className="list-disc pl-5">
                    <li>Strategic consulting in brand identity, messaging, and value proposition for a B2B logistics company.</li>
                    <li>Supported the creation of a multi-channel communication strategy.</li>
                    <li>Developed social media strategy growth-oriented.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">AIRTM – Growth Marketing & R&D | 2021 – 2022</p>
                  <p>📍 LATAM | Fintech & Web3</p>
                  <ul className="list-disc pl-5">
                    <li>Coordinated a regional growth marketing team, executing loads of initiatives, working across product, sales, paid media, BD, and tech.</li>
                    <li>Conducted market and competitive research to refine acquisition strategies and positioning.</li>
                    <li>Managed KOL/influencer programs and brand activations (i.e. Airtalks).</li>
                    <li>Created, tested, and optimized multi-channel creative assets to support growth KPIs.</li>
                  </ul>
                  <p className="mt-2 font-bold">Key Achievements:</p>
                  <ul className="list-disc pl-8">
                    <li>Improved conversion rates through funnel analysis and testing.</li>
                    <li>Launched Airtalks initiative in Argentina, amplifying brand visibility and influencer engagement.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">Stone Movistar – Marketing Consultant | 2020-2021</p>
                  <p>📍 LATAM | Esports, Content & Entertainment</p>
                  <ul className="list-disc pl-5">
                    <li>Worked on the startup phase of the esports & content organization founded by Diego "Peque" Schwartzman & Torneos.</li>
                    <li>Developed the go-to-market strategy, including content pillars, brand identity, and activation ideas.</li>
                    <li>Conducted industry and competitor analysis to define positioning in the esports ecosystem.</li>
                    <li>Proposed and coordinated streamer and content creator partnerships (e.g., Delfi Pignatiello, Luquitas Rodríguez, Lit Killah).</li>
                    <li>Ideated events, launch content, and host formats involving key figures and influencers.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold">Go Broadway! – Marketing Consultant | Aug’20 – Nov’20</p>
                  <p>📍 LATAM | Entertainment & Performing Arts</p>
                  <ul className="list-disc pl-5">
                    <li>Developed monthly marketing and communication strategies including creative concepts and content calendars.</li>
                    <li>Managed campaigns across social media, email, website, and partnerships.</li>
                    <li>Coordinated a cross-functional creative team (designers, editors, TikTok creators, CM, podcast team, customer service).</li>
                    <li>Managed partnerships with Ticketek and 47st, including co-branded initiatives.</li>
                    <li>Organized performance reporting, analytics, and digital content oversight.</li>
                    <li>Worked in the launch of Backstage.com in Latin America.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
        <p className="mt-6 text-xs text-neon-green">© 1986-{new Date().getFullYear()} TOMÁS PERÓ // SESSION_TIMEOUT: 30:00 // END_TRANSMISSION</p>
      </div>
    </main>
  )
}

