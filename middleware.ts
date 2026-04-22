import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/intro" ||
    pathname === "/intro.html" ||
    pathname === "/agents.txt" ||
    pathname === "/agents.md" ||
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
  res.cookies.set("tp_intro", "1", { path: "/", maxAge: 60 * 60 * 24 * 30 })
  return res
}

export const config = {
  matcher: ["/:path*"],
}