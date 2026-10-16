import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Consultor independiente de marca, marketing e IA",
  description: "Consultoría desde 2020 para Paradise.la, DrGea.com, Sinerlogic, Airtm, Stone Movistar y Go Broadway!: estrategia de marca, lanzamientos y producción con IA.",
  alternates: { canonical: "/work/independent-consultant" },
  openGraph: { title: "Consultor independiente de marca, marketing e IA | Tomás Peró", description: "Consultoría desde 2020 para Paradise.la, DrGea.com, Sinerlogic, Airtm, Stone Movistar y Go Broadway!: estrategia de marca, lanzamientos y producción con IA.", url: "/work/independent-consultant", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Consultor independiente de marca, marketing e IA | Tomás Peró", description: "Consultoría desde 2020 para Paradise.la, DrGea.com, Sinerlogic, Airtm, Stone Movistar y Go Broadway!: estrategia de marca, lanzamientos y producción con IA.", images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
