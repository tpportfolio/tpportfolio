"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import { VideoScreen, WindowFrame } from "@/components/video-window"
import { BootTexture } from "./_boot"
import { v2Cases, v2Copy, v2OtherWork, type V2Case } from "./_content"

// Work-first version of the home: cases come first and each one opens with its result;
// the career story stays at the end as a thread.

function CaseWindow({ item, lang, index }: { item: V2Case; lang: "es" | "en"; index: number }) {
  const hasFigures = item.results.length > 0
  return (
    <WindowFrame
      id={item.id}
      title={item.client}
      meta={`${item.dates[lang]} · ${item.duration[lang]}`}
      footRight={`${String(index + 1).padStart(2, "0")} / ${String(v2Cases.length).padStart(2, "0")}`}
      className="scroll-mt-6"
    >
      <div className="v2-case">
        <div className="v2-results" data-count={item.results.length || undefined}>
          <p className="v2-kicker">{v2Copy.resultsLabel[lang]}</p>
          {hasFigures ? (
            <ul className="v2-figures">
              {item.results.map((result) => (
                <li key={result.value.en}>
                  <span className="v2-figure">{result.value[lang]}</span>
                  <span className="v2-figure-label">{result.label[lang]}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {item.outcome ? <p className="v2-outcome">{item.outcome[lang]}</p> : null}
          {item.facts ? (
            <ul className="v2-facts">
              {item.facts.map((fact) => (
                <li key={fact.en}>{fact[lang]}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="v2-body" data-media={item.video ? "" : undefined}>
          {item.video ? <VideoScreen video={{ videoId: item.video.videoId }} title={item.video.title[lang]} /> : null}
          <div className="v2-context">
            <p className="v2-role">{item.role[lang]}</p>
            <p className="v2-text">{item.context[lang]}</p>
            <Link href={item.href} className="vw-link v2-cta">
              {v2Copy.viewCase[lang]}
            </Link>
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}

export default function WorkFirstPage() {
  const { language } = useLanguage()
  const lang = language === "en" ? "en" : "es"

  return (
    <main className="min-h-screen px-4 py-8 md:px-12">
      <BootTexture />

      <header className="v2-head">
        <h1 className="v2-name">{v2Copy.name}</h1>
        <p className="v2-tagline">{v2Copy.tagline[lang]}</p>
      </header>

      <section aria-labelledby="v2-work" className="space-y-8">
        <h2 id="v2-work" className="v2-section">
          {v2Copy.workLabel[lang]}
        </h2>
        {v2Cases.map((item, index) => (
          <CaseWindow key={item.id} item={item} lang={lang} index={index} />
        ))}
      </section>

      <section aria-labelledby="v2-thread" className="mt-12">
        <h2 id="v2-thread" className="v2-section">
          {v2Copy.threadLabel[lang]}
        </h2>
        <WindowFrame title="CAREER_THREAD.log" footRight="2007 – 2026">
          <div className="vw-text space-y-3">
            {v2Copy.thread[lang].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="v2-kicker pt-2">{v2Copy.alsoLabel[lang]}</p>
            <ul className="v2-other">
              {v2OtherWork.map((work) => (
                <li key={work.client}>
                  <Link href={work.href} className="vw-link">
                    {work.client}
                  </Link>{" "}
                  <span>
                    {work.role[lang]} · {work.dates[lang]}
                  </span>
                </li>
              ))}
            </ul>
            <div className="v2-links">
              {v2Copy.links.map((link) => (
                <Link key={link.href} href={link.href} className="vw-btn v2-link-btn">
                  {link.label[lang]}
                </Link>
              ))}
            </div>
          </div>
        </WindowFrame>
      </section>
    </main>
  )
}
