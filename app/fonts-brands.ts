// EXPLORATION (fork explore/r35), round 3: fonts of brands Tomás could apply to.
// Most brand typefaces are proprietary: each entry loads the closest free Google Font, or the real
// one when the brand released it for free (Google, IBM, GitHub, Red Hat, Mozilla).

import {
  Archivo,
  Barlow_Condensed,
  DM_Sans,
  Figtree,
  Google_Sans_Code,
  Hanken_Grotesk,
  IBM_Plex_Sans,
  Inter,
  Inter_Tight,
  Jost,
  Lilita_One,
  Manrope,
  Mona_Sans,
  Montserrat,
  Open_Sans,
  Plus_Jakarta_Sans,
  Red_Hat_Display,
  Source_Sans_3,
  Work_Sans,
  Zilla_Slab,
} from "next/font/google"

// next/font needs literal options in each call (no shared object).
const f_netflix = Inter_Tight({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-netflix" })
const f_spotify = DM_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-spotify" })
const f_airbnb = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-airbnb" })
const f_apple = Inter({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-apple" })
const f_google = Google_Sans_Code({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-google" })
const f_uber = Manrope({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-uber" })
const f_nike = Jost({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-nike" })
const f_nikecond = Barlow_Condensed({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: ["400", "600", "700"], variable: "--fb-nikecond" })
const f_adidas = Archivo({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-adidas" })
const f_amazon = Figtree({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-amazon" })
const f_microsoft = Open_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-microsoft" })
const f_samsung = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-samsung" })
const f_cocacola = Work_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-cocacola" })
const f_burgerking = Lilita_One({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400", variable: "--fb-burgerking" })
const f_meli = Montserrat({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-meli" })
const f_bbc = Source_Sans_3({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-bbc" })
const f_ibm = IBM_Plex_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-ibm" })
const f_github = Mona_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-github" })
const f_redhatdisplay = Red_Hat_Display({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, variable: "--fb-redhatdisplay" })
const f_mozilla = Zilla_Slab({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: ["400", "600", "700"], variable: "--fb-mozilla" })

export const brandFontVariables = [f_netflix, f_spotify, f_airbnb, f_apple, f_google, f_uber, f_nike, f_nikecond, f_adidas, f_amazon, f_microsoft, f_samsung, f_cocacola, f_burgerking, f_meli, f_bbc, f_ibm, f_github, f_redhatdisplay, f_mozilla]
  .map((font) => font.variable)
  .join(" ")

export const brandFontOptions: { id: string; brand: string; real: string; font: string }[] = [
  { id: "b-netflix", brand: "Netflix", real: "Netflix Sans (propietaria)", font: "Inter Tight" },
  { id: "b-spotify", brand: "Spotify", real: "Spotify Mix, antes Circular (propietaria)", font: "DM Sans" },
  { id: "b-airbnb", brand: "Airbnb", real: "Airbnb Cereal (propietaria)", font: "Plus Jakarta Sans" },
  { id: "b-apple", brand: "Apple", real: "SF Pro (propietaria)", font: "Inter" },
  { id: "b-google", brand: "Google", real: "Google Sans Code (la real, libre)", font: "Google Sans Code" },
  { id: "b-uber", brand: "Uber", real: "Uber Move (propietaria)", font: "Manrope" },
  { id: "b-nike", brand: "Nike", real: "Futura, en titulares (comercial)", font: "Jost" },
  { id: "b-nikecond", brand: "Nike / deportes", real: "Trade Gothic Condensed (comercial)", font: "Barlow Condensed" },
  { id: "b-adidas", brand: "Adidas", real: "adineue (propietaria)", font: "Archivo" },
  { id: "b-amazon", brand: "Amazon", real: "Amazon Ember (propietaria)", font: "Figtree" },
  { id: "b-microsoft", brand: "Microsoft", real: "Segoe UI (propietaria)", font: "Open Sans" },
  { id: "b-samsung", brand: "Samsung", real: "SamsungOne (propietaria)", font: "Hanken Grotesk" },
  { id: "b-cocacola", brand: "Coca-Cola", real: "TCCC Unity (propietaria)", font: "Work Sans" },
  { id: "b-burgerking", brand: "Burger King", real: "Flame (propietaria; parecido aproximado)", font: "Lilita One" },
  { id: "b-meli", brand: "Mercado Libre", real: "Proxima Nova (comercial)", font: "Montserrat" },
  { id: "b-bbc", brand: "BBC", real: "BBC Reith (propietaria)", font: "Source Sans 3" },
  { id: "b-ibm", brand: "IBM", real: "IBM Plex Sans (la real, libre)", font: "IBM Plex Sans" },
  { id: "b-github", brand: "GitHub", real: "Mona Sans (la real, libre)", font: "Mona Sans" },
  { id: "b-redhatdisplay", brand: "Red Hat", real: "Red Hat Display (la real, libre)", font: "Red Hat Display" },
  { id: "b-mozilla", brand: "Mozilla", real: "Zilla Slab (la real, libre)", font: "Zilla Slab" },
]
