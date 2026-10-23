# PLAN — QA antes de promover r36–r41 a producción

Rama: `release/r42-qa` (desde r41). Aprobado por Tomás el 2026-10-22 ("Hagamos lo que sugerís").

## Objetivo y alcance
Probar desktop, mobile y responsive del build r41 antes de subirlo a `main`.
- Entra: niveles 0–3 + comparación visual contra producción + accesibilidad con axe-core.
- Afuera: Lighthouse (después de promover), Safari iOS real (lo prueba Tomás en su teléfono),
  mandar mensajes a Clippy (gasta la API de Groq), cualquier cambio en el sitio (eso viene después del checkpoint).

## Enfoque
- `qa/` es un paquete aparte (`qa/package.json`, Playwright 1.64.0, `qa/node_modules` ignorado).
  Descartado: sumar Playwright al `package.json` del sitio, porque cambia el lockfile que usa Vercel
  y `node_modules` es un junction compartido con la sesión de Acento.
- axe-core se inyecta desde `node_modules/axe-core/axe.min.js` (ya está en el lockfile, sin dependencia nueva).
- Se prueba el build de producción (`next start` en :3242), no el servidor de desarrollo.

## Etapas
1. **Nivel 0** — lint, typecheck, build.
   Valida: 0 errores. Asignado: Opus. Checkpoint: no. **Hecho** (8 warnings, 0 errores).
2. **Script `qa/run.mjs`** — barrido responsive + capturas + interacciones + axe → `qa/results/` (JSON + report.html).
   Conserva: no toca nada fuera de `qa/`. Valida: corre de punta a punta contra :3242 y contra producción.
   Asignado: Sonnet (implementer). Checkpoint: no.
3. **Corrida y revisión** — correr contra r41 y contra producción; leer el reporte, separar falsos positivos.
   Asignado: Opus. **Checkpoint humano: sí** (mostrar a Tomás qué falló antes de corregir).
4. **Correcciones** — una rama por tanda (r43…), con su README/CHANGELOG/agents.md.
   **Checkpoint humano: sí** antes de subir a `main`.

## Rollback
Todo es aditivo: borrar `qa/` o la rama `release/r42-qa`. No toca datos ni producción.
