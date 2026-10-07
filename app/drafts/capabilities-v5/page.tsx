import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import styles from "@/components/capabilities-drafts.module.css"
import {
  DraftShell,
  SmallChip,
  TerminalSection,
  capabilities,
  corePositioning,
  engagements,
  industries,
} from "@/components/capabilities-drafts"

export const metadata: Metadata = {
  title: "Capabilities Draft V5 | Tomas Pero",
  description: "Button field capabilities draft for Tomas Pero.",
  robots: {
    index: false,
    follow: false,
  },
}

const primaryButtons = [
  { href: "#button-grid", label: "Open service field" },
  { href: "#context-grid", label: "See fit and sectors" },
]

export default function CapabilitiesDraftV5Page() {
  return (
    <DraftShell
      currentVersion="v5"
      marquee="BUTTON FIELD // LARGE TYPE // LARGE CTA // STRATEGY // PARTNERSHIPS // CONTENT // AI SYSTEMS //"
      title="CAPABILITIES"
      subtitle="BUTTON_FIELD.exe"
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <TerminalSection title="BUTTON_FIELD_OPEN" className={`xl:col-span-7 ${styles.frame} ${styles.scan}`}>
          <div className={`${styles.revealUp} ${styles.delay1}`}>
            <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">FAST_READ_VERSION</div>
            <p className={`max-w-3xl text-neon-green ${styles.jumboLead}`}>{corePositioning}</p>
            <p className={`mt-4 max-w-3xl text-neon-green/90 ${styles.posterSub}`}>
              A simpler direction: big buttons, big reading, faster scan.
            </p>
          </div>

          <div className={`mt-7 ${styles.ctaRow} ${styles.revealLeft} ${styles.delay2}`}>
            {primaryButtons.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`${styles.ctaButton} ${index === 0 ? styles.softPulse : styles.ctaButtonGhost}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </TerminalSection>

        <TerminalSection title="CTA_PANEL" className={`xl:col-span-5 ${styles.frame} ${styles.aura}`}>
          <div className={`${styles.ghostWord} hidden lg:block`}>FIELD</div>
          <div className={`relative z-[1] ${styles.revealRight} ${styles.delay2}`}>
            <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">OPEN_CONTACT</div>
            <div className="font-cyber text-2xl text-neon-green md:text-3xl">BUILDING SOMETHING INTERESTING?</div>
            <p className={`mt-3 text-neon-green/90 ${styles.posterSub}`}>Let&apos;s talk.</p>
            <a href="mailto:tomaspero@gmail.com?subject=Capabilities%20button%20field" className={`${styles.ctaButton} mt-6 inline-flex ${styles.softPulse}`}>
              Contact Tomás
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </TerminalSection>

        <TerminalSection title="SERVICE_BUTTONS" className="xl:col-span-12">
          <div id="button-grid" className={styles.bigButtonGrid}>
            {capabilities.map((item, index) => {
              const Icon = item.icon

              return (
                <a
                  key={item.title}
                  href={`#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`${styles.bigButton} ${index < 2 ? styles.revealUp : index < 4 ? styles.revealLeft : styles.revealRight} ${
                    index < 2 ? styles.delay1 : index < 4 ? styles.delay2 : styles.delay3
                  }`}
                >
                  <span className="mb-3 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                    <span className={`${styles.bigButtonTitle} text-neon-green`}>{item.title}</span>
                  </span>
                  <span className={`${styles.bigButtonBody} text-neon-green/90`}>{item.description}</span>
                </a>
              )
            })}
          </div>
        </TerminalSection>

        <TerminalSection title="READOUTS" className="xl:col-span-12">
          <div className="space-y-4">
            {capabilities.map((item, index) => (
              <div
                key={item.title}
                id={item.title.toLowerCase().replace(/\s+/g, "-")}
                className={`rounded-sm border border-neon-green/20 bg-black/20 p-5 md:p-6 ${styles.sectionAnchor} ${
                  index % 2 === 0 ? styles.revealLeft : styles.revealRight
                } ${index < 2 ? styles.delay1 : index < 4 ? styles.delay2 : styles.delay3}`}
              >
                <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">READOUT_0{index + 1}</div>
                <div className="font-cyber text-2xl text-neon-green md:text-3xl">{item.title}</div>
                <p className={`mt-3 max-w-4xl text-neon-green/90 ${styles.posterSub}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </TerminalSection>

        <TerminalSection title="CONTEXT_GRID" className="xl:col-span-12">
          <div id="context-grid" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className={`${styles.revealUp} ${styles.delay1}`}>
              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">INDUSTRIES</div>
              <div className="flex flex-wrap gap-2">
                {industries.map((item) => (
                  <SmallChip key={item}>{item}</SmallChip>
                ))}
              </div>
            </div>
            <div className={`${styles.revealUp} ${styles.delay2}`}>
              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">ENGAGEMENTS</div>
              <div className="flex flex-wrap gap-2">
                {engagements.map((item) => (
                  <SmallChip key={item}>{item}</SmallChip>
                ))}
              </div>
            </div>
          </div>
        </TerminalSection>
      </div>
    </DraftShell>
  )
}
