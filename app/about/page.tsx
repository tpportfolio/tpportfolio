"use client"

import { useLanguage } from "@/components/language-context"
import { useVisualMode } from "@/components/visual-mode-context"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { WindowFrame } from "@/components/video-window"

type Segment = string | { bold: string } | { text: string; href: string; external?: boolean }

type AboutCopy = {
  title: string
  subtitle: string
  overviewHeader: string
  skillsHeader: string
  contextHeader: string
  name: string
  positioning: string
  subline: string
  signals: string[]
  overview: Segment[][]
  skills: {
    positioningLabel: string
    positioningValue: string
    strengthsLabel: string
    strengths: string[]
    workingStyleLabel: string
    workingStyle: string[]
    bestFitLabel: string
    bestFit: string[]
    focusLabel: string
    focus: string
  }
  contextItems: Array<{ label: string; value: string }>
  cta: {
    prompt: string
    label: string
  }
}

const MORFEO_URL = "https://www.morfeoacademy.com/"
const INTRO_URL = "/intro.html"

const B = (bold: string) => ({ bold })

const copyEs: AboutCopy = {
  title: "ACERCA DE MI",
  subtitle: "PERSONAL_PROFILE.exe",
  overviewHeader: "PROFILE_OVERVIEW",
  skillsHeader: "SKILLS",
  contextHeader: "SELECTED_CONTEXT",
  name: "TOMÁS PERÓ",
  positioning: "Brand Strategist & Brand Marketing Leader",
  subline: "Estrategia de marca · marketing cultural · tecnología creativa. Más de 18 años construyendo, lanzando y escalando marcas.",
  signals: ["Brand Strategy", "Brand Marketing", "Cultural Marketing", "Go-To-Market", "Creative Technology", "AI Workflows"],
  overview: [
    [
      "Soy ", B("Brand Strategist"), " y líder de ", B("marketing de marca"), ", con más de ", B("18 años"),
      " construyendo, lanzando y escalando marcas en entretenimiento, aviación, esports, fintech, healthtech y producción audiovisual. Trabajo en el cruce entre ",
      B("estrategia de marca"), ", ", B("marketing cultural"), " y ", B("tecnología creativa"), ".",
    ],
    [
      "Me formé en agencias (", B("Altheim"), " y ", B("J. Walter Thompson"), ") y mi carrera de marca empezó en ", B("The Walt Disney Company"),
      ": ", B("promociones y alianzas de marca"), " para toda Latinoamérica, después ", B("distribución digital"), " y ", B("Disney Labs"),
      ", su programa de innovación.",
    ],
    [
      "En ", B("Air New Zealand"), " (2015–2020) lideré el ", B("marketing regional"), " y el ", B("desarrollo de mercado"),
      " para Sudamérica: ", B("lanzamiento de marca"), ", plan de negocios a 5 años y cinco agencias trabajando con una sola voz de marca.",
    ],
    [
      "Desde 2020 acompaño a marcas en lanzamiento o en transición: ", B("Stone Movistar"), " (esports y streaming), ", B("Airtm"),
      " (fintech), ", B("DrGea.com"), " (healthtech) y ", B("Paradise.la"), " (producción creativa con ", B("IA"), ").",
    ],
    [
      "Miro las marcas con ", B("lente cultural"),
      ": entretenimiento, deporte, gaming, streaming, música y creadores. No los miro desde afuera: soy fan del deporte, del stand-up y del hardware.",
    ],
    [
      "Como ", B("creative technologist"), " uso todos los días un stack de ", B("IA"), " para ", B("prototipar campañas"),
      ", acelerar la ", B("producción de contenido"),
      " y ampliar lo que puede entregar un equipo de marca chico. Me formo en ",
      { text: "Morfeo Academy", href: MORFEO_URL, external: true },
      " desde 2024 y desarrollo mis propias herramientas.",
    ],
    [
      "Todo lo que ves acá está vibecodeado con IA, hasta la ",
      { text: "introducción", href: INTRO_URL },
      ".",
    ],
  ],
  skills: {
    positioningLabel: "POSITIONING",
    positioningValue: "Brand Strategy · Cultural Marketing · Creative Technology",
    strengthsLabel: "STRENGTHS",
    strengths: [
      "Brand strategy & positioning",
      "Integrated go-to-market",
      "Cultural marketing & partnerships",
      "Agency orchestration",
      "AI-powered creative workflows",
    ],
    workingStyleLabel: "WORKING STYLE",
    workingStyle: ["Sharp framing", "System-first", "Fast iteration", "Low-friction collaboration"],
    bestFitLabel: "BEST FIT",
    bestFit: ["Marcas en lanzamiento o en transición", "Equipos de marca y marketing lean", "Agencias y estudios que suman IA a su producción"],
    focusLabel: "FOCUS",
    focus: "Posicionamiento, plataformas de marca, narrativa, cultura digital y workflows de IA.",
  },
  contextItems: [
    {
      label: "TRAJECTORY",
      value: "Ex Disney, Air New Zealand, Airtm, DrGea y JWT. Más de 18 años entre agencias, marcas globales, startups y consultoría.",
    },
    {
      label: "INDUSTRIES",
      value: "Entretenimiento, aviación y turismo, esports y streaming, fintech, healthtech y producción audiovisual.",
    },
    {
      label: "BRAND_LEADERSHIP",
      value: "Estrategia y posicionamiento de marca, lanzamientos go-to-market, orquestación de agencias y liderazgo cross-funcional entre marketing, ventas, producto y producción.",
    },
    { label: "EDUCATION", value: "Lic. en Publicidad (UCES). IA generativa en Morfeo Academy (2024–2026)." },
    {
      label: "TARGET_ROLES",
      value: "Head of Brand · Brand Lead · Brand Manager · Brand Marketing Manager · Brand Strategist · Cultural Marketing · Creative Technologist",
    },
  ],
  cta: {
    prompt: "¿Hablamos? Todos mis canales están en la página de contacto.",
    label: "CONTACTO",
  },
}

const copyEn: AboutCopy = {
  title: "ABOUT ME",
  subtitle: "PERSONAL_PROFILE.exe",
  overviewHeader: "PROFILE_OVERVIEW",
  skillsHeader: "SKILLS",
  contextHeader: "SELECTED_CONTEXT",
  name: "TOMÁS PERÓ",
  positioning: "Brand Strategist & Brand Marketing Leader",
  subline: "Brand strategy · cultural marketing · creative technology. 18+ years building, launching and scaling brands.",
  signals: ["Brand Strategy", "Brand Marketing", "Cultural Marketing", "Go-To-Market", "Creative Technology", "AI Workflows"],
  overview: [
    [
      "I'm a ", B("Brand Strategist"), " and ", B("Brand Marketing Leader"), " with ", B("18+ years"),
      " building, launching and scaling brands across entertainment, aviation, esports, fintech, healthtech and audiovisual production. I work at the intersection of ",
      B("brand strategy"), ", ", B("cultural marketing"), " and ", B("creative technology"), ".",
    ],
    [
      "I trained in agencies (", B("Altheim"), " and ", B("J. Walter Thompson"), "), and my brand career began at ", B("The Walt Disney Company"),
      ": ", B("brand promotions and partnerships"), " for all of Latin America, then ", B("digital distribution"), " and ", B("Disney Labs"),
      ", its innovation programme.",
    ],
    [
      "At ", B("Air New Zealand"), " (2015–2020) I led ", B("regional marketing"), " and ", B("market development"),
      " for South America: ", B("brand launch"), ", a 5-year business plan and five agencies working with a single brand voice.",
    ],
    [
      "Since 2020 I have worked with brands that are launching or in transition: ", B("Stone Movistar"), " (esports and streaming), ", B("Airtm"),
      " (fintech), ", B("DrGea.com"), " (healthtech) and ", B("Paradise.la"), " (creative production with ", B("AI"), ").",
    ],
    [
      "I look at brands through a ", B("cultural lens"),
      ": entertainment, sport, gaming, streaming, music and creators. I don't watch them from the outside: I'm a fan of sport, stand-up comedy and hardware.",
    ],
    [
      "As a ", B("creative technologist"), " I run a daily ", B("AI"), " stack to ", B("prototype campaigns"),
      ", speed up ", B("content production"),
      " and expand what a small brand team can deliver. I have trained at ",
      { text: "Morfeo Academy", href: MORFEO_URL, external: true },
      " since 2024 and I build my own tools.",
    ],
    [
      "Everything you see here is vibe-coded with AI, including the ",
      { text: "introduction", href: INTRO_URL },
      ".",
    ],
  ],
  skills: {
    positioningLabel: "POSITIONING",
    positioningValue: "Brand Strategy · Cultural Marketing · Creative Technology",
    strengthsLabel: "STRENGTHS",
    strengths: [
      "Brand strategy & positioning",
      "Integrated go-to-market",
      "Cultural marketing & partnerships",
      "Agency orchestration",
      "AI-powered creative workflows",
    ],
    workingStyleLabel: "WORKING STYLE",
    workingStyle: ["Sharp framing", "System-first", "Fast iteration", "Low-friction collaboration"],
    bestFitLabel: "BEST FIT",
    bestFit: ["Brands launching or in transition", "Lean brand and marketing teams", "Agencies and studios adding AI to production"],
    focusLabel: "FOCUS",
    focus: "Positioning, brand platforms, narrative, digital culture and AI workflows.",
  },
  contextItems: [
    {
      label: "TRAJECTORY",
      value: "Ex Disney, Air New Zealand, Airtm, DrGea and JWT. 18+ years across agencies, global brands, startups and consulting.",
    },
    {
      label: "INDUSTRIES",
      value: "Entertainment, aviation and tourism, esports and streaming, fintech, healthtech and audiovisual production.",
    },
    {
      label: "BRAND_LEADERSHIP",
      value: "Brand strategy and positioning, go-to-market launches, agency orchestration and cross-functional leadership across marketing, sales, product and production.",
    },
    { label: "EDUCATION", value: "Bachelor's degree in Advertising (UCES). Generative AI at Morfeo Academy (2024–2026)." },
    {
      label: "TARGET_ROLES",
      value: "Head of Brand · Brand Lead · Brand Manager · Brand Marketing Manager · Brand Strategist · Cultural Marketing · Creative Technologist",
    },
  ],
  cta: {
    prompt: "Shall we talk? All my channels are on the contact page.",
    label: "CONTACT",
  },
}

function SignalChip({ label }: { label: string }) {
  return (
    <span className="rounded-sm border border-neon-green/25 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-neon-cyan">
      {label}
    </span>
  )
}

function SkillPill({ label }: { label: string }) {
  return (
    <span className="rounded-sm border border-neon-green/20 px-2.5 py-1 text-[12px] leading-none text-neon-green/90">
      {label}
    </span>
  )
}

function BlockLabel({ children }: { children: ReactNode }) {
  return <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">{children}</div>
}

function SkillsSection({
  label,
  children,
  className = "",
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-sm border border-neon-green/20 bg-black/20 p-4 ${className}`}>
      <BlockLabel>{label}</BlockLabel>
      {children}
    </div>
  )
}

export default function About() {
  const { language } = useLanguage()
  const { mode } = useVisualMode()
  const copy = language === "es" ? copyEs : copyEn

  // One bold treatment for brands, skills and key terms: bright white in dark mode, deep brown in light mode.
  const boldClass = mode === "light" ? "font-bold text-[#2e1305]" : "font-bold text-white"
  const ctaToneClass =
    mode === "light"
      ? "border-[#c57b45] bg-[#fff2e3] text-[#8b4315] hover:bg-[#f5e4d2]"
      : "border-neon-green bg-black text-neon-green shadow-[0_0_12px_rgba(57,255,20,0.25)] hover:bg-neon-green/10"

  return (
    <main className="px-4 py-8 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>{"ABOUT // TOMÁS PERÓ // BRAND STRATEGIST // BRAND MARKETING LEADER // CULTURAL MARKETING // CREATIVE TECHNOLOGY"}</span>
        </div>
      </div>

      <section className="mb-10 text-center">
        <h1
          className="mb-4 text-4xl font-bold font-cyber text-neon-green glitch md:text-5xl"
          data-text={copy.title}
        >
          {copy.title}
        </h1>
        <h2 className="mb-4 text-xl font-cyber text-neon-cyan">{copy.subtitle}</h2>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          <WindowFrame title={copy.overviewHeader} className="flex min-h-[420px] flex-col xl:col-span-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
                <div className="mx-auto w-full max-w-[220px] lg:mx-0 lg:max-w-[240px]">
                  <div className="relative aspect-square overflow-hidden border border-neon-green/35 bg-black/25">
                    <Image
                      src="/images/cuadrada.jpg"
                      alt="Tomás Peró"
                      fill
                      sizes="(max-width: 1024px) 220px, 240px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <div className="mb-4">
                    <h2 className="font-cyber text-3xl text-neon-green md:text-4xl">{copy.name}</h2>
                    <p className="mt-2 font-cyber text-lg text-neon-cyan md:text-xl">{copy.positioning}</p>
                    <p className="mt-3 text-sm leading-relaxed text-neon-green/80 md:text-base">
                      {copy.subline}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                    {copy.signals.map((signal) => (
                      <SignalChip key={signal} label={signal} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 max-w-[78ch] space-y-5 border-t border-neon-green/20 pt-6 text-sm leading-[1.75] text-neon-green/90 md:text-base">
                {copy.overview.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.map((segment, segmentIndex) =>
                      typeof segment === "string" ? (
                        <span key={segmentIndex}>{segment}</span>
                      ) : "bold" in segment ? (
                        <strong key={segmentIndex} className={boldClass}>
                          {segment.bold}
                        </strong>
                      ) : (
                        <a
                          key={segmentIndex}
                          href={segment.href}
                          {...(segment.external ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="text-neon-cyan underline hover:text-neon-magenta"
                        >
                          {segment.text}
                        </a>
                      ),
                    )}
                  </p>
                ))}
              </div>
            </div>
          </WindowFrame>

          <WindowFrame title={copy.contextHeader} className="flex flex-col xl:col-span-4">
            <div className="flex-1">
              <div className="grid h-full grid-cols-1 gap-4 xl:auto-rows-fr">
                {copy.contextItems.map((item) => (
                  <div key={item.label} className="flex flex-col justify-center rounded-sm border border-neon-green/20 bg-black/20 p-4">
                    <BlockLabel>{item.label}</BlockLabel>
                    <p className="text-sm leading-relaxed text-neon-green/90 md:text-[15px]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </WindowFrame>

          <WindowFrame title={copy.skillsHeader} className="flex flex-col xl:col-span-12">
            <div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                <SkillsSection label={copy.skills.positioningLabel}>
                  <div className="font-cyber text-lg leading-snug text-neon-green">{copy.skills.positioningValue}</div>
                </SkillsSection>

                <SkillsSection label={copy.skills.focusLabel} className="xl:col-span-2">
                  <p className="text-sm leading-relaxed text-neon-green/90 md:text-[15px]">{copy.skills.focus}</p>
                </SkillsSection>

                <SkillsSection label={copy.skills.strengthsLabel}>
                  <div className="flex flex-wrap gap-2">
                    {copy.skills.strengths.map((item) => (
                      <SkillPill key={item} label={item} />
                    ))}
                  </div>
                </SkillsSection>

                <SkillsSection label={copy.skills.workingStyleLabel}>
                  <div className="flex flex-wrap gap-2">
                    {copy.skills.workingStyle.map((item) => (
                      <SkillPill key={item} label={item} />
                    ))}
                  </div>
                </SkillsSection>

                <SkillsSection label={copy.skills.bestFitLabel} className="lg:col-span-2 xl:col-span-1">
                  <div className="space-y-2">
                    {copy.skills.bestFit.map((item) => (
                      <div key={item} className="rounded-sm border border-neon-green/20 px-3 py-2 text-sm text-neon-green/85">
                        {item}
                      </div>
                    ))}
                  </div>
                </SkillsSection>
              </div>
            </div>
          </WindowFrame>

          <div className="flex flex-col items-start gap-4 rounded-sm border border-neon-green/30 bg-black/20 p-5 sm:flex-row sm:items-center sm:justify-start sm:gap-6 md:p-6 xl:col-span-12">
            <p className="text-sm leading-relaxed text-neon-green/90 md:text-base">{copy.cta.prompt}</p>
            <Link
              href="/contact"
              className={`inline-flex shrink-0 items-center gap-2 rounded-sm border px-5 py-3 font-cyber text-sm uppercase tracking-[0.18em] transition-colors ${ctaToneClass}`}
            >
              {copy.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
