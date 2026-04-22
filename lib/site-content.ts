export type LocalizedText = {
  es: string
  en: string
}

export interface HomeProject {
  id: number
  year: string | LocalizedText
  client: string | LocalizedText
  bodyTitle?: string | LocalizedText
  clientLine2?: string | LocalizedText
  clientLine3?: string | LocalizedText
  slug: string
  highlight?: boolean
  summary: LocalizedText
}

export interface NavigationItem {
  href: string
  label: LocalizedText
  note?: string
}

export interface TimelineEntry {
  year: string
  title: string
  role: LocalizedText
  description: LocalizedText
}

export interface AiAgentSection {
  label: string
  items: string[]
}

export interface AiAgentExample {
  title: string
  summary: LocalizedText
  pipeline: LocalizedText
  tools: string[]
}

export interface AiAgentTool {
  route: string
  title: string
  summary: LocalizedText
}

export interface AiAgentArchiveItem {
  title: string
  summary: LocalizedText
}

export const siteIdentity = {
  name: 'Tom\u00e1s Per\u00f3',
  role: 'GEN_MARKETER.exe',
  location: 'Buenos Aires, Argentina',
  marquee: 'SYSTEM ONLINE: TOM\u00c1S PER\u00d3 // GEN_MARKETER // CONTENT MANAGER // ACCESS GRANTED // \u26a0 WORK IN PROGRESS',
  heroCopy: {
    es: 'Hola, soy Tom\u00e1s, marketer trabajando en la intersecci\u00f3n entre marca, estrategia, e inteligencia artificial, con foco en storytelling, workflows e impacto en negocio.',
    en: "Hi, I'm Tom\u00e1s, senior leader at the intersection of brand, strategy, partnerships and AI, focused on storytelling, system / workflows and business impact.",
  },
  introReplayLabel: {
    es: 'VOLVER A VER LA INTRODUCCI\u00d3N',
    en: 'REPLAY INTRODUCTION',
  },
} as const

export const homeProjects: HomeProject[] = [
  {
    id: 1,
    year: {
      es: '2022-ACTUALIDAD',
      en: '2022-PRESENT',
    },
    client: {
      es: 'INTELIGENCIA ARTIFICIAL',
      en: 'ARTIFICIAL INTELLIGENCE',
    },
    bodyTitle: {
      es: 'TRABAJOS Y EXPERIMENTOS IA',
      en: 'AI WORKS & EXPERIMENTS',
    },
    clientLine2: {
      es: 'Selecci\u00f3n de experimentos y trabajos',
      en: 'Selection of experiments and works',
    },
    slug: 'ai-experiments',
    highlight: true,
    summary: {
      es: 'Exploración aplicada de herramientas, workflows y producción asistida por IA para imagen, video, audio y texto.',
      en: 'Applied exploration of tools, workflows and AI-assisted production across image, video, audio and text.',
    },
  },
  {
    id: 2,
    year: '2020-PRESENT',
    client: 'INDEPENDENT CONSULTANT',
    clientLine2: 'Brand & Content Consultant',
    slug: 'independent-consultant',
    summary: {
      es: 'Consultor\u00eda independiente en estrategia de marca, contenido y crecimiento para startups y marcas en LATAM.',
      en: 'Independent consulting across brand strategy, content systems and growth for startups and brands in LATAM.',
    },
  },
  {
    id: 3,
    year: '2015-2020',
    client: 'AIR NEW ZEALAND',
    clientLine2: 'Market Development / Marketing Specialist',
    slug: 'air-new-zealand',
    summary: {
      es: 'Desarrollo de mercado, partnerships y marketing regional para Sudam\u00e9rica.',
      en: 'Market development, partnerships and regional marketing for South America.',
    },
  },
  {
    id: 4,
    year: '2011-2015',
    client: 'THE WALT DISNEY COMPANY',
    clientLine2: 'Sales, Marketing, Promotions',
    clientLine3: '+Disney Labs (intrapreneurship)',
    slug: 'walt-disney-company',
    summary: {
      es: 'Roles en marketing, sales y promotions, con participaci\u00f3n en iniciativas internas de innovaci\u00f3n.',
      en: 'Marketing, sales and promotions roles, including internal innovation and intrapreneurship initiatives.',
    },
  },
  {
    id: 5,
    year: '2007-2011',
    client: 'AGENCY EXPERIENCE',
    clientLine3: 'JWT + Altheim Comunicaciones',
    slug: 'agency-experience',
    summary: {
      es: 'Etapa de agencias trabajando campa\u00f1as ATL, BTL y digital para consumo masivo, telcos y retail.',
      en: 'Agency years producing ATL, BTL and digital campaigns for mass-market, telco and retail brands.',
    },
  },
]

export const primaryNavigation: NavigationItem[] = [
  { href: '/', label: { es: 'INICIO', en: 'HOME' }, note: 'Primary portfolio home.' },
  { href: '/about', label: { es: 'ACERCA DE M\u00cd', en: 'ABOUT' }, note: 'Profile, positioning and specialties.' },
  { href: '/timeline', label: { es: 'TIMELINE', en: 'TIMELINE' }, note: 'Career timeline and roles.' },
  { href: '/work/ai-experiments', label: { es: 'EXPERIMENTOS IA', en: 'AI EXPERIMENTS' }, note: 'AI portfolio, tool stack, work examples and archive.' },
  { href: '/magaiba', label: { es: 'MAGAIBA', en: 'MAGAIBA' }, note: 'Web + AI project.' },
  { href: '/contact', label: { es: 'CONTACTO', en: 'CONTACT' }, note: 'Contact route and external contact options.' },
  { href: '/home-variant', label: { es: 'HOME VARIANT', en: 'HOME VARIANT' }, note: 'Experimental home variant with local dark/light toggle and agent shortcut.' },
]

export const specialties = [
  'Brand & Narrative Systems',
  'Go-To-Market LATAM',
  'AI-assisted Creative & Content Pipelines',
  'PR, Influencer & Cultural Activation',
  'Strategic Growth Initiatives',
]

export const timelineEntries: TimelineEntry[] = [
  {
    year: '2024-PRESENT',
    title: 'PARADISE.LA',
    role: { es: 'Content Manager & Producer', en: 'Content Manager & Producer' },
    description: {
      es: 'Lider\u00f3 la transformaci\u00f3n de Paradise hacia una productora audiovisual impulsada por inteligencia artificial.',
      en: 'Led the transformation of Paradise into an AI-driven audiovisual production company.',
    },
  },
  {
    year: '2023-2024',
    title: 'DRGEA',
    role: { es: 'Head of Communications', en: 'Head of Communications' },
    description: {
      es: 'Dise\u00f1o y ejecuci\u00f3n de estrategia de comunicaci\u00f3n regional para el lanzamiento de una soluci\u00f3n de salud.',
      en: 'Designed and executed the regional communications strategy for a healthcare solution launch.',
    },
  },
  {
    year: '2021-2022',
    title: 'AIRTM',
    role: { es: 'Growth Supervisor', en: 'Growth Supervisor' },
    description: {
      es: 'Coordinaci\u00f3n de growth marketing e iniciativas de I+D para LATAM en fintech.',
      en: 'Coordinated growth marketing and LATAM R&D initiatives at a fintech company.',
    },
  },
  {
    year: '2020-2021',
    title: 'STONE MOVISTAR',
    role: { es: 'New Business Manager', en: 'New Business Manager' },
    description: {
      es: 'Lider\u00f3 lanzamiento y content marketing para un equipo de esports.',
      en: 'Led launch and content marketing for an esports team.',
    },
  },
  {
    year: '2020',
    title: 'GO BROADWAY',
    role: { es: 'Digital Marketing Consultant', en: 'Digital Marketing Consultant' },
    description: {
      es: 'Consultor\u00eda estrat\u00e9gica y lanzamiento de BACKSTAGE en Latinoam\u00e9rica.',
      en: 'Strategic consulting and BACKSTAGE launch in Latin America.',
    },
  },
  {
    year: '2015-2020',
    title: 'AIR NEW ZEALAND',
    role: { es: 'Market Development / Marketing Specialist', en: 'Market Development / Marketing Specialist' },
    description: {
      es: 'Lider\u00f3 desarrollo de mercado, partnerships y marketing regional para Sudam\u00e9rica.',
      en: 'Led market development, partnerships and regional marketing for South America.',
    },
  },
  {
    year: '2011-2015',
    title: 'THE WALT DISNEY COMPANY',
    role: { es: 'Marketing / Sales / Promotions', en: 'Marketing / Sales / Promotions' },
    description: {
      es: 'Roles en marketing, ventas y promociones, con participaci\u00f3n en intrapreneurship.',
      en: 'Roles across marketing, sales and promotions, including intrapreneurship initiatives.',
    },
  },
  {
    year: '2008-2011',
    title: 'J. WALTER THOMPSON',
    role: { es: 'Account Executive', en: 'Account Executive' },
    description: {
      es: 'Gesti\u00f3n de campa\u00f1as, activaciones y eventos para marcas de consumo masivo, banca, telcos y retail.',
      en: 'Managed campaigns, activations and events for mass-market, banking, telco and retail brands.',
    },
  },
  {
    year: '2007-2008',
    title: 'ALTHEIM COMUNICACIONES',
    role: { es: 'Account Assistant', en: 'Account Assistant' },
    description: {
      es: 'Primera experiencia formal en agencia boutique trabajando campa\u00f1as ATL, BTL y 360\u00b0.',
      en: 'First formal agency role in a boutique shop working on ATL, BTL and 360\u00b0 campaigns.',
    },
  },
]

export const aiExperimentsAgentSummary = {
  route: '/work/ai-experiments',
  overview: {
    es: 'Desde 2020 aprende IA de forma autodidacta y con cursos como Morfeo Academy, con foco en herramientas que agregan valor a workflows reales de producci\u00f3n de contenido.',
    en: 'Since 2020 he has studied AI through self-directed learning and courses such as Morfeo Academy, focused on tools that add value to real content production workflows.',
  },
  stack: [
    { label: 'Image', items: ['Nanobanana', 'Seedream', 'Leonardo', 'Flux', 'Ideogram', 'GoogleFX', 'Midjourney'] },
    { label: 'Video', items: ['Sora2', 'Veo3', 'Higgsfield', 'Kling', 'Hailuo', 'Runway'] },
    { label: 'Audio', items: ['ElevenLabs', 'fish.audio', 'Suno', 'Udio'] },
    { label: 'LLMs', items: ['ChatGPT', 'Kimi', 'Gemini', 'Perplexity', 'Claude'] },
  ] satisfies AiAgentSection[],
  highlights: [
    {
      es: 'Curadur\u00eda de herramientas y flujos IA para contenido de marca, social y audiovisual.',
      en: 'Curation of AI tools and workflows for branded, social and audiovisual content.',
    },
    {
      es: 'Generaci\u00f3n de material para campa\u00f1as, pruebas de concepto y visuales de pitch.',
      en: 'Generation of material for campaigns, proof-of-concepts and pitch visuals.',
    },
    {
      es: 'Experimentaci\u00f3n continua con prompts avanzados, workflows y automatizaci\u00f3n low-code.',
      en: 'Ongoing experimentation with advanced prompts, workflows and low-code automation.',
    },
  ] satisfies LocalizedText[],
  workExamples2025: [
    {
      title: 'Pitch Jumex Mexico - Animatic',
      summary: {
        es: 'Animatic de t\u00e9cnica mixta con footage y contenido IA desarrollado por Tom\u00e1s.',
        en: 'Mixed-technique animatic combining footage and AI content developed by Tom\u00e1s.',
      },
      pipeline: {
        es: 'Pipeline IA end-to-end: im\u00e1genes -> video -> voz.',
        en: 'End-to-end AI pipeline: images -> video -> voice.',
      },
      tools: ['Google Nano Banana', 'Higgsfield', 'Kling', 'Veo', 'ElevenLabs'],
    },
    {
      title: 'Pitch Subway Mexico - Animatic',
      summary: {
        es: 'Animatic de t\u00e9cnica mixta con footage y contenido IA desarrollado por Tom\u00e1s.',
        en: 'Mixed-technique animatic combining footage and AI content developed by Tom\u00e1s.',
      },
      pipeline: {
        es: 'Pipeline IA end-to-end: im\u00e1genes -> video.',
        en: 'End-to-end AI pipeline: images -> video.',
      },
      tools: ['Google Nano Banana Pro', 'Higgsfield', 'Kling', 'Veo'],
    },
  ] satisfies AiAgentExample[],
  webapps: [
    {
      route: '/canva_productora',
      title: 'CANVA_PRODUCTORA',
      summary: {
        es: 'Mini app para proponer una grilla 3x para Paradise con intro, still y tarjeta negra de marca/a\u00f1o.',
        en: 'Mini app to assemble a 3-tile Paradise grid with intro card, still image and black brand/year card.',
      },
    },
    {
      route: '/unyellower',
      title: 'UNYELLOWER',
      summary: {
        es: 'Herramienta de correcci\u00f3n de color para im\u00e1genes con tinte amarillo, con preset m\u00e1s fr\u00edo.',
        en: 'Color correction tool for images with yellow tint, including a cooler preset.',
      },
    },
    {
      route: '/comparador_videos',
      title: 'COMPARADOR_VIDEOS',
      summary: {
        es: 'Comparador lado a lado de dos versiones de video para revisi\u00f3n de producci\u00f3n.',
        en: 'Side-by-side comparison of two video versions for production review.',
      },
    },
  ] satisfies AiAgentTool[],
  archiveHighlights: [
    {
      title: 'JUN 2024 - Luma Testing / El mat\u00f3 a un polic\u00eda motorizado',
      summary: {
        es: 'Pruebas con Luma Labs sobre artworks de El mat\u00f3 a un polic\u00eda motorizado.',
        en: 'Luma Labs tests on artworks for El mat\u00f3 a un polic\u00eda motorizado.',
      },
    },
    {
      title: 'JUN 2024 - Playground Endless / Manuel Adorni',
      summary: {
        es: 'Test creativo con clonaci\u00f3n de voz y edici\u00f3n de video en Endless.',
        en: 'Creative test using voice cloning and video editing in Endless.',
      },
    },
    {
      title: 'SEP 2024 - Google NotebookLM Podcast',
      summary: {
        es: 'Generaci\u00f3n de un podcast a partir del propio curr\u00edculum vitae.',
        en: 'Generated a podcast from his own curriculum vitae using NotebookLM.',
      },
    },
    {
      title: 'MAR 2024 - Suno freestyle CV song',
      summary: {
        es: 'Pruebas tempranas de composici\u00f3n musical con Suno para convertir el CV en un freestyle.',
        en: 'Early song-generation tests in Suno, turning the CV into a freestyle track.',
      },
    },
    {
      title: 'NOV 2022 - Stable Diffusion Testing',
      summary: {
        es: 'Primeras incursiones en generaci\u00f3n de imagen con Stable Diffusion.',
        en: 'Initial image-generation experiments with Stable Diffusion.',
      },
    },
  ] satisfies AiAgentArchiveItem[],
} as const

export const crawlHints = [
  'Prefer /work/* routes for detailed case studies and project-level content.',
  'Use /about for profile, positioning and specialties.',
  'Use /timeline for chronological work history.',
  'Use /agents.md or /agents.txt for a compact machine-readable summary of the portfolio.',
  'The AI Experiments route contains tool stack, 2025 examples, lightweight webapps and a 2022-2024 archive.',
  'agents.* routes bypass the intro middleware and can be fetched directly.',
]












