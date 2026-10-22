"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useLanguage } from "./language-context"
import { WindowFrame } from "./video-window"

// Short, extractable answers for people and for search / AI answer engines: frequently asked
// questions at the end of the home. Facts come from the work pages and /agents.md.

type L = { es: string; en: string }

const LAST_UPDATED = "2026-10-15"
const LINKEDIN = "https://www.linkedin.com/in/tomaspero"
const REEL = "https://youtu.be/bC8TGT4mD3Q"

const faqs: { q: L; a: (lang: "es" | "en") => ReactNode; text: L }[] = [
  {
    q: { es: "¿Quién es Tomás Peró?", en: "Who is Tomás Peró?" },
    text: {
      es: "Tomás Peró es Brand Strategist y líder de marketing basado en Buenos Aires, con más de 18 años de experiencia. Trabajó en agencias, en The Walt Disney Company y en Air New Zealand, y desde 2020 acompaña a marcas como consultor independiente. Hoy combina estrategia de marca con producción asistida por IA.",
      en: "Tomás Peró is a Brand Strategist and Marketing Leader based in Buenos Aires with 18+ years of experience. He has worked at agencies, The Walt Disney Company and Air New Zealand, and since 2020 he has supported brands as an independent consultant. Today he combines brand strategy with AI-assisted production.",
    },
    a: (lang) =>
      lang === "es"
        ? "Tomás Peró es Brand Strategist y líder de marketing basado en Buenos Aires, con más de 18 años de experiencia. Trabajó en agencias, en The Walt Disney Company y en Air New Zealand, y desde 2020 acompaña a marcas como consultor independiente. Hoy combina estrategia de marca con producción asistida por IA."
        : "Tomás Peró is a Brand Strategist and Marketing Leader based in Buenos Aires with 18+ years of experience. He has worked at agencies, The Walt Disney Company and Air New Zealand, and since 2020 he has supported brands as an independent consultant. Today he combines brand strategy with AI-assisted production.",
  },
  {
    q: { es: "¿Qué hace un Brand Strategist como Tomás?", en: "What does a Brand Strategist like Tomás do?" },
    text: {
      es: "Define el posicionamiento y el relato de una marca y lo lleva a campañas 360° integradas: lanzamientos y go-to-market, marketing cultural, alianzas y sponsorships, y workflows de IA para producir contenido. Lidera agencias y equipos para que todo hable con una sola voz de marca.",
      en: "He defines a brand's positioning and story and takes it into integrated 360° campaigns: launches and go-to-market, cultural marketing, partnerships and sponsorships, and AI workflows to produce content. He leads agencies and teams so everything speaks with one brand voice.",
    },
    a: (lang) =>
      lang === "es"
        ? "Define el posicionamiento y el relato de una marca y lo lleva a campañas 360° integradas: lanzamientos y go-to-market, marketing cultural, alianzas y sponsorships, y workflows de IA para producir contenido. Lidera agencias y equipos para que todo hable con una sola voz de marca."
        : "He defines a brand's positioning and story and takes it into integrated 360° campaigns: launches and go-to-market, cultural marketing, partnerships and sponsorships, and AI workflows to produce content. He leads agencies and teams so everything speaks with one brand voice.",
  },
  {
    q: { es: "¿Con qué marcas trabajó?", en: "Which brands has he worked with?" },
    text: {
      es: "The Walt Disney Company (Disney, Marvel, Pixar, Lucasfilm), Air New Zealand, Paradise.la, Airtm, Stone Movistar, DrGea.com, Sinerlogic y Go Broadway!, además de J. Walter Thompson y Altheim en agencias, para clientes como Claro, Ford, Johnson & Johnson y Nokia.",
      en: "The Walt Disney Company (Disney, Marvel, Pixar, Lucasfilm), Air New Zealand, Paradise.la, Airtm, Stone Movistar, DrGea.com, Sinerlogic and Go Broadway!, plus J. Walter Thompson and Altheim at agencies, for clients such as Claro, Ford, Johnson & Johnson and Nokia.",
    },
    a: (lang) => (
      <>
        {lang === "es"
          ? "The Walt Disney Company (Disney, Marvel, Pixar, Lucasfilm), Air New Zealand, Paradise.la, Airtm, Stone Movistar, DrGea.com, Sinerlogic y Go Broadway!, además de J. Walter Thompson y Altheim en agencias, para clientes como Claro, Ford, Johnson & Johnson y Nokia. "
          : "The Walt Disney Company (Disney, Marvel, Pixar, Lucasfilm), Air New Zealand, Paradise.la, Airtm, Stone Movistar, DrGea.com, Sinerlogic and Go Broadway!, plus J. Walter Thompson and Altheim at agencies, for clients such as Claro, Ford, Johnson & Johnson and Nokia. "}
        <Link href="/timeline" className="vw-link">
          {lang === "es" ? "Ver timeline" : "See the timeline"}
        </Link>
      </>
    ),
  },
  {
    q: { es: "¿Qué resultados logró en Air New Zealand?", en: "What results did he achieve at Air New Zealand?" },
    text: {
      es: "Como líder de marketing regional para Sudamérica (2015–2020), lanzó la marca y una nueva ruta de larga distancia. Los visitantes desde Argentina se triplicaron en 2 años (+225% el primer año) y quienes veían la distancia como una barrera bajaron del 50% al 24%. Lideró cinco agencias y más de USD 500K al año.",
      en: "As regional marketing lead for South America (2015–2020), he launched the brand and a new long-haul route. Visitors from Argentina tripled in 2 years (+225% in the first year) and the share of people who saw distance as a barrier fell from 50% to 24%. He led five agencies and over USD 500K a year.",
    },
    a: (lang) => (
      <>
        {lang === "es"
          ? "Como líder de marketing regional para Sudamérica (2015–2020), lanzó la marca y una nueva ruta de larga distancia. Los visitantes desde Argentina se triplicaron en 2 años (+225% el primer año) y quienes veían la distancia como una barrera bajaron del 50% al 24%. Lideró cinco agencias y más de USD 500K al año. "
          : "As regional marketing lead for South America (2015–2020), he launched the brand and a new long-haul route. Visitors from Argentina tripled in 2 years (+225% in the first year) and the share of people who saw distance as a barrier fell from 50% to 24%. He led five agencies and over USD 500K a year. "}
        <Link href="/work/air-new-zealand" className="vw-link">
          {lang === "es" ? "Ver el caso" : "See the case"}
        </Link>
      </>
    ),
  },
  {
    q: { es: "¿Cómo usa la inteligencia artificial en su trabajo?", en: "How does he use artificial intelligence in his work?" },
    text: {
      es: "Trabaja como creative technologist desde 2022: usa un stack de IA (imagen, video, voz, música y LLMs) para prototipar ideas y acelerar la producción de contenido. En Paradise.la pasó los ciclos de concepto a entrega de más de 2 semanas a 3–4 días. Su reel reúne trabajos de 2025 y 2026.",
      en: "He has worked as a creative technologist since 2022: he uses an AI stack (image, video, voice, music and LLMs) to prototype ideas and speed up content production. At Paradise.la he cut concept-to-delivery cycles from 2+ weeks to 3–4 days. His reel brings together works from 2025 and 2026.",
    },
    a: (lang) => (
      <>
        {lang === "es"
          ? "Trabaja como creative technologist desde 2022: usa un stack de IA (imagen, video, voz, música y LLMs) para prototipar ideas y acelerar la producción de contenido. En Paradise.la pasó los ciclos de concepto a entrega de más de 2 semanas a 3–4 días. "
          : "He has worked as a creative technologist since 2022: he uses an AI stack (image, video, voice, music and LLMs) to prototype ideas and speed up content production. At Paradise.la he cut concept-to-delivery cycles from 2+ weeks to 3–4 days. "}
        <a href={REEL} target="_blank" rel="noopener noreferrer" className="vw-link">
          {lang === "es" ? "Ver el reel 2025/2026 ↗" : "Watch the 2025/2026 reel ↗"}
        </a>
      </>
    ),
  },
  {
    q: { es: "¿Cómo contactar a Tomás?", en: "How can I contact Tomás?" },
    text: {
      es: "Se lo puede contactar por LinkedIn (linkedin.com/in/tomaspero) o desde la página de contacto del sitio, para proyectos de estrategia de marca, lanzamientos, marketing cultural o producción con IA. Responde en español e inglés.",
      en: "You can reach him on LinkedIn (linkedin.com/in/tomaspero) or from the site's contact page, for brand strategy, launches, cultural marketing or AI production projects. He works in Spanish and English.",
    },
    a: (lang) => (
      <>
        {lang === "es" ? "Se lo puede contactar por " : "You can reach him on "}
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="vw-link">
          LinkedIn ↗
        </a>
        {lang === "es"
          ? " o desde la página de contacto del sitio, para proyectos de estrategia de marca, lanzamientos, marketing cultural o producción con IA. Responde en español e inglés. "
          : " or from the site's contact page, for brand strategy, launches, cultural marketing or AI production projects. He works in Spanish and English. "}
        <Link href="/contact" className="vw-link">
          {lang === "es" ? "Ir a contacto" : "Go to contact"}
        </Link>
      </>
    ),
  },
]

function faqJsonLd(lang: "es" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q[lang],
      acceptedAnswer: { "@type": "Answer", text: item.text[lang] },
    })),
  }
}

// EXPLORATION (fork explore/r35): "list" is production; "accordion" and "grid" start collapsed.
// Collapsed answers stay in the HTML (and in the FAQPage data), so engines still read them.
export type FaqVariant = "list" | "accordion" | "grid"

export function HomeFaq({ variant = "list" }: { variant?: FaqVariant }) {
  const { language } = useLanguage()
  const lang = language === "en" ? "en" : "es"
  return (
    <section aria-labelledby="home-faq" className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(lang)).replace(/</g, "\\u003c") }}
      />
      <WindowFrame
        title={lang === "es" ? "PREGUNTAS_FRECUENTES" : "FAQ"}
        footLeft="OK"
        footRight={
          <time dateTime={LAST_UPDATED}>
            {lang === "es" ? "Actualizado" : "Updated"}: {LAST_UPDATED}
          </time>
        }
      >
        <h2 id="home-faq" className="sr-only">
          {lang === "es" ? "Preguntas frecuentes sobre Tomás Peró" : "Frequently asked questions about Tomás Peró"}
        </h2>
        {variant === "list" ? (
          <div className="home-faq">
            {faqs.map((item) => (
              <div key={item.q.en}>
                <h3>{item.q[lang]}</h3>
                <p>{item.a(lang)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={variant === "grid" ? "home-faq-acc home-faq-acc--grid" : "home-faq-acc"}>
            {faqs.map((item, i) => (
              <details key={item.q.en}>
                <summary>
                  <span className="home-faq-ix" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.q[lang]}</h3>
                  <span className="home-faq-sign" aria-hidden="true" />
                </summary>
                <p>{item.a(lang)}</p>
              </details>
            ))}
          </div>
        )}
      </WindowFrame>
    </section>
  )
}
