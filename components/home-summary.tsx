"use client"

import { CAREER_YEARS } from "@/lib/career"
import { useLanguage } from "./language-context"

// "In short" band under the home intro: three short facts as wide as the project grid,
// with the label sitting above the line. Visible text, so search and AI engines read it too.

type L = { es: string; en: string }

const items: { key: L; text: L }[] = [
  {
    key: { es: "Qué hago", en: "What I do" },
    text: {
      es: `Brand Strategist y líder de marketing en Buenos Aires, con más de ${CAREER_YEARS} años construyendo, lanzando y escalando marcas.`,
      en: `Brand Strategist and Marketing Leader based in Buenos Aires, with ${CAREER_YEARS}+ years building, launching and scaling brands.`,
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

export function HomeSummary() {
  const { language } = useLanguage()
  const lang = language === "en" ? "en" : "es"
  return (
    <section aria-labelledby="home-summary-title" className="home-summary">
      <h2 id="home-summary-title" className="home-summary-title">
        {lang === "es" ? "EN RESUMEN" : "IN SHORT"}
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
