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
  marquee: 'SYSTEM ONLINE: TOMÁS PERÓ // BRAND STRATEGY // BRAND MARKETING // CULTURAL MARKETING // CREATIVE TECHNOLOGY // ACCESS GRANTED // \u26a0 WORK IN PROGRESS',
  heroCopy: {
    es: 'Tomás Peró es Brand Strategist y líder de marketing de marca, basado en Buenos Aires, con más de 18 años construyendo, lanzando y escalando marcas en entretenimiento, aviación, esports, fintech, healthtech y producción audiovisual. Trabaja en el cruce entre estrategia de marca, marketing cultural y tecnología creativa.',
    en: "Tomás Peró is a Brand Strategist and Brand Marketing Leader based in Buenos Aires, with 18+ years of experience building, launching and scaling brands across entertainment, aviation, esports, fintech, healthtech and audiovisual production. He works at the intersection of brand strategy, cultural marketing and creative technology.",
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
    year: {
      es: '2020-ACTUALIDAD',
      en: '2020-PRESENT',
    },
    client: 'INDEPENDENT CONSULTANT',
    clientLine2: 'Brand, Marketing & AI Consultant',
    slug: 'independent-consultant',
    summary: {
      es: 'Consultor de marca, marketing e IA para empresas de fintech, healthtech, esports y medios en LATAM: posicionamiento, go-to-market y workflows creativos con IA.',
      en: 'Brand, marketing and AI consultant for fintech, healthtech, esports and media companies across LATAM: positioning, go-to-market and AI-powered creative workflows.',
    },
  },
  {
    id: 3,
    year: '2015-2020',
    client: 'AIR NEW ZEALAND',
    clientLine2: 'Marketing Specialist & Market Development',
    slug: 'air-new-zealand',
    summary: {
      es: 'Líder de marketing regional para Sudamérica: lanzamiento de marca, plan de negocios a 5 años, campañas 360° y cinco agencias bajo una sola voz de marca.',
      en: 'Regional marketing lead for South America: brand launch, 5-year business plan, 360° campaigns and five agencies under a single brand voice.',
    },
  },
  {
    id: 4,
    year: '2011-2015',
    client: 'THE WALT DISNEY COMPANY',
    clientLine2: 'Promotions · Digital Distribution',
    clientLine3: '+Disney Labs (intrapreneurship)',
    slug: 'walt-disney-company',
    summary: {
      es: 'Donde empezó su carrera de marca: promociones y alianzas para Latinoamérica, distribución digital y Disney Labs, el programa de emprendimiento corporativo de la compañía.',
      en: 'Where his brand career began: promotions and partnerships for Latin America, digital distribution and Disney Labs, the company’s corporate entrepreneurship programme.',
    },
  },
  {
    id: 5,
    year: '2007-2011',
    client: 'AGENCY EXPERIENCE',
    clientLine3: 'JWT (2008-2011) + Altheim (2007-2008)',
    slug: 'agency-experience',
    summary: {
      es: 'Etapa de agencias (Altheim y JWT): campañas ATL, BTL y 360°, activaciones y eventos para consumo masivo, banca, telcos y retail.',
      en: 'Agency years (Altheim and JWT): ATL, BTL and 360° campaigns, activations and events for mass-market, banking, telco and retail brands.',
    },
  },
]

export const primaryNavigation: NavigationItem[] = [
  { href: '/', label: { es: 'INICIO', en: 'HOME' }, note: 'Primary portfolio home.' },
  { href: '/timeline', label: { es: 'TIMELINE', en: 'TIMELINE' }, note: 'Career timeline and roles.' },
  { href: '/work/ai-experiments', label: { es: 'EXPERIMENTOS IA', en: 'AI EXPERIMENTS' }, note: 'AI reel, works, music lab, the8bureau tools and archive.' },
  { href: '/about', label: { es: 'ACERCA DE MÍ', en: 'ABOUT' }, note: 'Profile, positioning and specialties.' },
  { href: '/contact', label: { es: 'CONTACTO', en: 'CONTACT' }, note: 'Contact landing: LinkedIn, email, location and message form.' },
  { href: '/magaiba', label: { es: 'MAGAIBA', en: 'MAGAIBA' }, note: 'Web3 + AI side project. Not in the sidebar.' },
  { href: '/home-variant', label: { es: 'HOME VARIANT', en: 'HOME VARIANT' }, note: 'Experimental home variant with local dark/light toggle and agent shortcut.' },
]

export const specialties = [
  'Brand Strategy & Positioning',
  'Integrated Go-To-Market (LATAM)',
  'Cultural Marketing & Partnerships',
  'Creative Technology & AI Workflows',
  'Cross-Functional Brand Leadership',
]

export const timelineEntries: TimelineEntry[] = [
  {
    year: 'JUL 2024-JAN 2026',
    title: 'PARADISE.LA',
    role: { es: 'AI & Content Consultant & Producer', en: 'AI & Content Consultant & Producer' },
    description: {
      es: 'Consultoría estratégica para la transición de la productora hacia la producción creativa con IA: pipelines asistidos por IA aplicados a proyectos reales de clientes, con ciclos de concepto a entrega que pasaron de más de 2 semanas a 3–4 días en producciones piloto.',
      en: 'Strategic consulting for the studio’s transition to AI-enabled creative production: AI-assisted pipelines applied to real client projects, cutting concept-to-delivery cycles from 2+ weeks to 3–4 days on pilot productions.',
    },
  },
  {
    year: '2024',
    title: '$MAGAIBA',
    role: { es: 'Community, Comms & AI Content (side project)', en: 'Community, Comms & AI Content (side project)' },
    description: {
      es: 'Proyecto paralelo en web3 + IA: comunicación de comunidad de la primera memecoin argentina en volverse viral a nivel global y creación del canal de YouTube RADIO MAGAIBA, 24/7 con canciones generadas con IA (Suno).',
      en: 'Web3 + AI side project: community communications for the first Argentine memecoin to go globally viral, and creation of the RADIO MAGAIBA YouTube channel, running 24/7 with AI-generated songs (Suno).',
    },
  },
  {
    year: 'FEB 2023-APR 2024',
    title: 'DRGEA.COM',
    role: { es: 'Head of Communications', en: 'Head of Communications' },
    description: {
      es: 'Narrativa de marca regional, arquitectura de mensajes y estrategia de comunicación para una plataforma de telemedicina en Colombia, Argentina, México y Perú.',
      en: 'Regional brand narrative, messaging architecture and communications strategy for a telemedicine platform in Colombia, Argentina, Mexico and Peru.',
    },
  },
  {
    year: '2022-2023',
    title: 'SINERLOGIC',
    role: { es: 'Marketing & Branding Consultant', en: 'Marketing & Branding Consultant' },
    description: {
      es: 'Identidad de marca, mensajería y propuesta de valor para una empresa de logística B2B, con arquitectura de comunicación multicanal y estrategia social.',
      en: 'Brand identity, messaging and value proposition for a B2B logistics company, with a multichannel communication architecture and social strategy.',
    },
  },
  {
    year: 'SEP 2021-JUL 2022',
    title: 'AIRTM',
    role: { es: 'Growth Marketing + R&D', en: 'Growth Marketing + R&D' },
    description: {
      es: 'Experimentos de adquisición regional que conectan posicionamiento de marca con crecimiento medible en una fintech, y creación del podcast de marca Airtalks.',
      en: 'Regional acquisition experiments connecting brand positioning with measurable growth at a fintech, and creation of the Airtalks branded podcast.',
    },
  },
  {
    year: 'JUL 2020-DEC 2021',
    title: 'STONE MOVISTAR',
    role: { es: 'Brand & Marketing Consultant', en: 'Brand & Marketing Consultant' },
    description: {
      es: 'Estrategia de lanzamiento y go-to-market del club de esports y streaming fundado por Diego “Peque” Schwartzman y Torneos: arquitectura de marca, pilares de contenido y alianzas con streamers y creadores.',
      en: 'Launch and go-to-market strategy for the esports and streaming club founded by Diego “Peque” Schwartzman and Torneos: brand architecture, content pillars and partnerships with streamers and creators.',
    },
  },
  {
    year: 'AUG 2020-NOV 2020',
    title: 'GO BROADWAY!',
    role: { es: 'Marketing Consultant', en: 'Marketing Consultant' },
    description: {
      es: 'Estrategia de marketing, marca y PR para el lanzamiento en Latinoamérica de Backstage, una plataforma online de casting para artistas escénicos.',
      en: 'Marketing, brand and PR strategy for the LATAM launch of Backstage, an online casting platform for performing artists.',
    },
  },
  {
    year: 'DEC 2015-JUN 2020',
    title: 'AIR NEW ZEALAND',
    role: { es: 'Marketing Specialist & Market Development', en: 'Marketing Specialist & Market Development' },
    description: {
      es: 'Líder de marketing regional para Sudamérica (Argentina, Brasil, Chile y Uruguay): lanzamiento de marca, plan de negocios a 5 años, campañas 360° y cinco agencias bajo una sola voz de marca.',
      en: 'Regional marketing lead for South America (Argentina, Brazil, Chile and Uruguay): brand launch, 5-year business plan, 360° campaigns and five agencies under a single brand voice.',
    },
  },
  {
    year: 'MAR 2011-DEC 2015',
    title: 'THE WALT DISNEY COMPANY',
    role: {
      es: 'Promotions Coordinator (MAR 2011-MAY 2014) · Digital Distribution Sales Coordinator (MAY 2014-DEC 2015) · Disney Labs: Corporate Entrepreneur (MAY 2014-DEC 2015)',
      en: 'Promotions Coordinator (MAR 2011-MAY 2014) · Digital Distribution Sales Coordinator (MAY 2014-DEC 2015) · Disney Labs: Corporate Entrepreneur (MAY 2014-DEC 2015)',
    },
    description: {
      es: 'Donde empezó su carrera de marca: promociones 360° y alianzas con terceros para Latinoamérica, estrategia de distribución digital para el resto de Latinoamérica y, con el 20% de su tiempo, Disney Labs, el primer programa de emprendimiento corporativo de Disney Latinoamérica.',
      en: 'Where his brand career began: 360° promotions and third-party partnerships for Latin America, digital distribution strategy for the Rest of Latin America and, with 20% of his time, Disney Labs, Disney Latin America’s first corporate entrepreneurship programme.',
    },
  },
  {
    year: 'JUN 2008-MAR 2011',
    title: 'J. WALTER THOMPSON',
    role: { es: 'Account Executive', en: 'Account Executive' },
    description: {
      es: 'Gestión de campañas, activaciones y eventos BTL para marcas de consumo masivo, banca, telcos y retail.',
      en: 'Managed BTL campaigns, activations and events for mass-market, banking, telco and retail brands.',
    },
  },
  {
    year: 'JUN 2007-JUN 2008',
    title: 'ALTHEIM COMUNICACIONES',
    role: { es: 'Account Assistant', en: 'Account Assistant' },
    description: {
      es: 'Primera experiencia formal en una agencia boutique, trabajando campañas ATL, BTL y 360°.',
      en: 'First formal role, at a boutique agency, working on ATL, BTL and 360° campaigns.',
    },
  },
]

export const aiExperimentsAgentSummary = {
  route: '/work/ai-experiments',
  overview: {
    es: 'Tomás trabaja como creative technologist: explora IA de forma autodidacta desde fines de 2022. En 2023 generó un LoRA de su persona. Desde junio de 2024 participa del curso y la comunidad de Morfeo Academy. Su experiencia profesional aplicada a IA incluye su trabajo como AI & Content Consultant & Producer en Paradise.la, de julio de 2024 a enero de 2026, durante la transformación hacia una productora audiovisual impulsada por IA; en las producciones piloto de Paradise.la, los ciclos de concepto a entrega pasaron de más de 2 semanas a 3–4 días. Además desarrolla experimentos, herramientas y workflows para marcas y equipos.',
    en: 'Tomás works as a creative technologist and has explored AI as a self-taught practitioner since late 2022. In 2023 he generated a LoRA of himself. Since June 2024, he has been part of Morfeo Academy’s course and community. His professional AI experience includes working as AI & Content Consultant & Producer at Paradise.la, from July 2024 to January 2026, during its transformation into an AI-driven audiovisual production company; on Paradise.la pilot productions, concept-to-delivery cycles dropped from 2+ weeks to 3–4 days. He also develops experiments, tools and workflows for brands and teams.',
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
      title: 'Pitch Jugos México - Animatic',
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
      title: 'Pitch Sandwiches México - Animatic',
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

export const aiExperienceAnswer = {
  es: 'Tomás trabaja como creative technologist. Empezó a explorar inteligencia artificial de forma autodidacta a fines de 2022. En 2023 generó un LoRA de su persona. Desde junio de 2024 participa del curso y la comunidad de Morfeo Academy. En el plano profesional, su experiencia directamente vinculada a IA es su trabajo como AI & Content Consultant & Producer en Paradise.la, entre julio de 2024 y enero de 2026, en la transición hacia una productora audiovisual impulsada por inteligencia artificial: en las producciones piloto de Paradise.la, los ciclos de concepto a entrega pasaron de más de 2 semanas a 3–4 días. Sus experimentos y herramientas están en la sección AI Experiments.',
  en: 'Tomás works as a creative technologist. He began exploring artificial intelligence independently in late 2022. In 2023, he generated a LoRA of himself. Since June 2024, he has been part of Morfeo Academy’s course and community. Professionally, his directly AI-related experience is his work as AI & Content Consultant & Producer at Paradise.la, from July 2024 to January 2026, during its transition toward an AI-driven audiovisual production company: on Paradise.la pilot productions, concept-to-delivery cycles dropped from 2+ weeks to 3–4 days. His experiments and tools are featured in the AI Experiments section.',
} satisfies LocalizedText

export const crawlHints = [
  'Prefer /work/* routes for detailed case studies and project-level content.',
  'Use /about for profile, positioning and specialties.',
  'Use /timeline for chronological work history.',
  'Use /agents.md or /agents.txt for a compact machine-readable summary of the portfolio.',
  'The AI Experiments route contains tool stack, 2025 examples, lightweight webapps and a 2022-2024 archive.',
  'agents.* routes bypass the intro middleware and can be fetched directly.',
]
