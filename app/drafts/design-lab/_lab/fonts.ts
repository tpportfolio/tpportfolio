import {
  Anybody,
  Chakra_Petch,
  Doto,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  Instrument_Serif,
  JetBrains_Mono,
  Martian_Mono,
  Silkscreen,
  Sometype_Mono,
  Space_Grotesk,
  Space_Mono,
  VT323,
} from "next/font/google"

// Typefaces used by the design-lab proposals only. Nothing here is preloaded:
// each face is fetched when the skin that uses it is on screen.

const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-jetbrains" })
const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false, variable: "--font-chakra" })
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false, variable: "--font-plex" })
const vt323 = VT323({ subsets: ["latin"], weight: "400", display: "swap", preload: false, variable: "--font-vt323" })
const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"], display: "swap", preload: false, variable: "--font-silkscreen" })
const anybody = Anybody({ subsets: ["latin"], axes: ["wdth"], display: "swap", preload: false, variable: "--font-anybody" })
const martian = Martian_Mono({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-martian" })
const geist = Geist({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-geist-mono" })
const sometype = Sometype_Mono({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-sometype" })
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap", preload: false, variable: "--font-instrument" })
const doto = Doto({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-doto" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-space-grotesk" })
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap", preload: false, variable: "--font-space-mono" })

export const labFontClassName = [
  jetbrains,
  chakra,
  plex,
  vt323,
  silkscreen,
  anybody,
  martian,
  geist,
  geistMono,
  sometype,
  instrument,
  doto,
  spaceGrotesk,
  spaceMono,
]
  .map((font) => font.variable)
  .join(" ")
