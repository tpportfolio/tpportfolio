"use client"

import { useLanguage } from "@/components/language-context"
import Image from "next/image"
import type { ReactNode } from "react"
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react"

type Segment = string | { text: string; href: string; external?: boolean }

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

const MORFEO_URL = "https://www.morfeoacademy.com/"
const INTRO_URL = "/intro.html"

const copyEs: AboutCopy = {
  title: "ACERCA DE MÍ",
  subtitle: "PERSONAL_PROFILE.exe",
  overviewHeader: "PROFILE_OVERVIEW",
  skillsHeader: "SKILLS",
  contextHeader: "SELECTED_CONTEXT",
  linksHeader: "LINKS / CONTACT",
  name: "TOMÁS PERÓ",
  positioning: "Brand Strategist & Brand Marketing Leader",
  subline: "Estrategia de marca · marketing cultural · tecnología creativa. Más de 18 años construyendo, lanzando y escalando marcas.",
  signals: ["Brand Strategy", "Brand Marketing", "Cultural Marketing", "Go-To-Market", "Creative Technology", "AI Workflows"],
  overview: [
    [
      "Soy Brand Strategist y líder de marketing de marca, con más de 18 años construyendo, lanzando y escalando marcas en entretenimiento, aviación, esports, fintech, healthtech y producción audiovisual. Trabajo en el cruce entre estrategia de marca, marketing cultural y tecnología creativa: defino posicionamiento y plataformas de marca, los convierto en campañas integradas de go-to-market y acelero la ejecución con workflows creativos potenciados por IA.",
    ],
    [
      "Me formé en agencias (Altheim y J. Walter Thompson) y mi carrera de marca empezó en The Walt Disney Company: coordiné promociones y alianzas de marca para toda Latinoamérica dentro de uno de los sistemas de marca más disciplinados del mundo, después pasé a distribución digital y dediqué el 20% de mi tiempo a Disney Labs, su programa de innovación y emprendimiento corporativo.",
    ],
    [
      "Entre 2015 y 2020 lideré el marketing regional y el desarrollo de mercado de Air New Zealand en Sudamérica: lanzamiento de marca en mercados nuevos, plan de negocios a 5 años y cinco agencias de creatividad, medios, PR y activaciones trabajando con una sola voz de marca.",
    ],
    [
      "Desde 2020 acompaño a marcas en lanzamiento o en transición: Stone Movistar (esports y streaming), Airtm (fintech), DrGea.com (healthtech, como Head of Communications) y Paradise.la, la productora a la que asesoré en su transición hacia la producción creativa con IA.",
    ],
    [
      "Miro las marcas con lente cultural: entretenimiento, deporte, gaming, streaming, música y creadores son los espacios donde hoy una marca gana relevancia. No los miro desde afuera: soy fan del deporte, del stand-up y del hardware de alto rendimiento, y entreno varios días por semana.",
    ],
    [
      "Como creative technologist uso todos los días un stack de IA (ChatGPT, Claude, Perplexity, NotebookLM, Flux, Midjourney, Kling, Veo, ElevenLabs y v0, entre otros) para prototipar campañas, acelerar la producción de contenido y ampliar lo que puede entregar un equipo de marca chico. Exploro IA de forma autodidacta desde fines de 2022, en 2023 generé un LoRA de mi persona y desde junio de 2024 participo del curso y la comunidad de ",
      { text: "Morfeo Academy", href: MORFEO_URL, external: true },
      ". También desarrollo mis propias herramientas: transcripción local de audio, subtitulado de video, redimensionado de imágenes y extracción de leads.",
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
  links: {
    linkedinLabel: "LINKEDIN",
    linkedinValue: "linkedin.com/in/tomaspero",
    locationLabel: "LOCATION",
    location: "Buenos Aires, Argentina",
    emailLabel: "EMAIL",
    email: "tomaspero@gmail.com",
    credentialLabel: "PROFILE_NOTE",
    credential: "Disponible para roles de liderazgo de marca y para proyectos de consultoría con marcas, agencias y equipos lean.",
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
  name: "TOMÁS PERÓ",
  positioning: "Brand Strategist & Brand Marketing Leader",
  subline: "Brand strategy · cultural marketing · creative technology. 18+ years building, launching and scaling brands.",
  signals: ["Brand Strategy", "Brand Marketing", "Cultural Marketing", "Go-To-Market", "Creative Technology", "AI Workflows"],
  overview: [
    [
      "I'm a Brand Strategist and Brand Marketing Leader with 18+ years of experience building, launching and scaling brands across entertainment, aviation, esports, fintech, healthtech and audiovisual production. I work at the intersection of brand strategy, cultural marketing and creative technology: I define positioning and brand platforms, turn them into integrated go-to-market campaigns, and speed up execution with AI-powered creative workflows.",
    ],
    [
      "I trained in agencies (Altheim and J. Walter Thompson), and my brand career began at The Walt Disney Company: I coordinated promotions and brand partnerships for all of Latin America inside one of the world's most disciplined brand systems, then moved into digital distribution and spent 20% of my time on Disney Labs, its corporate entrepreneurship and innovation programme.",
    ],
    [
      "From 2015 to 2020 I led regional marketing and market development for Air New Zealand in South America: brand launches in new markets, a 5-year business plan, and five creative, media, PR and activation agencies working with a single brand voice.",
    ],
    [
      "Since 2020 I have worked with brands that are launching or in transition: Stone Movistar (esports and streaming), Airtm (fintech), DrGea.com (healthtech, as Head of Communications) and Paradise.la, the production studio I advised on its transition to AI-enabled creative production.",
    ],
    [
      "I look at brands through a cultural lens: entertainment, sport, gaming, streaming, music and creators are where brands earn relevance today. I don't watch them from the outside: I'm a sports fan, a stand-up comedy fan and a high-performance hardware nerd, and I train several days a week.",
    ],
    [
      "As a creative technologist I run a daily AI stack (ChatGPT, Claude, Perplexity, NotebookLM, Flux, Midjourney, Kling, Veo, ElevenLabs and v0, among others) to prototype campaigns, accelerate content production and expand what a small brand team can deliver. I have explored AI independently since late 2022, generated a LoRA of myself in 2023, and since June 2024 I have been part of ",
      { text: "Morfeo Academy", href: MORFEO_URL, external: true },
      "'s course and community. I also build my own tools: local audio transcription, video subtitling, image resizing and lead extraction.",
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
  links: {
    linkedinLabel: "LINKEDIN",
    linkedinValue: "linkedin.com/in/tomaspero",
    locationLabel: "LOCATION",
    location: "Buenos Aires, Argentina",
    emailLabel: "EMAIL",
    email: "tomaspero@gmail.com",
    credentialLabel: "PROFILE_NOTE",
    credential: "Available for brand leadership roles and for consulting projects with brands, agencies and lean teams.",
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
          <div className="terminal flex min-h-[420px] flex-col xl:col-span-8">
            <div className="terminal-header">
              <span>{copy.overviewHeader}</span>
            </div>
            <div className="terminal-content flex-1 p-5 md:p-6">
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
          </div>

          <div className="terminal flex flex-col xl:col-span-4">
            <div className="terminal-header">
              <span>{copy.contextHeader}</span>
            </div>
            <div className="terminal-content flex-1 p-5 md:p-6">
              <div className="grid h-full grid-cols-1 gap-4 xl:auto-rows-fr">
                {copy.contextItems.map((item) => (
                  <div key={item.label} className="flex flex-col justify-center rounded-sm border border-neon-green/20 bg-black/20 p-4">
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
