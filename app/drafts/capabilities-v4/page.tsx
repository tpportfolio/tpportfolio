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
  title: "Capabilities Draft V4 | Tomas Pero",
  description: "Big poster capabilities draft for Tomas Pero.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CapabilitiesDraftV4Page() {
  return (
    <DraftShell
      currentVersion="v4"
      marquee="BIG POSTER // BETTER READABILITY // STRATEGY // PARTNERSHIPS // CONTENT // AI // CAMPAIGNS // EXPERIENCES //"
      title="CAPABILITIES"
      subtitle="BIG_POSTER.exe"
    >
      <div className="grid grid-cols-1 gap-8">
        <TerminalSection title="PRIMARY_POSTER" className={`xl:col-span-12 ${styles.frame} ${styles.aura}`}>
          <div className={`${styles.ghostWord} hidden lg:block`}>POSTER</div>

          <div className={`relative z-[1] ${styles.revealUp} ${styles.delay1}`}>
            <div className="mb-4 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">MAIN_SIGNAL</div>
            <h2 className={`${styles.posterTitle} text-neon-green`}>
              Strategy.
              <br />
              Partnerships.
              <br />
              Content.
              <br />
              AI.
            </h2>
            <p className={`mt-6 max-w-4xl text-neon-green ${styles.jumboLead}`}>{corePositioning}</p>
            <p className={`mt-4 max-w-3xl text-neon-green/90 ${styles.posterSub}`}>
              Built for clearer offers, sharper launches, stronger programs and faster operating systems.
            </p>
          </div>

          <div className={`mt-8 ${styles.ctaRow} ${styles.revealRight} ${styles.delay2}`}>
            <a href="mailto:tomaspero@gmail.com?subject=Capabilities%20big%20poster" className={`${styles.ctaButton} ${styles.softPulse}`}>
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#capability-poster" className={`${styles.ctaButton} ${styles.ctaButtonGhost}`}>
              View capability poster
            </a>
            <a href="#fit-zones" className={`${styles.ctaButton} ${styles.ctaButtonGhost}`}>
              Best fit zones
            </a>
          </div>
        </TerminalSection>

        <TerminalSection title="CAPABILITY_POSTER" className="xl:col-span-12">
          <div id="capability-poster" className="space-y-4">
            {capabilities.map((item, index) => {
              const Icon = item.icon

              return (
                <article
                  key={item.title}
                  className={`rounded-sm border border-neon-green/20 bg-black/20 p-5 md:p-6 ${styles.posterPanel} ${
                    index % 2 === 0 ? styles.revealLeft : styles.revealRight
                  } ${index < 2 ? styles.delay1 : index < 4 ? styles.delay2 : styles.delay3}`}
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-neon-cyan" />
                      <h3 className="font-cyber text-2xl text-neon-green md:text-[2rem]">{item.title}</h3>
                    </div>
                    <p className={`text-neon-green/90 ${styles.posterSub}`}>{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </TerminalSection>

        <TerminalSection title="FIT_ZONES" className="xl:col-span-12">
          <div id="fit-zones" className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
            <div className={`${styles.revealUp} ${styles.delay1}`}>
              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">INDUSTRIES</div>
              <div className="mb-5 flex flex-wrap gap-2">
                {industries.map((item) => (
                  <SmallChip key={item}>{item}</SmallChip>
                ))}
              </div>

              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">ENGAGEMENTS</div>
              <div className="flex flex-wrap gap-2">
                {engagements.map((item) => (
                  <SmallChip key={item}>{item}</SmallChip>
                ))}
              </div>
            </div>

            <div className={`rounded-sm border border-neon-green/20 bg-black/20 p-5 ${styles.revealRight} ${styles.delay2}`}>
              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">FINAL_FRAME</div>
              <div className="font-cyber text-2xl text-neon-green md:text-3xl">BUILDING SOMETHING INTERESTING?</div>
              <p className={`mt-3 text-neon-green/90 ${styles.posterSub}`}>Let&apos;s talk.</p>
            </div>
          </div>
        </TerminalSection>
      </div>
    </DraftShell>
  )
}
