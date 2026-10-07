import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Handshake,
  Megaphone,
  Radio,
  ScrollText,
  type LucideIcon,
} from "lucide-react"

export type DraftVersion = "v1" | "v2" | "v3" | "v4" | "v5" | "v6"

export type CapabilityItem = {
  title: string
  description: string
  icon: LucideIcon
}

export const capabilities: CapabilityItem[] = [
  {
    title: "Strategy",
    description: "Brand positioning, go-to-market planning, marketing strategy and growth initiatives.",
    icon: BrainCircuit,
  },
  {
    title: "Partnerships",
    description: "Sponsorships, media alliances, creator collaborations and business development.",
    icon: Handshake,
  },
  {
    title: "Content",
    description: "Content strategy, storytelling, social media frameworks, podcasts and branded content.",
    icon: ScrollText,
  },
  {
    title: "AI Systems",
    description: "AI-assisted workflows for research, content production, creative development and marketing operations.",
    icon: Bot,
  },
  {
    title: "Campaigns",
    description: "Integrated campaigns, product launches, activations and audience growth initiatives.",
    icon: Megaphone,
  },
  {
    title: "Experiences",
    description: "Events, creator programs, cultural initiatives and community-driven activations.",
    icon: Radio,
  },
]

export const industries = [
  "Entertainment",
  "Media",
  "Travel",
  "Fintech",
  "Healthcare",
  "Technology",
  "Esports",
  "Creator Economy",
]

export const engagements = [
  "Strategic Advisor",
  "Fractional Marketing Lead",
  "Project-Based Consulting",
  "AI Workshops & Training",
]

export const corePositioning =
  "I help brands, startups and media companies grow through strategy, partnerships, content and AI."

const versionLinks: Array<{ key: DraftVersion; href: string; label: string }> = [
  { key: "v1", href: "/drafts/capabilities", label: "CONTROL_ROOM" },
  { key: "v2", href: "/drafts/capabilities-v2", label: "DOSSIER_MODE" },
  { key: "v3", href: "/drafts/capabilities-v3", label: "TRANSMISSION" },
  { key: "v4", href: "/drafts/capabilities-v4", label: "BIG_POSTER" },
  { key: "v5", href: "/drafts/capabilities-v5", label: "BUTTON_FIELD" },
  { key: "v6", href: "/drafts/capabilities-v6", label: "SIGNAL_FLOW" },
]

export function DraftShell({
  currentVersion,
  marquee,
  title,
  subtitle,
  children,
}: {
  currentVersion: DraftVersion
  marquee: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <main className="px-4 py-8 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>{marquee}</span>
        </div>
      </div>

      <section className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold font-cyber text-neon-green glitch md:text-5xl" data-text={title}>
          {title}
        </h1>
        <h2 className="mb-4 text-xl font-cyber text-neon-cyan">{subtitle}</h2>
        <DraftVersionNav currentVersion={currentVersion} />
      </section>

      {children}
    </main>
  )
}

export function DraftVersionNav({ currentVersion }: { currentVersion: DraftVersion }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {versionLinks.map((item) => {
        const active = item.key === currentVersion

        return (
          <Link
            key={item.key}
            href={item.href}
            className={`rounded-sm border px-3 py-1.5 font-cyber text-[11px] uppercase tracking-[0.16em] transition-colors ${
              active
                ? "border-neon-green bg-black text-neon-green"
                : "border-neon-green/25 bg-black/30 text-neon-cyan hover:border-neon-cyan hover:text-neon-green"
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export function TerminalSection({
  title,
  children,
  className = "",
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`terminal flex flex-col ${className}`.trim()}>
      <div className="terminal-header">
        <span>{title}</span>
      </div>
      <div className="terminal-content p-5 md:p-6">{children}</div>
    </section>
  )
}

export function BlockLabel({ children }: { children: ReactNode }) {
  return <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">{children}</div>
}

export function SmallChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-neon-green/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-neon-green/90">
      {children}
    </span>
  )
}

export function PrimaryCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 border border-neon-green bg-black px-4 py-2 font-cyber text-xs uppercase tracking-[0.16em] text-neon-green transition-colors hover:border-neon-cyan hover:text-neon-cyan"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  )
}

export function StatusMeter({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-neon-green/20 bg-black/20 p-3">
      <div className="mb-2 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">{label}</div>
      <div className="text-sm text-neon-green/90">{value}</div>
    </div>
  )
}
