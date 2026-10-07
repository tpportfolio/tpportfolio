"use client"

import { useLanguage } from "@/components/language-context"
import Image from "next/image"
import type { ReactNode } from "react"
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react"

type AboutCopy = {
  title: string
  subtitle: string
  overviewHeader: string
  skillsHeader: string
  contextHeader: string
  linksHeader: string
  name: string
  positioning: string
  subline: string
  signals: string[]
  overview: {
    intro: string
    academyLead: string
    academyTail: string
    consulting: string
    plugin: string
    introLead: string
    introLinkLabel: string
  }
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
  links: {
    linkedinLabel: string
    linkedinValue: string
    locationLabel: string
    location: string
    emailLabel: string
    email: string
    credentialLabel: string
    credential: string
    locationNodes: string[]
  }
}

const copyEs: AboutCopy = {
  title: "ACERCA DE MI",
  subtitle: "PERSONAL_PROFILE.exe",
  overviewHeader: "PROFILE_OVERVIEW",
  skillsHeader: "SKILLS",
  contextHeader: "SELECTED_CONTEXT",
  linksHeader: "LINKS / CONTACT",
  name: "TOM\u00c1S PER\u00d3",
  positioning: "Líder estratégico de marca y marketing",
  subline: "Estrategia de marca y cultura · operaciones de contenido con IA · liderazgo fractional o interino.",
  signals: ["Brand", "Content", "AI", "Storytelling", "Systems", "Strategy"],
  overview: {
    intro:
      "Trabajo hace más de 18 años en marketing, publicidad y contenido. Empecé en agencias, después pasé por marcas y startups; hoy trabajo como consultor estratégico independiente.",
    academyLead: "Exploro IA de forma autodidacta desde fines de 2022. En 2023 generé un LoRA de mi persona. Desde junio de 2024 participo del curso y la comunidad de",
    academyTail: ".",
    consulting: "Actualmente ofrezco consultoría estratégica, capacitación y apoyo en producción de contenido potenciado por IA.",
    plugin:
      "Hago plug-in a equipos de marketing, marcas o agencias para acelerar producci\u00f3n, iterar, reducir fricci\u00f3n y elevar la calidad en pipelines reales (imagen, video, audio y texto).",
    introLead: "Todo lo que ves ac\u00e1 est\u00e1 vibecodeado con IA, hasta la",
    introLinkLabel: "introducci\u00f3n",
  },
  skills: {
    positioningLabel: "POSITIONING",
    positioningValue: "Marca y cultura · Operaciones de contenido con IA · Liderazgo fractional",
    strengthsLabel: "STRENGTHS",
    strengths: ["Narrative systems", "Strategic framing", "AI-assisted content workflows", "Cultural positioning"],
    workingStyleLabel: "WORKING STYLE",
    workingStyle: ["Sharp framing", "System-first", "Fast iteration", "Low-friction collaboration"],
    bestFitLabel: "BEST FIT",
    bestFit: ["Brands in transition", "Lean marketing teams", "Agencies needing senior plug-in support"],
    focusLabel: "FOCUS",
    focus: "Positioning, storytelling, digital culture, AI workflows.",
  },
  contextItems: [
    {
      label: "TRAJECTORY",
      value: "Ex Disney, Air New Zealand, Airtm y JWT. Más de 18 años en agencias, marcas, startups y consultoría.",
    },
    {
      label: "CONTEXT",
      value: "Experiencia en corporate, growth y content systems. Multi-industria: entretenimiento, fintech, healthtech, publicidad, turismo y viajes.",
    },
    { label: "TODAY", value: "Hoy: estrategia de marca y cultura, operaciones creativas con IA y dirección fractional o interina." },
    { label: "TARGET_ROLES", value: "Head of Brand · Strategy Director · Culture Marketing Manager" },
  ],
  links: {
    linkedinLabel: "LINKEDIN",
    linkedinValue: "linkedin.com/in/tomaspero",
    locationLabel: "LOCATION",
    location: "Buenos Aires, Argentina",
    emailLabel: "EMAIL",
    email: "tomaspero@gmail.com",
    credentialLabel: "PROFILE_NOTE",
    credential: "Senior plug-in support para marcas, agencies y equipos lean.",
    locationNodes: ["ARG", "BA", "CABA"],
  },
}

const copyEn: AboutCopy = {
  title: "ABOUT ME",
  subtitle: "PERSONAL_PROFILE.exe",
  overviewHeader: "PROFILE_OVERVIEW",
  skillsHeader: "SKILLS",
  contextHeader: "SELECTED_CONTEXT",
  linksHeader: "LINKS / CONTACT",
  name: "TOM\u00c1S PER\u00d3",
  positioning: "Strategic Brand & Marketing Leader",
  subline: "Brand & culture strategy · AI-enabled content operations · fractional / interim brand leadership.",
  signals: ["Brand", "Content", "AI", "Storytelling", "Systems", "Strategy"],
  overview: {
    intro:
      "I have worked for over 18 years in marketing, advertising and content. I started in agencies, then moved through brands and startups; today I work as an independent strategic consultant.",
    academyLead: "I have explored AI independently since late 2022. In 2023, I generated a LoRA of myself. Since June 2024, I have been part of",
    academyTail: "'s course and community.",
    consulting: "Today I offer strategic consulting, training and support for AI-powered content production.",
    plugin:
      "I plug into marketing teams, brands or agencies to accelerate production, iterate, reduce friction and improve quality across real pipelines (image, video, audio and text).",
    introLead: "Everything you see here is vibe-coded with AI, including the",
    introLinkLabel: "introduction",
  },
  skills: {
    positioningLabel: "POSITIONING",
    positioningValue: "Brand & Culture · AI Content Ops · Fractional Leadership",
    strengthsLabel: "STRENGTHS",
    strengths: ["Narrative systems", "Strategic framing", "AI-assisted content workflows", "Cultural positioning"],
    workingStyleLabel: "WORKING STYLE",
    workingStyle: ["Sharp framing", "System-first", "Fast iteration", "Low-friction collaboration"],
    bestFitLabel: "BEST FIT",
    bestFit: ["Brands in transition", "Lean marketing teams", "Agencies needing senior plug-in support"],
    focusLabel: "FOCUS",
    focus: "Positioning, storytelling, digital culture, AI workflows.",
  },
  contextItems: [
    {
      label: "TRAJECTORY",
      value: "Ex Disney, Air New Zealand, Airtm and JWT. Over 18 years across agencies, brands, startups and consulting.",
    },
    {
      label: "CONTEXT",
      value: "Experience across corporate, growth and content systems. Multi-industry: entertainment, fintech, healthtech, advertising, tourism and travel.",
    },
    { label: "TODAY", value: "Today: brand and culture strategy, AI-enabled creative operations, and fractional or interim direction." },
    { label: "TARGET_ROLES", value: "Head of Brand · Strategy Director · Culture Marketing Manager" },
  ],
  links: {
    linkedinLabel: "LINKEDIN",
    linkedinValue: "linkedin.com/in/tomaspero",
    locationLabel: "LOCATION",
    location: "Buenos Aires, Argentina",
    emailLabel: "EMAIL",
    email: "tomaspero@gmail.com",
    credentialLabel: "PROFILE_NOTE",
    credential: "Senior plug-in support for brands, agencies and lean teams.",
    locationNodes: ["ARG", "BA", "CABA"],
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
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="rounded-sm border border-neon-green/20 bg-black/20 p-4">
      <BlockLabel>{label}</BlockLabel>
      {children}
    </div>
  )
}

export default function About() {
  const { language } = useLanguage()
  const copy = language === "es" ? copyEs : copyEn

  return (
    <main className="px-4 py-8 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>{"ABOUT // TOM\u00c1S PER\u00d3 // GEN_MARKETER // STRATEGIC PROFILE // BRAND + AI"}</span>
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
          <div className="terminal flex min-h-[420px] flex-col xl:col-span-8">
            <div className="terminal-header">
              <span>{copy.overviewHeader}</span>
            </div>
            <div className="terminal-content flex-1 p-5 md:p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-stretch">
                <div className="mx-auto w-full max-w-[220px] lg:mx-0 lg:max-w-[280px] lg:h-full">
                  <div className="relative aspect-square overflow-hidden border border-neon-green/35 bg-black/25 lg:h-full lg:aspect-auto">
                    <Image
                      src="/images/cuadrada.jpg"
                      alt="Tom\u00e1s Per\u00f3"
                      fill
                      sizes="(max-width: 1024px) 220px, 280px"
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

                  <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                    {copy.signals.map((signal) => (
                      <SignalChip key={signal} label={signal} />
                    ))}
                  </div>

                  <div className="space-y-4 text-sm leading-relaxed text-neon-green/90 md:text-base">
                    <p>{copy.overview.intro}</p>
                    <p>
                      {copy.overview.academyLead}{" "}
                      <a
                        href="https://www.morfeoacademy.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-neon-cyan underline hover:text-neon-magenta"
                      >
                        Morfeo Academy
                      </a>
                      {" "}
                      {copy.overview.academyTail}
                    </p>
                    <p>{copy.overview.consulting}</p>
                    <p>{copy.overview.plugin}</p>
                    <p>
                      {copy.overview.introLead}{" "}
                      <a href="/intro.html" className="text-neon-cyan underline hover:text-neon-magenta">
                        {copy.overview.introLinkLabel}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="terminal flex flex-col xl:col-span-4">
            <div className="terminal-header">
              <span>{copy.contextHeader}</span>
            </div>
            <div className="terminal-content p-5 md:p-6">
              <div className="grid grid-cols-1 gap-4">
                {copy.contextItems.map((item) => (
                  <div key={item.label} className="rounded-sm border border-neon-green/20 bg-black/20 p-4">
                    <BlockLabel>{item.label}</BlockLabel>
                    <p className="text-sm leading-relaxed text-neon-green/90 md:text-[15px]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="terminal flex flex-col xl:col-span-4">
            <div className="terminal-header">
              <span>{copy.linksHeader}</span>
            </div>
            <div className="terminal-content p-5 md:p-6">
              <div className="grid grid-cols-1 gap-4">
                <a
                  href="https://www.linkedin.com/in/tomaspero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-sm border border-neon-green/30 bg-black/20 px-4 py-4 text-neon-green transition-colors hover:border-neon-cyan hover:text-neon-cyan"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5" />
                    <div>
                      <div className="font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
                        {copy.links.linkedinLabel}
                      </div>
                      <div className="text-sm">{copy.links.linkedinValue}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-sm border border-neon-green/20 bg-black/20 p-4">
                    <div className="mb-3 flex items-center gap-2 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
                      <MapPin className="h-3.5 w-3.5" />
                      {copy.links.locationLabel}
                    </div>
                    <p className="text-sm leading-relaxed text-neon-green/90">{copy.links.location}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {copy.links.locationNodes.map((node) => (
                        <span
                          key={node}
                          className="rounded-sm border border-neon-green/20 px-2.5 py-1 font-cyber text-[10px] uppercase tracking-[0.18em] text-neon-cyan"
                        >
                          {node}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-sm border border-neon-green/20 bg-black/20 p-4">
                    <div className="mb-3 flex items-center gap-2 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
                      <Mail className="h-3.5 w-3.5" />
                      {copy.links.emailLabel}
                    </div>
                    <a href={`mailto:${copy.links.email}`} className="text-sm text-neon-green/90 hover:text-neon-cyan">
                      {copy.links.email}
                    </a>
                  </div>
                </div>

                <div className="rounded-sm border border-neon-green/20 bg-black/20 p-4">
                  <BlockLabel>{copy.links.credentialLabel}</BlockLabel>
                  <p className="text-sm leading-relaxed text-neon-green/90">{copy.links.credential}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="terminal flex flex-col xl:col-span-8">
            <div className="terminal-header">
              <span>{copy.skillsHeader}</span>
            </div>
            <div className="terminal-content p-5 md:p-6">
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[0.9fr_1.2fr_1fr]">
                <SkillsSection label={copy.skills.positioningLabel}>
                  <div className="font-cyber text-lg text-neon-green">{copy.skills.positioningValue}</div>
                </SkillsSection>

                <div className="grid grid-cols-1 gap-4">
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
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <SkillsSection label={copy.skills.bestFitLabel}>
                    <div className="space-y-2">
                      {copy.skills.bestFit.map((item) => (
                        <div key={item} className="rounded-sm border border-neon-green/20 px-3 py-2 text-sm text-neon-green/85">
                          {item}
                        </div>
                      ))}
                    </div>
                  </SkillsSection>

                  <SkillsSection label={copy.skills.focusLabel}>
                    <p className="text-sm leading-relaxed text-neon-green/90">{copy.skills.focus}</p>
                  </SkillsSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
