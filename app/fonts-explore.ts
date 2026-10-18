import {
  Azeret_Mono,
  Chivo_Mono,
  Doto,
  Fira_Code,
  Geist_Mono,
  JetBrains_Mono,
  Kode_Mono,
  Martian_Mono,
  Red_Hat_Mono,
  Spline_Sans_Mono,
} from "next/font/google"

// EXPLORATION (fork explore/r35), round 2: ten monospace faces in the matrix / terminal spirit but
// more modern than the system monospace. All variable fonts, self-hosted by next/font.
// Nothing uses them unless a preview is switched on (?font=...), see components/explore-controls.tsx.

// next/font needs literal options in each call (no shared object).
const geist = Geist_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-geist" })
const jetbrains = JetBrains_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-jetbrains" })
const martian = Martian_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-martian" })
const kode = Kode_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-kode" })
const azeret = Azeret_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-azeret" })
const spline = Spline_Sans_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-spline" })
const redhat = Red_Hat_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-redhat" })
const chivo = Chivo_Mono({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-chivo" })
const fira = Fira_Code({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-fira" })
const doto = Doto({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fx-doto" })

export const exploreFontVariables = [geist, jetbrains, martian, kode, azeret, spline, redhat, chivo, fira, doto]
  .map((font) => font.variable)
  .join(" ")

export const fontOptions: { id: string; name: string; note: string }[] = [
  { id: "system", name: "Actual · monospace del sistema", note: "Lo que se ve hoy: Consolas en Windows, Menlo en Mac. Cambia según la computadora." },
  { id: "geist", name: "1 · Geist Mono", note: "La de Vercel. Limpia, precisa, muy actual: terminal de producto tech." },
  { id: "jetbrains", name: "2 · JetBrains Mono", note: "Código moderno, letras abiertas. La más legible en párrafos largos." },
  { id: "martian", name: "3 · Martian Mono", note: "Ancha y con presencia, aire de interfaz espacial. Fuerte en títulos." },
  { id: "kode", name: "4 · Kode Mono", note: "Angulosa y técnica: la más 'matrix' de las modernas, sin ser retro." },
  { id: "azeret", name: "5 · Azeret Mono", note: "Geométrica y editorial: terminal con estética de diseño." },
  { id: "spline", name: "6 · Spline Sans Mono", note: "Redondeada y cálida; terminal amable, muy cómoda de leer." },
  { id: "redhat", name: "7 · Red Hat Mono", note: "Sobria y corporativa, con carácter. Segura para un perfil profesional." },
  { id: "chivo", name: "8 · Chivo Mono", note: "Grotesca y contundente; buen contraste entre títulos y texto." },
  { id: "fira", name: "9 · Fira Code", note: "Clásica de programadores: técnica y neutra." },
  { id: "doto", name: "10 · Doto + Geist Mono", note: "Doto, de puntos tipo matriz LED, solo en títulos; textos en Geist Mono." },
]
