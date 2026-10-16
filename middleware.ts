import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Search engines, AI crawlers and link previews get the real page: the intro is a human-only
// interstitial, and serving it to bots hid the whole portfolio from them.
const BOT_UA =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|slack|linkedin|twitter|skype|quora|pinterest|vkshare|googleother|google-extended|google-inspectiontool|chatgpt|gptbot|oai-searchbot|claude|anthropic|perplexity|bytespider|ccbot|cohere|amazonbot|applebot|duckassist|meta-externalagent|mistral|youbot|diffbot|lighthouse|headless/i

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/audio") ||
    pathname === "/intro" ||
    pathname === "/intro.html" ||
    pathname === "/agents.txt" ||
    pathname === "/agents.md" ||
    pathname === "/llms.txt" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    // The work-first version shows the boot as a short texture instead of the intro page.
    pathname === "/highlights" ||
    pathname.startsWith("/highlights/") ||
    // Old name of /highlights: redirected by next.config.mjs.
    pathname === "/v2" ||
    pathname.startsWith("/v2/") ||
    // The "acento" alternative home has its own loader.
    pathname === "/acento" ||
    pathname.startsWith("/acento/") ||
    pathname.startsWith("/drafts/acento") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next()
  }

  if (BOT_UA.test(req.headers.get("user-agent") ?? "")) return NextResponse.next()

  const cookie = req.cookies.get("tp_intro")?.value
  if (cookie === "1") return NextResponse.next()

  const target = `${pathname}${search || ""}`
  const url = req.nextUrl.clone()
  url.pathname = "/intro.html"
  url.hash = encodeURIComponent(target)

  const res = NextResponse.redirect(url)
  res.cookies.set("tp_intro", "1", { path: "/", maxAge: 60 * 60 * 24 * 30 })
  return res
}

export const config = {
  matcher: ["/:path*"],
}
