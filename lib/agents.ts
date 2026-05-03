import {
  aiExperimentsAgentSummary,
  crawlHints,
  homeProjects,
  primaryNavigation,
  siteIdentity,
  timelineEntries,
  type LocalizedText,
} from "@/lib/site-content"

type Lang = "en" | "es"

function localized(value: string | LocalizedText, lang: Lang) {
  return typeof value === "string" ? value : value[lang]
}

function localizeStackLabel(label: string, lang: Lang) {
  if (lang === "en") return label

  if (label === "Image") return "Imagen"
  if (label === "LLMs") return "LLMs"
  return label
}

function buildProjectLines(lang: Lang) {
  return homeProjects.map((project) => ({
    route: `/work/${project.slug}`,
    title: localized(project.client, lang),
    year: localized(project.year, lang),
    summary: project.summary[lang],
  }))
}

function buildNavigationLines(lang: Lang) {
  return primaryNavigation.map((item) => {
    let note = item.note ?? ""

    if (item.href === "/") {
      note =
        lang === "en"
          ? "Canonical public home with project frames."
          : "Home canónica pública con frames de proyectos."
    }

    if (item.href === "/home-variant") {
      note =
        lang === "en"
          ? "Legacy alias that redirects to the current home."
          : "Alias legacy que redirige a la home actual."
    }

    return {
      route: item.href,
      label: item.label[lang],
      note,
    }
  })
}

const specialtiesLocalized = {
  en: [
    "Brand & narrative systems",
    "LATAM go-to-market",
    "AI-assisted creative and content pipelines",
    "PR, influencer and cultural activation",
    "Strategic growth initiatives",
  ],
  es: [
    "Sistemas de marca y narrativa",
    "Go-to-market LATAM",
    "Pipelines creativos y de contenido asistidos por IA",
    "PR, influencers y activación cultural",
    "Iniciativas estratégicas de crecimiento",
  ],
} satisfies Record<Lang, string[]>

const aboutSnapshot = {
  en: [
    "Positioning: Brand, content & AI systems.",
    "Focus: storytelling, digital culture and systems thinking for modern teams.",
    "Background: 18+ years across agencies, brands, startups and consulting.",
    "Current offer: consulting, training and professional AI content creation.",
    "Working model: plugs into marketing teams, brands and agencies to accelerate image, video, audio and text pipelines.",
  ],
  es: [
    "Posicionamiento: Brand, content & AI systems.",
    "Foco: storytelling, cultura digital y systems thinking para equipos modernos.",
    "Trayectoria: más de 18 años entre agencias, marcas, startups y consultoría.",
    "Oferta actual: consultorías, capacitaciones y creación de contenido AI profesional.",
    "Modelo de trabajo: se integra a equipos de marketing, marcas y agencias para acelerar pipelines reales de imagen, video, audio y texto.",
  ],
} satisfies Record<Lang, string[]>

const independentConsultantSnapshot = {
  en: [
    "Strategic consulting in marketing, branding and digital growth with 18+ years of experience.",
    "Industry exposure across entertainment, fintech, esports and gaming, healthtech and creative production.",
    "Current focus: consulting, training and AI-powered content creation support.",
    "Representative engagements: Paradise.la, DrGea, Sinerlogic, Airtm, Stone Movistar and Go Broadway!.",
  ],
  es: [
    "Consultoría estratégica en marketing, branding y crecimiento digital con más de 18 años de experiencia.",
    "Experiencia en entretenimiento, fintech, esports y gaming, healthtech y producción creativa.",
    "Foco actual: consultorías, capacitaciones y apoyo en creación de contenido potenciado por IA.",
    "Trabajos representativos: Paradise.la, DrGea, Sinerlogic, Airtm, Stone Movistar y Go Broadway!.",
  ],
} satisfies Record<Lang, string[]>

const aiExperiments2026 = {
  en: [
    "2026 Works and Experiments is a locked-preview stage with lighter blur and lock treatment over thumbnails.",
    "Current items: Ad 30-40, Product Demo, Fashion Campaign and UGC Content.",
    "Fashion Campaign includes a thumbnail-led popup gallery with 13 ordered frames, starting with the campaign video thumbnail and continuing with campaign stills.",
  ],
  es: [
    "2026 Trabajos y Experimentos es un stage de preview bloqueado, con blur suave y candado sobre los thumbnails.",
    "Items actuales: Ad 30-40, Demo de producto, Campaña Moda y UGC Content.",
    "Campaña Moda incluye una galería popup guiada por thumbnails con 13 frames ordenados, empezando por el thumbnail del video y continuando con stills de campaña.",
  ],
} satisfies Record<Lang, string[]>

const notesLocalized = {
  en: [
    "The canonical public home is `/`.",
    "`/home-variant` remains available as an alias that redirects to `/`.",
    "The most detailed project content lives under `/work/*`.",
    "`/agents.md` and `/agents.txt` are bilingual and intended for agent-friendly crawling.",
  ],
  es: [
    "La home pública canónica es `/`.",
    "`/home-variant` sigue disponible como alias que redirige a `/`.",
    "El contenido más detallado de proyectos vive en `/work/*`.",
    "`/agents.md` y `/agents.txt` son bilingües y están pensados para crawling amigable para agentes.",
  ],
} satisfies Record<Lang, string[]>

const crawlHintsLocalized = {
  en: [
    "Prefer `/work/*` routes for detailed case studies and project-level content.",
    "Use `/about` for profile, positioning and current offer.",
    "Use `/timeline` for chronological work history.",
    "Use `/agents.md` or `/agents.txt` for a compact bilingual summary of the portfolio.",
    "The AI Experiments route contains a 2026 locked-preview stage, 2025 work examples, lightweight webapps and a 2022-2024 archive.",
    "The agents routes bypass the intro middleware and can be fetched directly.",
  ],
  es: [
    "Preferir rutas `/work/*` para casos detallados y contenido a nivel proyecto.",
    "Usar `/about` para perfil, posicionamiento y oferta actual.",
    "Usar `/timeline` para trayectoria cronológica.",
    "Usar `/agents.md` o `/agents.txt` para un resumen bilingüe compacto del portfolio.",
    "La ruta de AI Experiments contiene un stage bloqueado 2026, ejemplos 2025, webapps livianas y un archivo 2022-2024.",
    "Las rutas `agents` saltean el middleware de intro y se pueden pedir directo.",
  ],
} satisfies Record<Lang, string[]>

function buildMarkdownSection(lang: Lang) {
  const isEn = lang === "en"
  const sectionTitle = isEn ? "## English" : "## Español"
  const summaryHeading = isEn ? "### Summary" : "### Resumen"
  const routesHeading = isEn ? "### Primary Routes" : "### Rutas principales"
  const homeHeading = "### Home"
  const aboutHeading = isEn ? "### About Snapshot" : "### Snapshot de About"
  const projectsHeading = isEn ? "### Projects" : "### Proyectos"
  const consultantHeading = isEn ? "### Independent Consultant Snapshot" : "### Snapshot de Independent Consultant"
  const aiHeading = isEn ? "### AI Experiments" : "### AI Experiments"
  const specialtiesHeading = isEn ? "### Specialties" : "### Especialidades"
  const timelineHeading = isEn ? "### Timeline Highlights" : "### Highlights de Timeline"
  const crawlHeading = isEn ? "### Crawl Hints" : "### Crawl hints"
  const notesHeading = isEn ? "### Notes" : "### Notas"

  const summary =
    lang === "en"
      ? `${siteIdentity.name} is a marketer and consultant working at the intersection of brand, content, strategy, storytelling and AI systems. The website functions as a portfolio, strategic profile and project archive.`
      : `${siteIdentity.name} es un marketer y consultor que trabaja en la intersección entre brand, content, strategy, storytelling y AI systems. El sitio funciona como portfolio, perfil estratégico y archivo de proyectos.`

  const homeLines =
    lang === "en"
      ? [
          "`/` is the canonical public home.",
          "The current home highlights core work areas through framed project windows: Artificial Intelligence, Independent Consultant, Air New Zealand, The Walt Disney Company and Agency Experience.",
          "The hero copy is bilingual and updates the years of experience automatically based on June 2, 2007.",
        ]
      : [
          "`/` es la home pública canónica.",
          "La home actual destaca las áreas centrales mediante ventanas de proyecto: Inteligencia Artificial, Independent Consultant, Air New Zealand, The Walt Disney Company y Agency Experience.",
          "El texto hero es bilingüe y actualiza automáticamente los años de trayectoria tomando como base el 2 de junio de 2007.",
        ]

  const lines = [
    sectionTitle,
    "",
    `site: ${siteIdentity.name}`,
    `role: ${siteIdentity.role}`,
    `location: ${siteIdentity.location}`,
    "",
    summaryHeading,
    summary,
    "",
    homeHeading,
    ...homeLines.map((line) => `- ${line}`),
    "",
    aboutHeading,
    ...aboutSnapshot[lang].map((line) => `- ${line}`),
    "",
    routesHeading,
    ...buildNavigationLines(lang).map((item) => `- \`${item.route}\` - ${item.label}. ${item.note}`),
    "",
    projectsHeading,
    ...buildProjectLines(lang).map((item) => `- \`${item.route}\` - ${item.year} - ${item.title}. ${item.summary}`),
    "",
    consultantHeading,
    ...independentConsultantSnapshot[lang].map((line) => `- ${line}`),
    "",
    aiHeading,
    `- ${lang === "en" ? "Route" : "Ruta"}: \`${aiExperimentsAgentSummary.route}\``,
    `- ${lang === "en" ? "Overview" : "Overview"}: ${aiExperimentsAgentSummary.overview[lang]}`,
    `- ${lang === "en" ? "2026 Works and Experiments" : "2026 Trabajos y Experimentos"}:`,
    ...aiExperiments2026[lang].map((line) => `  - ${line}`),
    `- ${lang === "en" ? "Stack" : "Stack"}:`,
    ...aiExperimentsAgentSummary.stack.map((section) => `  - ${localizeStackLabel(section.label, lang)}: ${section.items.join(", ")}`),
    `- ${lang === "en" ? "Highlights" : "Highlights"}:`,
    ...aiExperimentsAgentSummary.highlights.map((item) => `  - ${item[lang]}`),
    `- ${lang === "en" ? "2025 Work Examples" : "Ejemplos de trabajos 2025"}:`,
    ...aiExperimentsAgentSummary.workExamples2025.map(
      (example) => `  - ${example.title}: ${example.summary[lang]} ${example.pipeline[lang]} ${lang === "en" ? "Tools" : "Herramientas"}: ${example.tools.join(", ")}.`,
    ),
    `- ${lang === "en" ? "Vibe-coding Webapps" : "Webapps de vibe-coding"}:`,
    ...aiExperimentsAgentSummary.webapps.map((tool) => `  - \`${tool.route}\` - ${tool.title}. ${tool.summary[lang]}`),
    `- ${lang === "en" ? "2022-2024 Archive Highlights" : "Highlights del archivo 2022-2024"}:`,
    ...aiExperimentsAgentSummary.archiveHighlights.map((item) => `  - ${item.title}: ${item.summary[lang]}`),
    "",
    specialtiesHeading,
    ...specialtiesLocalized[lang].map((specialty) => `- ${specialty}`),
    "",
    timelineHeading,
    ...timelineEntries.map((entry) => `- ${entry.year} - ${entry.title} - ${entry.role[lang]}. ${entry.description[lang]}`),
    "",
    crawlHeading,
    ...crawlHintsLocalized[lang].map((hint) => `- ${hint}`),
    "",
    notesHeading,
    ...notesLocalized[lang].map((note) => `- ${note}`),
  ]

  return lines.join("\n")
}

function buildTextSection(lang: Lang) {
  const isEn = lang === "en"
  const summary =
    lang === "en"
      ? `${siteIdentity.name} is a marketer and consultant working at the intersection of brand, content, strategy, storytelling and AI systems. The website functions as a portfolio, strategic profile and project archive.`
      : `${siteIdentity.name} es un marketer y consultor que trabaja en la intersección entre brand, content, strategy, storytelling y AI systems. El sitio funciona como portfolio, perfil estratégico y archivo de proyectos.`

  const homeLines =
    lang === "en"
      ? [
          "CANONICAL HOME :: /",
          "HOME FRAME AREAS :: Artificial Intelligence :: Independent Consultant :: Air New Zealand :: The Walt Disney Company :: Agency Experience",
          "HERO COPY :: bilingual :: experience years update automatically from June 2, 2007",
        ]
      : [
          "HOME CANONICA :: /",
          "FRAMES DE HOME :: Inteligencia Artificial :: Independent Consultant :: Air New Zealand :: The Walt Disney Company :: Agency Experience",
          "TEXTO HERO :: bilingue :: los años de trayectoria se actualizan automáticamente desde el 2 de junio de 2007",
        ]

  const lines = [
    isEn ? "ENGLISH" : "ESPAÑOL",
    "",
    `SITE :: ${siteIdentity.name}`,
    `ROLE :: ${siteIdentity.role}`,
    `LOCATION :: ${siteIdentity.location}`,
    "",
    isEn ? "SUMMARY :" : "RESUMEN :",
    summary,
    "",
    "HOME :",
    ...homeLines.map((line) => `- ${line}`),
    "",
    isEn ? "ABOUT SNAPSHOT :" : "SNAPSHOT ABOUT :",
    ...aboutSnapshot[lang].map((line) => `- ${line}`),
    "",
    isEn ? "PRIMARY ROUTES :" : "RUTAS PRINCIPALES :",
    ...buildNavigationLines(lang).map((item) => `- ${item.route} :: ${item.label} :: ${item.note}`),
    "",
    isEn ? "PROJECTS :" : "PROYECTOS :",
    ...buildProjectLines(lang).map((item) => `- ${item.route} :: ${item.year} :: ${item.title} :: ${item.summary}`),
    "",
    isEn ? "INDEPENDENT CONSULTANT SNAPSHOT :" : "SNAPSHOT INDEPENDENT CONSULTANT :",
    ...independentConsultantSnapshot[lang].map((line) => `- ${line}`),
    "",
    "AI_EXPERIMENTS :",
    `- ${isEn ? "ROUTE" : "RUTA"} :: ${aiExperimentsAgentSummary.route}`,
    `- OVERVIEW :: ${aiExperimentsAgentSummary.overview[lang]}`,
    ...aiExperiments2026[lang].map((line) => `- 2026 :: ${line}`),
    ...aiExperimentsAgentSummary.stack.map((section) => `- STACK :: ${localizeStackLabel(section.label, lang)} :: ${section.items.join(", ")}`),
    ...aiExperimentsAgentSummary.highlights.map((item) => `- HIGHLIGHT :: ${item[lang]}`),
    ...aiExperimentsAgentSummary.workExamples2025.map(
      (example) => `- 2025_EXAMPLE :: ${example.title} :: ${example.summary[lang]} ${example.pipeline[lang]} :: ${isEn ? "TOOLS" : "HERRAMIENTAS"} ${example.tools.join(", ")}`,
    ),
    ...aiExperimentsAgentSummary.webapps.map((tool) => `- WEBAPP :: ${tool.route} :: ${tool.title} :: ${tool.summary[lang]}`),
    ...aiExperimentsAgentSummary.archiveHighlights.map((item) => `- ARCHIVE :: ${item.title} :: ${item.summary[lang]}`),
    "",
    isEn ? "SPECIALTIES :" : "ESPECIALIDADES :",
    ...specialtiesLocalized[lang].map((specialty) => `- ${specialty}`),
    "",
    isEn ? "TIMELINE :" : "TIMELINE :",
    ...timelineEntries.map((entry) => `- ${entry.year} :: ${entry.title} :: ${entry.role[lang]} :: ${entry.description[lang]}`),
    "",
    isEn ? "CRAWL_HINTS :" : "CRAWL_HINTS :",
    ...crawlHintsLocalized[lang].map((hint) => `- ${hint}`),
    "",
    isEn ? "NOTES :" : "NOTAS :",
    ...notesLocalized[lang].map((note) => `- ${note}`),
  ]

  return lines.join("\n")
}

export function buildAgentsMarkdown() {
  return [
    "# agents.md",
    "",
    "Bilingual file. English first, Spanish below.",
    "Archivo bilingüe. Primero en inglés, luego en español.",
    "",
    buildMarkdownSection("en"),
    "",
    "---",
    "",
    buildMarkdownSection("es"),
    "",
  ].join("\n")
}

export function buildAgentsText() {
  return [
    "AGENTS.TXT",
    "",
    "Bilingual file. English first, Spanish below.",
    "Archivo bilingüe. Primero en inglés, luego en español.",
    "",
    buildTextSection("en"),
    "",
    "----------------------------------------",
    "",
    buildTextSection("es"),
    "",
  ].join("\n")
}
