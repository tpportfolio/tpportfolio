import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Air New Zealand: lanzamiento en Sudamérica",
  description: "Caso Air New Zealand (2015–2020): lanzamiento de la marca y de una ruta de larga distancia en Sudamérica, con campañas 360° en 4 mercados.",
  alternates: { canonical: "/work/air-new-zealand" },
  openGraph: { title: "Air New Zealand: lanzamiento en Sudamérica | Tomás Peró", description: "Caso Air New Zealand (2015–2020): lanzamiento de la marca y de una ruta de larga distancia en Sudamérica, con campañas 360° en 4 mercados.", url: "/work/air-new-zealand", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Air New Zealand: lanzamiento en Sudamérica | Tomás Peró", description: "Caso Air New Zealand (2015–2020): lanzamiento de la marca y de una ruta de larga distancia en Sudamérica, con campañas 360° en 4 mercados.", images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
