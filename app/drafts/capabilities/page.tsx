import type { Metadata } from "next"
import styles from "@/components/capabilities-drafts.module.css"
import {
  DraftShell,
  PrimaryCta,
  SmallChip,
  StatusMeter,
  TerminalSection,
  capabilities,
  corePositioning,
  engagements,
  industries,
} from "@/components/capabilities-drafts"

export const metadata: Metadata = {
  title: "Capabilities Draft | Tomas Pero",
  description: "Control room capabilities draft for Tomas Pero.",
  robots: {
    index: false,
    follow: false,
  },
}

const statusSignals = [
  { label: "MODE", value: "Strategic advisor with operator mindset" },
  { label: "BEST_USE", value: "Launches, repositioning, partnership programs, AI-enabled content systems" },
  { label: "NOT_FOR", value: "Execution-only retainers with no strategic layer" },
]

const moduleSpans = [
  "xl:col-span-7",
  "xl:col-span-5",
  "xl:col-span-5",
  "xl:col-span-7",
  "xl:col-span-8",
  "xl:col-span-4",
]

const moduleMeters = ["74%", "68%", "72%", "82%", "70%", "64%"]

export default function CapabilitiesDraftPage() {
  return (
    <DraftShell
      currentVersion="v1"
      marquee="CONTROL ROOM // STRATEGY SIGNALS // PARTNERSHIP SYSTEMS // CONTENT OPERATIONS // AI LAYERS //"
      title="CAPABILITIES"
      subtitle="CONTROL_ROOM.exe"
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <TerminalSection title="PRIMARY_SIGNAL" className={`xl:col-span-8 ${styles.frame} ${styles.aura}`}>
          <div className={`${styles.ghostWord} hidden lg:block`}>CONTROL</div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(250px,0.75fr)]">
            <div className={`${styles.revealUp} ${styles.delay1}`}>
              <div className="mb-4 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">LIVE_SCOPE</div>
              <p className="max-w-2xl text-[1.1rem] leading-relaxed text-neon-green md:text-[1.35rem]">
                {corePositioning}
              </p>
              <div className="mt-6 space-y-2 text-sm leading-relaxed text-neon-green/90 md:text-base">
                <p>I work best when the challenge is strategic, cross-functional and still needs real-world execution judgment.</p>
                <p>Closer to a control layer for growth, partnerships, content and AI than to a traditional freelance service menu.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <SmallChip>Brand Strategy</SmallChip>
                <SmallChip>Go-To-Market</SmallChip>
                <SmallChip>Partnerships</SmallChip>
                <SmallChip>Content Systems</SmallChip>
                <SmallChip>AI Workflows</SmallChip>
              </div>
            </div>

            <div className={`space-y-3 ${styles.revealRight} ${styles.delay2}`}>
              <StatusMeter label="ROLE" value="Senior plug-in support for brands, startups and media companies" />
              <StatusMeter label="SCOPE" value="Strategy, partnerships, content, campaigns, experiences and AI systems" />
              <div className="rounded-sm border border-neon-green/20 bg-black/20 p-3">
                <div className="mb-2 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">OPEN_CHANNEL</div>
                <PrimaryCta href="mailto:tomaspero@gmail.com?subject=Capabilities%20control%20room" label="Let's talk" />
              </div>
            </div>
          </div>
        </TerminalSection>

        <TerminalSection title="STATUS_GRID" className={`xl:col-span-4 ${styles.frame} ${styles.scan}`}>
          <div className="space-y-4">
            {statusSignals.map((item, index) => (
              <div
                key={item.label}
                className={`rounded-sm border border-neon-green/20 bg-black/20 p-4 ${styles.revealLeft} ${
                  index === 0 ? styles.delay1 : index === 1 ? styles.delay2 : styles.delay3
                }`}
              >
                <div className="mb-2 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">{item.label}</div>
                <p className="text-sm leading-relaxed text-neon-green/90">{item.value}</p>
              </div>
            ))}
          </div>
        </TerminalSection>

        <TerminalSection title="ACTIVE_MODULES" className={`xl:col-span-12 ${styles.frame}`}>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            {capabilities.map((item, index) => {
              const Icon = item.icon

              return (
                <article
                  key={item.title}
                  className={`rounded-sm border border-neon-green/20 bg-black/20 p-4 ${moduleSpans[index]} ${styles.commandRow} ${
                    index % 2 === 0 ? styles.revealLeft : styles.revealRight
                  } ${index < 2 ? styles.delay1 : index < 4 ? styles.delay2 : styles.delay3}`}
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-neon-cyan" />
                      <h3 className="font-cyber text-base text-neon-green">{item.title}</h3>
                    </div>
                    <div className="font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">MODULE_0{index + 1}</div>
                  </div>
                  <p className="mb-4 max-w-3xl text-sm leading-relaxed text-neon-green/90">{item.description}</p>
                  <div className={styles.meter}>
                    <div className={styles.meterFill} style={{ width: moduleMeters[index] }} />
                  </div>
                </article>
              )
            })}
          </div>
        </TerminalSection>

        <TerminalSection title="OPERATING_CONTEXT" className="xl:col-span-7">
          <div className="mb-4 font-cyber text-sm text-neon-green">Industries where this operating model tends to fit naturally.</div>
          <div className={styles.labelStack}>
            {industries.map((item) => (
              <SmallChip key={item}>{item}</SmallChip>
            ))}
          </div>
        </TerminalSection>

        <TerminalSection title="ENGAGEMENT_MODES" className="xl:col-span-5">
          <div className="mb-4 font-cyber text-sm text-neon-green">Flexible structure depending on scope, urgency and internal team strength.</div>
          <div className={styles.labelStack}>
            {engagements.map((item) => (
              <SmallChip key={item}>{item}</SmallChip>
            ))}
          </div>
        </TerminalSection>
      </div>
    </DraftShell>
  )
}
