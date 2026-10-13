"use client"

import { useCallback, useEffect, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import { homeProjects, type LocalizedText } from "@/lib/site-content"
import { labFontClassName } from "./fonts"
import {
  PROPOSALS,
  clippy,
  facts,
  jobs,
  jobsTitle,
  nav,
  overview,
  page,
  reelItems,
  reelTitle,
  stats,
  statsTitle,
  ui,
  type ProposalId,
} from "./content"
import "./lab.css"
import "./skins/p1.css"
import "./skins/p2.css"
import "./skins/p3.css"
import "./skins/p4.css"
import "./skins/p5.css"
import "./skins/p6.css"
import "./skins/p7.css"
import "./skins/p8.css"

type Lang = "es" | "en"

const pick = (value: string | LocalizedText | undefined, lang: Lang) =>
  value === undefined ? "" : typeof value === "string" ? value : value[lang]

const two = (n: number) => String(n).padStart(2, "0")

// Stagger index for skins that animate their entrance (animation-delay: calc(var(--i) * …)).
const idx = (i: number) => ({ "--i": i }) as CSSProperties

const isProposalId = (value: string): value is ProposalId => PROPOSALS.some((p) => p.id === value)

function WinBar({ title, meta, ix, as = "h2" }: { title: string; meta?: string; ix: string; as?: "h2" | "h3" }) {
  const Title = as
  return (
    <header className="dl-win-bar" data-ix={ix}>
      <span className="dl-win-dots" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <Title className="dl-win-title">{title}</Title>
      {meta ? <span className="dl-win-meta">{meta}</span> : null}
      <span className="dl-win-ctrl" aria-hidden>
        <b>_</b>
        <b>□</b>
        <b>×</b>
      </span>
    </header>
  )
}

function WinFoot({ left, right }: { left: string; right?: string }) {
  return (
    <footer className="dl-win-foot">
      <span>{left}</span>
      <span>{right ?? ""}</span>
    </footer>
  )
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </svg>
)

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === "left" ? "M14.5 6l-6 6 6 6" : "M9.5 6l6 6-6 6"} />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export function DesignLab() {
  const { language, setLanguage } = useLanguage()
  const lang: Lang = language === "en" ? "en" : "es"

  const [proposalId, setProposalId] = useState<ProposalId>("p1")
  const [notesOpen, setNotesOpen] = useState(false)
  const [clippyOpen, setClippyOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reelIndex, setReelIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const proposal = PROPOSALS.find((p) => p.id === proposalId) ?? PROPOSALS[0]
  const current = reelItems[reelIndex]
  const counter = `${reelIndex + 1}/${reelItems.length}`

  const selectProposal = useCallback((id: ProposalId) => {
    setProposalId(id)
    setPlaying(false)
    window.history.replaceState(null, "", `#${id}`)
  }, [])

  const selectVideo = useCallback((index: number) => {
    setReelIndex((index + reelItems.length) % reelItems.length)
    setPlaying(false)
  }, [])

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "")
    if (isProposalId(fromHash)) setProposalId(fromHash)
  }, [])

  // Keep the selected tab in view when the tab strip scrolls (narrow screens).
  useEffect(() => {
    document.querySelector('.dl-bar-tab[aria-selected="true"]')?.scrollIntoView({ inline: "center", block: "nearest" })
  }, [proposalId])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key === "Escape") {
        setNotesOpen(false)
        return
      }
      if (/^[0-8]$/.test(event.key)) {
        selectProposal(`p${event.key}` as ProposalId)
        return
      }
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
      const at = PROPOSALS.findIndex((p) => p.id === proposalId)
      const next = (at + (event.key === "ArrowRight" ? 1 : -1) + PROPOSALS.length) % PROPOSALS.length
      selectProposal(PROPOSALS[next].id)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [proposalId, selectProposal])

  // Cursor position inside the hovered box, for skins that light the border under the pointer.
  const trackPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return
    const box = (event.target as HTMLElement).closest<HTMLElement>(".dl-win, .dl-stat, .dl-chat")
    if (!box) return
    const rect = box.getBoundingClientRect()
    box.style.setProperty("--mx", `${event.clientX - rect.left}px`)
    box.style.setProperty("--my", `${event.clientY - rect.top}px`)
  }

  const originLabel =
    proposal.origin === "skill" ? `${ui.skill[lang]}: ${proposal.skill}` : proposal.origin === "own" ? ui.own[lang] : ui.baseline[lang]

  return (
    <div className={`dl-root ${labFontClassName}`} lang={lang}>
      <div className="dl-bar">
        <div className="dl-bar-row">
          <strong className="dl-bar-title">{ui.labTitle[lang]}</strong>
          <div className="dl-bar-tabs" role="tablist" aria-label={ui.proposals[lang]}>
            {PROPOSALS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === proposalId}
                className="dl-bar-tab"
                onClick={() => selectProposal(p.id)}
              >
                <span className="dl-bar-tab-n">{i}</span>
                <span className="dl-bar-tab-name">{p.name}</span>
              </button>
            ))}
          </div>
          <div className="dl-bar-tools">
            <div className="dl-bar-lang" role="group" aria-label={ui.language[lang]}>
              <button type="button" aria-pressed={lang === "es"} onClick={() => setLanguage("es")}>
                ES
              </button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => setLanguage("en")}>
                EN
              </button>
            </div>
            <button type="button" className="dl-bar-btn" aria-pressed={clippyOpen} onClick={() => setClippyOpen((v) => !v)}>
              Clippy
            </button>
            <button type="button" className="dl-bar-btn" aria-pressed={notesOpen} onClick={() => setNotesOpen((v) => !v)}>
              {ui.notes[lang]}
            </button>
            <Link href="/" className="dl-bar-btn dl-bar-exit">
              {ui.exit[lang]}
            </Link>
          </div>
        </div>
        <div className="dl-bar-row dl-bar-info">
          <span className="dl-bar-origin" data-origin={proposal.origin}>
            {originLabel}
          </span>
          <span className="dl-bar-tagline">
            <b>
              {PROPOSALS.indexOf(proposal)} · {proposal.name}
            </b>{" "}
            {proposal.tagline[lang]}
          </span>
        </div>
      </div>

      <div
        key={proposal.id}
        className="dl-stage"
        data-p={proposal.id}
        data-clippy={clippyOpen ? "open" : "closed"}
        data-playing={playing ? "true" : "false"}
        onPointerMove={trackPointer}
      >
        <div className="dl-fx" aria-hidden />

        <aside className="dl-side" data-menu={menuOpen ? "open" : "closed"}>
          <div className="dl-brand">
            <span className="dl-brand-mark">T.P</span>
            <span className="dl-brand-text">
              <span className="dl-brand-name">TOMÁS_PERÓ</span>
              <span className="dl-brand-role">GEN_MARKETER.exe</span>
            </span>
          </div>
          <button type="button" className="dl-menu-btn" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            {ui.menu[lang]}
          </button>
          <nav className="dl-nav" aria-label={ui.menu[lang]}>
            {nav.map((item, i) => (
              <a key={item.label.en} className="dl-nav-link" aria-current={item.active ? "page" : undefined} href="#" onClick={(e) => e.preventDefault()}>
                <span className="dl-nav-ix">{two(i + 1)}</span>
                <span className="dl-nav-label">{item.label[lang]}</span>
              </a>
            ))}
          </nav>
          <div className="dl-side-foot">
            <span className="dl-mode" aria-hidden>
              <span>LIGHT</span>
              <i className="dl-switch">
                <b />
              </i>
              <span data-on>DARK</span>
            </span>
            <span className="dl-langs">
              <button type="button" className="dl-lang" aria-pressed={lang === "es"} onClick={() => setLanguage("es")}>
                ES
              </button>
              <button type="button" className="dl-lang" aria-pressed={lang === "en"} onClick={() => setLanguage("en")}>
                EN
              </button>
            </span>
            <span className="dl-agent">AGENT_MODE</span>
            <span className="dl-copy">© 1986-2026 TOMÁS PERÓ</span>
          </div>
        </aside>

        <div className="dl-scroll">
          <main className="dl-main">
            <div className="dl-ticker">
              <div className="dl-ticker-track">
                <span>{page.ticker}</span>
              </div>
            </div>

            <a className="dl-back" href="#" onClick={(e) => e.preventDefault()}>
              <ArrowIcon />
              <span>{ui.back[lang]}</span>
            </a>

            <header className="dl-head">
              <p className="dl-eyebrow">{page.eyebrow[lang]}</p>
              <h1 className="dl-title">{page.title}</h1>
              <p className="dl-sub">{page.sub}</p>
              <ul className="dl-tags">
                {page.tags.map((tag) => (
                  <li key={tag.en}>{tag[lang]}</li>
                ))}
              </ul>
              <div className="dl-rule" aria-hidden />
            </header>

            <section className="dl-win dl-reel" data-kind="terminal" data-ix="01" style={idx(0)}>
              <WinBar title={reelTitle} meta={counter} ix="01" />
              <div className="dl-win-body dl-reel-body">
                <div className="dl-screen-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="dl-screen-ambient" src={`https://img.youtube.com/vi/${current.videoId}/mqdefault.jpg`} alt="" aria-hidden />
                  <div className="dl-screen">
                    {playing ? (
                      <iframe
                        className="dl-screen-frame"
                        src={`https://www.youtube.com/embed/${current.videoId}?autoplay=1`}
                        title={current.title[lang]}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="dl-screen-img"
                          src={`https://img.youtube.com/vi/${current.videoId}/maxresdefault.jpg`}
                          alt={current.title[lang]}
                          onError={(event) => {
                            const img = event.currentTarget
                            const fallback = `https://img.youtube.com/vi/${current.videoId}/hqdefault.jpg`
                            if (img.src !== fallback) img.src = fallback
                          }}
                        />
                        <span className="dl-screen-scrim" aria-hidden />
                        <span className="dl-screen-tag">
                          {two(reelIndex + 1)} / {two(reelItems.length)}
                        </span>
                        <span className="dl-screen-title">{current.title[lang]}</span>
                        <button type="button" className="dl-play" onClick={() => setPlaying(true)} aria-label={`${ui.play[lang]}: ${current.title[lang]}`}>
                          <PlayIcon />
                          <span className="dl-play-label">{ui.playLabel[lang]}</span>
                        </button>
                      </>
                    )}
                    <i className="dl-corner" data-c="tl" aria-hidden />
                    <i className="dl-corner" data-c="tr" aria-hidden />
                    <i className="dl-corner" data-c="bl" aria-hidden />
                    <i className="dl-corner" data-c="br" aria-hidden />
                  </div>
                </div>

                <div className="dl-reel-info">
                  <h3 className="dl-reel-title">{current.title[lang]}</h3>
                  <p className="dl-reel-desc">{current.description[lang]}</p>
                  <div className="dl-reel-nav">
                    <button type="button" className="dl-reel-btn" data-dir="prev" onClick={() => selectVideo(reelIndex - 1)} aria-label={ui.prev[lang]}>
                      <Chevron dir="left" />
                    </button>
                    <span className="dl-seg" aria-hidden>
                      {reelItems.map((item, i) => (
                        <i key={item.id} data-on={i <= reelIndex ? "" : undefined} />
                      ))}
                    </span>
                    <span className="dl-reel-count">
                      {two(reelIndex + 1)} / {two(reelItems.length)}
                    </span>
                    <button type="button" className="dl-reel-btn" data-dir="next" onClick={() => selectVideo(reelIndex + 1)} aria-label={ui.next[lang]}>
                      <Chevron dir="right" />
                    </button>
                  </div>
                </div>

                <ul className="dl-reel-list">
                  {reelItems.map((item, i) => (
                    <li key={item.id} style={idx(i)}>
                      <button
                        type="button"
                        className="dl-thumb"
                        aria-current={i === reelIndex ? "true" : undefined}
                        aria-label={`${ui.view[lang]}: ${item.title[lang]}`}
                        onClick={() => selectVideo(i)}
                      >
                        <span className="dl-thumb-pic">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} alt="" loading="lazy" />
                        </span>
                        <span className="dl-thumb-ix">{two(i + 1)}</span>
                        <span className="dl-thumb-title">{item.title[lang]}</span>
                        <span className="dl-thumb-meta">YouTube</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <WinFoot left="OK" right={`${reelItems.length} ${ui.objects[lang]}`} />
            </section>

            <div className="dl-cols">
              <aside className="dl-meta">
                <dl className="dl-facts">
                  {facts.map((fact) => (
                    <div className="dl-fact" key={fact.label.en}>
                      <dt>{fact.label[lang]}</dt>
                      <dd>{fact.value[lang]}</dd>
                    </div>
                  ))}
                </dl>
              </aside>

              <div className="dl-flow">
                <section className="dl-win dl-overview" data-kind="terminal" data-ix="02" style={idx(1)}>
                  <WinBar title={overview.title} ix="02" />
                  <div className="dl-win-body">
                    <p className="dl-lead">{overview.heading[lang]}</p>
                    <p className="dl-kicker">{overview.kicker[lang]}</p>
                    <p className="dl-body">{overview.body[lang]}</p>
                    <ul className="dl-list">
                      {overview.scope.map((item) => (
                        <li key={item.en}>{item[lang]}</li>
                      ))}
                    </ul>
                    <p className="dl-clients">{overview.clients[lang]}</p>
                  </div>
                  <WinFoot left="OK" />
                </section>

                <section className="dl-win dl-eng" data-kind="terminal" data-ix="03" style={idx(2)}>
                  <WinBar title={jobsTitle} meta={`${jobs.length}/6`} ix="03" />
                  <div className="dl-win-body">
                    {jobs.map((job) => (
                      <article className="dl-job" key={job.company}>
                        <header className="dl-job-head">
                          <h3 className="dl-job-co">{job.company}</h3>
                          <span className="dl-job-role">{job.role}</span>
                          <span className="dl-job-dates">{job.dates}</span>
                        </header>
                        <p className="dl-job-sector">{job.sector[lang]}</p>
                        <ul className="dl-list">
                          {job.bullets.map((item) => (
                            <li key={item.en}>{item[lang]}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                  <WinFoot left="OK" />
                </section>

                <section className="dl-win dl-stats" data-kind="terminal" data-ix="04" style={idx(3)}>
                  <WinBar title={statsTitle} meta={ui.sample[lang]} ix="04" />
                  <div className="dl-win-body">
                    <ul className="dl-stat-grid">
                      {stats.map((stat, i) => (
                        <li className="dl-stat" key={stat.label.en} style={idx(i)}>
                          <span className="dl-stat-value">{pick(stat.value, lang)}</span>
                          <span className="dl-stat-label">{stat.label[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <WinFoot left="OK" />
                </section>
              </div>
            </div>

            <section className="dl-cards-sec" data-ix="05">
              <h2 className="dl-sec-title">{ui.projects[lang]}</h2>
              <div className="dl-cards">
                {homeProjects.map((project, i) => {
                  const client = pick(project.client, lang)
                  const year = pick(project.year, lang)
                  return (
                    <a
                      key={project.id}
                      className="dl-win dl-card"
                      data-kind="retro"
                      data-ix={two(i + 1)}
                      data-hl={project.highlight ? "true" : undefined}
                      href={`/work/${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={idx(i)}
                    >
                      <WinBar title={client.toUpperCase()} meta={year} ix={two(i + 1)} as="h3" />
                      <div className="dl-win-body dl-card-body">
                        <span className="dl-card-year">// {year}</span>
                        <span className="dl-card-client">// {pick(project.bodyTitle, lang) || client}</span>
                        {project.clientLine2 ? <span className="dl-card-role">{pick(project.clientLine2, lang)}</span> : null}
                        {project.clientLine3 ? <span className="dl-card-extra">{pick(project.clientLine3, lang)}</span> : null}
                        <p className="dl-card-summary">{project.summary[lang]}</p>
                        <span className="dl-card-cta">{ui.cta[lang]}</span>
                      </div>
                      <WinFoot left="Done" right={year} />
                    </a>
                  )
                })}
              </div>
            </section>

            <footer className="dl-foot">
              <div className="dl-rule" aria-hidden />
              <p>
                © 1986-2026 TOMÁS PERÓ // {ui.footer[lang]}
              </p>
            </footer>
          </main>
        </div>

        <div className="dl-fx-top" aria-hidden />

        <div className="dl-clippy">
          {clippyOpen ? (
            <div className="dl-chat" role="group" aria-label={clippy.name}>
              <header className="dl-chat-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="dl-chat-avatar" src="/clippy-character.png" alt="" />
                <div className="dl-chat-id">
                  <strong className="dl-chat-name">{clippy.name}</strong>
                  <span className="dl-chat-status">{clippy.subtitle}</span>
                </div>
                <button type="button" className="dl-chat-close" onClick={() => setClippyOpen(false)} aria-label={clippy.close[lang]}>
                  <CloseIcon />
                </button>
              </header>
              <div className="dl-chat-log">
                <div className="dl-msg" data-role="bot">
                  <div className="dl-msg-meta">
                    <span>{clippy.name}</span>
                    <time>14:02</time>
                  </div>
                  <p>{clippy.welcome[lang]}</p>
                </div>
                <div className="dl-msg" data-role="user">
                  <div className="dl-msg-meta">
                    <span>{clippy.you}</span>
                    <time>14:03</time>
                  </div>
                  <p>{clippy.question[lang]}</p>
                </div>
                <div className="dl-msg" data-role="bot">
                  <div className="dl-msg-meta">
                    <span>{clippy.name}</span>
                    <time>14:03</time>
                  </div>
                  <p>{clippy.answer[lang]}</p>
                  <div className="dl-msg-src">
                    <span className="dl-msg-src-label">{clippy.sourcesLabel[lang]}</span>
                    {clippy.sources.map((source) => (
                      <span className="dl-chip" data-kind="source" key={source}>
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="dl-chat-chips">
                  {clippy.followUps.map((item) => (
                    <button type="button" className="dl-chip" data-kind="followup" key={item.en}>
                      {item[lang]}
                    </button>
                  ))}
                </div>
              </div>
              <footer className="dl-chat-foot">
                <div className="dl-chat-field">
                  <input className="dl-chat-input" placeholder={clippy.placeholder[lang]} aria-label={clippy.placeholder[lang]} readOnly />
                  <button type="button" className="dl-chat-send" aria-label={clippy.send[lang]}>
                    <SendIcon />
                  </button>
                </div>
                <span className="dl-chat-hint">{clippy.hint[lang]}</span>
              </footer>
            </div>
          ) : null}
          <button
            type="button"
            className="dl-launcher"
            onClick={() => setClippyOpen((v) => !v)}
            aria-label={clippyOpen ? clippy.close[lang] : clippy.open[lang]}
            aria-expanded={clippyOpen}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/clippy-character.png" alt="" />
          </button>
        </div>
      </div>

      {notesOpen ? (
        <aside className="dl-notes" aria-label={ui.notes[lang]}>
          <header className="dl-notes-head">
            <div>
              <span className="dl-bar-origin" data-origin={proposal.origin}>
                {originLabel}
              </span>
              <h2>
                {PROPOSALS.indexOf(proposal)} · {proposal.name}
              </h2>
            </div>
            <button type="button" className="dl-bar-btn" onClick={() => setNotesOpen(false)} aria-label={ui.closeNotes[lang]}>
              <CloseIcon />
            </button>
          </header>
          <p className="dl-notes-tagline">{proposal.tagline[lang]}</p>
          <dl className="dl-notes-list">
            {proposal.notes.map((note) => (
              <div key={note.area.en}>
                <dt>{note.area[lang]}</dt>
                <dd>{note.text[lang]}</dd>
              </div>
            ))}
            <div>
              <dt>{ui.fonts[lang]}</dt>
              <dd>{proposal.fonts}</dd>
            </div>
            <div>
              <dt>{ui.effort[lang]}</dt>
              <dd>{proposal.effort[lang]}</dd>
            </div>
          </dl>
          <p className="dl-notes-hint">{ui.labHint[lang]}</p>
          <a className="dl-notes-link" href="/work/independent-consultant" target="_blank" rel="noopener noreferrer">
            {ui.current[lang]} ↗
          </a>
        </aside>
      ) : null}
    </div>
  )
}
