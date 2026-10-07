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
  title: "Capabilities Draft V6 | Tomas Pero",
  description: "Signal flow capabilities draft for Tomas Pero.",
  robots: {
    index: false,
    follow: false,
  },
}

const chapters = [
  {
    id: "chapter-intent",
    label: "Intent",
    title: "Set the direction before scaling the activity.",
    items: capabilities.filter((item) => item.title === "Strategy" || item.title === "Partnerships"),
  },
  {
    id: "chapter-engine",
    label: "Engine",
    title: "Build the content and AI layer that makes the system move.",
    items: capabilities.filter((item) => item.title === "Content" || item.title === "AI Systems"),
  },
  {
    id: "chapter-momentum",
    label: "Momentum",
    title: "Turn the strategy into visible campaigns, launches and experiences.",
    items: capabilities.filter((item) => item.title === "Campaigns" || item.title === "Experiences"),
  },
]

export default function CapabilitiesDraftV6Page() {
  return (
    <DraftShell
      currentVersion="v6"
      marquee="SIGNAL FLOW // INTENT // ENGINE // MOMENTUM // LARGE TYPE // CLEAR CTA // BETTER READING //"
      title="CAPABILITIES"
      subtitle="SIGNAL_FLOW.exe"
    >
      <div className="grid grid-cols-1 gap-8">
        <TerminalSection title="FLOW_OPEN" className={`xl:col-span-12 ${styles.frame} ${styles.aura}`}>
          <div className={`${styles.ghostWord} ${styles.ghostWordLeft} hidden lg:block`}>FLOW</div>
          <div className="relative z-[1]">
            <div className={`mb-4 ${styles.revealUp} ${styles.delay1}`}>
              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">FLOW_LOGIC</div>
              <p className={`max-w-4xl text-neon-green ${styles.jumboLead}`}>{corePositioning}</p>
            </div>

            <div className={`mt-6 ${styles.chapterNav} ${styles.revealLeft} ${styles.delay2}`}>
              {chapters.map((chapter) => (
                <a key={chapter.id} href={`#${chapter.id}`} className={styles.chapterLink}>
                  {chapter.label}
                </a>
              ))}
              <a href="#flow-cta" className={styles.chapterLink}>
                Contact
              </a>
            </div>
          </div>
        </TerminalSection>

        {chapters.map((chapter, index) => (
          <TerminalSection
            key={chapter.id}
            title={`CHAPTER_0${index + 1} // ${chapter.label.toUpperCase()}`}
            className={`xl:col-span-12 ${styles.frame} ${index % 2 === 0 ? styles.scan : ""}`}
          >
            <div id={chapter.id} className={styles.sectionAnchor}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(270px,0.72fr)]">
                <div className={`${styles.revealUp} ${styles.delay1}`}>
                  <h2 className={`${styles.posterTitle} text-neon-green`}>{chapter.label}</h2>
                  <p className={`mt-4 max-w-3xl text-neon-green/90 ${styles.jumboLead}`}>{chapter.title}</p>
                </div>

                <div className={`${styles.revealRight} ${styles.delay2}`}>
                  <div className="font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">CHAPTER_NOTE</div>
                  <p className={`mt-3 text-neon-green/90 ${styles.posterSub}`}>
                    Each chapter groups the kind of work that tends to travel together inside one mandate.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {chapter.items.map((item, itemIndex) => {
                  const Icon = item.icon

                  return (
                    <article
                      key={item.title}
                      className={`rounded-sm border border-neon-green/20 bg-black/20 p-5 md:p-6 ${styles.posterPanel} ${
                        itemIndex === 0 ? styles.revealLeft : styles.revealRight
                      } ${itemIndex === 0 ? styles.delay2 : styles.delay3}`}
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-neon-cyan" />
                          <div className="font-cyber text-2xl text-neon-green md:text-3xl">{item.title}</div>
                        </div>
                        <a href="#flow-cta" className={`${styles.ctaButton} ${styles.ctaButtonGhost}`}>
                          Ask about this
                        </a>
                      </div>
                      <p className={`mt-4 max-w-4xl text-neon-green/90 ${styles.posterSub}`}>{item.description}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </TerminalSection>
        ))}

        <TerminalSection title="FLOW_CONTEXT" className="xl:col-span-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]">
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

            <div id="flow-cta" className={`rounded-sm border border-neon-green/20 bg-black/20 p-5 ${styles.revealRight} ${styles.delay2}`}>
              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">FINAL_PROMPT</div>
              <div className="font-cyber text-2xl text-neon-green md:text-3xl">BUILDING SOMETHING INTERESTING?</div>
              <p className={`mt-3 text-neon-green/90 ${styles.posterSub}`}>Let&apos;s talk.</p>
              <a href="mailto:tomaspero@gmail.com?subject=Capabilities%20signal%20flow" className={`${styles.ctaButton} mt-6 inline-flex ${styles.softPulse}`}>
                Open contact
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </TerminalSection>
      </div>
    </DraftShell>
  )
}
