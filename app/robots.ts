import type { MetadataRoute } from "next"

// Everything public is open to search engines and to AI search / answer crawlers.
// Only drafts, the API and the /home-variant alias stay out. /highlights and /acento stay crawlable:
// their own pages say noindex, and a crawler can only read that if it is allowed in.
const DISALLOW = ["/api/", "/drafts/", "/home-variant"]

const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
  // Meta AI / Muse indexer
  "meta-webindexer",
  "Meta-ExternalFetcher",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: "https://tomaspero.vercel.app/sitemap.xml",
    host: "https://tomaspero.vercel.app",
  }
}
