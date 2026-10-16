import path from "node:path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(process.cwd()),
  images: {
    unoptimized: true,
  },
  // Basic security headers (also read as trust signals by crawlers). No CSP yet: YouTube, Vercel
  // analytics and Google Analytics would need a tested allowlist first.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ]
  },
  // The "acento" design was first published as a draft under /drafts.
  async redirects() {
    return [
      // The work-first version was first published as /v2.
      { source: "/v2", destination: "/highlights", permanent: true },
      { source: "/v2/:path*", destination: "/highlights/:path*", permanent: true },
      { source: "/drafts/acento", destination: "/acento", permanent: true },
      { source: "/drafts/acento/:path*", destination: "/acento/:path*", permanent: true },
    ]
  },
}

export default nextConfig