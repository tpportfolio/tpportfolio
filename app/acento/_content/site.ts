// Content of the "acento" alternative design. Every visible string lives here, in Spanish and
// English, with the same facts as the main site (lib/site-content.ts and the work pages).
// Nothing here is invented: no placeholder projects, figures or clients.
import type { StaticImageData } from "next/image"
import type { LocalizedText } from "@/lib/site-content"
import {
  agencyVideos,
  airNewZealandVideos,
  consultantVideos,
} from "@/lib/work-videos"
import thumbMessi from "@/app/work/ai-experiments/thumb_2026_messi_bk.jpg"

export type L = LocalizedText
export type Lang = "es" | "en"

export const BASE = "/acento"
export const langs: Lang[] = ["es", "en"]
export const isLang = (value: string): value is Lang => value === "es" || value === "en"
export const href = (lang: Lang, path = "") => `${BASE}/${lang}${path}`

export const site = {
  name: "Tomás Peró",
  url: "https://tomaspero.vercel.app",
  email: "tomaspero@gmail.com",
  linkedin: "https://www.linkedin.com/in/tomaspero",
  linkedinLabel: "linkedin.com/in/tomaspero",
  location: { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" } as L,
  role: {
    es: "Brand Strategist y líder de marketing de marca",
    en: "Brand Strategist and Brand Marketing Leader",
  } as L,
  description: {
    es: "Tomás Peró, Brand Strategist y líder de marketing de marca en Buenos Aires. Más de 18 años construyendo, lanzando y escalando marcas en Latinoamérica.",
    en: "Tomás Peró, Brand Strategist and Brand Marketing Leader in Buenos Aires. 18+ years building, launching and scaling brands across Latin America.",
  } as L,
}

export const ui = {
  skip: { es: "Ir al contenido", en: "Skip to content" },
  loading: { es: "Cargando", en: "Loading" },
  navLabel: { es: "Principal", en: "Main" },
  nav: {
    work: { es: "Trabajo", en: "Work" },
    profile: { es: "Perfil", en: "Profile" },
    contact: { es: "Contacto", en: "Contact" },
  },
  switchTo: { es: "English", en: "Español" },
  switchShort: { es: "EN", en: "ES" },
  home: { es: "Tomás Peró, inicio", en: "Tomás Peró, home" },
  play: { es: "Reproducir", en: "Play" },
  watchOn: { es: "Ver en YouTube", en: "Watch on YouTube" },
  next: { es: "Siguiente", en: "Next" },
  allWork: { es: "Todos los trabajos", en: "All work" },
  open: { es: "Ver caso", en: "View case" },
  years: { es: "Años", en: "Years" },
  role: { es: "Rol", en: "Role" },
  where: { es: "Dónde", en: "Where" },
} satisfies Record<string, L | Record<string, L>>

// ---------------------------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------------------------

export const home = {
  title: {
    es: "Tomás Peró | Brand Strategist y líder de marketing de marca",
    en: "Tomás Peró | Brand Strategist and Brand Marketing Leader",
  } as L,
  heroRole: {
    es: "Brand Strategist y líder de marketing de marca en Buenos Aires. Más de 18 años construyendo, lanzando y escalando marcas.",
    en: "Brand Strategist and Brand Marketing Leader in Buenos Aires. 18+ years building, launching and scaling brands.",
  } as L,
  heroSay: {
    es: "Se pronuncia con el acento al final:",
    en: "Say it with the accent on the last syllable:",
  } as L,
  heroPhonetic: { es: "to-MÁS pe-RÓ", en: "toh-MAHS peh-ROH" } as L,
  heroHint: {
    es: "Probá cambiarlo de lugar.",
    en: "Try moving it.",
  } as L,
  heroScroll: { es: "Trabajo seleccionado", en: "Selected work" } as L,

  idea: {
    es: "Una marca es una decisión sobre dónde va el acento. Hace más de 18 años que tomo esa decisión con equipos de Disney, Air New Zealand, fintechs, clubes de esports y productoras.",
    en: "A brand is a decision about where the accent goes. I have been making that decision for 18+ years with teams at Disney, Air New Zealand, fintechs, esports clubs and production studios.",
  } as L,

  pillarsHeading: { es: "Dónde pongo el acento", en: "Where I put the accent" } as L,
  pillars: [
    {
      id: "strategy",
      label: { es: "Estrategia de marca", en: "Brand strategy" },
      lead: {
        es: "Posicionamiento, narrativa y salida al mercado para marcas que se lanzan o cambian de etapa.",
        en: "Positioning, narrative and go-to-market for brands that are launching or changing stage.",
      },
      proofs: [
        {
          who: "Air New Zealand",
          what: {
            es: "Lanzamiento de la marca en Sudamérica y plan de negocios a 5 años.",
            en: "Brand launch in South America and a 5-year business plan.",
          },
        },
        {
          who: "DrGea.com",
          what: {
            es: "Narrativa regional para una plataforma de telemedicina en cuatro países.",
            en: "Regional narrative for a telemedicine platform in four countries.",
          },
        },
        {
          who: "Stone Movistar",
          what: {
            es: "Arquitectura de marca para el club de esports de Diego Schwartzman y Torneos.",
            en: "Brand architecture for the esports club founded by Diego Schwartzman and Torneos.",
          },
        },
      ],
      link: { slug: "air-new-zealand", label: { es: "Caso Air New Zealand", en: "Air New Zealand case" } },
    },
    {
      id: "culture",
      label: { es: "Marketing cultural", en: "Cultural marketing" },
      lead: {
        es: "Deporte, música, gaming y creadores como territorio de marca, no como decorado.",
        en: "Sport, music, gaming and creators as brand territory, not as set dressing.",
      },
      proofs: [
        {
          who: "Air New Zealand",
          what: {
            es: "Sponsorships con los All Blacks, la UAR y Agustín Pichot.",
            en: "Sponsorships with the All Blacks, the UAR and Agustín Pichot.",
          },
        },
        {
          who: "Stone Movistar",
          what: {
            es: "Alianzas con Delfi Pignatiello, Luquitas Rodríguez y Lit Killah.",
            en: "Partnerships with Delfi Pignatiello, Luquitas Rodríguez and Lit Killah.",
          },
        },
        {
          who: "Cerveza Imperial",
          what: {
            es: "Sesiones Imperial: el relanzamiento con Fito Páez en el teatro Maipo.",
            en: "Sesiones Imperial: the relaunch with Fito Páez at the Maipo theatre.",
          },
        },
      ],
      link: { slug: "independent-consultant", label: { es: "Caso consultoría", en: "Consulting case" } },
    },
    {
      id: "technology",
      label: { es: "Tecnología creativa", en: "Creative technology" },
      lead: {
        es: "IA aplicada a la producción: prototipos, pipelines y herramientas propias para equipos chicos.",
        en: "AI applied to production: prototypes, pipelines and my own tools for small teams.",
      },
      proofs: [
        {
          who: "Paradise.la",
          what: {
            es: "De más de 2 semanas a 3 o 4 días, de concepto a entrega, en producciones piloto.",
            en: "From 2+ weeks to 3 or 4 days, concept to delivery, on pilot productions.",
          },
        },
        {
          who: "Disney Labs",
          what: {
            es: "Prototipos presentados al liderazgo regional y global de Disney.",
            en: "Prototypes pitched to Disney's regional and global leadership.",
          },
        },
        {
          who: "the8bureau",
          what: {
            es: "Herramientas de IA que corren en local, privadas y offline.",
            en: "AI tools that run locally, private and offline.",
          },
        },
      ],
      link: { slug: "ai-experiments", label: { es: "Caso IA", en: "AI case" } },
    },
  ],

  workHeading: { es: "Trabajo", en: "Work" } as L,
  workIntro: {
    es: "Cinco etapas, de la más reciente a la primera.",
    en: "Five stages, from the most recent to the first.",
  } as L,

  factsHeading: { es: "En números", en: "In numbers" } as L,
  facts: [
    {
      value: { es: "18+", en: "18+" },
      label: { es: "años trabajando con marcas, desde 2007", en: "years working with brands, since 2007" },
    },
    {
      value: { es: "100+", en: "100+" },
      label: { es: "promociones por año en Disney Latinoamérica", en: "promotions a year at Disney Latin America" },
    },
    {
      value: { es: "5", en: "5" },
      label: { es: "agencias con una sola voz de marca en Air New Zealand", en: "agencies under one brand voice at Air New Zealand" },
    },
    {
      value: { es: "4", en: "4" },
      label: { es: "países para el lanzamiento regional de DrGea.com", en: "countries for the regional launch of DrGea.com" },
    },
  ],

  profileHeading: { es: "Perfil", en: "Profile" } as L,
  profileText: {
    es: "Me formé en agencias y mi carrera de marca empezó en The Walt Disney Company. Después lideré el marketing regional de Air New Zealand y, desde 2020, acompaño a marcas que se lanzan o cambian de etapa. Uso IA todos los días para prototipar campañas y acelerar la producción.",
    en: "I trained in agencies and my brand career began at The Walt Disney Company. I then led regional marketing for Air New Zealand and, since 2020, I work with brands that are launching or changing stage. I use AI every day to prototype campaigns and speed up production.",
  } as L,
  profileLink: { es: "Leer el perfil completo", en: "Read the full profile" } as L,
}

// ---------------------------------------------------------------------------------------------
// Footer / contact
// ---------------------------------------------------------------------------------------------

export const footer = {
  heading: { es: "¿Ponemos el acento en tu marca?", en: "Shall we put the accent on your brand?" } as L,
  emailLabel: { es: "Escribime", en: "Email me" } as L,
  linkedinLabel: { es: "LinkedIn", en: "LinkedIn" } as L,
  basedLabel: { es: "Base", en: "Based in" } as L,
  mainSite: { es: "Ir a la home principal", en: "Go to the main home" } as L,
  mainSiteNote: {
    es: "Esta es una versión alternativa del portfolio.",
    en: "This is an alternative version of the portfolio.",
  } as L,
  agentMode: { es: "Modo agente", en: "Agent mode" } as L,
  colophon: {
    es: "Tipografía Archivo. Hecho con Next.js y GSAP.",
    en: "Set in Archivo. Built with Next.js and GSAP.",
  } as L,
}

// ---------------------------------------------------------------------------------------------
// Work
// ---------------------------------------------------------------------------------------------

export type Video = { videoId: string; title: L; note?: L }

// YouTube stills. Not every video has the large sizes, so the best one is listed here.
const stillSize: Record<string, "sddefault" | "hqdefault"> = {
  mcP1v2cEVsQ: "sddefault",
  "ZQwwBIO9h-s": "hqdefault",
  O9T3p0zxUh8: "hqdefault",
  OOFbkl_WFbc: "hqdefault",
  "-cR8Nu6KlgM": "hqdefault",
}
export const stillOf = (videoId: string, small = false) =>
  `https://i.ytimg.com/vi/${videoId}/${small ? "mqdefault" : (stillSize[videoId] ?? "maxresdefault")}.jpg`

export type Cover =
  | { kind: "video"; video: Video; alt: L }
  | { kind: "figure"; value: L; label: L }

export type Project = {
  slug: string
  label: L // short name, set large in the index
  name: L // full name, case page title
  years: L
  role: L
  place: L
  summary: L
  cover: Cover
  thumb?: StaticImageData
  context: L
  blocks: { heading: L; items: L[] }[]
  stats?: { value: L; label: L }[]
  entries?: { company: string; title: string; dates: L; sector: L; text: L }[]
  videosHeading?: L
  videos?: Video[]
  outcome: { heading: L; text: L }
  links?: { href: string; label: L; external?: boolean }[]
}

const fromLib = (items: { videoId?: string; title: L; description?: L }[]): Video[] =>
  items.filter((v) => v.videoId).map((v) => ({ videoId: v.videoId as string, title: v.title, note: v.description }))

const reel: Video = {
  videoId: "5T6cRU6AdNs",
  title: { es: "Reel 2025/2026", en: "Reel 2025/2026" },
  note: {
    es: "Selección de trabajos y experimentos con IA de 2025 y 2026.",
    en: "A selection of AI works and experiments from 2025 and 2026.",
  },
}

const aiVideos: Video[] = [
  reel,
  {
    videoId: "pAdrOyzmmZs",
    title: { es: "Ad Messi Burger King (en proceso)", en: "Messi ad for Burger King (in progress)" },
    note: { es: "Trabajo 2026, todavía en proceso.", en: "2026 work, still in progress." },
  },
  {
    videoId: "zW8DP4fr7xA",
    title: { es: "Demo de producto Subway", en: "Subway product demo" },
    note: { es: "Demo de producto generada con IA.", en: "AI-generated product demo." },
  },
  {
    videoId: "U6_3OB7ljvY",
    title: { es: "Pitch Jugos México: animatic", en: "Juice brand pitch (Mexico): animatic" },
    note: {
      es: "Animatic de técnica mixta: footage y contenido generado con IA. Pipeline de punta a punta: imágenes, video y voz.",
      en: "Mixed-technique animatic: footage and AI-generated content. End-to-end pipeline: images, video and voice.",
    },
  },
]

const consultingVideos = fromLib(consultantVideos)
const airNzVideos = fromLib(airNewZealandVideos)
const agencyYearsVideos = fromLib(agencyVideos)

export const projects: Project[] = [
  {
    slug: "ai-experiments",
    label: { es: "Trabajos con IA", en: "AI work" },
    name: { es: "Trabajos y experimentos con IA", en: "AI works and experiments" },
    years: { es: "2022-hoy", en: "2022-now" },
    role: { es: "Creative technologist", en: "Creative technologist" },
    place: { es: "Buenos Aires", en: "Buenos Aires" },
    summary: {
      es: "Herramientas, workflows y producción asistida por IA para imagen, video, audio y texto.",
      en: "Tools, workflows and AI-assisted production across image, video, audio and text.",
    },
    cover: {
      kind: "video",
      video: reel,
      alt: { es: "Fotograma del reel 2025/2026 de trabajos con IA", en: "Still from the 2025/2026 reel of AI work" },
    },
    thumb: thumbMessi,
    context: {
      es: "Exploro IA de forma autodidacta desde fines de 2022. En 2023 generé un LoRA de mi persona y desde junio de 2024 participo del curso y la comunidad de Morfeo Academy. Mi experiencia profesional con IA es mi trabajo como AI & Content Consultant & Producer en Paradise.la, de julio de 2024 a enero de 2026, durante su transformación en una productora audiovisual impulsada por IA.",
      en: "I have explored AI as a self-taught practitioner since late 2022. In 2023 I generated a LoRA of myself, and since June 2024 I have been part of Morfeo Academy's course and community. My professional AI experience is my work as AI & Content Consultant & Producer at Paradise.la, from July 2024 to January 2026, during its transformation into an AI-driven audiovisual production company.",
    },
    blocks: [
      {
        heading: { es: "Trabajos 2026", en: "2026 works" },
        items: [
          { es: "Ad Messi Burger King (en proceso).", en: "Messi ad for Burger King (in progress)." },
          { es: "Demo de producto Subway.", en: "Subway product demo." },
          { es: "Campaña de moda AY NOT DEAD.", en: "AY NOT DEAD fashion campaign." },
          { es: "Contenido UGC.", en: "UGC content." },
        ],
      },
      {
        heading: { es: "Stack", en: "Stack" },
        items: [
          {
            es: "Imagen: Nanobanana, Seedream, Leonardo, Flux, Ideogram, GoogleFX y Midjourney.",
            en: "Image: Nanobanana, Seedream, Leonardo, Flux, Ideogram, GoogleFX and Midjourney.",
          },
          {
            es: "Video: Sora2, Veo3, Higgsfield, Kling, Hailuo y Runway.",
            en: "Video: Sora2, Veo3, Higgsfield, Kling, Hailuo and Runway.",
          },
          { es: "Audio: ElevenLabs, fish.audio, Suno y Udio.", en: "Audio: ElevenLabs, fish.audio, Suno and Udio." },
          {
            es: "LLMs: Claude, ChatGPT, Kimi, Gemini y Perplexity.",
            en: "LLMs: Claude, ChatGPT, Kimi, Gemini and Perplexity.",
          },
        ],
      },
      {
        heading: { es: "Herramientas propias", en: "My own tools" },
        items: [
          {
            es: "the8bureau: mi marca personal de IA y mi sandbox para testear herramientas, skills y workflows. Corre en local, de manera privada y offline.",
            en: "the8bureau: my personal AI brand and my sandbox for testing tools, skills and workflows. It runs locally, privately and offline.",
          },
          {
            es: "Webapps hechas con vibe coding: Canva productora, Unyellower y Comparador de videos.",
            en: "Vibe-coded webapps: Canva productora, Unyellower and Video comparer.",
          },
          {
            es: "Music Lab y RADIO MAGAIBA: canciones generadas con Suno.",
            en: "Music Lab and RADIO MAGAIBA: songs generated with Suno.",
          },
        ],
      },
    ],
    videosHeading: { es: "Videos", en: "Videos" },
    videos: aiVideos,
    outcome: {
      heading: { es: "Qué cambió", en: "What changed" },
      text: {
        es: "En las producciones piloto de Paradise.la, los ciclos de concepto a entrega pasaron de más de 2 semanas a 3 o 4 días.",
        en: "On Paradise.la pilot productions, concept-to-delivery cycles dropped from 2+ weeks to 3 or 4 days.",
      },
    },
    links: [
      {
        href: "/work/ai-experiments",
        label: { es: "Ver el laboratorio completo en el sitio actual", en: "See the full lab on the current site" },
      },
    ],
  },
  {
    slug: "independent-consultant",
    label: { es: "Consultoría", en: "Consulting" },
    name: { es: "Consultoría independiente", en: "Independent consulting" },
    years: { es: "2020-hoy", en: "2020-now" },
    role: { es: "Consultor de marca, marketing e IA", en: "Brand, marketing and AI consultant" },
    place: { es: "Latinoamérica", en: "Latin America" },
    summary: {
      es: "Posicionamiento, salida al mercado y workflows creativos con IA para fintech, healthtech, esports y medios.",
      en: "Positioning, go-to-market and AI-powered creative workflows for fintech, healthtech, esports and media.",
    },
    cover: {
      kind: "video",
      video: consultingVideos[0],
      alt: {
        es: "Fotograma del evento de lanzamiento de Stone Movistar",
        en: "Still from the Stone Movistar launch event",
      },
    },
    context: {
      es: "Desde 2020 trabajo como consultor independiente de marca, marketing e IA para empresas de fintech, healthtech, esports y medios de Latinoamérica. Defino posicionamiento y narrativa, los llevo a campañas integradas de salida al mercado y sumo workflows con IA para acelerar la producción creativa de equipos de marca, agencias y estudios.",
      en: "Since 2020 I have worked as an independent brand, marketing and AI consultant for fintech, healthtech, esports and media companies across Latin America. I define positioning and narrative, turn them into integrated go-to-market campaigns, and add AI workflows to speed up the creative output of brand teams, agencies and studios.",
    },
    blocks: [
      {
        heading: { es: "Qué hago", en: "What I do" },
        items: [
          {
            es: "Diseño posicionamiento de marca y marcos de mensajes para expansiones multimercado.",
            en: "I design brand positioning and messaging frameworks for multi-market expansion.",
          },
          {
            es: "Lidero estrategias integradas de salida al mercado que alinean contenido, PR y alianzas.",
            en: "I lead integrated go-to-market strategies that align content, PR and partnerships.",
          },
          {
            es: "Construyo ecosistemas de influencers y colaboraciones de marca.",
            en: "I build influencer ecosystems and brand collaborations.",
          },
          {
            es: "Desarrollo marcos narrativos para fundadores y equipos ejecutivos.",
            en: "I develop narrative frameworks for founders and executive teams.",
          },
          {
            es: "Oriento la ejecución entre Producto, Growth, Marca y agencias externas.",
            en: "I orchestrate execution across Product, Growth, Brand and external agencies.",
          },
        ],
      },
    ],
    entries: [
      {
        company: "Paradise.la",
        title: "AI & Content Consultant & Producer",
        dates: { es: "jul 2024 a ene 2026", en: "Jul 2024 to Jan 2026" },
        sector: { es: "Producción audiovisual", en: "Audiovisual production" },
        text: {
          es: "Consultoría para la transición de la productora hacia la producción creativa con IA: mapeé los procesos, diseñé pipelines de imagen, video y audio para proyectos reales de clientes, capacité equipos y entregué playbooks y SOPs.",
          en: "Consulting for the studio's transition to AI-enabled creative production: I mapped its processes, designed image, video and audio pipelines for real client projects, trained teams and delivered playbooks and SOPs.",
        },
      },
      {
        company: "DrGea.com",
        title: "Head of Communications",
        dates: { es: "feb 2023 a abr 2024", en: "Feb 2023 to Apr 2024" },
        sector: { es: "Healthtech y telemedicina", en: "Healthtech and telemedicine" },
        text: {
          es: "Narrativa de marca regional, arquitectura de mensajes y estrategia de comunicación, PR y KOLs para una plataforma de telemedicina en Colombia, Argentina, México y Perú.",
          en: "Regional brand narrative, messaging architecture and communications, PR and KOL strategy for a telemedicine platform in Colombia, Argentina, Mexico and Peru.",
        },
      },
      {
        company: "Sinerlogic",
        title: "Marketing & Branding Consultant",
        dates: { es: "2022 a 2023", en: "2022 to 2023" },
        sector: { es: "Logística B2B", en: "B2B logistics" },
        text: {
          es: "Identidad de marca, mensajes y propuesta de valor, con arquitectura de comunicación multicanal y estrategia de redes sociales.",
          en: "Brand identity, messaging and value proposition, with a multichannel communication architecture and social media strategy.",
        },
      },
      {
        company: "Airtm",
        title: "Growth Marketing + R&D",
        dates: { es: "sep 2021 a jul 2022", en: "Sep 2021 to Jul 2022" },
        sector: { es: "Fintech", en: "Fintech" },
        text: {
          es: "Experimentos regionales de adquisición que conectaron posicionamiento con crecimiento medible. Creé y lancé Airtalks, el podcast de marca para freelancers y creadores de Latinoamérica.",
          en: "Regional acquisition experiments connecting positioning with measurable growth. I created and launched Airtalks, the branded podcast for Latin American freelancers and creators.",
        },
      },
      {
        company: "Stone Movistar",
        title: "Brand & Marketing Consultant",
        dates: { es: "jul 2020 a dic 2021", en: "Jul 2020 to Dec 2021" },
        sector: { es: "Esports y streaming", en: "Esports and streaming" },
        text: {
          es: "Estrategia de lanzamiento del club de esports y streaming fundado por Diego \"Peque\" Schwartzman y Torneos: arquitectura de marca, pilares de contenido y alianzas con streamers y creadores.",
          en: "Launch strategy for the esports and streaming club founded by Diego \"Peque\" Schwartzman and Torneos: brand architecture, content pillars and partnerships with streamers and creators.",
        },
      },
      {
        company: "Go Broadway!",
        title: "Marketing Consultant",
        dates: { es: "ago a nov 2020", en: "Aug to Nov 2020" },
        sector: { es: "Entretenimiento y artes escénicas", en: "Entertainment and performing arts" },
        text: {
          es: "Estrategia de marketing, marca y PR para el lanzamiento en Latinoamérica de Backstage, una plataforma online de castings para artistas escénicos, con alianzas con Ticketek y 47st.",
          en: "Marketing, brand and PR strategy for the Latin American launch of Backstage, an online casting platform for performing artists, with partnerships with Ticketek and 47st.",
        },
      },
    ],
    videosHeading: { es: "Videos", en: "Videos" },
    videos: consultingVideos,
    outcome: {
      heading: { es: "Qué quedó", en: "What it left" },
      text: {
        es: "Un club de esports lanzado, un podcast de marca al aire, una plataforma de telemedicina comunicada en cuatro países y una productora con pipelines de IA en sus producciones piloto.",
        en: "An esports club launched, a branded podcast on air, a telemedicine platform communicated in four countries and a studio with AI pipelines on its pilot productions.",
      },
    },
    links: [
      {
        href: "https://join.backstage.com/latam/",
        label: { es: "Sitio de lanzamiento de Backstage en Latinoamérica", en: "Backstage Latin America launch site" },
        external: true,
      },
      {
        href: "https://www.lanacion.com.ar/espectaculos/personajes/se-lanzo-backstage-plataforma-acceso-castings-otros-nid2495799/",
        label: { es: "Nota en La Nación", en: "Press coverage in La Nación" },
        external: true,
      },
    ],
  },
  {
    slug: "air-new-zealand",
    label: { es: "Air New Zealand", en: "Air New Zealand" },
    name: { es: "Air New Zealand", en: "Air New Zealand" },
    years: { es: "2015-2020", en: "2015-2020" },
    role: { es: "Marketing Specialist & Market Development", en: "Marketing Specialist & Market Development" },
    place: { es: "Sudamérica", en: "South America" },
    summary: {
      es: "El lanzamiento de una aerolínea y de una ruta de larga distancia en cuatro mercados, con cinco agencias y una sola voz de marca.",
      en: "The launch of an airline and a long-haul route in four markets, with five agencies and one brand voice.",
    },
    cover: {
      kind: "video",
      video: airNzVideos[0],
      alt: {
        es: "Fotograma del reel resumen del trabajo para Air New Zealand",
        en: "Still from the wrap-up reel of the work for Air New Zealand",
      },
    },
    context: {
      es: "Entre diciembre de 2015 y junio de 2020 fui el líder de marketing regional de Air New Zealand para Sudamérica: Argentina, Brasil, Chile y Uruguay. Fui responsable del lanzamiento de la marca en la región y de la estrategia de salida al mercado de una nueva ruta de larga distancia.",
      en: "From December 2015 to June 2020 I was Air New Zealand's regional marketing lead for South America: Argentina, Brazil, Chile and Uruguay. I was responsible for the brand launch in the region and for the market launch strategy of a new long-haul route.",
    },
    blocks: [
      {
        heading: { es: "Estrategia y lanzamiento", en: "Strategy and launch" },
        items: [
          {
            es: "Ejecuté la estrategia de salida al mercado de la nueva ruta, construyendo awareness de marca y relevancia cultural.",
            en: "I executed the market launch strategy for the new route, building brand awareness and cultural relevance.",
          },
          {
            es: "Co-desarrollé el plan de negocios a 5 años para Sudamérica, alineando estrategia de marca, comercial y de alianzas.",
            en: "I co-developed the 5-year business plan for South America, aligning brand, commercial and partnership strategy.",
          },
          {
            es: "Lideré el posicionamiento y las campañas 360° integradas, B2C y B2B, en los cuatro mercados.",
            en: "I led positioning and integrated 360° campaigns, B2C and B2B, across the four markets.",
          },
        ],
      },
      {
        heading: { es: "Alianzas y sponsorships", en: "Partnerships and sponsorships" },
        items: [
          {
            es: "Tourism New Zealand, All Blacks, UAR (Unión Argentina de Rugby), Agustín Pichot, Auckland Airport y ESPN.",
            en: "Tourism New Zealand, All Blacks, UAR (Unión Argentina de Rugby), Agustín Pichot, Auckland Airport and ESPN.",
          },
          {
            es: "Agencias de viaje online (Despegar, Almundo) y los programas de TV Resto del Mundo (Canal 13) y Por el Mundo (Telefe).",
            en: "Online travel agencies (Despegar, Almundo) and the TV shows Resto del Mundo (Canal 13) and Por el Mundo (Telefe).",
          },
          {
            es: "Relaciones de largo plazo con periodistas e influencers: contenido editorial y viajes a Nueva Zelanda.",
            en: "Long-term relationships with journalists and influencers: editorial content and trips to New Zealand.",
          },
        ],
      },
      {
        heading: { es: "Agencias y ejecución", en: "Agencies and execution" },
        items: [
          {
            es: "Cinco agencias al mismo tiempo: creatividad (Don), PR (Muchnik), medios (FG) y activaciones (Ideapolis y Human).",
            en: "Five agencies at the same time: creative (Don), PR (Muchnik), media (FG) and activations (Ideapolis and Human).",
          },
          {
            es: "Presupuesto anual de marketing regional de más de USD 500K, con seguimiento financiero de campañas y alianzas.",
            en: "An annual regional marketing budget of over USD 500K, with financial tracking of campaigns and partnerships.",
          },
          {
            es: "Reporte de KPIs: ROI, performance de medios, awareness de marca y efectividad de las alianzas.",
            en: "KPI reporting: ROI, media performance, brand awareness and partnership effectiveness.",
          },
        ],
      },
    ],
    stats: [
      { value: { es: "4", en: "4" }, label: { es: "mercados: Argentina, Brasil, Chile y Uruguay", en: "markets: Argentina, Brazil, Chile and Uruguay" } },
      { value: { es: "5", en: "5" }, label: { es: "años de plan de negocios regional", en: "years of regional business plan" } },
      { value: { es: "5", en: "5" }, label: { es: "agencias, una sola voz de marca", en: "agencies, one brand voice" } },
      { value: { es: "500K+", en: "500K+" }, label: { es: "dólares de presupuesto regional anual", en: "US dollars of annual regional budget" } },
    ],
    videosHeading: { es: "Videos", en: "Videos" },
    videos: airNzVideos,
    outcome: {
      heading: { es: "Resultado", en: "Result" },
      text: {
        es: "Contribuí al lanzamiento exitoso de la ruta y a la consolidación de la marca, con buenos load factors estacionales.",
        en: "I contributed to a successful route launch and to the consolidation of the brand, with strong seasonal load factors.",
      },
    },
  },
  {
    slug: "walt-disney-company",
    label: { es: "Disney", en: "Disney" },
    name: { es: "The Walt Disney Company", en: "The Walt Disney Company" },
    years: { es: "2011-2015", en: "2011-2015" },
    role: {
      es: "Promociones, distribución digital y Disney Labs",
      en: "Promotions, digital distribution and Disney Labs",
    },
    place: { es: "Latinoamérica", en: "Latin America" },
    summary: {
      es: "Tres roles dentro de uno de los sistemas de marca más disciplinados del mundo.",
      en: "Three roles inside one of the most disciplined brand systems in the world.",
    },
    cover: {
      kind: "figure",
      value: { es: "70.000", en: "70,000" },
      label: {
        es: "unidades de DVD vendidas en una sola promoción con Solo Deportes",
        en: "DVD units sold in a single promotion with Solo Deportes",
      },
    },
    context: {
      es: "Mi carrera de marca empezó en The Walt Disney Company. Entre 2011 y 2015 coordiné promociones y alianzas de marca para toda Latinoamérica, gestioné la distribución digital de contenido de Disney, Marvel, Pixar y Lucasfilm en el resto de la región, y dediqué el 20% de mi tiempo a Disney Labs, el programa de emprendedurismo corporativo de Disney Latinoamérica.",
      en: "My brand career began at The Walt Disney Company. Between 2011 and 2015 I coordinated brand promotions and partnerships for all of Latin America, managed the digital distribution of Disney, Marvel, Pixar and Lucasfilm content across the rest of the region, and spent 20% of my time on Disney Labs, Disney Latin America's corporate entrepreneurship programme.",
    },
    blocks: [
      {
        heading: { es: "Promotions Coordinator, 2011 a 2014", en: "Promotions Coordinator, 2011 to 2014" },
        items: [
          {
            es: "Promociones de marca 360° y alianzas con terceros para Latinoamérica, con todas las líneas de negocio de Disney.",
            en: "360° brand promotions and third-party partnerships for Latin America, across all Disney lines of business.",
          },
          {
            es: "Campañas promocionales integradas, locales y regionales, con franquicias de Disney, Marvel, Pixar y Lucasfilm.",
            en: "Integrated local and regional promotional campaigns with Disney, Marvel, Pixar and Lucasfilm franchises.",
          },
          {
            es: "Aprobaciones de todo el material de marca con el marketing regional y la casa central de Burbank.",
            en: "Approvals of all branded material with regional marketing and the Burbank headquarters.",
          },
        ],
      },
      {
        heading: {
          es: "Digital Distribution Sales Coordinator, 2014 a 2015",
          en: "Digital Distribution Sales Coordinator, 2014 to 2015",
        },
        items: [
          {
            es: "Estrategia de distribución digital para el resto de Latinoamérica.",
            en: "Digital distribution strategy for the Rest of Latin America region.",
          },
          {
            es: "Alianzas comerciales con Netflix, Apple/iTunes, Google Play, Microsoft y operadores de telecomunicaciones.",
            en: "Commercial partnerships with Netflix, Apple/iTunes, Google Play, Microsoft and telecom operators.",
          },
          {
            es: "Precios, bundles y promociones para ganar visibilidad en las tiendas digitales.",
            en: "Pricing, bundles and promotions to win visibility in digital storefronts.",
          },
        ],
      },
      {
        heading: { es: "Disney Labs, 2014 a 2015", en: "Disney Labs, 2014 to 2015" },
        items: [
          {
            es: "Fui seleccionado para el primer programa de emprendedurismo corporativo de Disney Latinoamérica.",
            en: "I was selected for Disney Latin America's first corporate entrepreneurship programme.",
          },
          {
            es: "Diseñé y validé conceptos de producto con Lean Startup, Agile y Design Thinking, en equipos de varias regiones.",
            en: "I designed and validated product concepts with Lean Startup, Agile and Design Thinking, in cross-regional teams.",
          },
          {
            es: "Presenté prototipos al C-suite regional y al liderazgo global para conseguir financiamiento.",
            en: "I pitched prototypes to the regional C-suite and global leadership to obtain funding.",
          },
        ],
      },
    ],
    stats: [
      { value: { es: "100+", en: "100+" }, label: { es: "promociones por año", en: "promotions per year" } },
      { value: { es: "70.000", en: "70,000" }, label: { es: "unidades de DVD en una sola promoción", en: "DVD units in a single promotion" } },
      { value: { es: "4", en: "4" }, label: { es: "modelos de negocio digitales: SVOD, TVOD, EST y FVOD", en: "digital business models: SVOD, TVOD, EST and FVOD" } },
      { value: { es: "20%", en: "20%" }, label: { es: "de mi tiempo en Disney Labs", en: "of my time on Disney Labs" } },
    ],
    outcome: {
      heading: { es: "Qué me llevé", en: "What I took with me" },
      text: {
        es: "Disciplina de marca y pensamiento de producto desde el primer día: la base de cómo trabajo hoy.",
        en: "Brand discipline and product thinking from day one: the foundation of how I work today.",
      },
    },
  },
  {
    slug: "agency-experience",
    label: { es: "Agencias", en: "Agencies" },
    name: { es: "Años de agencia", en: "Agency years" },
    years: { es: "2007-2011", en: "2007-2011" },
    role: { es: "Cuentas en JWT y Altheim", en: "Account roles at JWT and Altheim" },
    place: { es: "Buenos Aires", en: "Buenos Aires" },
    summary: {
      es: "Donde aprendí el oficio: campañas, activaciones y eventos para consumo masivo, banca, telcos y retail.",
      en: "Where I learned the craft: campaigns, activations and events for mass-market, banking, telco and retail brands.",
    },
    cover: {
      kind: "video",
      video: agencyYearsVideos[4] ?? agencyYearsVideos[0],
      alt: {
        es: "Fotograma del videocaso Embajadores Nokia de 2011",
        en: "Still from the 2011 Nokia Ambassadors video case",
      },
    },
    context: {
      es: "Mis primeros años fueron en agencias de publicidad: primero como asistente de cuentas en Altheim Comunicaciones y después como ejecutivo de cuentas BTL en J. Walter Thompson. Ahí aprendí a trabajar de cerca con clientes, creativos y proveedores.",
      en: "My first years were in advertising agencies: first as an account assistant at Altheim Comunicaciones and then as a BTL account executive at J. Walter Thompson. That is where I learned to work closely with clients, creatives and suppliers.",
    },
    blocks: [
      {
        heading: { es: "J. Walter Thompson, 2008 a 2011", en: "J. Walter Thompson, 2008 to 2011" },
        items: [
          { es: "Campañas nacionales para Claro, Ford y Johnson & Johnson.", en: "National campaigns for Claro, Ford and Johnson & Johnson." },
          {
            es: "Rebranding y relanzamiento de Cerveza Imperial (CCU), con la activación Sesiones Imperial.",
            en: "Cerveza Imperial (CCU) rebrand and relaunch, including the Sesiones Imperial activation.",
          },
          {
            es: "Embajadores Nokia N-Series: una convocatoria a emprendedores tecnológicos.",
            en: "Nokia N-Series Ambassadors: a call for tech entrepreneurs.",
          },
          {
            es: "Producción de spots, eventos y promociones masivas con múltiples stakeholders.",
            en: "Production of commercials, events and mass promotions with multiple stakeholders.",
          },
        ],
      },
      {
        heading: { es: "Altheim Comunicaciones, 2007 a 2008", en: "Altheim Comunicaciones, 2007 to 2008" },
        items: [
          {
            es: "Mi primer trabajo formal, en una agencia boutique con campañas ATL, BTL y 360°.",
            en: "My first formal job, at a boutique agency running ATL, BTL and 360° campaigns.",
          },
          {
            es: "Asistí a directores de cuenta y armé presentaciones y reportes para clientes.",
            en: "I assisted account directors and prepared presentations and reports for clients.",
          },
          {
            es: "Sugerí la idea de la acción Beldent Splash en el superclásico River-Boca de 2007, y se produjo.",
            en: "I suggested the idea of the Beldent Splash stunt at the 2007 River-Boca derby, and it was produced.",
          },
        ],
      },
    ],
    videosHeading: { es: "Videos", en: "Videos" },
    videos: agencyYearsVideos,
    outcome: {
      heading: { es: "Qué me llevé", en: "What I took with me" },
      text: {
        es: "El oficio de las cuentas y una idea propia en la cancha: un actor de la publicidad de Beldent irrumpiendo en un River-Boca.",
        en: "The account craft and an idea of my own on the pitch: an actor from the Beldent commercial bursting into a River-Boca derby.",
      },
    },
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const work = {
  context: { es: "Contexto", en: "Context" } as L,
  engagements: { es: "Clientes", en: "Clients" } as L,
  links: { es: "Enlaces", en: "Links" } as L,
  nextLabel: { es: "Siguiente caso", en: "Next case" } as L,
}

// ---------------------------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------------------------

export const profile = {
  title: { es: "Perfil", en: "Profile" } as L,
  description: {
    es: "Perfil de Tomás Peró: trayectoria en agencias, Disney, Air New Zealand y consultoría, fortalezas, formación y roles que busca.",
    en: "Profile of Tomás Peró: career across agencies, Disney, Air New Zealand and consulting, strengths, education and target roles.",
  } as L,
  statement: {
    es: "Miro las marcas con lente cultural y las construyo con método.",
    en: "I look at brands through a cultural lens and build them with method.",
  } as L,
  portraitAlt: {
    es: "Retrato en blanco y negro de Tomás Peró, mirando a cámara desde abajo",
    en: "Black and white portrait of Tomás Peró, looking up at the camera",
  } as L,
  bio: [
    {
      es: "Soy Brand Strategist y líder de marketing de marca, con más de 18 años construyendo, lanzando y escalando marcas en entretenimiento, aviación, esports, fintech, healthtech y producción audiovisual.",
      en: "I'm a Brand Strategist and Brand Marketing Leader with 18+ years building, launching and scaling brands across entertainment, aviation, esports, fintech, healthtech and audiovisual production.",
    },
    {
      es: "Me formé en agencias (Altheim y J. Walter Thompson) y mi carrera de marca empezó en The Walt Disney Company: promociones y alianzas de marca para toda Latinoamérica, después distribución digital y Disney Labs, su programa de innovación.",
      en: "I trained in agencies (Altheim and J. Walter Thompson), and my brand career began at The Walt Disney Company: brand promotions and partnerships for all of Latin America, then digital distribution and Disney Labs, its innovation programme.",
    },
    {
      es: "En Air New Zealand, de 2015 a 2020, lideré el marketing regional y el desarrollo de mercado para Sudamérica: lanzamiento de marca, plan de negocios a 5 años y cinco agencias trabajando con una sola voz.",
      en: "At Air New Zealand, from 2015 to 2020, I led regional marketing and market development for South America: brand launch, a 5-year business plan and five agencies working with a single voice.",
    },
    {
      es: "Desde 2020 acompaño a marcas en lanzamiento o en transición: Stone Movistar (esports y streaming), Airtm (fintech), DrGea.com (healthtech) y Paradise.la (producción creativa con IA).",
      en: "Since 2020 I have worked with brands that are launching or in transition: Stone Movistar (esports and streaming), Airtm (fintech), DrGea.com (healthtech) and Paradise.la (creative production with AI).",
    },
    {
      es: "No miro la cultura desde afuera: soy fan del deporte, del stand-up y del hardware. Y uso todos los días un stack de IA para prototipar campañas, acelerar la producción de contenido y ampliar lo que puede entregar un equipo de marca chico.",
      en: "I don't watch culture from the outside: I'm a fan of sport, stand-up comedy and hardware. And I run a daily AI stack to prototype campaigns, speed up content production and expand what a small brand team can deliver.",
    },
  ] as L[],
  lists: [
    {
      heading: { es: "Fortalezas", en: "Strengths" },
      items: [
        { es: "Estrategia y posicionamiento de marca", en: "Brand strategy and positioning" },
        { es: "Salida al mercado integrada", en: "Integrated go-to-market" },
        { es: "Marketing cultural y alianzas", en: "Cultural marketing and partnerships" },
        { es: "Orquestación de agencias", en: "Agency orchestration" },
        { es: "Workflows creativos con IA", en: "AI-powered creative workflows" },
      ],
    },
    {
      heading: { es: "Mejor encaje", en: "Best fit" },
      items: [
        { es: "Marcas en lanzamiento o en transición", en: "Brands launching or in transition" },
        { es: "Equipos de marca y marketing chicos", en: "Lean brand and marketing teams" },
        { es: "Agencias y estudios que suman IA a su producción", en: "Agencies and studios adding AI to production" },
      ],
    },
    {
      heading: { es: "Roles que busco", en: "Target roles" },
      items: [
        { es: "Head of Brand", en: "Head of Brand" },
        { es: "Brand Lead o Brand Manager", en: "Brand Lead or Brand Manager" },
        { es: "Brand Marketing Manager", en: "Brand Marketing Manager" },
        { es: "Brand Strategist", en: "Brand Strategist" },
        { es: "Cultural Marketing", en: "Cultural Marketing" },
        { es: "Creative Technologist", en: "Creative Technologist" },
      ],
    },
    {
      heading: { es: "Formación", en: "Education" },
      items: [
        { es: "Licenciatura en Publicidad, UCES", en: "Bachelor's degree in Advertising, UCES" },
        { es: "IA generativa en Morfeo Academy, 2024 a 2026", en: "Generative AI at Morfeo Academy, 2024 to 2026" },
      ],
    },
  ] as { heading: L; items: L[] }[],
  pathHeading: { es: "Trayectoria", en: "Career path" } as L,
  path: [
    { years: "2024-2026", company: "Paradise.la", role: "AI & Content Consultant & Producer", slug: "independent-consultant" },
    { years: "2024", company: "$MAGAIBA", role: "Community, Comms & AI Content (side project)" },
    { years: "2023-2024", company: "DrGea.com", role: "Head of Communications", slug: "independent-consultant" },
    { years: "2022-2023", company: "Sinerlogic", role: "Marketing & Branding Consultant", slug: "independent-consultant" },
    { years: "2021-2022", company: "Airtm", role: "Growth Marketing + R&D", slug: "independent-consultant" },
    { years: "2020-2021", company: "Stone Movistar", role: "Brand & Marketing Consultant", slug: "independent-consultant" },
    { years: "2020", company: "Go Broadway!", role: "Marketing Consultant", slug: "independent-consultant" },
    { years: "2015-2020", company: "Air New Zealand", role: "Marketing Specialist & Market Development", slug: "air-new-zealand" },
    { years: "2011-2015", company: "The Walt Disney Company", role: "Promotions, Digital Distribution, Disney Labs", slug: "walt-disney-company" },
    { years: "2008-2011", company: "J. Walter Thompson", role: "Account Executive", slug: "agency-experience" },
    { years: "2007-2008", company: "Altheim Comunicaciones", role: "Account Assistant", slug: "agency-experience" },
  ] as { years: string; company: string; role: string; slug?: string }[],
}

// ---------------------------------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------------------------------

export const notFound = {
  title: { es: "Página no encontrada", en: "Page not found" } as L,
  word: { es: "Acá no", en: "Not here" } as L,
  text: {
    es: "El acento cayó en un lugar donde no hay nada. La página que buscás no existe o cambió de dirección.",
    en: "The accent fell where there is nothing. The page you are looking for does not exist or has moved.",
  } as L,
  back: { es: "Volver al inicio", en: "Back to the start" } as L,
}
