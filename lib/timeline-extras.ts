import type { LocalizedText } from "@/lib/site-content"

// Where each timeline planet leads, and the brands shown under its description.
// Single source for the /timeline page and for /agents.md.

export type TimelineBrandGroup = {
  label: LocalizedText
  brands: { es: string[]; en: string[] }
}

export type TimelineExtra = {
  href: string
  brandGroups: TimelineBrandGroup[]
}

const same = (brands: string[]) => ({ es: brands, en: brands })

export const timelineExtras: Record<string, TimelineExtra> = {
  paradise: {
    href: "/work/independent-consultant#paradise-la",
    brandGroups: [
      { label: { es: "STACK IA", en: "AI STACK" }, brands: same(["Nano Banana", "Kling", "Veo", "ElevenLabs"]) },
    ],
  },
  magaiba: {
    href: "/magaiba",
    brandGroups: [
      { label: { es: "COMUNIDAD", en: "COMMUNITY" }, brands: same(["Círculo Vicioso"]) },
      { label: { es: "PLATAFORMAS", en: "PLATFORMS" }, brands: same(["YouTube", "Suno"]) },
    ],
  },
  drgea: {
    href: "/work/independent-consultant#drgea",
    brandGroups: [
      {
        label: { es: "MERCADOS", en: "MARKETS" },
        brands: { es: ["Colombia", "Argentina", "México", "Perú"], en: ["Colombia", "Argentina", "Mexico", "Peru"] },
      },
    ],
  },
  airtm: {
    href: "/work/independent-consultant#airtm",
    brandGroups: [
      { label: { es: "CONTENIDO DE MARCA", en: "BRANDED CONTENT" }, brands: same(["Airtalks"]) },
    ],
  },
  "stone-movistar": {
    href: "/work/independent-consultant#stone-movistar",
    brandGroups: [
      { label: { es: "SPONSOR", en: "SPONSOR" }, brands: same(["Movistar"]) },
      { label: { es: "FUNDADORES", en: "FOUNDERS" }, brands: same(["Diego Schwartzman", "Torneos"]) },
      { label: { es: "CREADORES", en: "CREATORS" }, brands: same(["Delfi Pignatiello", "Luquitas Rodríguez", "Lit Killah"]) },
    ],
  },
  "go-broadway": {
    href: "/work/independent-consultant#go-broadway",
    brandGroups: [
      { label: { es: "LANZAMIENTO", en: "LAUNCH" }, brands: same(["Backstage"]) },
      { label: { es: "PARTNERS", en: "PARTNERS" }, brands: same(["Ticketek", "47st"]) },
      { label: { es: "PRENSA", en: "PRESS" }, brands: same(["La Nación"]) },
    ],
  },
  "air-new-zealand": {
    href: "/work/air-new-zealand",
    brandGroups: [
      { label: { es: "SPONSORSHIPS", en: "SPONSORSHIPS" }, brands: same(["All Blacks", "UAR", "Agustín Pichot"]) },
      { label: { es: "PARTNERS", en: "PARTNERS" }, brands: same(["Tourism New Zealand", "Auckland Airport", "Despegar", "Almundo"]) },
      { label: { es: "MEDIOS", en: "MEDIA" }, brands: same(["ESPN", "Canal 13", "Telefe"]) },
    ],
  },
  disney: {
    href: "/work/walt-disney-company",
    brandGroups: [
      { label: { es: "FRANQUICIAS", en: "FRANCHISES" }, brands: same(["Disney", "Marvel", "Pixar", "Lucasfilm"]) },
      { label: { es: "PLATAFORMAS", en: "PLATFORMS" }, brands: same(["Netflix", "Apple/iTunes", "Google Play"]) },
      { label: { es: "RETAIL", en: "RETAIL" }, brands: same(["Solo Deportes"]) },
    ],
  },
  jwt: {
    href: "/work/agency-experience#jwt",
    brandGroups: [
      {
        label: { es: "CLIENTES DE AGENCIA", en: "AGENCY CLIENTS" },
        brands: same(["Claro", "Ford", "Johnson & Johnson", "Nokia", "Cerveza Imperial (CCU)"]),
      },
    ],
  },
  altheim: {
    href: "/work/agency-experience#altheim",
    brandGroups: [
      { label: { es: "CLIENTE DE AGENCIA", en: "AGENCY CLIENT" }, brands: same(["Beldent"]) },
    ],
  },
}
