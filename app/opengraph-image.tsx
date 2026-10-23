import { ImageResponse } from "next/og"
import { CAREER_YEARS } from "@/lib/career"

export const alt = "Tomás Peró — Brand Strategist y líder de marketing"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 86400

// Shared preview image for every page that does not define its own.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#020403",
          color: "#00ff41",
          fontFamily: "monospace",
          border: "6px solid #00ff41",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#ef4444" }} />
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#eab308" }} />
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#22c55e" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: 6 }}>TOMÁS PERÓ</div>
          <div style={{ fontSize: 40, color: "#22f0ff" }}>Brand Strategist &amp; Marketing Leader</div>
          <div style={{ fontSize: 30, color: "#c4cdc7" }}>
            {`Estrategia de marca · marketing cultural · IA · ${CAREER_YEARS}+ años`}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9aa79e" }}>
          <span>tomaspero.vercel.app</span>
          <span>Buenos Aires · LATAM</span>
        </div>
      </div>
    ),
    size,
  )
}
