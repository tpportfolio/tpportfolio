// Agent mode of the "acento" version: /acento/agents.md and /acento/agents.txt.
// Built only from this version's own content (./site.ts), so the main site's /agents.md is untouched.
import { BASE, footer, home, href, profile, projects, site, type Lang } from "./site"

const intro = {
  en: {
    title: "Tomás Peró: agent mode of the \"Acento\" version",
    about:
      "This is the agent-friendly summary of /acento, an alternative version of Tomás Peró's portfolio with its own design. The main home of the portfolio is / and its own summary is /agents.md.",
    idea:
      "Design idea: Tomás Peró carries the accent on the last syllable of both words (to-MAHS peh-ROH), and a brand is a decision about where the accent goes.",
    routes: "Routes",
    identity: "Identity",
    pillars: "Where he puts the accent",
    work: "Work",
    profile: "Profile",
    contact: "Contact",
    years: "Years",
    role: "Role",
    where: "Where",
    videos: "Videos",
    links: "Links",
    notes: "Notes",
    home: "Home of this version",
    caseLabel: "Case page",
    profilePage: "Profile page",
    agents: "This file",
    note: [
      "Same facts as the main site, in Spanish and English. Nothing on this version is invented.",
      "Spanish pages live under /acento/es and English pages under /acento/en.",
      "This version is not indexed by search engines: / stays the canonical home.",
    ],
  },
  es: {
    title: "Tomás Peró: modo agente de la versión \"Acento\"",
    about:
      "Este es el resumen para agentes de /acento, una versión alternativa del portfolio de Tomás Peró con otro diseño. La home principal del portfolio es / y su propio resumen es /agents.md.",
    idea:
      "Idea del diseño: Tomás Peró lleva el acento en la última sílaba de las dos palabras (to-MÁS pe-RÓ), y una marca es una decisión sobre dónde va el acento.",
    routes: "Rutas",
    identity: "Identidad",
    pillars: "Dónde pone el acento",
    work: "Trabajo",
    profile: "Perfil",
    contact: "Contacto",
    years: "Años",
    role: "Rol",
    where: "Dónde",
    videos: "Videos",
    links: "Enlaces",
    notes: "Notas",
    home: "Home de esta versión",
    caseLabel: "Página de caso",
    profilePage: "Página de perfil",
    agents: "Este archivo",
    note: [
      "Los mismos datos que el sitio principal, en español e inglés. Nada de esta versión es inventado.",
      "Las páginas en español viven en /acento/es y las páginas en inglés en /acento/en.",
      "Esta versión no se indexa en buscadores: / sigue siendo la home canónica.",
    ],
  },
} as const

const abs = (path: string) => `${site.url}${path}`

function section(lang: Lang, md: boolean) {
  const t = intro[lang]
  const h1 = (s: string) => (md ? `## ${s}` : s.toUpperCase())
  const h2 = (s: string) => (md ? `### ${s}` : `${s}:`)
  const h3 = (s: string) => (md ? `#### ${s}` : `- ${s}`)
  const li = (s: string) => `- ${s}`
  const out: string[] = []

  out.push(h1(lang === "es" ? "Español" : "English"), "", t.about, "", t.idea, "")

  out.push(h2(t.identity))
  out.push(li(`${site.name}: ${site.role[lang]}.`), li(site.location[lang]), li(home.heroRole[lang]), li(home.idea[lang]), "")

  out.push(h2(t.routes))
  out.push(li(`\`${href(lang)}\` - ${t.home}.`))
  for (const p of projects) out.push(li(`\`${href(lang, `/work/${p.slug}`)}\` - ${t.caseLabel}: ${p.name[lang]} (${p.years[lang]}).`))
  out.push(li(`\`${href(lang, "/about")}\` - ${t.profilePage}.`))
  out.push(li(`\`${BASE}/agents.md\`, \`${BASE}/agents.txt\` - ${t.agents}.`), "")

  out.push(h2(t.pillars))
  for (const pillar of home.pillars) {
    out.push(h3(`${pillar.label[lang]}: ${pillar.lead[lang]}`))
    for (const proof of pillar.proofs) out.push(li(`${proof.who}: ${proof.what[lang]}`))
  }
  out.push("")
  for (const fact of home.facts) out.push(li(`${fact.value[lang]} ${fact.label[lang]}.`))
  out.push("")

  out.push(h2(t.work))
  for (const p of projects) {
    out.push(h3(`${p.name[lang]} (${p.years[lang]})`))
    out.push(li(`${t.role}: ${p.role[lang]}. ${t.where}: ${p.place[lang]}.`))
    out.push(li(p.summary[lang]), li(p.context[lang]))
    for (const block of p.blocks) out.push(li(`${block.heading[lang]}: ${block.items.map((i) => i[lang].replace(/\.$/, "")).join("; ")}.`))
    for (const e of p.entries ?? []) out.push(li(`${e.company} (${e.title}, ${e.dates[lang]}, ${e.sector[lang]}): ${e.text[lang]}`))
    for (const s of p.stats ?? []) out.push(li(`${s.value[lang]} ${s.label[lang]}.`))
    out.push(li(`${p.outcome.heading[lang]}: ${p.outcome.text[lang]}`))
    if (p.videos?.length) out.push(li(`${t.videos}: ${p.videos.map((v) => `${v.title[lang]} (https://youtu.be/${v.videoId})`).join("; ")}.`))
    if (p.links?.length) out.push(li(`${t.links}: ${p.links.map((l) => `${l.label[lang]} (${l.external ? l.href : abs(l.href)})`).join("; ")}.`))
    out.push(li(abs(href(lang, `/work/${p.slug}`))), "")
  }

  out.push(h2(t.profile))
  for (const paragraph of profile.bio) out.push(li(paragraph[lang]))
  for (const list of profile.lists) out.push(li(`${list.heading[lang]}: ${list.items.map((i) => i[lang]).join("; ")}.`))
  out.push(li(`${profile.pathHeading[lang]}: ${profile.path.map((s) => `${s.years} ${s.company} (${s.role})`).join("; ")}.`), "")

  out.push(h2(t.contact))
  out.push(li(`${footer.heading[lang]}`), li(`Email: ${site.email}`), li(`LinkedIn: ${site.linkedin}`), li(site.location[lang]), "")

  out.push(h2(t.notes))
  for (const n of t.note) out.push(li(n))
  return out.join("\n")
}

export function buildAcentoAgentsMarkdown() {
  return [
    `# ${intro.en.title}`,
    "",
    "Bilingual file. English first, Spanish below.",
    "Archivo bilingüe. Primero en inglés, luego en español.",
    "",
    section("en", true),
    "",
    "---",
    "",
    section("es", true),
    "",
  ].join("\n")
}

export function buildAcentoAgentsText() {
  return [
    "AGENTS.TXT /acento",
    "",
    "Bilingual file. English first, Spanish below.",
    "Archivo bilingüe. Primero en inglés, luego en español.",
    "",
    section("en", false),
    "",
    "----------------------------------------",
    "",
    section("es", false),
    "",
  ].join("\n")
}
