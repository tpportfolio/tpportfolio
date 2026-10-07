import { readFile } from "node:fs/promises"
import path from "node:path"

import {
  aiExperimentsAgentSummary,
  homeProjects,
  siteIdentity,
  specialties,
  timelineEntries,
  type LocalizedText,
} from "@/lib/site-content"

export type AssistantLang = "es" | "en"

export type AssistantChunk = {
  id: string
  route: string
  section: string
  title: string
  lang: AssistantLang
  text: string
  keywords: string[]
  sourceType: "site" | "doc"
}

export type AssistantSource = {
  route: string
  section: string
  title: string
}

type SearchOptions = {
  currentRoute?: string
  uiLanguage: AssistantLang
}

type ExtraDoc = {
  file: string
  lang: AssistantLang
  route: string
  section: string
  title: string
  keywords: string[]
}

const EXTRA_DOCS: ExtraDoc[] = [
  {
    file: "profile.es.md",
    lang: "es",
    route: "/about",
    section: "profile",
    title: "About profile",
    keywords: ["perfil", "about", "tomas", "quien", "trayectoria", "posicionamiento", "bio"],
  },
  {
    file: "profile.en.md",
    lang: "en",
    route: "/about",
    section: "profile",
    title: "About profile",
    keywords: ["profile", "about", "tomas", "who", "background", "positioning", "bio"],
  },
  {
    file: "consulting.es.md",
    lang: "es",
    route: "/work/independent-consultant",
    section: "consulting",
    title: "Independent consultant",
    keywords: ["consultoria", "consultor", "servicios", "clientes", "freelance", "paradise", "airtm", "drgea"],
  },
  {
    file: "consulting.en.md",
    lang: "en",
    route: "/work/independent-consultant",
    section: "consulting",
    title: "Independent consultant",
    keywords: ["consulting", "consultant", "services", "clients", "freelance", "paradise", "airtm", "drgea"],
  },
  {
    file: "ai-lab.es.md",
    lang: "es",
    route: "/work/ai-experiments",
    section: "ai-lab",
    title: "AI experiments",
    keywords: ["ia", "ai", "experimentos", "the8bureau", "tools", "workflows", "veo", "kling", "chatgpt"],
  },
  {
    file: "ai-lab.en.md",
    lang: "en",
    route: "/work/ai-experiments",
    section: "ai-lab",
    title: "AI experiments",
    keywords: ["ai", "experiments", "the8bureau", "tools", "workflows", "veo", "kling", "chatgpt"],
  },
  {
    file: "curiosidades.es.md",
    lang: "es",
    route: "/about",
    section: "curiosities",
    title: "Curiosidades",
    keywords: ["curiosidades", "musica", "futbol", "series", "gustos", "river", "beatles"],
  },
  {
    file: "curiosities.en.md",
    lang: "en",
    route: "/about",
    section: "curiosities",
    title: "Curiosities",
    keywords: ["curiosities", "music", "football", "series", "taste", "river", "beatles"],
  },
  {
    file: "recipes.es.md",
    lang: "es",
    route: "/about",
    section: "recipes",
    title: "Recetas favoritas",
    keywords: ["recetas", "cocina", "cocinar", "chocotorta", "chipa", "pizza", "rogel", "bolognesa", "pomodoro"],
  },
  {
    file: "recipes.en.md",
    lang: "en",
    route: "/about",
    section: "recipes",
    title: "Favorite recipes",
    keywords: ["recipes", "cooking", "chocotorta", "chipa", "pizza", "rogel", "bolognese", "pomodoro"],
  },
  {
    file: "assistant-qa.es-en.md",
    lang: "es",
    route: "/about",
    section: "qa",
    title: "Base de conocimiento Q&A",
    keywords: ["qa", "preguntas", "respuestas", "perfil", "trayectoria", "consultoria", "ia", "intereses", "recetas"],
  },
  {
    file: "assistant-qa.es-en.md",
    lang: "en",
    route: "/about",
    section: "qa",
    title: "Q&A knowledge base",
    keywords: ["qa", "questions", "answers", "profile", "background", "consulting", "ai", "interests", "recipes"],
  },
]

const SPANISH_HINTS = [
  "hola",
  "quien",
  "qué",
  "que",
  "cómo",
  "como",
  "trabajo",
  "proyecto",
  "marca",
  "consultor",
  "herramienta",
  "servicio",
  "trayectoria",
]

const ENGLISH_HINTS = [
  "hello",
  "who",
  "what",
  "how",
  "project",
  "brand",
  "consultant",
  "tool",
  "service",
  "background",
  "experience",
]

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "de",
  "del",
  "el",
  "en",
  "for",
  "from",
  "i",
  "la",
  "las",
  "los",
  "of",
  "por",
  "que",
  "the",
  "to",
  "un",
  "una",
  "y",
])

let corpusPromise: Promise<AssistantChunk[]> | null = null

function localized(value: string | LocalizedText, lang: AssistantLang) {
  return typeof value === "string" ? value : value[lang]
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
}

function tokenize(value: string) {
  return normalize(value)
    .split(/[^a-z0-9]+/i)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOPWORDS.has(token))
}

function buildSiteChunks(): AssistantChunk[] {
  const chunks: AssistantChunk[] = []

  ;(["es", "en"] as const).forEach((lang) => {
    chunks.push({
      id: `site-home-${lang}`,
      route: "/",
      section: "home",
      title: lang === "es" ? "Home" : "Home",
      lang,
      sourceType: "site",
      keywords: ["home", "portfolio", "projects", "overview", "tomás", "tomas", "main"],
      text: [
        localized(siteIdentity.name, lang as never),
        siteIdentity.heroCopy[lang],
        ...homeProjects.map(
          (project) =>
            `${localized(project.client, lang)} ${project.bodyTitle ? localized(project.bodyTitle, lang) : ""} ${project.summary[lang]} ${localized(project.year, lang)}`,
        ),
        specialties.join(", "),
      ].join(" "),
    })

    homeProjects.forEach((project) => {
      chunks.push({
        id: `project-${project.slug}-${lang}`,
        route: `/work/${project.slug}`,
        section: "project",
        title: localized(project.client, lang),
        lang,
        sourceType: "site",
        keywords: [project.slug, normalize(localized(project.client, lang)), "project", "work", "case study"],
        text: [
          localized(project.client, lang),
          project.bodyTitle ? localized(project.bodyTitle, lang) : "",
          project.clientLine2 ? localized(project.clientLine2, lang) : "",
          project.clientLine3 ? localized(project.clientLine3, lang) : "",
          localized(project.year, lang),
          project.summary[lang],
        ].join(" "),
      })
    })

    timelineEntries.forEach((entry) => {
      chunks.push({
        id: `timeline-${entry.title}-${lang}`,
        route: "/timeline",
        section: "timeline",
        title: entry.title,
        lang,
        sourceType: "site",
        keywords: ["timeline", entry.title.toLowerCase(), normalize(entry.role[lang]), entry.year],
        text: `${entry.year} ${entry.title} ${entry.role[lang]} ${entry.description[lang]}`,
      })
    })

    chunks.push({
      id: `ai-summary-${lang}`,
      route: "/work/ai-experiments",
      section: "ai-summary",
      title: lang === "es" ? "AI experiments" : "AI experiments",
      lang,
      sourceType: "site",
      keywords: ["ai", "ia", "experiments", "tools", "workflow", "the8bureau", "stack"],
      text: [
        aiExperimentsAgentSummary.overview[lang],
        ...aiExperimentsAgentSummary.highlights.map((item) => item[lang]),
        ...aiExperimentsAgentSummary.stack.flatMap((section) => [section.label, ...section.items]),
        ...aiExperimentsAgentSummary.workExamples2025.map(
          (example) => `${example.title} ${example.summary[lang]} ${example.pipeline[lang]} ${example.tools.join(", ")}`,
        ),
        ...aiExperimentsAgentSummary.webapps.map((tool) => `${tool.title} ${tool.summary[lang]} ${tool.route}`),
      ].join(" "),
    })
  })

  return chunks
}

async function loadExtraDocs(): Promise<AssistantChunk[]> {
  const baseDir = path.join(process.cwd(), "content", "assistant")

  return Promise.all(
    EXTRA_DOCS.map(async (doc) => {
      const fullPath = path.join(baseDir, doc.file)
      const text = await readFile(fullPath, "utf8")

      if (doc.file === "assistant-qa.es-en.md") {
        const sectionHeading = doc.lang === "es" ? "### Sección de Preguntas y Respuestas" : "### Section: Q"
        const sectionStart = text.indexOf(sectionHeading)
        const sectionEnd = text.indexOf("\n### ", sectionStart + sectionHeading.length)
        const localizedText = sectionStart < 0
          ? ""
          : text.slice(sectionStart, sectionEnd < 0 ? text.length : sectionEnd)
        const questionHeading = doc.lang === "es" ? "#### Pregunta" : "#### Question"
        const answerHeading = doc.lang === "es" ? "\n##### Respuesta" : "\n##### Answer"

        return localizedText.split(questionHeading).slice(1).map((block, index) => {
          const [question, answerAndMetadata = ""] = block.trim().split(answerHeading)
          const answer = answerAndMetadata.split("\n##### ", 1)[0].trim()

          return {
            id: `doc-${doc.lang}-qa-${index}`,
            route: doc.route,
            section: doc.section,
            title: doc.title,
            lang: doc.lang,
            text: `${question.trim()}\n${answer}`,
            keywords: doc.keywords,
            sourceType: "doc" as const,
          }
        })
      }

      return {
        id: `doc-${doc.file}`,
        route: doc.route,
        section: doc.section,
        title: doc.title,
        lang: doc.lang,
        text,
        keywords: doc.keywords,
        sourceType: "doc" as const,
      }
    }),
  )
}

export async function getAssistantCorpus() {
  if (!corpusPromise) {
    corpusPromise = (async () => {
      const siteChunks = buildSiteChunks()
      const docChunks = await loadExtraDocs()
      return [...siteChunks, ...docChunks]
    })()
  }

  return corpusPromise
}

export function detectAssistantLanguage(message: string, fallback: AssistantLang): AssistantLang {
  const normalized = normalize(message)
  if (/[áéíóúñ¿¡]/i.test(message)) return "es"

  const spanishScore = SPANISH_HINTS.reduce((score, hint) => score + (normalized.includes(normalize(hint)) ? 1 : 0), 0)
  const englishScore = ENGLISH_HINTS.reduce((score, hint) => score + (normalized.includes(normalize(hint)) ? 1 : 0), 0)

  if (spanishScore > englishScore) return "es"
  if (englishScore > spanishScore) return "en"
  return fallback
}

function scoreChunk(chunk: AssistantChunk, queryTokens: string[], currentRoute?: string) {
  const textTokens = new Set(tokenize(chunk.text))
  const keywordTokens = new Set(chunk.keywords.flatMap((keyword) => tokenize(keyword)))

  let score = 0

  for (const token of queryTokens) {
    if (textTokens.has(token)) score += 2
    if (keywordTokens.has(token)) score += 4
    if (chunk.route.includes(token)) score += 2
    if (chunk.section.includes(token)) score += 1
  }

  if (currentRoute && chunk.route === currentRoute) score += 5
  if (currentRoute && currentRoute.startsWith("/work") && chunk.route.startsWith("/work")) score += 1

  return score
}

export async function retrieveAssistantContext(query: string, options: SearchOptions) {
  const language = detectAssistantLanguage(query, options.uiLanguage)
  const corpus = await getAssistantCorpus()
  const queryTokens = tokenize(query)

  const localizedChunks = corpus.filter((chunk) => chunk.lang === language)
  const ranked = localizedChunks
    .map((chunk) => ({
      chunk,
      score: scoreChunk(chunk, queryTokens, options.currentRoute),
    }))
    .sort((a, b) => b.score - a.score)

  let selected = ranked.filter((item) => item.score > 0).slice(0, 6).map((item) => item.chunk)

  if (selected.length === 0) {
    const fallbackChunks = localizedChunks.filter((chunk) => chunk.route === options.currentRoute).slice(0, 2)
    const generalChunk = localizedChunks.find((chunk) => chunk.id === `site-home-${language}`)
    const profileChunk = localizedChunks.find((chunk) => chunk.section === "profile")
    selected = [...fallbackChunks, generalChunk, profileChunk].filter(Boolean) as AssistantChunk[]
  }

  const uniqueSources = Array.from(
    new Map(
      selected.map((chunk) => [
        `${chunk.route}-${chunk.section}`,
        {
          route: chunk.route,
          section: chunk.section,
          title: chunk.title,
        } satisfies AssistantSource,
      ]),
    ).values(),
  )

  return {
    language,
    chunks: selected,
    sources: uniqueSources,
  }
}
