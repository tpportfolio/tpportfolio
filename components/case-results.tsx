"use client"

import { useLanguage } from "./language-context"

// "Results" band at the top of each case page: the outcome before the story.
// Same look as the home "EN RESUMEN" band (.home-summary), with the figure as the headline.

type L = { es: string; en: string }

export type CaseResult = { value: L; label: L }

export function CaseResults({ items }: { items: CaseResult[] }) {
  const { language } = useLanguage()
  const lang = language === "en" ? "en" : "es"
  return (
    <section aria-labelledby="case-results-title" className="home-summary home-summary--results">
      <h2 id="case-results-title" className="home-summary-title">
        {lang === "es" ? "RESULTADOS" : "RESULTS"}
      </h2>
      <ul>
        {items.map((item) => (
          <li key={item.value.en}>
            <strong>{item.value[lang]}</strong>
            <span>{item.label[lang]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
