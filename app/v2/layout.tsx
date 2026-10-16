import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Trabajo primero: casos y resultados",
  description:
    "Versión alternativa del portfolio de Tomás Peró: primero los casos, cada uno abre con su resultado; la historia de la carrera queda al final.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/v2" },
}

export default function V2Layout({ children }: { children: ReactNode }) {
  return children
}
