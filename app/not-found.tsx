"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-context"

export default function NotFound() {
  const { language } = useLanguage()
  const isEs = language === "es"

  return (
    <main style={{ background: '#0f0f0f', color: '#ff0080', fontFamily: 'monospace', padding: '2rem', minHeight: '100vh' }}>
      <h2>{isEs ? "Página no encontrada" : "Page not found"}</h2>
      <p>{isEs ? "La página que buscás no existe o fue movida." : "The page you are looking for does not exist or has been moved."}</p>
      <Link href="/" style={{ color: '#00ffe7', textDecoration: 'underline' }}>
        {isEs ? "Volver al inicio" : "Back to home"}
      </Link>
    </main>
  )
}
