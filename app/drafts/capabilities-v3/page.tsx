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
  title: "Capabilities Draft V3 | Tomas Pero",
  description: "Transmission-style capabilities draft for Tomas Pero.",
  robots: {
    index: false,
    follow: false,
  },
}

const capabilityMap = Object.fromEntries(capabilities.map((item) => [item.title, item]))

const scenes = [
  {
    code: "SCENE_01",
    phase: "BUILD",
    time: "00:00-00:06",
    ghost: "INTENT",
    title: "Strategy, direction and market entry logic.",
    body: "Where the assignment is about sharper positioning, a better go-to-market path or a clearer growth frame.",
    items: [capabilityMap["Strategy"], capabilityMap["Partnerships"]],
    align: "left" as const,
  },
  {
    code: "SCENE_02",
    phase: "BREATHE",
    time: "00:06-00:12",
    ghost: "SYSTEM",
    title: "Content and AI as operating layers, not as isolated tactics.",
    body: "Where the challenge is producing better stories, faster outputs and more useful workflows across creative and marketing teams.",
    items: [capabilityMap["Content"], capabilityMap["AI Systems"]],
    align: "right" as const,
  },
  {
    code: "SCENE_03",
    phase: "RESOLVE",
    time: "00:12-END",
    ghost: "MOMENTUM",
    title: "Campaigns and experiences that make the strategy visible.",
    body: "Where the work has to land in launches, activations, creator programs or audience growth initiatives with real traction.",
    items: [capabilityMap["Campaigns"], capabilityMap["Experiences"]],
    align: "left" as const,
  },
]

export default function CapabilitiesDraftV3Page() {
  return (
    <DraftShell
      currentVersion="v3"
      marquee="TRANSMISSION // BUILD // BREATHE // RESOLVE // PARTNERSHIPS // CONTENT SYSTEMS // AI OPERATIONS //"
      title="CAPABILITIES"
      subtitle="TRANSMISSION_SEQUENCE.exe"
    >
      <div className="grid grid-cols-1 gap-8">
        <TerminalSection title="TRANSMISSION_OPEN" className={`xl:col-span-12 ${styles.frame} ${styles.aura}`}>
          <div className={`${styles.ghostWord} hidden lg:block`}>SIGNAL</div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(230px,0.9fr)]">
            <div className={`${styles.revealUp} ${styles.delay1}`}>
              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">OPEN_CHANNEL</div>
              <p className="max-w-3xl text-[1.08rem] leading-relaxed text-neon-green md:text-[1.32rem]">{corePositioning}</p>
            </div>

            <div className={`${styles.revealRight} ${styles.delay2}`}>
              <span className={`${styles.splitWord} text-neon-cyan`}>Strategy</span>
              <span className={`${styles.splitWord} text-neon-green`}>Partnerships</span>
              <span className={`${styles.splitWord} text-neon-cyan`}>Content</span>
              <span className={`${styles.splitWord} text-neon-green`}>AI</span>
            </div>
          </div>
        </TerminalSection>

        {scenes.map((scene, index) => (
          <TerminalSection
            key={scene.code}
            title={`${scene.code} // ${scene.phase}`}
            className={`xl:col-span-12 ${styles.frame} ${index % 2 === 0 ? styles.scan : ""}`}
          >
            <div className={`${styles.ghostWord} ${scene.align === "left" ? styles.ghostWordLeft : ""} hidden lg:block`}>
              {scene.ghost}
            </div>

            <div
              className={`relative z-[1] grid grid-cols-1 gap-6 lg:grid-cols-[140px_minmax(0,1fr)] ${
                scene.align === "right" ? "lg:grid-cols-[minmax(0,1fr)_140px]" : ""
              }`}
            >
              {scene.align === "left" ? (
                <>
                  <div className={`${styles.revealLeft} ${styles.delay1}`}>
                    <div className="font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">{scene.time}</div>
                    <div className="mt-2 font-cyber text-sm text-neon-green">{scene.phase}</div>
                  </div>
                  <div className={`${styles.revealRight} ${styles.delay2}`}>
                    <h2 className="max-w-3xl font-cyber text-lg leading-relaxed text-neon-green md:text-2xl">{scene.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neon-green/90 md:text-base">{scene.body}</p>

                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {scene.items.map((item) => {
                        const Icon = item.icon

                        return (
                          <div key={item.title} className="rounded-sm border border-neon-green/20 bg-black/20 p-4">
                            <div className="mb-3 flex items-center gap-3">
                              <Icon className="h-4 w-4 text-neon-cyan" />
                              <div className="font-cyber text-sm text-neon-green">{item.title}</div>
                            </div>
                            <p className="text-sm leading-relaxed text-neon-green/90">{item.description}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.revealLeft} ${styles.delay2}`}>
                    <h2 className="max-w-3xl font-cyber text-lg leading-relaxed text-neon-green md:text-2xl">{scene.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neon-green/90 md:text-base">{scene.body}</p>

                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {scene.items.map((item) => {
                        const Icon = item.icon

                        return (
                          <div key={item.title} className="rounded-sm border border-neon-green/20 bg-black/20 p-4">
                            <div className="mb-3 flex items-center gap-3">
                              <Icon className="h-4 w-4 text-neon-cyan" />
                              <div className="font-cyber text-sm text-neon-green">{item.title}</div>
                            </div>
                            <p className="text-sm leading-relaxed text-neon-green/90">{item.description}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className={`${styles.revealRight} ${styles.delay1} text-left lg:text-right`}>
                    <div className="font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">{scene.time}</div>
                    <div className="mt-2 font-cyber text-sm text-neon-green">{scene.phase}</div>
                  </div>
                </>
              )}
            </div>
          </TerminalSection>
        ))}

        <TerminalSection title="POST_SIGNAL" className="xl:col-span-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)]">
            <div className={`${styles.revealUp} ${styles.delay1}`}>
              <div className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">OPERATING_CONTEXT</div>
              <div className="mb-4 flex flex-wrap gap-2">
                {industries.map((item) => (
                  <SmallChip key={item}>{item}</SmallChip>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {engagements.map((item) => (
                  <SmallChip key={item}>{item}</SmallChip>
                ))}
              </div>
            </div>

            <div className={`rounded-sm border border-neon-green/20 bg-black/20 p-4 ${styles.revealRight} ${styles.delay2}`}>
              <div className="mb-2 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">FINAL_FRAME</div>
              <div className="font-cyber text-base text-neon-green md:text-lg">BUILDING SOMETHING INTERESTING?</div>
              <p className="mt-2 text-sm leading-relaxed text-neon-green/90">Let's talk.</p>
              <div className="mt-4">
                <PrimaryCta href="mailto:tomaspero@gmail.com?subject=Capabilities%20transmission" label="Send signal" />
              </div>
            </div>
          </div>
        </TerminalSection>
      </div>
    </DraftShell>
  )
}
