import {
  IBM_Plex_Mono,
  JetBrains_Mono,
  Martian_Mono,
  Share_Tech_Mono,
  Sometype_Mono,
  Space_Grotesk,
  Space_Mono,
  VT323,
} from "next/font/google"

// EXPLORATION (fork explore/r35): candidate fonts for the site, self-hosted by next/font.
// Nothing uses them unless a preview is switched on (?font=...), see components/explore-controls.tsx.

// next/font needs literal options in each call (no shared object).
const plex = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: ["400", "600", "700"], variable: "--fx-plex" })
const jetbrains = JetBrains_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-jetbrains" })
const spaceMono = Space_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: ["400", "700"], variable: "--fx-spacemono" })
const vt323 = VT323({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400", variable: "--fx-vt323" })
const shareTech = Share_Tech_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--fx-sharetech" })
const sometype = Sometype_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-sometype" })
const martian = Martian_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-martian" })
const grotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-grotesk" })

export const exploreFontVariables = [plex, jetbrains, spaceMono, vt323, shareTech, sometype, martian, grotesk]
  .map((font) => font.variable)
  .join(" ")

export const fontOptions: { id: string; name: string; note: string }[] = [
  { id: "system", name: "Actual · monospace del sistema", note: "Lo que se ve hoy: Consolas en Windows, Menlo en Mac. Cambia según la computadora." },
  { id: "plex", name: "IBM Plex Mono", note: "Sobria y corporativa-tech. Muy legible en párrafos largos." },
  { id: "jetbrains", name: "JetBrains Mono", note: "Moderna, de código. Letras abiertas, ideal para textos y datos." },
  { id: "spacemono", name: "Space Mono", note: "Retro-futurista, con personalidad. Mejor para títulos que para párrafos." },
  { id: "sharetech", name: "Share Tech Mono", note: "HUD de ciencia ficción, angulosa. Muy de la estética matrix." },
  { id: "sometype", name: "Sometype Mono", note: "La del Design Lab: suave y editorial." },
  { id: "martian", name: "Martian Mono", note: "Ancha y contemporánea, con presencia." },
  { id: "vt323", name: "VT323", note: "Pantalla CRT pixelada. Solo para títulos o detalles: cansa en párrafos." },
  { id: "pair", name: "Space Grotesk + JetBrains Mono", note: "Textos en una sans legible y títulos, etiquetas y datos en mono." },
]
