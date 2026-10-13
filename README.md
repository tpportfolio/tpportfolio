# Portfolio (Next.js) — Tomás Peró

Deploy: `tomaspero.vercel.app` (Vercel, from the `main` branch of this repository).

## Current version: r16 (2026-10-13) — Intro, timeline planets, 2026 works

What changed in this version:

- **Intro.** About 10% faster; larger controls on one line; SKIP works from the first frame.
- **Timeline.** Planets show dates and company only; new tags for Airtm and Stone Movistar.
- **AI experiments.** 2026 works reordered and renamed (Messi Ad BURGER KING (WIP), Product Demo SUBWAY, Fashion Campaign AY NOT DEAD, UGC content), all open, with new thumbnails.

Previous version: r15 (2026-10-12) — Design lab, timeline links, sidebar order.

Full detail in [`CHANGELOG.md`](CHANGELOG.md).

## Versions and branches

Each version is published as its own branch and tag; earlier versions are never overwritten.

| Branch / tag | What it is |
|---|---|
| `main` | What Vercel deploys to production |
| `release/r16-intro-timeline`, tag `r16` | This version |
| `release/r15-design-lab`, tag `r15` | Design lab, timeline links |
| `release/r14-nav-timeline-ai`, tag `r14` | Navigation, timeline callouts, AI section |
| `release/r13-brand-positioning`, tag `r13` | Brand positioning |
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
- Contact: `/contact`
- Magaiba: `/magaiba` (not in the sidebar)
- Agent mode: `/agents.md`, `/agents.txt`
- Assistant API: `POST /api/chat`
- Design lab (draft, not indexed): `/drafts/design-lab`

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
