import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "$MAGAIBA y RADIO MAGAIBA",
  description: "Proyecto paralelo de 2024: comunicación de comunidad de $MAGAIBA, la memecoin argentina, y RADIO MAGAIBA, canal 24/7 con música IA y 1,9M horas vistas.",
  alternates: { canonical: "/magaiba" },
  openGraph: { title: "$MAGAIBA y RADIO MAGAIBA | Tomás Peró", description: "Proyecto paralelo de 2024: comunicación de comunidad de $MAGAIBA, la memecoin argentina, y RADIO MAGAIBA, canal 24/7 con música IA y 1,9M horas vistas.", url: "/magaiba", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "$MAGAIBA y RADIO MAGAIBA | Tomás Peró", description: "Proyecto paralelo de 2024: comunicación de comunidad de $MAGAIBA, la memecoin argentina, y RADIO MAGAIBA, canal 24/7 con música IA y 1,9M horas vistas.", images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
