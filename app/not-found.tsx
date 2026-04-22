import Link from "next/link"

export default function NotFound() {
  return (
    <main style={{ background: '#0f0f0f', color: '#ff0080', fontFamily: 'monospace', padding: '2rem', minHeight: '100vh' }}>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe o fue movida.</p>
      <Link href="/" style={{ color: '#00ffe7', textDecoration: 'underline' }}>
        Volver al inicio
      </Link>
    </main>
  )
}
