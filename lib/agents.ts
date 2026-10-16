import {
  aiExperimentsAgentSummary,
  crawlHints,
  homeProjects,
  primaryNavigation,
  siteIdentity,
  timelineEntries,
  type LocalizedText,
} from "@/lib/site-content"
import { timelineExtras } from "@/lib/timeline-extras"

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

const navigationNotes: Record<string, Record<Lang, string>> = {
  "/": {
    en: "Canonical public home with project frames.",
    es: "Home canónica pública con frames de proyectos.",
  },
  "/timeline": {
    en: "Career timeline: each block is a planet with its videos orbiting it; $MAGAIBA has its own block.",
    es: "Timeline de carrera: cada bloque es un planeta con sus videos orbitando; $MAGAIBA tiene su propio bloque.",
  },
  "/work/ai-experiments": {
    en: "AI reel, 2026 and 2025 works, music lab, the8bureau tools, webapps and archive.",
    es: "Reel de IA, trabajos 2026 y 2025, music lab, herramientas de the8bureau, webapps y archivo.",
  },
  "/about": {
    en: "Profile, positioning, skills, target roles and education.",
    es: "Perfil, posicionamiento, skills, roles objetivo y formación.",
  },
  "/contact": {
    en: "Contact landing: LinkedIn, email, location and a message form.",
    es: "Landing de contacto: LinkedIn, email, ubicación y formulario de mensaje.",
  },
  "/magaiba": {
    en: "Web3 + AI side project (2024). Not in the sidebar: reached from the timeline, from the RADIO MAGAIBA shortcut below the music lab in AI Experiments, and from the assistant.",
    es: "Proyecto paralelo de web3 + IA (2024). No está en el menú lateral: se llega desde el timeline, desde el atajo RADIO MAGAIBA debajo del music lab en Experimentos IA, y desde el assistant.",
  },
  "/home-variant": {
    en: "Legacy alias that redirects to the current home.",
    es: "Alias legacy que redirige a la home actual.",
  },
}

function buildNavigationLines(lang: Lang) {
  return primaryNavigation.map((item) => ({
    route: item.href,
    label: item.label[lang],
    note: navigationNotes[item.href]?.[lang] ?? item.note ?? "",
  }))
}

const specialtiesLocalized = {
  en: [
    "Brand strategy & positioning",
    "Integrated go-to-market (LATAM)",
    "Cultural marketing & partnerships",
    "Creative technology & AI workflows",
    "Cross-functional brand leadership",
  ],
  es: [
    "Estrategia y posicionamiento de marca",
    "Go-to-market integrado (LATAM)",
    "Marketing cultural y alianzas",
    "Tecnología creativa y workflows de IA",
    "Liderazgo de marca cross-funcional",
  ],
} satisfies Record<Lang, string[]>

const aboutSnapshot = {
  en: [
    "Positioning: Brand Strategist and Brand Marketing Leader, working at the intersection of brand strategy, cultural marketing and creative technology.",
    "Background: 18+ years building, launching and scaling brands across entertainment, aviation, esports, fintech, healthtech and audiovisual production, from agencies and global brands to startups and independent consulting.",
    "Location: Buenos Aires, Argentina.",
    "Availability: open to brand leadership roles and to consulting projects with brands, agencies and lean teams.",
    "Working model: plugs into brand and marketing teams, brands and agencies to turn positioning into integrated go-to-market campaigns and to speed up execution with AI-powered creative workflows.",
    "Cultural lens: entertainment, sport, gaming, streaming, music and creators as brand-building levers, backed by genuine fandom (sports, stand-up comedy, high-performance hardware).",
  ],
  es: [
    "Posicionamiento: Brand Strategist y líder de marketing de marca, que trabaja en el cruce entre estrategia de marca, marketing cultural y tecnología creativa.",
    "Trayectoria: más de 18 años construyendo, lanzando y escalando marcas en entretenimiento, aviación, esports, fintech, healthtech y producción audiovisual, entre agencias, marcas globales, startups y consultoría independiente.",
    "Ubicación: Buenos Aires, Argentina.",
    "Disponibilidad: abierto a roles de liderazgo de marca y a proyectos de consultoría con marcas, agencias y equipos lean.",
    "Modelo de trabajo: se integra a equipos de marca y marketing, marcas y agencias para convertir el posicionamiento en campañas integradas de go-to-market y acelerar la ejecución con workflows creativos potenciados por IA.",
    "Lente cultural: entretenimiento, deporte, gaming, streaming, música y creadores como palancas de construcción de marca, con fanatismo genuino (deporte, stand-up, hardware de alto rendimiento).",
  ],
} satisfies Record<Lang, string[]>

const pillarsLocalized = {
  en: [
    "Brand strategy & positioning: platforms, architecture and narratives that hold across markets and channels.",
    "Cultural marketing: entertainment, sport, gaming, streaming, music and creator partnerships as brand-building levers.",
    "Creative technology: AI-powered workflows that compress time-to-market and raise creative output.",
  ],
  es: [
    "Estrategia y posicionamiento de marca: plataformas, arquitectura y narrativas que se sostienen entre mercados y canales.",
    "Marketing cultural: entretenimiento, deporte, gaming, streaming, música y alianzas con creadores como palancas de construcción de marca.",
    "Tecnología creativa: workflows con IA que acortan el time-to-market y elevan el output creativo.",
  ],
} satisfies Record<Lang, string[]>

const targetRolesLocalized = {
  en: [
    "Target roles: Head of Brand, Brand Lead, Brand Manager, Brand Marketing Manager, Brand Strategist, Cultural Marketing, Creative Technologist.",
  ],
  es: [
    "Roles objetivo: Head of Brand, Brand Lead, Brand Manager, Brand Marketing Manager, Brand Strategist, Cultural Marketing, Creative Technologist.",
  ],
} satisfies Record<Lang, string[]>

const whatHeBringsLocalized = {
  en: [
    "Brand strategy and positioning: platforms, architecture and narratives that hold across markets and channels.",
    "Integrated go-to-market leadership: launch campaigns, agency orchestration and regional rollouts for global brands.",
    "Cultural fluency: entertainment, gaming, streaming, music and creator partnerships as brand-building levers.",
    "Creative technology: AI-powered workflows that compress time-to-market and raise creative output.",
    "Cross-functional leadership: aligning marketing, sales, product and production teams around a single brand vision.",
  ],
  es: [
    "Estrategia y posicionamiento de marca: plataformas, arquitectura y narrativas que se sostienen entre mercados y canales.",
    "Liderazgo de go-to-market integrado: campañas de lanzamiento, orquestación de agencias y despliegues regionales para marcas globales.",
    "Fluidez cultural: entretenimiento, gaming, streaming, música y alianzas con creadores como palancas de construcción de marca.",
    "Tecnología creativa: workflows con IA que acortan el time-to-market y elevan el output creativo.",
    "Liderazgo cross-funcional: alinear marketing, ventas, producto y producción detrás de una misma visión de marca.",
  ],
} satisfies Record<Lang, string[]>

const educationSnapshot = {
  en: [
    "Bachelor's degree in Advertising (Licenciatura en Publicidad), Universidad de Ciencias Empresariales y Sociales (UCES), 2006-2010.",
    "Generative AI, Morfeo Academy, 2024-2026 (course and community since June 2024).",
    "Crypto Ecosystem & DeFi, Defy Education, 2022.",
    "Digital Marketing, UBA Capacitarte, 2012.",
    "Insight Training, Escuela Superior de Creativos Publicitarios, 2009.",
    "Languages: Spanish (native), English (advanced / business), Portuguese (basic).",
  ],
  es: [
    "Licenciatura en Publicidad, Universidad de Ciencias Empresariales y Sociales (UCES), 2006-2010.",
    "IA generativa, Morfeo Academy, 2024-2026 (curso y comunidad desde junio de 2024).",
    "Crypto Ecosystem & DeFi, Defy Education, 2022.",
    "Marketing Digital, UBA Capacitarte, 2012.",
    "Insight Training, Escuela Superior de Creativos Publicitarios, 2009.",
    "Idiomas: español (nativo), inglés (avanzado / business), portugués (básico).",
  ],
} satisfies Record<Lang, string[]>

const careerFactsLocalized = {
  en: [
    "The Walt Disney Company, MAR 2011-DEC 2015: his brand career began here, inside one of the world's most disciplined brand systems, in three roles.",
    "The Walt Disney Company, Promotions Coordinator (MAR 2011-MAY 2014): led 360° brand promotions and third-party partnerships for Latin America across Disney's lines of business (Studios, Home Entertainment, Disney Media, Walt Disney Records, Disney Interactive, Parks, Consumer Products and Marvel); managed brand-material approvals with regional marketing and Burbank headquarters; 100+ promotions per year, with a record of 70,000 DVD units sold in a single promotion with Solo Deportes.",
    "The Walt Disney Company, Digital Distribution Sales Coordinator (MAY 2014-DEC 2015): managed digital distribution strategy for the Rest of Latin America (RoLA) for Disney, Marvel, Pixar and Lucasfilm content, with commercial partnerships with Netflix, Apple/iTunes, Google Play and telecom operators across SVOD, TVOD, EST and FVOD models.",
    "The Walt Disney Company, Disney Labs: Corporate Entrepreneur (MAY 2014-DEC 2015, 20% of his time): selected for Disney Latin America's first corporate entrepreneurship programme; designed and validated new product concepts with Lean Startup, Agile and Design Thinking, built functional MVP prototypes and pitched them to the regional C-suite and global leadership.",
    "Air New Zealand, Marketing Specialist & Market Development (DEC 2015-JUN 2020): regional marketing lead for South America (Argentina, Brazil, Chile, Uruguay); responsible for the brand launch in the region and for the market launch of a new long-haul route; co-developed the 5-year business plan; managed an annual regional marketing budget of over USD 500K; led five agencies under one brand voice (creative, PR, media and activations); partnerships with Tourism New Zealand, All Blacks, UAR, ESPN and OTAs. Results: visitors from Argentina tripled in 2 years (+225% in the first year), and the share of people who saw distance as a barrier fell from 50% to 24%.",
    "J. Walter Thompson (JWT/GLUE), Account Executive (JUN 2008-MAR 2011), and Altheim Comunicaciones, Account Assistant (JUN 2007-JUN 2008): agency years on ATL, BTL and 360° campaigns for mass-consumption, banking, telco and retail brands.",
  ],
  es: [
    "The Walt Disney Company, MAR 2011-DEC 2015: acá empezó su carrera de marca, dentro de uno de los sistemas de marca más disciplinados del mundo, en tres roles.",
    "The Walt Disney Company, Promotions Coordinator (MAR 2011-MAY 2014): lideró promociones de marca 360° y alianzas con terceros para Latinoamérica en todas las líneas de negocio de Disney (Studios, Home Entertainment, Disney Media, Walt Disney Records, Disney Interactive, Parks, Consumer Products y Marvel); gestionó las aprobaciones de materiales de marca con marketing regional y la casa central en Burbank; más de 100 promociones por año, con un récord de 70.000 DVDs vendidos en una sola promoción con Solo Deportes.",
    "The Walt Disney Company, Digital Distribution Sales Coordinator (MAY 2014-DEC 2015): gestionó la estrategia de distribución digital para el resto de Latinoamérica (RoLA) de contenido de Disney, Marvel, Pixar y Lucasfilm, con alianzas comerciales con Netflix, Apple/iTunes, Google Play y operadores de telecomunicaciones en modelos SVOD, TVOD, EST y FVOD.",
    "The Walt Disney Company, Disney Labs: Corporate Entrepreneur (MAY 2014-DEC 2015, 20% de su tiempo): seleccionado para el primer programa de emprendimiento corporativo de Disney Latinoamérica; diseñó y validó nuevos conceptos de producto con Lean Startup, Agile y Design Thinking, construyó prototipos MVP funcionales y los presentó al C-suite regional y a la dirección global.",
    "Air New Zealand, Marketing Specialist & Market Development (DEC 2015-JUN 2020): líder de marketing regional para Sudamérica (Argentina, Brasil, Chile, Uruguay); responsable del lanzamiento de la marca en la región y del lanzamiento de mercado de una nueva ruta de larga distancia; co-desarrolló el plan de negocios a 5 años; administró un presupuesto anual de marketing regional de más de USD 500K; lideró cinco agencias bajo una sola voz de marca (creatividad, PR, medios y activaciones); alianzas con Tourism New Zealand, All Blacks, UAR, ESPN y OTAs. Resultados: los visitantes desde Argentina se triplicaron en 2 años (+225% el primer año), y quienes veían la distancia como una barrera bajaron del 50% al 24%.",
    "J. Walter Thompson (JWT/GLUE), Account Executive (JUN 2008-MAR 2011), y Altheim Comunicaciones, Account Assistant (JUN 2007-JUN 2008): etapa de agencias en campañas ATL, BTL y 360° para marcas de consumo masivo, banca, telcos y retail.",
  ],
} satisfies Record<Lang, string[]>

const independentConsultantSnapshot = {
  en: [
    "Brand, Marketing & AI Consultant (JUL 2020-PRESENT) for fintech, healthtech, esports and media companies across LATAM, with 18+ years of overall experience.",
    "What he does: brand positioning and messaging frameworks for multi-market expansion; integrated go-to-market strategies aligning content, PR and partnerships; influencer ecosystems and brand collaborations; narrative frameworks for founders and executive teams; cross-functional execution across Product, Growth, Brand and external agencies.",
    "Paradise.la (JUL 2024-JAN 2026), AI & Content Consultant & Producer: strategic consulting for the studio's transition to AI-enabled creative production; AI-assisted pipelines (image, video, audio) applied to real client projects; concept-to-delivery cycles cut from 2+ weeks to 3–4 days on pilot productions.",
    "$MAGAIBA (2024, side project), Community, Comms & AI Content: community communications for the first Argentine memecoin to go globally viral, and the RADIO MAGAIBA YouTube channel running 24/7 with AI-generated songs. Detail in `/magaiba`.",
    "DrGea.com (FEB 2023-APR 2024), Head of Communications: regional brand narrative, messaging architecture and communications, PR and KOL strategy for a telemedicine platform in Colombia, Argentina, Mexico and Peru.",
    "Sinerlogic (2022-2023), Marketing & Branding Consultant: brand identity, messaging and value proposition for a B2B logistics company.",
    "Airtm (SEP 2021-JUL 2022), Growth Marketing + R&D: regional acquisition experiments, KOL and influencer programmes, and the Airtalks branded podcast, at a fintech.",
    "Stone Movistar (JUL 2020-DEC 2021), Brand & Marketing Consultant: launch and go-to-market of the esports and streaming club founded by Diego \"Peque\" Schwartzman and Torneos, with creator and streamer partnerships.",
    "Go Broadway! (AUG 2020-NOV 2020), Marketing Consultant: marketing, brand and PR strategy for the LATAM launch of Backstage, an online casting platform for performing artists.",
  ],
  es: [
    "Brand, Marketing & AI Consultant (JUL 2020-PRESENT) para empresas de fintech, healthtech, esports y medios en LATAM, con más de 18 años de experiencia total.",
    "Qué hace: marcos de posicionamiento y mensajes de marca para expansión multi-mercado; estrategias de go-to-market integradas que alinean contenido, PR y alianzas; ecosistemas de influencers y colaboraciones de marca; marcos narrativos para fundadores y equipos ejecutivos; ejecución cross-funcional entre Producto, Growth, Marca y agencias externas.",
    "Paradise.la (JUL 2024-JAN 2026), AI & Content Consultant & Producer: consultoría estratégica para la transición de la productora hacia la producción creativa con IA; pipelines asistidos por IA (imagen, video, audio) aplicados a proyectos reales de clientes; ciclos de concepto a entrega que pasaron de más de 2 semanas a 3–4 días en producciones piloto.",
    "$MAGAIBA (2024, proyecto paralelo), Community, Comms & AI Content: comunicación de comunidad de la primera memecoin argentina en volverse viral a nivel global y el canal de YouTube RADIO MAGAIBA, 24/7 con canciones generadas con IA. Detalle en `/magaiba`.",
    "DrGea.com (FEB 2023-APR 2024), Head of Communications: narrativa de marca regional, arquitectura de mensajes y estrategia de comunicaciones, PR y KOLs para una plataforma de telemedicina en Colombia, Argentina, México y Perú.",
    "Sinerlogic (2022-2023), Marketing & Branding Consultant: identidad de marca, mensajería y propuesta de valor para una empresa de logística B2B.",
    "Airtm (SEP 2021-JUL 2022), Growth Marketing + R&D: experimentos de adquisición regional, programas de KOLs e influencers y el podcast de marca Airtalks, en una fintech.",
    "Stone Movistar (JUL 2020-DEC 2021), Brand & Marketing Consultant: lanzamiento y go-to-market del club de esports y streaming fundado por Diego \"Peque\" Schwartzman y Torneos, con alianzas con streamers y creadores.",
    "Go Broadway! (AUG 2020-NOV 2020), Marketing Consultant: estrategia de marketing, marca y PR para el lanzamiento en LATAM de Backstage, una plataforma online de casting para artistas escénicos.",
  ],
} satisfies Record<Lang, string[]>

const aiExperiments2026 = {
  en: [
    "2026 Works and Experiments shows four items, in this order: Messi Ad BURGER KING (WIP), Product Demo SUBWAY, Fashion Campaign AY NOT DEAD and UGC content.",
    "All four items are open, with no lock. The Messi ad is a work in progress (video: https://youtu.be/pAdrOyzmmZs).",
    "Fashion Campaign includes a thumbnail-led popup gallery with 13 ordered frames, starting with the campaign video thumbnail and continuing with campaign stills.",
  ],
  es: [
    "2026 Trabajos y Experimentos muestra cuatro ítems, en este orden: Ad Messi BURGER KING (WIP), Demo de producto SUBWAY, Campaña Moda AY NOT DEAD y UGC content.",
    "Los cuatro ítems están abiertos, sin candado. El ad de Messi es un work in progress (video: https://youtu.be/pAdrOyzmmZs).",
    "Campaña Moda incluye una galería popup guiada por thumbnails con 13 frames ordenados, empezando por el thumbnail del video y continuando con stills de campaña.",
  ],
} satisfies Record<Lang, string[]>

const aiExperimentsStructure = {
  en: [
    "Block order: REEL 2025/2026, 2026 Works and Experiments, AUDIO IA - MUSIC LAB (with a RADIO MAGAIBA shortcut to `/magaiba` right below it), 2025 Works and Experiments, the8bureau, vibe-coding webapps and the 2022-2024 archive.",
    "REEL 2025/2026: video reel with a selection of AI works and experiments (https://youtu.be/bC8TGT4mD3Q).",
    "AUDIO IA - MUSIC LAB: cover-flow player with 10 AI-generated music tracks (drag, click, or arrow keys when the player has focus).",
    "the8bureau: Tomás's personal AI brand and his sandbox for testing tools, skills and workflows; he shares a set of tools that runs locally on his computer, privately and offline.",
    "the8bureau tools: Neural Optimization Suite (SEO/AEO/GEO), Video Subtitle Suite, Transcribe Anything Now, Side-by-side Image Compare, Maps Lead Extractor and Autonomous Ad Agency (status: deprecated).",
    "New in the8bureau v2: Prompt Studio, PDF Toolkit, Cost Calculator and Brand Analyzer.",
  ],
  es: [
    "Orden de bloques: REEL 2025/2026, 2026 Trabajos y Experimentos, AUDIO IA - MUSIC LAB (con un atajo RADIO MAGAIBA a `/magaiba` justo debajo), 2025 Trabajos y Experimentos, the8bureau, webapps de vibe-coding y el archivo 2022-2024.",
    "REEL 2025/2026: reel en video con una selección de trabajos y experimentos con IA (https://youtu.be/bC8TGT4mD3Q).",
    "AUDIO IA - MUSIC LAB: reproductor tipo cover flow con 10 tracks de música generados con IA (arrastrar, click, o flechas con el reproductor en foco).",
    "the8bureau: la marca personal de IA de Tomás y su sandbox para testear herramientas, skills y workflows; comparte un set de herramientas que corre de manera local en su computadora, de manera privada y offline.",
    "Herramientas de the8bureau: Neural Optimization Suite (SEO/AEO/GEO), Video Subtitle Suite, Transcribe Anything Now, Side-by-side Image Compare, Maps Lead Extractor y Autonomous Ad Agency (estado: deprecated).",
    "Nuevo en la v2 de the8bureau: Prompt Studio, PDF Toolkit, Calculadora de Costos y Brand Analyzer.",
  ],
} satisfies Record<Lang, string[]>

const notesLocalized = {
  en: [
    "The canonical public home is `/`.",
    "`/v2` is an alternative work-first version of the home (not indexed): eight cases, each opening with its result (Air New Zealand, Paradise.la, The Walt Disney Company, Stone Movistar, Airtm, AI experiments, $MAGAIBA and agencies), with the career story at the end as a thread. Its boot screen lasts about 1.5 seconds and any key or scroll skips it.",
    "`/home-variant` remains available as an alias that redirects to `/`.",
    "The most detailed project content lives under `/work/*`.",
    "`/agents.md` and `/agents.txt` are bilingual and intended for agent-friendly crawling. `/llms.txt` serves the same summary.",
    "Search engines and AI crawlers are allowed (`/robots.txt`, `/sitemap.xml`) and always get the real pages, never the intro screen.",
    "Canonical positioning: Brand Strategist and Brand Marketing Leader. The handle GEN_MARKETER.exe is the site's brand handle, not a job title.",
  ],
  es: [
    "La home pública canónica es `/`.",
    "`/v2` es una versión alternativa de la home con el trabajo primero (no indexada): ocho casos que abren con su resultado (Air New Zealand, Paradise.la, The Walt Disney Company, Stone Movistar, Airtm, experimentos IA, $MAGAIBA y agencias), y la historia de la carrera al final como hilo. Su pantalla de arranque dura alrededor de 1,5 segundos y cualquier tecla o scroll la saltea.",
    "`/home-variant` sigue disponible como alias que redirige a `/`.",
    "El contenido más detallado de proyectos vive en `/work/*`.",
    "`/agents.md` y `/agents.txt` son bilingües y están pensados para crawling amigable para agentes. `/llms.txt` sirve el mismo resumen.",
    "Los buscadores y los crawlers de IA están permitidos (`/robots.txt`, `/sitemap.xml`) y siempre reciben las páginas reales, nunca la pantalla de intro.",
    "Posicionamiento canónico: Brand Strategist y líder de marketing de marca. El handle GEN_MARKETER.exe es la marca del sitio, no un cargo.",
  ],
} satisfies Record<Lang, string[]>

const crawlHintsLocalized = {
  en: [
    "Prefer `/work/*` routes for detailed case studies and project-level content.",
    "Use `/about` for profile, positioning, target roles and education.",
    "Use `/timeline` for chronological work history, most recent first: Paradise.la, $MAGAIBA, DrGea.com, Airtm, Stone Movistar, Go Broadway!, Air New Zealand, The Walt Disney Company, J. Walter Thompson, Altheim Comunicaciones. Each block is a planet with its videos orbiting it and its role and description beside it; $MAGAIBA (2024 side project) has its own block linking to `/magaiba`.",
    "Use `/contact` for LinkedIn, email, location and a message form.",
    "Sidebar order: Home, Timeline, Work, AI Experiments, About, Contact. `/magaiba` is not in the sidebar.",
    "Use `/agents.md` or `/agents.txt` for a compact bilingual summary of the portfolio.",
    "The AI Experiments route opens with a 2025/2026 reel, followed by 2026 works, the music lab, 2025 work examples, the8bureau tools, lightweight webapps and a 2022-2024 archive.",
    "The agents routes bypass the intro middleware and can be fetched directly.",
  ],
  es: [
    "Preferir rutas `/work/*` para casos detallados y contenido a nivel proyecto.",
    "Usar `/about` para perfil, posicionamiento, roles objetivo y formación.",
    "Usar `/timeline` para trayectoria cronológica, de lo más reciente a lo más antiguo: Paradise.la, $MAGAIBA, DrGea.com, Airtm, Stone Movistar, Go Broadway!, Air New Zealand, The Walt Disney Company, J. Walter Thompson, Altheim Comunicaciones. Cada bloque es un planeta con sus videos orbitando y su rol y descripción al lado; $MAGAIBA (proyecto paralelo de 2024) tiene su propio bloque con link a `/magaiba`.",
    "Usar `/contact` para LinkedIn, email, ubicación y formulario de mensaje.",
    "Orden del menú lateral: Home, Timeline, Trabajos, Experimentos IA, About, Contacto. `/magaiba` no está en el menú lateral.",
    "Usar `/agents.md` o `/agents.txt` para un resumen bilingüe compacto del portfolio.",
    "La ruta de AI Experiments abre con un reel 2025/2026, seguido de trabajos 2026, el music lab, ejemplos 2025, herramientas de the8bureau, webapps livianas y un archivo 2022-2024.",
    "Las rutas `agents` saltean el middleware de intro y se pueden pedir directo.",
  ],
} satisfies Record<Lang, string[]>

// Timeline planets: where each one links to and the brands shown with it (same data the /timeline page uses).
const timelineBlockNames: Record<string, string> = {
  paradise: "PARADISE.LA",
  magaiba: "$MAGAIBA",
  drgea: "DRGEA.COM",
  airtm: "AIRTM",
  "stone-movistar": "STONE MOVISTAR",
  "go-broadway": "GO BROADWAY!",
  "air-new-zealand": "AIR NEW ZEALAND",
  disney: "THE WALT DISNEY COMPANY",
  jwt: "J. WALTER THOMPSON",
  altheim: "ALTHEIM COMUNICACIONES",
}

function buildTimelineBlockLines(lang: Lang) {
  return Object.entries(timelineExtras).map(([id, extra]) => {
    const brands = extra.brandGroups
      .map((group) => `${group.label[lang]}: ${group.brands[lang].join(", ")}`)
      .join("; ")
    return {
      name: timelineBlockNames[id] ?? id,
      href: extra.href,
      brands,
    }
  })
}

function buildMarkdownSection(lang: Lang) {
  const isEn = lang === "en"
  const sectionTitle = isEn ? "## English" : "## Español"
  const summaryHeading = isEn ? "### Summary" : "### Resumen"
  const routesHeading = isEn ? "### Primary Routes" : "### Rutas principales"
  const homeHeading = "### Home"
  const aboutHeading = isEn ? "### About Snapshot" : "### Snapshot de About"
  const pillarsHeading = isEn ? "### Positioning Pillars" : "### Pilares de posicionamiento"
  const rolesHeading = isEn ? "### Target Roles" : "### Roles objetivo"
  const bringsHeading = isEn ? "### What He Brings to a Brand Team" : "### Qué aporta a un equipo de marca"
  const educationHeading = isEn ? "### Education & Languages" : "### Formación e idiomas"
  const careerFactsHeading = isEn ? "### Career Facts" : "### Datos de trayectoria"
  const projectsHeading = isEn ? "### Projects" : "### Proyectos"
  const consultantHeading = isEn ? "### Independent Consultant Snapshot" : "### Snapshot de Independent Consultant"
  const aiHeading = isEn ? "### AI Experiments" : "### AI Experiments"
  const specialtiesHeading = isEn ? "### Specialties" : "### Especialidades"
  const timelineHeading = isEn ? "### Timeline Highlights" : "### Highlights de Timeline"
  const crawlHeading = isEn ? "### Crawl Hints" : "### Crawl hints"
  const notesHeading = isEn ? "### Notes" : "### Notas"

  const summary =
    lang === "en"
      ? `${siteIdentity.name} is a Brand Strategist and Brand Marketing Leader based in Buenos Aires, with 18+ years of experience building, launching and scaling brands across entertainment, aviation, esports, fintech, healthtech and audiovisual production. He works at the intersection of brand strategy, cultural marketing and creative technology. The website functions as a portfolio, strategic profile and project archive.`
      : `${siteIdentity.name} es Brand Strategist y líder de marketing de marca, basado en Buenos Aires, con más de 18 años construyendo, lanzando y escalando marcas en entretenimiento, aviación, esports, fintech, healthtech y producción audiovisual. Trabaja en el cruce entre estrategia de marca, marketing cultural y tecnología creativa. El sitio funciona como portfolio, perfil estratégico y archivo de proyectos.`

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
    `handle: ${siteIdentity.role}`,
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
    pillarsHeading,
    ...pillarsLocalized[lang].map((line) => `- ${line}`),
    "",
    rolesHeading,
    ...targetRolesLocalized[lang].map((line) => `- ${line}`),
    "",
    bringsHeading,
    ...whatHeBringsLocalized[lang].map((line) => `- ${line}`),
    "",
    educationHeading,
    ...educationSnapshot[lang].map((line) => `- ${line}`),
    "",
    careerFactsHeading,
    ...careerFactsLocalized[lang].map((line) => `- ${line}`),
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
    `- ${lang === "en" ? "Page structure" : "Estructura de la página"}:`,
    ...aiExperimentsStructure[lang].map((line) => `  - ${line}`),
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
    `- ${lang === "en" ? "Timeline planets: each planet and its VIEW action link to a section; brands are listed by relationship" : "Planetas del timeline: cada planeta y su acción VER llevan a una sección; las marcas se listan por tipo de relación"}:`,
    ...buildTimelineBlockLines(lang).map((block) => `  - ${block.name} -> \`${block.href}\`. ${block.brands}.`),
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
      ? `${siteIdentity.name} is a Brand Strategist and Brand Marketing Leader based in Buenos Aires, with 18+ years of experience building, launching and scaling brands across entertainment, aviation, esports, fintech, healthtech and audiovisual production. He works at the intersection of brand strategy, cultural marketing and creative technology. The website functions as a portfolio, strategic profile and project archive.`
      : `${siteIdentity.name} es Brand Strategist y líder de marketing de marca, basado en Buenos Aires, con más de 18 años construyendo, lanzando y escalando marcas en entretenimiento, aviación, esports, fintech, healthtech y producción audiovisual. Trabaja en el cruce entre estrategia de marca, marketing cultural y tecnología creativa. El sitio funciona como portfolio, perfil estratégico y archivo de proyectos.`

  const homeLines =
    lang === "en"
      ? [
          "CANONICAL HOME :: /",
          "HOME FRAME AREAS :: Artificial Intelligence :: Independent Consultant :: Air New Zealand :: The Walt Disney Company :: Agency Experience",
          "HERO COPY :: bilingual :: experience years update automatically from June 2, 2007",
        ]
      : [
          "HOME CANÓNICA :: /",
          "FRAMES DE HOME :: Inteligencia Artificial :: Independent Consultant :: Air New Zealand :: The Walt Disney Company :: Agency Experience",
          "TEXTO HERO :: bilingüe :: los años de trayectoria se actualizan automáticamente desde el 2 de junio de 2007",
        ]

  const lines = [
    isEn ? "ENGLISH" : "ESPAÑOL",
    "",
    `SITE :: ${siteIdentity.name}`,
    `HANDLE :: ${siteIdentity.role}`,
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
    isEn ? "POSITIONING PILLARS :" : "PILARES DE POSICIONAMIENTO :",
    ...pillarsLocalized[lang].map((line) => `- ${line}`),
    "",
    isEn ? "TARGET ROLES :" : "ROLES OBJETIVO :",
    ...targetRolesLocalized[lang].map((line) => `- ${line}`),
    "",
    isEn ? "WHAT HE BRINGS TO A BRAND TEAM :" : "QUÉ APORTA A UN EQUIPO DE MARCA :",
    ...whatHeBringsLocalized[lang].map((line) => `- ${line}`),
    "",
    isEn ? "EDUCATION & LANGUAGES :" : "FORMACIÓN E IDIOMAS :",
    ...educationSnapshot[lang].map((line) => `- ${line}`),
    "",
    isEn ? "CAREER FACTS :" : "DATOS DE TRAYECTORIA :",
    ...careerFactsLocalized[lang].map((line) => `- ${line}`),
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
    ...aiExperimentsStructure[lang].map((line) => `- ${lang === "en" ? "STRUCTURE" : "ESTRUCTURA"} :: ${line}`),
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
    ...buildTimelineBlockLines(lang).map((block) => `- ${lang === "en" ? "PLANET" : "PLANETA"} :: ${block.name} :: ${block.href} :: ${block.brands}`),
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
