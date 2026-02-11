"use client"

import { useLanguage } from "@/components/language-context"
import { RetroBrowser } from "@/components/retro-browser"
import { useState } from "react"
import Typewriter from "@/components/typewriter"

import VisitorCounter from "@/components/visitor-counter"


export default function Home() {
  const { t, language } = useLanguage()
  const [introDone] = useState(true)

  // Portfolio data
  const portfolioItems = [
    {
      id: 2,
      year: "2020-PRESENT",
      client: "INDEPENDENT CONSULTANT",
      clientLine2: "Brand & Content Consultant",
      slug: "independent-consultant",
    },
    {
      id: 1,
      year: "2020-PRESENT",
      client: "AI EXPERIMENTS",
      slug: "ai-experiments",
      highlight: true,
    },
    {
      id: 3,
      year: "2015-2020",
      client: "AIR NEW ZEALAND",
      clientLine2: "Market Dev / Market Specialist",
      slug: "air-new-zealand",
    },
    {
      id: 4,
      year: "2011-2015",
      client: "THE WALT DISNEY COMPANY",
      clientLine2: "Sales, Marketing, Promotions",
      clientLine3: "+Disney Labs (intrapreneurship)",
      slug: "walt-disney-company",
    },
    {
      id: 5,
      year: "2007-2011",
      client: "AGENCY EXPERIENCE",
      clientLine3: "JWT + Altheim Comunicaciones",
      slug: "agency-experience",
    },
  ]

  return (
    <main className="py-8 px-4 md:px-12">
      <div className="marquee-container mb-6">
  <div className="marquee">
    <span>SYSTEM ONLINE: TOMÁS PERÓ // GEN_MARKETER // CONTENT MANAGER // ACCESS GRANTED //⚠️ WORK IN PROGRESS</span>
  </div>
</div>

      <section className="text-center mb-6">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 text-neon-green font-cyber glitch" data-text="TOMÁS PERÓ">
          TOMÁS PERÓ
        </h1>
        <h2 className="text-xl md:text-2xl text-neon-cyan mb-0 font-cyber">GEN_MARKETER.exe</h2>
        <div className="mt-5 w-full">
          <Typewriter
            textEs="Hola, soy Tomás, gen marketer en la intersección entre marca, estrategia, e inteligencia artificial, centrado en storytelling, workflows e impacto en tu negocio."
            textEn="Hi, I'm Tomás, senior leader at the intersection of brand, strategy, partnerships and AI, focused on storytelling, system / workflows and business impact."
            speedMs={10.3}
            startDelayMs={180}
            fontSizePx={24}
            cursorSizePx={12}
          />
        </div>
      </section>

      <section className="mt-2">
        <div className="section-header">
          <h2 className="text-2xl font-bold mb-4 text-center font-cyber text-neon-green">{t("project_database")}</h2>
        </div>

        {introDone && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioItems.slice(0, -1).map((item) => (
                <RetroBrowser
                  key={item.id}
                  year={item.year}
                  title={item.client}
                  titleLine2={item.clientLine2}
                  clientLine3={item.clientLine3}
                  slug={item.slug}
                  highlight={item.highlight}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <div className="w-full md:w-1/2">
                <RetroBrowser
                  key={portfolioItems[portfolioItems.length - 1].id}
                  year={portfolioItems[portfolioItems.length - 1].year}
                  title={portfolioItems[portfolioItems.length - 1].client}
                  titleLine2={portfolioItems[portfolioItems.length - 1].clientLine2}
                  clientLine3={portfolioItems[portfolioItems.length - 1].clientLine3}
                  slug={portfolioItems[portfolioItems.length - 1].slug}
                  highlight={portfolioItems[portfolioItems.length - 1].highlight}
                />
              </div>
            </div>
          </>
        )}
      </section>

      {introDone && (
        <section className="mt-12 text-center">
          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
          <VisitorCounter />
          <p className="text-xs text-neon-green">{t("last_update")}</p>
          <div className="blink mt-6 mb-2 text-neon-green" style={{ textShadow: "none" }}>
            {t("system_status")}
          </div>
          <a
            href="/intro.html#/"
            className="block mt-16 text-[10px] text-neon-green/60 hover:text-neon-cyan underline"
          >
            VOLVER A VER LA INTRODUCCIÓN
          </a>
        </section>
      )}
</main>
  )
}
