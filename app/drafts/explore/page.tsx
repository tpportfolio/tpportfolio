import type { Metadata } from "next"
import { summaryVariants } from "@/lib/explore-summary"
import { fontOptions } from "@/app/fonts-explore"
import { brandFontOptions } from "@/app/fonts-brands"

export const metadata: Metadata = {
  title: "Exploración: resumen y tipografías",
  robots: { index: false, follow: false },
}

const SAMPLE_TITLE = "TOMÁS PERÓ"
const SAMPLE_TEXT =
  "Soy Tomás, Brand Strategist y líder de marketing. Hace +18 años construyo, lanzo y escalo marcas: The Walt Disney Company, Air New Zealand y consultoría desde 2020."

const fontVar: Record<string, string> = {
  system: "monospace",
  geist: "var(--fx-geist)",
  jetbrains: "var(--fx-jetbrains)",
  martian: "var(--fx-martian)",
  kode: "var(--fx-kode)",
  azeret: "var(--fx-azeret)",
  spline: "var(--fx-spline)",
  redhat: "var(--fx-redhat)",
  chivo: "var(--fx-chivo)",
  fira: "var(--fx-fira)",
  doto: "var(--fx-geist)",
}

// EXPLORATION (fork explore/r35): index of the summary variants and the font candidates.
export default function ExplorePage() {
  return (
    <main className="explore-index px-4 py-8 md:px-12">
      <h1>Exploración · resumen y tipografías</h1>
      <p className="explore-lead">
        Fork <code>explore/r35-resumen-fonts</code>. Nada de esto está en producción. Cada link abre la home real con la
        variante aplicada; la barra de arriba permite cambiar sin volver acá.
      </p>

      <section>
        <h2>(A) Cómo mostrar el resumen</h2>
        <ul className="explore-list">
          <li>
            <a href="/?resumen=none">A0 · Sin resumen (como en r34)</a>
            <span>Solo el texto del typewriter.</span>
          </li>
          {summaryVariants.map((v) => (
            <li key={v.id}>
              <a href={`/?resumen=${v.id}`}>{v.name}</a>
              <span>{v.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>(A2) Bloque de preguntas frecuentes</h2>
        <ul className="explore-list">
          <li>
            <a href="/?faq=list#home-faq">Lista abierta (producción)</a>
            <span>Las seis preguntas con su respuesta a la vista.</span>
          </li>
          <li>
            <a href="/?faq=accordion#home-faq">Acordeón colapsado</a>
            <span>Una línea por pregunta, numerada; se abre al tocarla.</span>
          </li>
          <li>
            <a href="/?faq=grid#home-faq">Grilla colapsada</a>
            <span>Igual, en dos columnas: el bloque ocupa la mitad de alto.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2>(B) Tipografías</h2>
        <p className="explore-lead">Cada opción se aplica a todo el sitio mientras navegás (hasta cerrar la pestaña).</p>
        <div className="explore-fonts">
          {fontOptions.map((f) => (
            <a key={f.id} href={`/?font=${f.id}`} className="explore-font">
              <span className="explore-font-name">{f.name}</span>
              <span className="explore-font-title" style={{ fontFamily: f.id === "doto" ? "var(--fx-doto)" : fontVar[f.id], fontWeight: f.id === "doto" ? 800 : undefined }}>
                {SAMPLE_TITLE}
              </span>
              <span className="explore-font-text" style={{ fontFamily: fontVar[f.id] }}>
                {SAMPLE_TEXT}
              </span>
              <span className="explore-font-note">{f.note}</span>
            </a>
          ))}
        </div>
      </section>
      <section>
        <h2>(B2) Tipografías de marcas a las que podrías aplicar</h2>
        <p className="explore-lead">
          Casi todas son propietarias: se muestra la alternativa libre más parecida. Cuando la marca liberó la suya
          (Google, IBM, GitHub, Red Hat, Mozilla), es la real.
        </p>
        <div className="explore-fonts">
          {brandFontOptions.map((f) => (
            <a key={f.id} href={`/?font=${f.id}`} className="explore-font">
              <span className="explore-font-name">
                {f.brand} · {f.font}
              </span>
              <span className="explore-font-title" style={{ fontFamily: `var(--fb-${f.id.slice(2)})` }}>
                {SAMPLE_TITLE}
              </span>
              <span className="explore-font-text" style={{ fontFamily: `var(--fb-${f.id.slice(2)})` }}>
                {SAMPLE_TEXT}
              </span>
              <span className="explore-font-note">Tipografía de la marca: {f.real}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
