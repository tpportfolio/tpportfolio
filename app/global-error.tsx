"use client"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ background: '#0f0f0f', color: '#ff0080', fontFamily: 'monospace', padding: '2rem' }}>
        <h2>¡Algo salió mal!</h2>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#181818', padding: '1rem', borderRadius: '8px' }}>{error.message}</pre>
        <button style={{ marginTop: '2rem', background: '#ff0080', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem 1.5rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => reset()}>
          Reintentar
        </button>
      </body>
    </html>
  )
}
