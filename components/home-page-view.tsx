"use client"

import { useEffect, useMemo, useState } from "react"
import { useVisualMode } from "@/components/visual-mode-context"
import { useLanguage } from "@/components/language-context"
import { RetroBrowser } from "@/components/retro-browser"
import Typewriter from "@/components/typewriter"
import VisitorCounter from "@/components/visitor-counter"
import { homeProjects, siteIdentity } from "@/lib/site-content"

type VariantMode = "default" | "dark" | "light"

interface HomePageViewProps {
  className?: string
  variantMode?: VariantMode
}

function getExperienceYears() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date())

  const year = Number(parts.find((part) => part.type === "year")?.value ?? "2007")
  const month = Number(parts.find((part) => part.type === "month")?.value ?? "1")
  const day = Number(parts.find((part) => part.type === "day")?.value ?? "1")

  let years = year - 2007
  if (month < 6 || (month === 6 && day < 2)) {
    years -= 1
  }

  return years
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

  const secondaryStyle = isLight
    ? { color: "#8b4315", textShadow: "0 0 10px rgba(188, 104, 28, 0.14)" }
    : undefined

  const typewriterColor = isLight ? "#b85a17" : "#00ff00"
  const statusStyle = isLight ? { color: "#7a3913" } : undefined

  const experienceYears = useMemo(() => getExperienceYears(), [])
  const heroCopyEs = `Soy Tomás, líder estratégico de marca y marketing. Conecto cultura y entretenimiento con tecnología para construir marcas y mejorar operaciones creativas, con ${experienceYears} años de trayectoria.`
  const heroCopyEn = `I'm Tomás, a strategic brand and marketing leader. I connect culture and entertainment with technology to build brands and improve creative operations, with ${experienceYears} years of experience.`

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
    <main className={["px-4 pb-8 pt-8 md:px-12", className].filter(Boolean).join(" ")}>
      <div className="marquee-container mb-6 pl-16 pr-3 lg:px-2">
        <div className="marquee">
          <span>{siteIdentity.marquee}</span>
        </div>
      </div>

      <section className="relative mb-8 px-2 text-center sm:px-0">
        <h1
          className="mb-3 text-[2.2rem] font-bold leading-none text-neon-green font-cyber glitch sm:text-4xl md:mb-4 md:text-7xl"
          data-text={siteIdentity.name.toUpperCase()}
          style={accentStyle}
        >
          {siteIdentity.name.toUpperCase()}
        </h1>
        <h2 className="mb-0 text-base text-neon-cyan font-cyber sm:text-xl md:text-2xl" style={secondaryStyle}>
          {siteIdentity.role}
        </h2>
        <div className="mt-4 w-full md:mt-5">
          <div className="mx-auto flex w-full max-w-5xl justify-center text-center">
            <Typewriter
              textEs={heroCopyEs}
              textEn={heroCopyEn}
              speedMs={10.3}
              startDelayMs={180}
              fontSizePx={24}
              mobileFontSizePx={15}
              cursorSizePx={12}
              color={typewriterColor}
              cursorColor={typewriterColor}
              align="center"
              forceReveal={skipTypewriter}
              className="mx-auto max-w-[23rem] text-center sm:max-w-3xl md:max-w-5xl"
            />
          </div>
        </div>
      </section>

      <section id="trabajos" className="mt-2 scroll-mt-4">
        <div className="section-header">
          <h2 className="text-2xl font-bold mb-4 text-center font-cyber text-neon-green" style={accentStyle}>
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
