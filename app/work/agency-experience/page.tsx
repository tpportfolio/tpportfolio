"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VideoCarousel, type VideoItem } from "@/components/video-carousel"
import { useLanguage } from "@/components/language-context"

export default function AgencyExperiencePage() {
  const { t, language } = useLanguage()

  // YouTube videos for Agency Experience
  const agencyVideos: VideoItem[] = [
    {
      id: "beldent-splash",
      type: "youtube",
      videoId: "-cR8Nu6KlgM",
      title: {
        es: "2007 - Altheim: Acción Beldent Splash en River - Boca.",
        en: "2007 - Altheim: Beldent Splash Action at River - Boca.",
      },
      description: {
        es: 'Resumen de acción BTL para el lanzamiento de Beldent Splash, cuyo TVC era un hombre en zunga roja que se "refrescaba" por una ola tras comerse un beldent. Lo particular de esta acción es que en ese momento, como asistente de cuentas, en una reunión con creativos sugerí la idea de que uno de estos actores irrumpiera en el superclásico River Boca próximo a jugarse en el mes siguiente, y terminó llevándose adelante, lo cual me enorgullece.',
        en: 'BTL Action for the launch of Beldent Splash, whose TVC was a man in a red zunga who was "refreshed" by a wave after eating a Beldent. The particularity of this action is that at that time, as an account assistant, in a meeting with creatives I suggested the idea of having one of these actors burst into the River Boca superclassic, which was about to be played in the upcoming month, and it ended up being carried out, which makes me proud of it.',
      },
    },
    {
      id: "imperial-relaunch",
      type: "youtube",
      videoId: "O9T3p0zxUh8",
      title: {
        es: "2010 - JWT/GLUE Relanzamiento Cerveza Imperial (CCU)",
        en: "2010 - JWT/GLUE Imperial Beer Relaunch (CCU)",
      },
      description: {
        es: "Caso Cerveza Imperial, rebrand y relanzamiento con activación BTL",
        en: "Cerveza Imperial brand case, rebranding and re-launch with BTL activation",
      },
    },
    {
      id: "imperial-sessions",
      type: "youtube",
      videoId: "ZQwwBIO9h-s",
      title: {
        es: "2009 - Sesiones Imperial",
        en: "2009 - Imperial Sessions",
      },
      description: {
        es: 'Resumen del influencer "CapitanIntriga" (allá por 2009!) sobre el show de cierre de la 1era edición de Sesiones Imperial, con show de Fito Paez en el mítico teatro Maipo. Activación de la campaña de relanzamiento de la marca.',
        en: 'Wrap up of the influencer "CapitanIntriga" (back to 2009!) about the closing show of the 1st edition of Imperial Sessions, with a show by Fito Paez at the mythical Maipo theater. Activation of the re-launching campaign of the brand.',
      },
    },
    {
      id: "nokia-ambassadors",
      type: "youtube",
      videoId: "OOFbkl_WFbc",
      title: {
        es: "2010 - Embajadores Nokia N-Series",
        en: "2010 - Nokia N-Series Ambassadors",
      },
      description: {
        es: 'Convocatoria a participar de Embajadores Nokia, un programa de "incubadora" de Nokia con emprendedores tecnológicos.',
        en: 'Call to participate in Nokia Ambassadors, a Nokia "incubator" program with technology entrepreneurs.',
      },
    },
    {
      id: "nokia-ambassadors-winners",
      type: "youtube",
      videoId: "itjWtiMjwn0",
      title: {
        es: "2011 - Embajadores Nokia by Ovi",
        en: "2011 - Nokia Ambassadors by Ovi",
      },
      description: {
        es: 'Videocaso sobre los ganadores del concurso 2011 de Embajadores Nokia, un programa de "incubadora" de Nokia con emprendedores tecnológicos y no tanto.',
        en: 'Videocase about the winners of the 2011 Nokia Ambassadors contest, a Nokia "incubator" program with tech and not-so-tech entrepreneurs.',
      },
    },
  ]

  return (
    <main className="min-h-screen py-8 px-12">
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
        <div className="text-xl text-neon-cyan mb-2 font-cyber">2007-2011</div>
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

        <div className="terminal">
          <div className="terminal-header">2008-2011 // J. WALTER THOMPSON: Account Executive</div>
          <div className="terminal-content">
            <p>
              {language === "es"
                ? "Gestioné campañas para marcas de consumo masivo, telecomunicaciones y retail. Coordiné campañas ATL, BTL y digital. Di seguimiento a producción audiovisual y gráfica. Trabajé de manera directa con clientes y proveedores."
                : "Campaign management for mass consumption, telecommunications, and retail brands. Coordination of ATL, BTL, and digital campaigns. Supervision of audiovisual and graphic production. Direct relationship with clients and suppliers."}
            </p>

            <div className="mt-4">
              <p className="text-neon-cyan mb-2">{language === "es" ? "Highlights:" : "Highlights:"}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>{language === "es" ? "Ejecuté campañas nacionales para Claro, Ford y Johnson & Johnson." : "National campaigns for Claro, Ford, and Johnson & Johnson."}</li>
                <li>{language === "es" ? "Coordiné producción de spots, eventos y promociones masivas." : "Production of commercials, events, and massive promotions."}</li>
                <li>{language === "es" ? "Coordiné lanzamientos con múltiples stakeholders." : "Coordination of launches with multiple stakeholders."}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-header">2007-2008 // ALTHEIM COMUNICACIONES: Account Assistant</div>
          <div className="terminal-content">
            <p>
              {language === "es"
                ? "Fue mi primera experiencia laboral formal en una agencia boutique. Asistí a directores de cuenta, armé presentaciones y reportes para clientes, y aprendí de forma transversal en todas las áreas de la agencia."
                : "First formal work experience at a boutique agency. Assisted account directors. Prepared presentations and reports for clients. Cross-functional learning in all areas of the agency."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
        <p className="mt-6 text-xs text-neon-green"> 1986-{new Date().getFullYear()} TOMÁS PERÓ // SESSION_TIMEOUT: 30:00 // END_TRANSMISSION</p>
      </div>
    </main>
  )
}
