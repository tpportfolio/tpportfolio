import { ImageResponse } from "next/og"
import { isLang, langs, site } from "../_content/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Tomás Peró"

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }))
}

// The share image: the name on paper, the accent as the only colour.
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params
  const lang = isLang(raw) ? raw : "es"
  const ink = "#151a6b"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#f3f4f0",
          color: ink,
        }}
      >
        <div style={{ display: "flex", fontSize: 34, maxWidth: 760, lineHeight: 1.25 }}>{site.role[lang]}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <svg width="150" height="118" viewBox="0 0 64 50" style={{ marginLeft: 430 }}>
            <path d="M0 50 37 0h27L13 50z" fill="#d4241a" />
          </svg>
          <div style={{ display: "flex", fontSize: 190, fontWeight: 700, letterSpacing: -8, lineHeight: 1 }}>Tomás Peró</div>
        </div>
      </div>
    ),
    size,
  )
}
