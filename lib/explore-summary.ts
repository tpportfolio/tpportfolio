// EXPLORATION (fork explore/r35): the summary variants, as plain data so server pages can list them.

export type SummaryVariant = "terminal" | "strip" | "cards" | "typed" | "details"

export const summaryVariants: { id: SummaryVariant; name: string; note: string }[] = [
  { id: "terminal", name: "A1 · Salida de terminal", note: "Tres líneas como respuesta de consola, sin marco." },
  { id: "strip", name: "A2 · Franja de datos", note: "Una franja horizontal con tres columnas cortas." },
  { id: "cards", name: "A3 · Tres fichas", note: "Tres fichas chicas en fila, con etiqueta arriba." },
  { id: "typed", name: "A4 · Continuación del typewriter", note: "Aparecen escritas cuando termina el texto principal." },
  { id: "details", name: "A5 · Desplegable", note: "Una línea que se abre al tocarla; el texto ya está en la página." },
]
