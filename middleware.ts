import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Shows /public/intro.html only on first visit (cookie-based).
// Redirect target is passed via URL hash so the static HTML can read it.
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Skip Next internals, API, and the intro asset itself
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/intro" ||
    pathname === "/intro.html" ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next()
  }

  const cookie = req.cookies.get("tp_intro")?.value
  if (cookie === "1") return NextResponse.next()

  const target = `${pathname}${search || ""}`
  const url = req.nextUrl.clone()
  url.pathname = "/intro.html"
  url.hash = encodeURIComponent(target)

  const res = NextResponse.redirect(url)
  // 30 days
  res.cookies.set("tp_intro", "1", { path: "/", maxAge: 60 * 60 * 24 * 30 })
  return res
}

export const config = {
  matcher: ["/:path*"],
}
