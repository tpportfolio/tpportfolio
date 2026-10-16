import type { Metadata } from "next"
import type { ReactNode } from "react"

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Experimentos con IA: reel y trabajos",
  description: "Trabajos y experimentos con IA de Tomás Peró desde 2022: reel 2025/2026, ads y demos 2026, música generada con IA, the8bureau y webapps para producción.",
  alternates: { canonical: "/work/ai-experiments" },
  openGraph: { title: "Experimentos con IA: reel y trabajos | Tomás Peró", description: "Trabajos y experimentos con IA de Tomás Peró desde 2022: reel 2025/2026, ads y demos 2026, música generada con IA, the8bureau y webapps para producción.", url: "/work/ai-experiments", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Experimentos con IA: reel y trabajos | Tomás Peró", description: "Trabajos y experimentos con IA de Tomás Peró desde 2022: reel 2025/2026, ads y demos 2026, música generada con IA, the8bureau y webapps para producción.", images: ["/opengraph-image"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
