"use client"

import { useLanguage } from "./language-context"

// EXPLORATION (fork explore/r35): five ways to show the "EN_RESUMEN" summary on the home without
// the window. Every variant keeps the text in the HTML and visible (no hidden text), labelled
// "EN RESUMEN" / "IN SHORT", so answer engines still find the summary.

import type { SummaryVariant } from "@/lib/explore-summary"

export type { SummaryVariant }

type L = { es: string; en: string }

const items: { key: L; text: L }[] = [
  {
    key: { es: "Quién", en: "Who" },
    text: {
      es: "Brand Strategist y líder de marketing en Buenos Aires, con más de 18 años construyendo, lanzando y escalando marcas.",
      en: "Brand Strategist and Marketing Leader based in Buenos Aires, with 18+ years building, launching and scaling brands.",
    },
  },
  {
    key: { es: "Trayectoria", en: "Track record" },
    text: {
      es: "Agencias, The Walt Disney Company, Air New Zealand (lanzamiento de marca en Sudamérica) y consultor independiente desde 2020.",
      en: "Agencies, The Walt Disney Company, Air New Zealand (brand launch in South America) and independent consultant since 2020.",
    },
  },
  {
    key: { es: "Hoy", en: "Today" },
    text: {
      es: "Creative technologist: usa IA todos los días para producir más rápido (en Paradise.la, de más de 2 semanas a 3–4 días por pieza piloto).",
      en: "Creative technologist: uses AI every day to produce faster (at Paradise.la, from 2+ weeks to 3–4 days per pilot piece).",
    },
  },
]

const heading: L = { es: "EN RESUMEN", en: "IN SHORT" }

export function HomeSummaryVariant({ variant, revealed = true }: { variant: SummaryVariant; revealed?: boolean }) {
  const { language } = useLanguage()
  const lang = language === "en" ? "en" : "es"

  if (variant === "terminal") {
    return (
      <section aria-labelledby="hs-title" className="hs hs-terminal">
        <h2 id="hs-title" className="hs-title">
          &gt; {heading[lang].replace(" ", "_")}
        </h2>
        <ul>
          {items.map((item) => (
            <li key={item.key.en}>
              <span className="hs-key">{item.key[lang].toUpperCase()}</span>
              <span className="hs-sep" aria-hidden="true">
                ::
              </span>
              <span>{item.text[lang]}</span>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  if (variant === "strip") {
    return (
      <section aria-labelledby="hs-title" className="hs hs-strip">
        <h2 id="hs-title" className="hs-title">
          {heading[lang]}
        </h2>
        <ul>
          {items.map((item) => (
            <li key={item.key.en}>
              <strong>{item.key[lang]}</strong>
              <span>{item.text[lang]}</span>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  if (variant === "cards") {
    return (
      <section aria-labelledby="hs-title" className="hs hs-cards">
        <h2 id="hs-title" className="hs-title">
          {heading[lang]}
        </h2>
        <ul>
          {items.map((item, i) => (
            <li key={item.key.en}>
              <span className="hs-index">{String(i + 1).padStart(2, "0")}</span>
              <strong>{item.key[lang]}</strong>
              <span>{item.text[lang]}</span>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  if (variant === "typed") {
    return (
      <section aria-labelledby="hs-title" className="hs hs-typed" data-revealed={revealed ? "" : undefined}>
        <h2 id="hs-title" className="hs-title" style={{ animationDelay: "0ms" }}>
          &gt; {heading[lang].replace(" ", "_")}
        </h2>
        <ul>
          {items.map((item, i) => (
            <li key={item.key.en} style={{ animationDelay: `${(i + 1) * 260}ms` }}>
              <span className="hs-key">{item.key[lang]}:</span> {item.text[lang]}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  // details: collapsed by default; the text is already in the page for readers and engines.
  return (
    <section aria-labelledby="hs-title" className="hs hs-details">
      <details>
        <summary>
          <h2 id="hs-title" className="hs-title">
            {heading[lang]}
          </h2>
          <span className="hs-hint">{lang === "es" ? "quién · trayectoria · hoy" : "who · track record · today"}</span>
        </summary>
        <ul>
          {items.map((item) => (
            <li key={item.key.en}>
              <strong>{item.key[lang]}:</strong> {item.text[lang]}
            </li>
          ))}
        </ul>
      </details>
    </section>
  )
}
