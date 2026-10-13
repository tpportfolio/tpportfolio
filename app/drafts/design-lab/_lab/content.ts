import type { VideoItem } from "@/components/video-carousel"
import type { LocalizedText } from "@/lib/site-content"
import { consultantVideos, paradiseVideos } from "@/lib/work-videos"

// Sample content for the design lab. The texts are copied from the live pages
// (/work/independent-consultant and /work/walt-disney-company) so every proposal
// is judged on real copy, in both languages.

type L = LocalizedText

export const ui = {
  labTitle: { es: "DESIGN LAB", en: "DESIGN LAB" },
  labHint: { es: "← → o 0-8 para cambiar de propuesta", en: "← → or 0-8 to switch proposal" },
  notes: { es: "Notas", en: "Notes" },
  closeNotes: { es: "Cerrar notas", en: "Close notes" },
  exit: { es: "Volver al sitio", en: "Back to site" },
  current: { es: "Ver página actual", en: "Open live page" },
  own: { es: "Propuesta propia", en: "Own proposal" },
  baseline: { es: "Referencia", en: "Baseline" },
  skill: { es: "Skill", en: "Skill" },
  fonts: { es: "Tipografías", en: "Typefaces" },
  effort: { es: "Para aplicarla al sitio", en: "To apply it to the site" },
  proposals: { es: "Propuestas", en: "Proposals" },
  language: { es: "Idioma", en: "Language" },
  menu: { es: "Menú", en: "Menu" },
  back: { es: "VOLVER AL MAINFRAME", en: "RETURN TO MAINFRAME" },
  play: { es: "Reproducir", en: "Play" },
  playLabel: { es: "REPRODUCIR", en: "PLAY" },
  prev: { es: "Video anterior", en: "Previous video" },
  next: { es: "Video siguiente", en: "Next video" },
  view: { es: "Ver", en: "View" },
  projects: { es: "<BASE_DE_DATOS_PROYECTOS>", en: "<PROJECT_DATABASE>" },
  cta: { es: "[ACCEDER A DATOS]", en: "[ACCESS DATA]" },
  footer: { es: "SESSION_TIMEOUT: 30:00 // FIN DE TRANSMISIÓN", en: "SESSION_TIMEOUT: 30:00 // END_TRANSMISSION" },
  sample: { es: "MUESTRA", en: "SAMPLE" },
  objects: { es: "videos", en: "videos" },
} satisfies Record<string, L>

export const nav: { label: L; active?: boolean }[] = [
  { label: { es: "HOME", en: "HOME" } },
  { label: { es: "TIMELINE", en: "TIMELINE" } },
  { label: { es: "TRABAJOS", en: "WORK" }, active: true },
  { label: { es: "EXPERIMENTOS IA", en: "AI EXPERIMENTS" } },
  { label: { es: "ABOUT", en: "ABOUT" } },
  { label: { es: "CONTACTO", en: "CONTACT" } },
]

export const page = {
  ticker: "PROJECT_ID: INDEPENDENT CONSULTANT // TIMESTAMP: 2020-PRESENT // SECURITY_CLEARANCE: GRANTED",
  eyebrow: { es: "TRABAJOS / 2020 — PRESENTE", en: "WORK / 2020 — PRESENT" } as L,
  title: "/INDEPENDENT_CONSULTANT",
  sub: "JUL 2020-PRESENT // Brand, Marketing & AI Consultant",
  tags: [
    { es: "Estrategia de marca", en: "Brand strategy" },
    { es: "Marketing cultural", en: "Cultural marketing" },
    { es: "Tecnología creativa", en: "Creative technology" },
  ] as L[],
}

export const reelTitle = "CONSULTING_SHOWCASE"
export const reelItems: VideoItem[] = [...consultantVideos, ...paradiseVideos]

export const facts: { label: L; value: L }[] = [
  { label: { es: "ROL", en: "ROLE" }, value: { es: "Consultor de marca, marketing e IA", en: "Brand, marketing & AI consultant" } },
  { label: { es: "PERÍODO", en: "PERIOD" }, value: { es: "JUL 2020 — presente", en: "JUL 2020 — present" } },
  { label: { es: "REGIÓN", en: "REGION" }, value: { es: "LATAM", en: "LATAM" } },
  { label: { es: "SECTORES", en: "SECTORS" }, value: { es: "Fintech · Healthtech · Esports · Medios", en: "Fintech · Healthtech · Esports · Media" } },
  {
    label: { es: "CLIENTES", en: "CLIENTS" },
    value: {
      es: "Paradise.la · DrGea.com · Sinerlogic · Airtm · Stone Movistar · Go Broadway!",
      en: "Paradise.la · DrGea.com · Sinerlogic · Airtm · Stone Movistar · Go Broadway!",
    },
  },
]

export const overview = {
  title: "PROJECT_OVERVIEW",
  heading: {
    es: "CONSULTOR DE MARCA, MARKETING E IA | JUL 2020 - PRESENTE",
    en: "BRAND, MARKETING & AI CONSULTANT | JUL 2020 - PRESENT",
  } as L,
  kicker: {
    es: "LATAM | Estrategia de marca · Marketing cultural · Tecnología creativa",
    en: "LATAM | Brand strategy · Cultural marketing · Creative technology",
  } as L,
  body: {
    es: "Desde 2020 trabajo como consultor independiente de marca, marketing e IA para empresas de fintech, healthtech, esports y medios de LATAM. Trabajo en el cruce entre estrategia de marca, marketing cultural y tecnología creativa: defino posicionamiento y narrativa, los llevo a campañas go-to-market integradas y sumo workflows con IA para acelerar y elevar la producción creativa de equipos de marca, agencias y estudios.",
    en: "Since 2020 I have worked as an independent brand, marketing and AI consultant for fintech, healthtech, esports and media companies across LATAM. I work at the intersection of brand strategy, cultural marketing and creative technology: I define positioning and narrative, turn them into integrated go-to-market campaigns, and add AI workflows to speed up and raise the creative output of brand teams, agencies and studios.",
  } as L,
  scope: [
    {
      es: "Diseño posicionamiento de marca y marcos de mensajes para expansiones multimercado.",
      en: "I design brand positioning and messaging frameworks for multi-market expansion.",
    },
    {
      es: "Lidero estrategias go-to-market integradas que alinean contenido, PR y alianzas.",
      en: "I lead integrated go-to-market strategies that align content, PR and partnerships.",
    },
    {
      es: "Construyo ecosistemas de influencers y colaboraciones de marca para generar awareness y engagement.",
      en: "I build influencer ecosystems and brand collaborations to drive awareness and engagement.",
    },
    {
      es: "Desarrollo marcos narrativos y arquitecturas de mensajes para fundadores y equipos ejecutivos.",
      en: "I develop narrative frameworks and messaging architectures for founders and executive teams.",
    },
    {
      es: "Oriento la ejecución cross-funcional entre Producto, Growth, Marca y agencias externas.",
      en: "I orchestrate cross-functional execution across Product, Growth, Brand and external agencies.",
    },
  ] as L[],
  clients: {
    es: "Clientes clave: Paradise.la, DrGea.com, Sinerlogic, Airtm, Stone Movistar, Go Broadway!.",
    en: "Key clients: Paradise.la, DrGea.com, Sinerlogic, Airtm, Stone Movistar, Go Broadway!.",
  } as L,
}

export const jobsTitle = "ENGAGEMENTS"
export const jobs: { company: string; role: string; dates: string; sector: L; bullets: L[] }[] = [
  {
    company: "PARADISE.LA",
    role: "AI & CONTENT CONSULTANT & PRODUCER",
    dates: "JUL 2024-JAN 2026",
    sector: { es: "LATAM | Producción audiovisual", en: "LATAM | Audiovisual production" },
    bullets: [
      {
        es: "Consultoría estratégica para la transición de la productora hacia la producción creativa con IA: ayudé a una marca de contenido a repensar sus workflows, su oferta y sus capacidades creativas.",
        en: "Strategic consulting for the studio's transition to AI-enabled creative production: helped a content brand rethink its workflows, offering and creative capabilities.",
      },
      {
        es: "Mapeé los procesos de producción existentes y diseñé pipelines asistidos por IA (imagen, video, audio) aplicados a proyectos reales de clientes.",
        en: "Mapped existing production processes and designed AI-assisted pipelines (image, video, audio) applied to real client projects.",
      },
      {
        es: "Resultado: ciclos de concepto a entrega reducidos de más de 2 semanas a 3–4 días en producciones piloto.",
        en: "Result: concept-to-delivery cycles cut from 2+ weeks to 3–4 days on pilot productions.",
      },
    ],
  },
  {
    company: "DRGEA.COM",
    role: "HEAD OF COMMUNICATIONS",
    dates: "FEB 2023-APR 2024",
    sector: { es: "LATAM | Healthtech y telemedicina", en: "LATAM | Healthtech & telemedicine" },
    bullets: [
      {
        es: "Definí la narrativa de marca regional, la arquitectura de mensajes y la estrategia de comunicación de una plataforma de telemedicina en Colombia, Argentina, México y Perú.",
        en: "Defined the regional brand narrative, messaging architecture and communications strategy for a telemedicine platform in Colombia, Argentina, Mexico and Peru.",
      },
      {
        es: "Lideré la estrategia de comunicaciones, PR y KOLs.",
        en: "Led communications, PR and KOL strategy.",
      },
      {
        es: "Estructuré las comunicaciones de lanzamiento de la expansión regional.",
        en: "Structured launch communications for regional expansion.",
      },
    ],
  },
]

// Stat row as it appears on /work/walt-disney-company (HIGHLIGHTS).
export const statsTitle = "HIGHLIGHTS // DISNEY"
export const stats: { value: string | L; label: L }[] = [
  { value: "100+", label: { es: "promociones por año", en: "promotions per year" } },
  { value: { es: "70.000", en: "70,000" }, label: { es: "unidades de DVD en una sola promoción", en: "DVD units in a single promotion" } },
  { value: "4", label: { es: "modelos de negocio digitales", en: "digital business models" } },
  { value: "20%", label: { es: "de mi tiempo en Disney Labs", en: "of my time on Disney Labs" } },
]

export const clippy = {
  name: "CLIPPY.EXE",
  subtitle: "portfolio knowledge base",
  you: "YOU",
  welcome: {
    es: "Hola. Soy CLIPPY.EXE. Puedo responder sobre Tomás, su trayectoria, proyectos, servicios, AI experiments y tools.",
    en: "Hi. I'm CLIPPY.EXE. I can answer about Tomás, his background, projects, services, AI experiments and tools.",
  } as L,
  question: { es: "¿Qué hizo Tomás en Disney?", en: "What did Tomás do at Disney?" } as L,
  answer: {
    es: "Entre 2011 y 2015 pasó por tres roles en The Walt Disney Company: coordinó promociones y alianzas de marca para Latinoamérica, gestionó la distribución digital de contenido de Disney, Marvel, Pixar y Lucasfilm, y dedicó el 20% de su tiempo a Disney Labs.",
    en: "Between 2011 and 2015 he held three roles at The Walt Disney Company: he coordinated brand promotions and partnerships for Latin America, managed the digital distribution of Disney, Marvel, Pixar and Lucasfilm content, and spent 20% of his time on Disney Labs.",
  } as L,
  sourcesLabel: { es: "Fuentes", en: "Sources" } as L,
  sources: ["/DISNEY", "TIMELINE"],
  followUps: [
    { es: "¿Qué servicios ofrece Tomás?", en: "What services does Tomás offer?" },
    { es: "Contame de AI experiments", en: "Tell me about AI experiments" },
    { es: "¿Qué es the8bureau?", en: "What is the8bureau?" },
  ] as L[],
  placeholder: { es: "Preguntame sobre el portfolio...", en: "Ask about the portfolio..." } as L,
  hint: { es: "ENTER para enviar", en: "ENTER to send" } as L,
  send: { es: "Enviar", en: "Send" } as L,
  open: { es: "Abrir assistant", en: "Open assistant" } as L,
  close: { es: "Cerrar assistant", en: "Close assistant" } as L,
}

export type ProposalId = "p0" | "p1" | "p2" | "p3" | "p4" | "p5" | "p6" | "p7" | "p8"

export interface Proposal {
  id: ProposalId
  name: string
  origin: "baseline" | "own" | "skill"
  skill?: string
  tagline: L
  notes: { area: L; text: L }[]
  fonts: string
  effort: L
}

const AREA = {
  boxes: { es: "Contenedores", en: "Containers" },
  chrome: { es: "Botones de ventana", en: "Window buttons" },
  reels: { es: "Reels y trailers", en: "Reels and trailers" },
  width: { es: "Ancho de página", en: "Page width" },
  clippy: { es: "CLIPPY.EXE", en: "CLIPPY.EXE" },
} satisfies Record<string, L>

export const PROPOSALS: Proposal[] = [
  {
    id: "p0",
    name: "HOY",
    origin: "baseline",
    tagline: {
      es: "El sitio como está hoy, reconstruido sobre la misma página modelo para poder comparar.",
      en: "The site as it stands today, rebuilt on the same sample page for comparison.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "Esquinas rectas, borde verde pleno y doble resplandor (por fuera y por dentro) en cada recuadro.",
          en: "Square corners, solid green border and a double glow (outer and inner) on every box.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Dos sistemas distintos: recuadros tipo terminal con \">\" en las páginas de trabajo y ventanas con tres luces de colores en la home y en la sección IA.",
          en: "Two different systems: terminal boxes with \">\" on the work pages and windows with three coloured lights on the home and the AI section.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "Video chico (máximo 672 px) centrado dentro de un recuadro que ocupa todo el ancho; miniaturas sin título.",
          en: "Small video (672 px max) centred inside a full-width box; thumbnails without titles.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Columna de 896 px: centrada en Independent Consultant y pegada a la izquierda en Disney, con el resto de la pantalla vacío.",
          en: "896 px column: centred on Independent Consultant and left-aligned on Disney, leaving the rest of the screen empty.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "Panel y mensajes rectangulares con bordes finos; las preguntas sugeridas son lo único redondeado.",
          en: "Rectangular panel and messages with thin borders; the suggested questions are the only rounded element.",
        },
      },
    ],
    fonts: "monospace (la del sistema / system default)",
    effort: { es: "Es el punto de partida.", en: "This is the starting point." },
  },
  {
    id: "p1",
    name: "SOFT SHELL",
    origin: "own",
    tagline: {
      es: "La misma terminal, suavizada: puntas redondeadas, un solo sistema de recuadros y menos resplandor.",
      en: "The same terminal, softened: rounded corners, a single box system and less glow.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "Radio de 14 px, borde verde al 28% y una sombra suave teñida de verde en lugar del doble neón. Fondo negro verdoso en vez de negro puro.",
          en: "14 px radius, green border at 28% and a soft green-tinted shadow instead of the double neon. Greenish black background instead of pure black.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Las tres luces de colores pasan a ser un único LED de estado; el título va en versalitas chicas y el dato de la derecha en una pastilla.",
          en: "The three coloured lights become a single status LED; the title is set in small caps and the right-hand detail sits in a pill.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "Video grande a la izquierda (dos tercios) y lista de reproducción a la derecha con miniatura, número y título. En móvil se apilan.",
          en: "Large video on the left (two thirds) and a playlist on the right with thumbnail, number and title. They stack on mobile.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Página de 1180 px centrada. Una ficha fija a la izquierda (rol, período, sectores, clientes) y el texto a la derecha con líneas de 68 caracteres.",
          en: "1180 px centred page. A sticky fact sheet on the left (role, period, sectors, clients) and the copy on the right at 68 characters per line.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "Panel de 18 px de radio, globos de chat con una punta recta según quién habla y campo de texto en pastilla.",
          en: "18 px radius panel, chat bubbles with one square corner depending on who speaks, and a pill-shaped input.",
        },
      },
    ],
    fonts: "JetBrains Mono",
    effort: {
      es: "Bajo. Es casi todo CSS sobre .terminal, RetroPanel y RetroBrowser; el reel pide tocar VideoCarousel.",
      en: "Low. Mostly CSS on .terminal, RetroPanel and RetroBrowser; the reel needs changes in VideoCarousel.",
    },
  },
  {
    id: "p2",
    name: "GLASS HUD",
    origin: "own",
    tagline: {
      es: "Cyberpunk actual: paneles de vidrio sobre una grilla, etiquetas flotantes y el reel como sala de cine.",
      en: "Current cyberpunk: glass panels over a grid, floating labels and the reel as a screening room.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "Paneles translúcidos con desenfoque, radio de 20 px, borde de 1 px muy tenue y marcas de mira en dos esquinas.",
          en: "Translucent blurred panels, 20 px radius, a very faint 1 px border and crosshair marks on two corners.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Sin luces. El nombre del recuadro es una etiqueta montada sobre el borde superior, con el número de sección adelante.",
          en: "No lights. The box name is a label sitting on the top border, with the section number in front.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "Pantalla a todo el ancho con un halo del color del video detrás, título sobre la imagen y una tira horizontal de miniaturas con nombre.",
          en: "Full-width screen with a halo in the video's colour behind it, the title over the image and a horizontal strip of named thumbnails.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Página de 1280 px. El texto a la izquierda y la ficha como tarjeta de vidrio fija a la derecha.",
          en: "1280 px page. Copy on the left and the fact sheet as a sticky glass card on the right.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "Panel de vidrio de 22 px de radio; el mensaje del visitante va relleno en verde tenue y el botón de enviar es circular.",
          en: "22 px radius glass panel; the visitor's message is filled in a faint green and the send button is round.",
        },
      },
    ],
    fonts: "Chakra Petch + IBM Plex Mono",
    effort: {
      es: "Medio. Suma un fondo nuevo y el desenfoque, que conviene probar en móviles de gama baja.",
      en: "Medium. Adds a new backdrop and blur, which should be tested on low-end phones.",
    },
  },
  {
    id: "p3",
    name: "RETRO OS",
    origin: "own",
    tagline: {
      es: "Web retro asumida: ventanas de sistema operativo de verdad, tipografía de píxel y Clippy en su globo.",
      en: "Retro web, fully owned: real operating-system windows, pixel type and Clippy in its speech balloon.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "Borde de 2 px, radio de 10 px y sombra dura desplazada, sin desenfoque. Al pasar el mouse la ventana se levanta; al hacer clic se hunde.",
          en: "2 px border, 10 px radius and a hard offset shadow with no blur. Windows lift on hover and sink on click.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Barra de título rellena en verde con texto negro y los tres botones clásicos (minimizar, maximizar, cerrar) a la derecha. Vuelve la barra de estado.",
          en: "Title bar filled in green with black text and the three classic buttons (minimise, maximise, close) on the right. The status bar returns.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "Un reproductor: pantalla a la izquierda, controles de transporte debajo y lista de reproducción de texto a la derecha, con la fila activa invertida.",
          en: "A media player: screen on the left, transport controls below and a text playlist on the right, with the active row inverted.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Página de 1200 px. La ficha es una ventana de \"Propiedades\" a la izquierda; los números van en contadores tipo LCD.",
          en: "1200 px page. The fact sheet is a \"Properties\" window on the left; figures sit in LCD-style counters.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "El globo de diálogo del Clippy original: fondo claro, borde negro y una punta que señala al personaje.",
          en: "The original Clippy speech balloon: light background, black border and a tail pointing at the character.",
        },
      },
    ],
    fonts: "VT323 + Silkscreen + IBM Plex Mono",
    effort: {
      es: "Medio. Unifica .terminal y RetroPanel en un solo componente de ventana.",
      en: "Medium. Merges .terminal and RetroPanel into a single window component.",
    },
  },
  {
    id: "p4",
    name: "PHOSPHOR POSTER",
    origin: "skill",
    skill: "frontend-design",
    tagline: {
      es: "Dirección audaz: tipografía de afiche, números gigantes, esquinas cortadas en diagonal y un segundo color ámbar.",
      en: "A bold direction: poster typography, giant numerals, diagonally cut corners and a second amber colour.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "En vez de redondear, esquinas cortadas en diagonal. Cada sección lleva su número enorme en contorno, por detrás del recuadro.",
          en: "Instead of rounding, diagonally cut corners. Each section carries its number, huge and outlined, behind the box.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Sin luces: una lengüeta ámbar con el número y el título en mayúsculas anchas.",
          en: "No lights: an amber tab with the number and the title in wide capitals.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "Pantalla grande apenas inclinada, con la ficha del video montada sobre una esquina y las miniaturas como tira de fotogramas.",
          en: "Large, slightly tilted screen, with the video caption overlapping one corner and thumbnails as a film strip.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Composición asimétrica a todo el ancho: título gigante a la izquierda, ficha a la derecha, bloques desfasados.",
          en: "Asymmetric full-width composition: giant title on the left, fact sheet on the right, offset blocks.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "Panel con esquinas cortadas, mensajes del visitante en ámbar y preguntas sugeridas como etiquetas rectas.",
          en: "Panel with cut corners, visitor messages in amber and suggested questions as square labels.",
        },
      },
    ],
    fonts: "Anybody + Martian Mono",
    effort: {
      es: "Alto. Cambia la jerarquía tipográfica y la composición de cada página.",
      en: "High. Changes the type hierarchy and the composition of every page.",
    },
  },
  {
    id: "p5",
    name: "ZINC",
    origin: "skill",
    skill: "taste-skill",
    tagline: {
      es: "Interfaz de producto: grises zinc, un solo verde esmeralda sin neón, composición asimétrica y movimiento fino.",
      en: "Product interface: zinc greys, a single emerald green with no neon, asymmetric composition and fine motion.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "Recuadros solo donde hacen falta: el resto se separa con líneas y espacio. Radio amplio y borde que se ilumina bajo el cursor.",
          en: "Boxes only where needed: everything else is separated by lines and space. Wide radius and a border that lights up under the cursor.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Sin luces ni barra: una etiqueta chica en monoespaciada arriba de cada bloque.",
          en: "No lights and no bar: a small monospaced label above each block.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "Pantalla y ficha en dos columnas desiguales; la lista de videos es una columna de filas con línea divisoria.",
          en: "Screen and caption in two unequal columns; the video list is a column of divided rows.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Contenedor de 1400 px con columnas asimétricas y los números en una grilla tipo bento.",
          en: "1400 px container with asymmetric columns and the figures in a bento-style grid.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "Panel de vidrio con borde interior y reflejo superior; globos sin borde y botón que se hunde al presionar.",
          en: "Glass panel with an inner border and top highlight; borderless bubbles and a button that sinks when pressed.",
        },
      },
    ],
    fonts: "Geist + Geist Mono",
    effort: {
      es: "Alto. Es la que más se aleja del look terminal: conviene verla como dirección, no como ajuste.",
      en: "High. It moves furthest from the terminal look: best read as a direction, not an adjustment.",
    },
  },
  {
    id: "p6",
    name: "AUDIT FIX",
    origin: "skill",
    skill: "redesign-skill",
    tagline: {
      es: "El diseño actual pasado por una auditoría: mismos elementos, corregidos uno por uno.",
      en: "The current design put through an audit: same elements, fixed one by one.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "Negro teñido en lugar de #000, sombras del color del fondo en vez de neón, radio mayor afuera que adentro.",
          en: "Tinted black instead of #000, shadows in the background's hue instead of neon, larger radius outside than inside.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Las tres luces quedan, pero en un solo color y en contorno: desaparecen el rojo y el amarillo, que sumaban colores sin función.",
          en: "The three lights stay, but in one colour and outlined: red and yellow go, since they added colours with no function.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "El video ocupa todo el ancho de su recuadro y las miniaturas llevan título y estado activo claro.",
          en: "The video fills its box and thumbnails get a title and a clear active state.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Un contenedor de 1240 px igual en todas las páginas, alineado siempre igual, con párrafos de 65 caracteres.",
          en: "One 1240 px container on every page, aligned the same way everywhere, with 65-character paragraphs.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "Mismos recuadros con radio, foco visible para teclado y respuesta al presionar en cada botón.",
          en: "Same boxes with a radius, visible keyboard focus and press feedback on every button.",
        },
      },
    ],
    fonts: "Sometype Mono",
    effort: {
      es: "Bajo. Es la de menor riesgo: se aplica por pasos (tipografía, color, estados, anchos).",
      en: "Low. The lowest-risk option: it can be applied in steps (type, colour, states, widths).",
    },
  },
  {
    id: "p7",
    name: "PAPER TERMINAL",
    origin: "skill",
    skill: "minimalist-skill",
    tagline: {
      es: "Candidata para el modo claro: papel cálido, títulos con serif, bordes de un pixel y nada de neón.",
      en: "A candidate for light mode: warm paper, serif headings, one-pixel borders and no neon.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "Tarjetas blancas sobre fondo hueso, borde gris de 1 px, radio de 8 a 12 px y sin sombras.",
          en: "White cards on a bone background, 1 px grey border, 8 to 12 px radius and no shadows.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Barra blanca con tres círculos gris claro: la referencia a la ventana queda, sin color.",
          en: "White bar with three light grey circles: the window reference stays, without colour.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "Pantalla grande con borde fino y la lista de videos como filas de texto separadas por una línea.",
          en: "Large screen with a thin border and the video list as text rows separated by a line.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Columna de lectura angosta y centrada, con mucho aire entre secciones.",
          en: "Narrow, centred reading column with plenty of air between sections.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "Panel blanco, mensajes del visitante en gris cálido, etiquetas en pasteles apagados y botón negro.",
          en: "White panel, visitor messages in warm grey, labels in muted pastels and a black button.",
        },
      },
    ],
    fonts: "Instrument Serif + Geist + Geist Mono",
    effort: {
      es: "Medio. Reemplazaría el modo claro actual (ámbar) sin tocar el modo oscuro.",
      en: "Medium. It would replace the current (amber) light mode without touching dark mode.",
    },
  },
  {
    id: "p8",
    name: "DOT MATRIX",
    origin: "skill",
    skill: "nothing-design",
    tagline: {
      es: "Monocromo industrial: negro OLED, titulares de matriz de puntos, etiquetas de instrumento y un único punto rojo.",
      en: "Industrial monochrome: OLED black, dot-matrix headlines, instrument labels and a single red dot.",
    },
    notes: [
      {
        area: AREA.boxes,
        text: {
          es: "Casi sin recuadros: el espacio agrupa. Donde hay superficie es gris muy oscuro, sin sombra ni desenfoque, con radio de hasta 16 px.",
          en: "Almost no boxes: spacing does the grouping. Where there is a surface it is very dark grey, with no shadow or blur and up to 16 px radius.",
        },
      },
      {
        area: AREA.chrome,
        text: {
          es: "Sin luces. Cada bloque lleva una etiqueta en mayúsculas monoespaciadas, como en un panel de instrumentos.",
          en: "No lights. Each block carries a monospaced uppercase label, as on an instrument panel.",
        },
      },
      {
        area: AREA.reels,
        text: {
          es: "Pantalla grande, barra de progreso en segmentos y lista de videos en filas de dato. El punto rojo marca el video activo.",
          en: "Large screen, segmented progress bar and the video list as data rows. The red dot marks the active video.",
        },
      },
      {
        area: AREA.width,
        text: {
          es: "Composición asimétrica: el dato principal muy grande a la izquierda y los datos secundarios apilados a la derecha.",
          en: "Asymmetric composition: the main figure very large on the left and secondary data stacked on the right.",
        },
      },
      {
        area: AREA.clippy,
        text: {
          es: "Panel plano con borde fino, botones en pastilla y estados escritos entre corchetes.",
          en: "Flat panel with a thin border, pill buttons and states written in brackets.",
        },
      },
    ],
    fonts: "Doto + Space Grotesk + Space Mono",
    effort: {
      es: "Alto. Cambia la paleta (el verde deja de ser protagonista).",
      en: "High. It changes the palette (green stops being the lead colour).",
    },
  },
]
