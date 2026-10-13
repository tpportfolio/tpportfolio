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
  1) Intro and content filter (all / image / video / audio)
  2) REEL 2025/2026 (YouTube reel)
  3) 2026 works and experiments: Product Demo, Fashion Campaign (open), UGC content, Ad 30-40 Messi (coming soon)
  4) AUDIO IA - MUSIC LAB, with a RADIO MAGAIBA shortcut to /magaiba right below it
  5) 2025 works and experiments (two pitch cases)
  6) the8bureau: six tools (Autonomous Ad Agency is deprecated) plus the tools added in v2
  7) VIBE-CODING: WEBAPPS with the 3 mini tools
  8) Historical carousel "EXPERIMENTOS IA (2022-2024)"

## Navigation

- Sidebar order: Home, Timeline, Work, AI Experiments, About, Contact.
- /contact is a landing with links (LinkedIn, email, location) and a message form that opens the visitor's mail app.
- /magaiba is not in the sidebar: it is reached from the timeline, from the AI section and from the assistant.

## Mini tools

- Tools are static HTML apps hosted under `public/*` and exposed by rewrite routes:
  - `/canva_productora`
  - `/unyellower`
  - `/comparador_videos`

## Drafts

- `/drafts/*` pages are working pages. They are not indexable and are kept out of the sidebar and `/agents.md`.
- `/drafts/design-lab` shows a model page with nine interchangeable styles: 0 is the current site, 1-8 are design proposals.
- No proposal is applied to the site yet.
- Navigate with tabs 0-8, the left and right arrows, or the URL hash (for example `#p3`).
