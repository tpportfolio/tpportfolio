"use client"

import { CAREER_YEARS } from "@/lib/career"
import { useEffect, useState } from "react"
import { useVisualMode } from "@/components/visual-mode-context"
import { useLanguage } from "@/components/language-context"
import { RetroBrowser } from "@/components/retro-browser"
import Typewriter from "@/components/typewriter"
import { HomeSummary } from "@/components/home-summary"
import VisitorCounter from "@/components/visitor-counter"
import { homeProjects, siteIdentity } from "@/lib/site-content"

type VariantMode = "default" | "dark" | "light"

interface HomePageViewProps {
  className?: string
  variantMode?: VariantMode
}

export function HomePageView({ className, variantMode = "default" }: HomePageViewProps) {
  const { t, language } = useLanguage()
  const { mode } = useVisualMode()
  const effectiveMode = variantMode === "default" ? mode : variantMode
  const isLight = effectiveMode === "light"
  const [skipTypewriter, setSkipTypewriter] = useState(false)

  const accentStyle = isLight
    ? { color: "#2f1607", textShadow: "0 0 18px rgba(205, 108, 27, 0.18)" }
    : undefined

  const typewriterColor = isLight ? "#b85a17" : "#00ff00"
  const statusStyle = isLight ? { color: "#7a3913" } : undefined

  const heroCopyEs = `Soy Tomás, Brand Strategist y líder de marketing. Hace +${CAREER_YEARS} años construyo, lanzo y escalo marcas, operando en el cruce entre estrategia de marca, marketing cultural y tecnología creativa: The Walt Disney Company, lanzamiento de Air New Zealand en Sudamérica y consultoría independiente desde 2020. Hoy soy creative technologist: la IA atraviesa todo lo que hago, desde producir imagen y video hasta construir mis propias herramientas.`
  const heroCopyEn = `I'm Tomás, a Brand Strategist and Marketing Leader. For ${CAREER_YEARS}+ years I've built, launched and scaled brands, working where brand strategy, cultural marketing and creative technology meet: The Walt Disney Company, the launch of Air New Zealand in South America, and independent consulting since 2020. Today I'm a creative technologist: AI runs through everything I do, from producing images and video to building my own tools.`

  useEffect(() => {
    if (typeof window === "undefined") return

    const shouldSkip = window.location.hash === "#trabajos"
    setSkipTypewriter(shouldSkip)

    if (!shouldSkip) return

    const raf = window.requestAnimationFrame(() => {
      document.getElementById("trabajos")?.scrollIntoView({ behavior: "auto", block: "start" })
    })

    return () => window.cancelAnimationFrame(raf)
  }, [])

  return (
    <main className={["home-calm px-4 pb-8 pt-8 md:px-12", className].filter(Boolean).join(" ")}>
      <section className="relative mb-5 px-2 text-center sm:px-0 md:mb-6">
        <h1
          className="mb-3 text-[2.2rem] font-bold leading-none text-neon-green font-cyber glitch sm:text-4xl md:mb-4 md:text-7xl"
          data-text={siteIdentity.name.toUpperCase()}
          style={accentStyle}
        >
          {siteIdentity.name.toUpperCase()}
        </h1>
        <div className="mt-4 w-full md:mt-5">
          <div className="mx-auto flex w-full max-w-6xl justify-center text-center">
            <Typewriter
              textEs={heroCopyEs}
              textEn={heroCopyEn}
              speedMs={10.3}
              startDelayMs={180}
              fontSizePx={22}
              mobileFontSizePx={15}
              cursorSizePx={12}
              color={typewriterColor}
              cursorColor={typewriterColor}
              align="center"
              forceReveal={skipTypewriter}
              className="mx-auto w-full text-center sm:max-w-4xl md:max-w-6xl"
            />
          </div>
        </div>
      </section>

      <section id="trabajos" className="mt-2 scroll-mt-4">
        <div className="section-header">
          <h2 className="text-2xl font-bold mb-2 text-center font-cyber text-neon-green" style={accentStyle}>
            {t("project_database")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8">
          {homeProjects.slice(0, -1).map((item) => (
            <RetroBrowser
              key={item.id}
              year={item.year}
              title={item.client}
              bodyTitle={item.bodyTitle}
              titleLine2={item.clientLine2}
              clientLine3={item.clientLine3}
              slug={item.slug}
              highlight={item.highlight}
            />
          ))}
        </div>
        <div className="mt-6 flex justify-center sm:mt-8">
          <div className="w-full md:w-1/2">
            <RetroBrowser
              year={homeProjects[homeProjects.length - 1].year}
              title={homeProjects[homeProjects.length - 1].client}
              bodyTitle={homeProjects[homeProjects.length - 1].bodyTitle}
              titleLine2={homeProjects[homeProjects.length - 1].clientLine2}
              clientLine3={homeProjects[homeProjects.length - 1].clientLine3}
              slug={homeProjects[homeProjects.length - 1].slug}
              highlight={homeProjects[homeProjects.length - 1].highlight}
            />
          </div>
        </div>
      </section>

      {/* After the work, not before it: the cases come first, the summary stays visible for search and AI engines. */}
      <HomeSummary />

      <section className="mt-12 text-center">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-90"></div>
        <VisitorCounter />
        <p className="text-xs text-neon-green" style={statusStyle}>
          {t("last_update")}
        </p>
        <div className="blink mt-6 mb-2 text-neon-green" style={{ textShadow: "none", ...statusStyle }}>
          {t("system_status")}
        </div>
        <a
          href="/intro.html#/"
          className="block mt-16 text-[10px] text-neon-green/60 hover:text-neon-cyan underline"
          style={isLight ? { color: "rgba(95, 42, 13, 0.68)" } : undefined}
        >
          {siteIdentity.introReplayLabel[language]}
        </a>
      </section>
    </main>
  )
}
