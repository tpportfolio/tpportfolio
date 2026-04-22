"use client"

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

export function HomePageView({ className, variantMode = "default" }: HomePageViewProps) {
  const { t, language } = useLanguage()
  const { mode } = useVisualMode()
  const effectiveMode = variantMode === "default" ? mode : variantMode
  const isLight = effectiveMode === "light"

  const accentStyle = isLight
    ? { color: "#2f1607", textShadow: "0 0 18px rgba(205, 108, 27, 0.18)" }
    : undefined

  const secondaryStyle = isLight
    ? { color: "#8b4315", textShadow: "0 0 10px rgba(188, 104, 28, 0.14)" }
    : undefined

  const typewriterColor = isLight ? "#b85a17" : "#00ff00"
  const statusStyle = isLight ? { color: "#7a3913" } : undefined

  return (
    <main className={["py-8 px-4 md:px-12", className].filter(Boolean).join(" ")}>
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>{siteIdentity.marquee}</span>
        </div>
      </div>

      <section className="relative text-center mb-6">
        <h1
          className="text-4xl md:text-7xl font-bold mb-4 text-neon-green font-cyber glitch"
          data-text={siteIdentity.name.toUpperCase()}
          style={accentStyle}
        >
          {siteIdentity.name.toUpperCase()}
        </h1>
        <h2 className="text-xl md:text-2xl text-neon-cyan mb-0 font-cyber" style={secondaryStyle}>
          {siteIdentity.role}
        </h2>
        <div className="mt-5 w-full">
          <div className="mx-auto flex w-full max-w-5xl justify-center text-center">
            <Typewriter
              textEs={siteIdentity.heroCopy.es}
              textEn={siteIdentity.heroCopy.en}
              speedMs={10.3}
              startDelayMs={180}
              fontSizePx={24}
              mobileFontSizePx={16}
              cursorSizePx={12}
              color={typewriterColor}
              cursorColor={typewriterColor}
              align="center"
              className="mx-auto max-w-5xl text-center"
            />
          </div>
        </div>
      </section>

      <section className="mt-2">
        <div className="section-header">
          <h2 className="text-2xl font-bold mb-4 text-center font-cyber text-neon-green" style={accentStyle}>
            {t("project_database")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <div className="flex justify-center mt-8">
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
