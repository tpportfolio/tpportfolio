import { airNewZealandVideos, airtmVideos, jwtVideos, magaibaVideos, paradiseVideos, stoneMovistarVideos } from "@/lib/work-videos"

// Content of the work-first version (/v2). Every case opens with its result; the text comes after as context.
// Facts come from the work pages, lib/site-content.ts and the About page. The Air New Zealand figures
// (3x visitors from Argentina, "distance is a barrier" 50% -> 24%) were provided by Tomás for this version.

export type L = { es: string; en: string }

export type V2Result = {
  value: L
  label: L
}

export type V2Case = {
  id: string
  client: string
  dates: L
  duration: L
  role: L
  /** Figures shown first. */
  results: V2Result[]
  /** Result in one sentence, for cases without figures. */
  outcome?: L
  /** Smaller supporting figures under the main ones. */
  facts?: L[]
  context: L
  video?: { videoId: string; title: L }
  href: string
}

const same = (text: string): L => ({ es: text, en: text })

export const v2Cases: V2Case[] = [
  {
    id: "air-new-zealand",
    client: "AIR NEW ZEALAND",
    dates: { es: "DIC 2015 – JUN 2020", en: "DEC 2015 – JUN 2020" },
    duration: { es: "4 años y 7 meses", en: "4 years, 7 months" },
    role: same("Marketing Specialist & Market Development · South America"),
    results: [
      {
        value: same("3x"),
        label: {
          es: "visitantes desde Argentina en 2 años (+225% el primer año)",
          en: "visitors from Argentina in 2 years (+225% in the first year)",
        },
      },
      {
        value: same("50% → 24%"),
        label: {
          es: "“la distancia es una barrera”: cuánta gente lo pensaba, antes y después",
          en: "“distance is a barrier”: share of people who thought so, before and after",
        },
      },
    ],
    facts: [
      { es: "4 mercados: AR, BR, CL, UY", en: "4 markets: AR, BR, CL, UY" },
      { es: "5 agencias, una sola voz de marca", en: "5 agencies, one brand voice" },
      { es: "USD 500K+ de presupuesto anual", en: "USD 500K+ annual budget" },
    ],
    context: {
      es: "Lancé la marca en Sudamérica junto con su nueva ruta de larga distancia: plan de negocios a 5 años, campañas 360° en Argentina, Brasil, Chile y Uruguay, y alianzas con los All Blacks, la UAR, Tourism New Zealand y ESPN.",
      en: "I launched the brand in South America along with its new long-haul route: a 5-year business plan, 360° campaigns in Argentina, Brazil, Chile and Uruguay, and partnerships with the All Blacks, the UAR, Tourism New Zealand and ESPN.",
    },
    video: { videoId: airNewZealandVideos[0].videoId, title: airNewZealandVideos[0].title },
    href: "/work/air-new-zealand",
  },
  {
    id: "paradise",
    client: "PARADISE.LA",
    dates: { es: "JUL 2024 – ENE 2026", en: "JUL 2024 – JAN 2026" },
    duration: { es: "1 año y 7 meses", en: "1 year, 7 months" },
    role: same("AI & Content Consultant & Producer"),
    results: [
      {
        value: { es: "3–4 días", en: "3–4 days" },
        label: {
          es: "de concepto a entrega en producciones piloto (antes, más de 2 semanas)",
          en: "from concept to delivery on pilot productions (before, over 2 weeks)",
        },
      },
    ],
    context: {
      es: "Acompañé a la productora en su transición hacia la producción creativa con IA: mapeé sus procesos, diseñé pipelines de imagen, video y audio para proyectos reales de clientes, y armé playbooks y SOPs para capacitar a los equipos.",
      en: "I guided the studio through its transition to AI-enabled creative production: I mapped its processes, designed image, video and audio pipelines for real client projects, and built playbooks and SOPs to train the teams.",
    },
    video: { videoId: paradiseVideos[0].videoId, title: paradiseVideos[0].title },
    href: "/work/independent-consultant#paradise-la",
  },
  {
    id: "disney",
    client: "THE WALT DISNEY COMPANY",
    dates: { es: "MAR 2011 – DIC 2015", en: "MAR 2011 – DEC 2015" },
    duration: { es: "4 años y 10 meses", en: "4 years, 10 months" },
    role: same("Promotions · Digital Distribution · Disney Labs"),
    results: [
      {
        value: { es: "70.000", en: "70,000" },
        label: { es: "unidades de DVD en una sola promoción", en: "DVD units in a single promotion" },
      },
      {
        value: same("20%"),
        label: {
          es: "de mi tiempo en Disney Labs, el programa de intraemprendimiento",
          en: "of my time at Disney Labs, the intrapreneurship program",
        },
      },
    ],
    context: {
      es: "Promociones 360° y alianzas con terceros para Latinoamérica con Disney, Marvel, Pixar y Lucasfilm; después, distribución digital con Netflix, Apple/iTunes y Google Play.",
      en: "360° promotions and third-party partnerships for Latin America with Disney, Marvel, Pixar and Lucasfilm; then digital distribution with Netflix, Apple/iTunes and Google Play.",
    },
    href: "/work/walt-disney-company",
  },
  {
    id: "stone-movistar",
    client: "STONE MOVISTAR",
    dates: { es: "JUL 2020 – DIC 2021", en: "JUL 2020 – DEC 2021" },
    duration: { es: "1 año y 6 meses", en: "1 year, 6 months" },
    role: same("Brand & Marketing Consultant"),
    results: [],
    outcome: {
      es: "Lanzamiento del club de esports y streaming de Diego “Peque” Schwartzman y Torneos.",
      en: "Launch of the esports and streaming club founded by Diego “Peque” Schwartzman and Torneos.",
    },
    context: {
      es: "Arquitectura de marca, pilares de contenido y alianzas con streamers y creadores como Delfi Pignatiello, Luquitas Rodríguez y Lit Killah.",
      en: "Brand architecture, content pillars and partnerships with streamers and creators such as Delfi Pignatiello, Luquitas Rodríguez and Lit Killah.",
    },
    video: { videoId: stoneMovistarVideos[0].videoId, title: stoneMovistarVideos[0].title },
    href: "/work/independent-consultant#stone-movistar",
  },
  {
    id: "airtm",
    client: "AIRTM",
    dates: { es: "SEP 2021 – JUL 2022", en: "SEP 2021 – JUL 2022" },
    duration: { es: "11 meses", en: "11 months" },
    role: same("Growth Marketing + R&D"),
    results: [],
    outcome: {
      es: "Airtalks: un podcast de marca que construyó autoridad con freelancers y creadores de LATAM.",
      en: "Airtalks: a branded podcast that built authority with freelancers and creators across LATAM.",
    },
    context: {
      es: "Experimentos de adquisición regional que conectan el posicionamiento de marca con crecimiento medible en una fintech, con acciones junto a Axie Infinity y alianzas B2B.",
      en: "Regional acquisition experiments connecting brand positioning with measurable growth at a fintech, with actions alongside Axie Infinity and B2B partnerships.",
    },
    video: { videoId: airtmVideos[0].videoId, title: airtmVideos[0].title },
    href: "/work/independent-consultant#airtm",
  },
  {
    id: "ai",
    client: "AI EXPERIMENTS",
    dates: { es: "FINES DE 2022 – EN CURSO", en: "LATE 2022 – ONGOING" },
    duration: { es: "en curso", en: "ongoing" },
    role: same("Creative technologist"),
    results: [
      { value: same("4"), label: { es: "trabajos con IA en 2026", en: "AI works in 2026" } },
      { value: same("10"), label: { es: "temas de música generada con IA", en: "AI-generated music tracks" } },
    ],
    context: {
      es: "Uso un stack de IA todos los días para prototipar ideas y acelerar la producción de contenido: imagen, video, voz y música. El reel reúne trabajos y experimentos de 2025 y 2026.",
      en: "I use an AI stack every day to prototype ideas and speed up content production: image, video, voice and music. The reel brings together works and experiments from 2025 and 2026.",
    },
    video: { videoId: "bC8TGT4mD3Q", title: same("Reel 2025/2026") },
    href: "/work/ai-experiments",
  },
  {
    id: "magaiba",
    client: "$MAGAIBA",
    dates: same("2024"),
    duration: { es: "proyecto paralelo", en: "side project" },
    role: same("Community, Comms & AI Content"),
    results: [
      { value: { es: "1,9M", en: "1.9M" }, label: { es: "horas de visualización de RADIO MAGAIBA", en: "watch hours on RADIO MAGAIBA" } },
      { value: same("500+"), label: { es: "suscriptores del canal", en: "channel subscribers" } },
    ],
    context: {
      es: "Comunicación de comunidad de la primera memecoin argentina en volverse viral a nivel global, y RADIO MAGAIBA: un canal de YouTube 24/7 con canciones generadas con IA.",
      en: "Community communication for the first Argentine memecoin to go viral worldwide, and RADIO MAGAIBA: a 24/7 YouTube channel with AI-generated songs.",
    },
    video: { videoId: magaibaVideos[0].videoId, title: magaibaVideos[0].title },
    href: "/magaiba",
  },
  {
    id: "agencies",
    client: "J. WALTER THOMPSON · ALTHEIM",
    dates: { es: "JUN 2007 – MAR 2011", en: "JUN 2007 – MAR 2011" },
    duration: { es: "3 años y 9 meses", en: "3 years, 9 months" },
    role: same("Account Executive · Account Assistant"),
    results: [],
    outcome: {
      es: "Campañas ATL, BTL y 360° para Claro, Ford, Johnson & Johnson, Nokia, Cerveza Imperial y Beldent.",
      en: "ATL, BTL and 360° campaigns for Claro, Ford, Johnson & Johnson, Nokia, Cerveza Imperial and Beldent.",
    },
    context: {
      es: "Donde aprendí el oficio: gestión de campañas, activaciones y eventos para marcas de consumo masivo, banca, telcos y retail.",
      en: "Where I learned the craft: managing campaigns, activations and events for consumer, banking, telco and retail brands.",
    },
    video: { videoId: jwtVideos[0].videoId, title: jwtVideos[0].title },
    href: "/work/agency-experience",
  },
]

/** Engagements without a case of their own: they live in the thread. */
export const v2OtherWork: { client: string; dates: L; role: L; href: string }[] = [
  { client: "DRGEA.COM", dates: { es: "FEB 2023 – ABR 2024", en: "FEB 2023 – APR 2024" }, role: same("Head of Communications"), href: "/work/independent-consultant#drgea" },
  { client: "SINERLOGIC", dates: same("2022 – 2023"), role: same("Marketing & Branding Consultant"), href: "/work/independent-consultant#sinerlogic" },
  { client: "GO BROADWAY!", dates: { es: "AGO 2020 – NOV 2020", en: "AUG 2020 – NOV 2020" }, role: same("Marketing Consultant"), href: "/work/independent-consultant#go-broadway" },
]

export const v2Copy = {
  name: "TOMÁS PERÓ",
  tagline: {
    es: "Brand Strategist y líder de marketing. Casos primero; la historia, al final.",
    en: "Brand Strategist and Marketing Leader. Work first; the story comes after.",
  },
  workLabel: { es: "TRABAJO", en: "WORK" },
  threadLabel: { es: "EL HILO", en: "THE THREAD" },
  resultsLabel: { es: "RESULTADO", en: "RESULT" },
  viewCase: { es: "VER CASO COMPLETO →", en: "VIEW FULL CASE →" },
  alsoLabel: { es: "Otros trabajos", en: "Other work" },
  thread: {
    es: [
      "Empecé en agencias (Altheim y J. Walter Thompson) y seguí en The Walt Disney Company, donde aprendí marca dentro de uno de los sistemas más disciplinados del mundo.",
      "En Air New Zealand lideré el lanzamiento de la marca en Sudamérica. Desde 2020 acompaño a marcas en lanzamiento o en transición como consultor independiente.",
      "Desde fines de 2022 trabajo con IA como creative technologist, y la uso todos los días para prototipar y producir.",
    ],
    en: [
      "I started at agencies (Altheim and J. Walter Thompson) and moved on to The Walt Disney Company, where I learned brand inside one of the most disciplined systems in the world.",
      "At Air New Zealand I led the brand launch in South America. Since 2020 I have worked with brands at launch or in transition as an independent consultant.",
      "Since late 2022 I have worked with AI as a creative technologist, and I use it every day to prototype and produce.",
    ],
  },
  links: [
    { href: "/timeline", label: { es: "TIMELINE COMPLETO", en: "FULL TIMELINE" } },
    { href: "/about", label: { es: "ABOUT", en: "ABOUT" } },
    { href: "/contact", label: { es: "CONTACTO", en: "CONTACT" } },
  ],
}
