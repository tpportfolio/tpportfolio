# Business logic

This is a personal portfolio with a "Matrix + 90s web" look (terminal + neon + retro), with modern spacing and motion.

## First-visit intro

- `middleware.ts` redirects first-time visits to `/intro.html`.
- The redirect is disabled once the cookie `tp_intro` exists.
- The intro stores the original route in the URL hash and returns the user there after finishing.

## Home

- The typewriter intro is the first content block.
- Project cards ("<BASE_DE_DATOS_PROYECTOS>") render only after the typewriter finishes.
- A global reveal is available via double click (desktop) / double tap (mobile).
- The typewriter block can be collapsed/expanded from a small green toggle above "<BASE_DE_DATOS_PROYECTOS>".

## AI section (/work/ai-experiments)

- Page is structured as:
  1) WIP banner
  2) Single "RESUMEN" panel (no duplicates)
  3) "EJEMPLOS TRABAJOS IA 2025" cases (Jumex / Subway)
  4) "VIBE-CODING: WEBAPPS" with the 3 mini tools
  5) Historical carousel "EXPERIMENTOS IA (2022–2024)"

## Mini tools

- Tools are static HTML apps hosted under `public/*` and exposed by rewrite routes:
  - `/canva_productora`
  - `/unyellower`
  - `/comparador_videos`
