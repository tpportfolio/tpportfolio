import type { MetadataRoute } from "next"

const SITE = "https://tomaspero.vercel.app"

// Public, indexable pages. Drafts, /home-variant (alias), /v2 and /acento (noindex versions) are left out.
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.9 },
  { path: "/timeline", priority: 0.8 },
  { path: "/work/ai-experiments", priority: 0.8 },
  { path: "/work/air-new-zealand", priority: 0.8 },
  { path: "/work/walt-disney-company", priority: 0.8 },
  { path: "/work/independent-consultant", priority: 0.8 },
  { path: "/work/agency-experience", priority: 0.7 },
  { path: "/magaiba", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/agents.md", priority: 0.5 },
  { path: "/llms.txt", priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }))
}
