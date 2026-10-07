import type { Metadata } from "next"
import styles from "@/components/capabilities-drafts.module.css"
import {
  DraftShell,
  PrimaryCta,
  SmallChip,
  TerminalSection,
  capabilities,
  corePositioning,
  engagements,
  industries,
} from "@/components/capabilities-drafts"

export const metadata: Metadata = {
  title: "Capabilities Draft V2 | Tomas Pero",
  description: "Dossier-style capabilities draft for Tomas Pero.",
  robots: {
    index: false,
    follow: false,
  },
}

const dossierStamps = ["PUBLIC FILE", "ACTIVE", "INDEPENDENT", "AI-NATIVE"]

export default function CapabilitiesDraftV2Page() {
  return (
    <DraftShell
      currentVersion="v2"
      marquee="DOSSIER MODE // BRAND // PARTNERSHIPS // CONTENT // AI SYSTEMS // CAMPAIGNS // EXPERIENCES //"
      title="CAPABILITIES"
      subtitle="DOSSIER_MODE.exe"
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <TerminalSection title="FILE_HEADER" className={`xl:col-span-12 ${styles.frame} ${styles.scan}`}>
          <div className={`${styles.ghostWord} ${styles.ghostWordLeft} hidden lg:block`}>DOSSIER</div>

          <div className="relative z-[1]">
            <div className={`mb-5 flex flex-wrap gap-2 ${styles.revealUp} ${styles.delay1}`}>
              {dossierStamps.map((item) => (
                <span
                  key={item}
                  className="rounded-sm border border-neon-green/25 px-3 py-1 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className={`max-w-4xl ${styles.revealUp} ${styles.delay2}`}>
              <p className="text-[1.08rem] leading-relaxed text-neon-green md:text-[1.28rem]">{corePositioning}</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neon-green/90 md:text-base">
                This version treats capabilities as a working file: what I do, where I create leverage and what kind of mandate makes sense.
              </p>
            </div>
          </div>
        </TerminalSection>

        <TerminalSection title="FILE_INDEX" className="xl:col-span-12">
          <div className={styles.signalRail}>
            <div className="space-y-4">
              {capabilities.map((item, index) => {
                const Icon = item.icon

                return (
                  <article
                    key={item.title}
                    className={`rounded-sm border border-neon-green/20 bg-black/20 p-4 ${styles.commandRow} ${
                      index % 2 === 0 ? styles.revealLeft : styles.revealRight
                    } ${index < 2 ? styles.delay1 : index < 4 ? styles.delay2 : styles.delay3}`}
                  >
                    <span className={styles.signalDot} />
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[110px_210px_minmax(0,1fr)] md:items-start">
                      <div className="font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">ENTRY_0{index + 1}</div>
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-neon-cyan" />
                        <h3 className="font-cyber text-base text-neon-green">{item.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-neon-green/90">{item.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </TerminalSection>

        <TerminalSection title="SECTOR_FOOTPRINT" className={`xl:col-span-7 ${styles.frame} ${styles.aura}`}>
          <div className="mb-4 font-cyber text-sm text-neon-green">Industries with enough complexity, ambition or transition energy for this kind of role.</div>
          <div className={styles.strip}>
            {industries.map((item) => (
              <SmallChip key={item}>{item}</SmallChip>
            ))}
          </div>
        </TerminalSection>

        <TerminalSection title="MANDATE_TYPES" className="xl:col-span-5">
          <div className="space-y-3">
            {engagements.map((item, index) => (
              <div
                key={item}
                className={`rounded-sm border border-neon-green/20 bg-black/20 px-4 py-3 text-sm text-neon-green/90 ${styles.revealUp} ${
                  index === 0 ? styles.delay1 : index === 1 ? styles.delay2 : index === 2 ? styles.delay3 : styles.delay4
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </TerminalSection>

        <TerminalSection title="FINAL_NOTE" className="xl:col-span-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 font-cyber text-sm text-neon-cyan">CURRENT_STATUS</div>
              <div className="font-cyber text-lg text-neon-green md:text-2xl">BUILDING SOMETHING INTERESTING?</div>
              <p className="mt-2 text-sm leading-relaxed text-neon-green/90">Let's talk.</p>
            </div>
            <PrimaryCta href="mailto:tomaspero@gmail.com?subject=Capabilities%20dossier%20mode" label="Open file" />
          </div>
        </TerminalSection>
      </div>
    </DraftShell>
  )
}
