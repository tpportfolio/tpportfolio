import { readFile } from "node:fs/promises"
import path from "node:path"
import { careerYears } from "@/lib/career"

import {
  aiExperimentsAgentSummary,
  homeProjects,
  siteIdentity,
  specialties,
  timelineEntries,
  type HomeProject,
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
    file: "magaiba.es.md",
    lang: "es",
    route: "/magaiba",
    section: "magaiba",
    title: "MAGAIBA",
    keywords: ["magaiba", "memecoin", "cripto", "web3", "radio", "circulo", "vicioso", "comunidad", "suno"],
  },
  {
    file: "magaiba.en.md",
    lang: "en",
    route: "/magaiba",
    section: "magaiba",
    title: "MAGAIBA",
    keywords: ["magaiba", "memecoin", "crypto", "web3", "radio", "circulo", "vicioso", "community", "suno"],
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

// Whole words, stored without diacritics. Words that exist in both languages (a, me, no, has, la, pero…) are left out.
const SPANISH_HINTS = new Set([
  "hola", "gracias", "quien", "quienes", "que", "como", "cual", "cuales", "cuando", "donde", "cuanto", "cuantos",
  "el", "los", "las", "un", "una", "del", "de", "en", "por", "para", "con", "sobre", "y", "su", "sus", "se", "le",
  "es", "son", "fue", "esta", "estan", "hay", "tiene", "tienen", "hizo", "hace", "sabe", "puedo", "puede", "quiero",
  "muy", "mas", "tambien", "antes", "ahora", "contame", "cuentame", "decime", "hablame",
  "trabajo", "trabajos", "trabaja", "proyecto", "proyectos", "marca", "marcas", "empresa", "empresas",
  "consultor", "consultoria", "herramienta", "herramientas", "servicio", "servicios", "trayectoria", "experiencia",
  "receta", "recetas", "favoritas", "favoritos",
])

const ENGLISH_HINTS = new Set([
  "hello", "hi", "hey", "thanks", "thank", "please", "who", "whose", "what", "which", "when", "where", "why", "how",
  "the", "an", "of", "for", "with", "about", "from", "at", "on", "in", "to", "by", "and", "or", "but", "not",
  "is", "are", "was", "were", "be", "been", "do", "does", "did", "have", "had", "can", "could", "would", "will",
  "i", "my", "he", "his", "him", "you", "your", "it", "this", "that", "there", "any", "before", "after", "now",
  "tell", "show", "see", "make",
  "work", "works", "worked", "working", "project", "projects", "brand", "brands", "company", "companies",
  "consultant", "consulting", "tool", "tools", "service", "services", "background", "experience", "career",
  "recipe", "recipes", "favorite", "favourite",
])

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

// One self-contained line per project: the years sit right next to the name they belong to.
function projectHeading(project: HomeProject, lang: AssistantLang) {
  const details = [project.bodyTitle, project.clientLine2, project.clientLine3]
    .filter((detail): detail is string | LocalizedText => Boolean(detail))
    .map((detail) => localized(detail, lang))

  return `${localized(project.client, lang)} (${localized(project.year, lang)}): ${details.join(" · ")}`
}

function projectLine(project: HomeProject, lang: AssistantLang) {
  return `${projectHeading(project, lang)}. ${project.summary[lang]}`
}

function buildCareerChunk(lang: AssistantLang): AssistantChunk {
  const stages = homeProjects.filter((project) => `/work/${project.slug}` !== aiExperimentsAgentSummary.route)
  const copy = lang === "es"
    ? {
        title: "Trayectoria",
        intro: "Trayectoria laboral de Tomás Peró. Referencia para empleadores, roles y fechas: cada línea es una etapa distinta y sus años son los que figuran en esa misma línea. Desde julio de 2020 Tomás trabaja como consultor independiente: los roles de 2020 en adelante son proyectos y clientes de esa etapa.",
        stages: "Etapas principales (home del portfolio):",
        roles: "Roles en detalle (página /timeline):",
      }
    : {
        title: "Career timeline",
        intro: "Career timeline of Tomás Peró. Reference for employers, roles and dates: each line is a separate stage and its years are the ones written on that same line. Since July 2020 Tomás has worked as an independent consultant: the roles from 2020 onwards are projects and clients within that stage.",
        stages: "Main stages (portfolio home):",
        roles: "Detailed roles (/timeline page):",
      }

  return {
    id: `career-${lang}`,
    route: "/timeline",
    section: "career",
    title: copy.title,
    lang,
    sourceType: "site",
    keywords: lang === "es"
      ? ["trayectoria", "carrera", "laboral", "empresas", "empresa", "empleadores", "trabajo", "trabajos", "trabajaba", "roles", "cargos", "puestos", "fechas", "anos", "cuando", "cv", "experiencia"]
      : ["career", "timeline", "companies", "company", "employers", "employer", "work", "worked", "working", "jobs", "job", "roles", "positions", "dates", "years", "when", "resume", "cv", "experience", "background"],
    text: [
      copy.intro,
      copy.stages,
      ...stages.map((project) => `- ${projectHeading(project, lang)}`),
      copy.roles,
      ...timelineEntries.map((entry) => `- ${entry.title} (${entry.year}): ${entry.role[lang]}`),
    ].join("\n"),
  }
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
        ...homeProjects.map((project) => `- ${projectLine(project, lang)}`),
        specialties.join(", "),
      ].join("\n"),
    })

    chunks.push(buildCareerChunk(lang))

    homeProjects.forEach((project) => {
      chunks.push({
        id: `project-${project.slug}-${lang}`,
        route: `/work/${project.slug}`,
        section: "project",
        title: localized(project.client, lang),
        lang,
        sourceType: "site",
        keywords: [project.slug, normalize(localized(project.client, lang)), "project", "work", "case study"],
        text: projectLine(project, lang),
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
        text: `${entry.title} (${entry.year}): ${entry.role[lang]}. ${entry.description[lang]}`,
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
      // {{CAREER_YEARS}} in the .md files becomes the years since August 2007.
      const text = (await readFile(fullPath, "utf8")).split("{{CAREER_YEARS}}").join(String(careerYears()))

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

      // One chunk per "## " section, so a question only pulls the part of the document it needs.
      return text
        .split(/\r?\n(?=## )/)
        .map((sectionText) => sectionText.trim())
        .filter((sectionText) => sectionText.length > 0)
        .map((sectionText, index) => ({
          id: index === 0 ? `doc-${doc.file}` : `doc-${doc.file}-${index}`,
          route: doc.route,
          section: doc.section,
          title: doc.title,
          lang: doc.lang,
          text: sectionText,
          keywords: doc.keywords,
          sourceType: "doc" as const,
        }))
    }),
  ).then((chunks) => chunks.flat())
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
  if (/[ñ¿¡]/i.test(message)) return "es"

  // "Tomás Peró" keeps its accents in English too, so the name says nothing about the language.
  const nameTokens = new Set(tokenize(siteIdentity.name))
  const words = message
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => word.length > 0 && !nameTokens.has(normalize(word)))

  let spanishScore = 0
  let englishScore = 0

  for (const word of words) {
    const plain = normalize(word)
    if (SPANISH_HINTS.has(plain)) spanishScore += 1
    if (ENGLISH_HINTS.has(plain)) englishScore += 1
    if (plain !== word) spanishScore += 1
  }

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

  // The career timeline always travels with the context, so dates never depend on what was retrieved.
  const career = localizedChunks.find((chunk) => chunk.section === "career")
  const chunks = career ? [career, ...selected.filter((chunk) => chunk !== career)] : selected

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
    chunks,
    sources: uniqueSources,
  }
}
