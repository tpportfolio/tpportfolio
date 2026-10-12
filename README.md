# Portfolio (Next.js) — Tomás Peró

Deploy: `tomaspero.vercel.app` (Vercel, from the `main` branch of this repository).

## Current version: r13 (2026-10-12) — Brand positioning

What changed in this version:

- **Positioning.** The site now presents Tomás as a Brand Strategist & Brand Marketing Leader (brand strategy, cultural marketing, creative technology). About, home, work pages, timeline, `/agents.md` and the assistant's knowledge base tell the same story in Spanish and English.
- **Work pages.** Disney, Air New Zealand, Independent consultant and Agency years were rebuilt from the CVs, with exact titles, dates and results.
- **Timeline.** Videos orbit each block and open on click; new `$MAGAIBA` block facing DrGea; single column on mobile.
- **AI experiments.** New page with the Music Lab; Spanish accents and ES/EN parity fixed.
- **CLIPPY.EXE.** Stays on Groq's free plan with a three-model fallback chain, input caps, a per-visitor limit and an answer cache; character animation.
- **Text quality.** Broken accents (`Ã³`, `Â¿`) fixed, bilingual error pages and labels.

Full detail in [`CHANGELOG.md`](CHANGELOG.md).

## Versions and branches

Each version is published as its own branch and tag; earlier versions are never overwritten.

| Branch / tag | What it is |
|---|---|
| `main` | What Vercel deploys to production |
| `release/r13-brand-positioning`, tag `r13` | This version |
| tag `r12-production-2026-10-07` | Production before r13 |
| `backup/vercel-production-2026-10-06` | Production backup taken on 2026-10-06 |

## Stack

- Next.js 15 (App Router)
- React / ReactDOM 18.3.1
- TypeScript, Tailwind CSS

## Local setup

1. `npm install`
2. `npm run dev`

Checks: `npm run typecheck` and `npm run build`.

The assistant needs `GROQ_API_KEY` in `.env.local`. Without it the site works and the assistant answers that it is offline.

## Key routes

- Home: `/`
- About: `/about`
- Timeline: `/timeline`
- Work: `/work/ai-experiments`, `/work/independent-consultant`, `/work/air-new-zealand`, `/work/walt-disney-company`, `/work/agency-experience`
- Magaiba: `/magaiba`
- Agent mode: `/agents.md`, `/agents.txt`
- Assistant API: `POST /api/chat`

## Where the content lives

- `lib/site-content.ts`: identity, home frames, timeline entries (feeds `/agents.md` and the assistant).
- `lib/work-videos.ts`: every video shown in the work pages and the timeline.
- `lib/agents.ts`: builds `/agents.md` and `/agents.txt`.
- `content/assistant/*.md`: the assistant's knowledge base.
- `translations/index.ts`: shared UI strings.

## Intro (first visit)

- Static page: `/intro.html` (served from `public/intro.html`).
- `middleware.ts` redirects first-time visits to the intro using a cookie flag (`tp_intro`).
- The intro returns to the original route via hash.

## Mini tools (static)

- `/canva_productora` → `public/canva_productora/index.html`
- `/unyellower` → `public/unyellower/index.html`
- `/comparador_videos` → `public/comparador_videos/index.html`

## Docs

- Business logic: `BUSINESS_LOGIC.md`
- Change log: `CHANGELOG.md`
