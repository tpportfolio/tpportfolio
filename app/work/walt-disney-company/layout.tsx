import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Disney: promociones y distribución digital",
  description: "Caso Disney (2011–2015): promociones 360° y alianzas en Latinoamérica con Disney, Marvel, Pixar y Lucasfilm, distribución digital y Disney Labs.",
  alternates: { canonical: "/work/walt-disney-company" },
  openGraph: { title: "Disney: promociones y distribución digital | Tomás Peró", description: "Caso Disney (2011–2015): promociones 360° y alianzas en Latinoamérica con Disney, Marvel, Pixar y Lucasfilm, distribución digital y Disney Labs.", url: "/work/walt-disney-company", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Disney: promociones y distribución digital | Tomás Peró", description: "Caso Disney (2011–2015): promociones 360° y alianzas en Latinoamérica con Disney, Marvel, Pixar y Lucasfilm, distribución digital y Disney Labs.", images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
