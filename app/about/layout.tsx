import { CAREER_YEARS } from "@/lib/career"
import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Sobre Tomás Peró: trayectoria y especialidades",
  description: `Brand Strategist con más de ${CAREER_YEARS} años en agencias, The Walt Disney Company, Air New Zealand y consultoría: estrategia de marca, marketing cultural e IA.`,
  alternates: { canonical: "/about" },
  openGraph: { title: "Sobre Tomás Peró: trayectoria y especialidades | Tomás Peró", description: `Brand Strategist con más de ${CAREER_YEARS} años en agencias, The Walt Disney Company, Air New Zealand y consultoría: estrategia de marca, marketing cultural e IA.`, url: "/about", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Sobre Tomás Peró: trayectoria y especialidades | Tomás Peró", description: `Brand Strategist con más de ${CAREER_YEARS} años en agencias, The Walt Disney Company, Air New Zealand y consultoría: estrategia de marca, marketing cultural e IA.`, images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: "https://tomaspero.vercel.app/about",
            name: "Sobre Tomás Peró",
            inLanguage: ["es", "en"],
            mainEntity: { "@id": "https://tomaspero.vercel.app/#person" },
          }).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  )
}
