import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Agencias: J. Walter Thompson y Altheim",
  description: "Primeros años en agencias (2007–2011): campañas ATL, BTL y 360° en J. Walter Thompson y Altheim para Claro, Ford, Johnson & Johnson, Nokia y Beldent.",
  alternates: { canonical: "/work/agency-experience" },
  openGraph: { title: "Agencias: J. Walter Thompson y Altheim | Tomás Peró", description: "Primeros años en agencias (2007–2011): campañas ATL, BTL y 360° en J. Walter Thompson y Altheim para Claro, Ford, Johnson & Johnson, Nokia y Beldent.", url: "/work/agency-experience", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Agencias: J. Walter Thompson y Altheim | Tomás Peró", description: "Primeros años en agencias (2007–2011): campañas ATL, BTL y 360° en J. Walter Thompson y Altheim para Claro, Ford, Johnson & Johnson, Nokia y Beldent.", images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
