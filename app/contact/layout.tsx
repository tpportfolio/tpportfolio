import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contacto para proyectos de marca y marketing",
  description: "Contactá a Tomás Peró por proyectos de estrategia de marca, lanzamientos, marketing cultural o producción con IA: LinkedIn y formulario de contacto.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contacto para proyectos de marca y marketing | Tomás Peró", description: "Contactá a Tomás Peró por proyectos de estrategia de marca, lanzamientos, marketing cultural o producción con IA: LinkedIn y formulario de contacto.", url: "/contact", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Contacto para proyectos de marca y marketing | Tomás Peró", description: "Contactá a Tomás Peró por proyectos de estrategia de marca, lanzamientos, marketing cultural o producción con IA: LinkedIn y formulario de contacto.", images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
