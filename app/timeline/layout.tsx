import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Timeline de carrera (2007–2026)",
  description: "Trayectoria de Tomás Peró desde 2007: Altheim, J. Walter Thompson, The Walt Disney Company, Air New Zealand, consultoría independiente, $MAGAIBA y Paradise.la.",
  alternates: { canonical: "/timeline" },
  openGraph: { title: "Timeline de carrera (2007–2026) | Tomás Peró", description: "Trayectoria de Tomás Peró desde 2007: Altheim, J. Walter Thompson, The Walt Disney Company, Air New Zealand, consultoría independiente, $MAGAIBA y Paradise.la.", url: "/timeline", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Timeline de carrera (2007–2026) | Tomás Peró", description: "Trayectoria de Tomás Peró desde 2007: Altheim, J. Walter Thompson, The Walt Disney Company, Air New Zealand, consultoría independiente, $MAGAIBA y Paradise.la.", images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
