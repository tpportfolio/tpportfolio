import path from "node:path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(process.cwd()),
  images: {
    unoptimized: true,
  },
  // The "acento" design was first published as a draft under /drafts.
  async redirects() {
    return [
      { source: "/drafts/acento", destination: "/acento", permanent: true },
      { source: "/drafts/acento/:path*", destination: "/acento/:path*", permanent: true },
    ]
  },
}

export default nextConfig