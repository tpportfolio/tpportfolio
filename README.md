# Portfolio (Next.js) — Tomás Peró

Deploy: `tomaspero.vercel.app` (Vercel, from the `main` branch of this repository).

## Current version: r18 (2026-10-13) — One video window for the whole site

What changed in this version:

- **One video window.** Every video on the site now sits in the same window, taken from design lab proposal 6.2 AUDIT FIX v2: title bar with the three lights, the video centred on a black frame, title and description, arrows with a segment bar, thumbnail cards and a status foot.
- **Where.** The showcases in `/work/independent-consultant`, `/work/air-new-zealand` and `/work/agency-experience`; the reel, 2026, 2025 and 2022-2024 blocks of `/work/ai-experiments`; the video dialog of `/timeline`; and the two videos of `/magaiba`.
- **Behaviour.** A video loads when the visitor presses play. Arrows, thumbnails and the left and right keys change video. LIGHT mode has its own palette.
- **Content.** No text, video or order changes; `/agents.md` is unchanged.

Previous version: r17 (2026-10-13) — Design lab, round 2.

Full detail in [`CHANGELOG.md`](CHANGELOG.md).

## Versions and branches

Each version is published as its own branch and tag; earlier versions are never overwritten.

| Branch / tag | What it is |
|---|---|
| `main` | What Vercel deploys to production |
| `release/r18-video-containers`, tag `r18` | This version |
| `release/r17-design-lab-v2`, tag `r17` | Design lab, round 2 |
| `release/r16-intro-timeline`, tag `r16` | Intro, timeline planets, 2026 works |
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
