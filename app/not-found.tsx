export default function NotFound() {
  return (
    <html>
      <body style={{ background: '#0f0f0f', color: '#ff0080', fontFamily: 'monospace', padding: '2rem' }}>
        <h2>Página no encontrada</h2>
        <p>La página que buscas no existe o fue movida.</p>
        <a href="/" style={{ color: '#00ffe7', textDecoration: 'underline' }}>Volver al inicio</a>
      </body>
    </html>
  );
}
