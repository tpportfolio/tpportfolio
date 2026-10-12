# Portfolio (Next.js) — Tomás Peró

Deploy: `tomaspero.vercel.app` (Vercel, from the `main` branch of this repository).

## Current version: r14 (2026-10-12) — Navigation, timeline callouts, AI section

What changed in this version:

- **Navigation.** Sidebar order is Home, Work, Timeline, AI Experiments, About, Contact. MAGAIBA left the sidebar and is reached from the timeline, the AI section and the assistant.
- **Contact.** `/contact` is now a landing with LinkedIn, email, location and a message form.
- **About.** Shorter overview with brands, skills and key terms in bold; Skills at full width.
- **Timeline.** Each block is a planet with its videos orbiting it; the detail hangs from the centre line as a boxless callout. $MAGAIBA and DrGea have their own rows.
- **AI experiments.** Opens with REEL 2025/2026; new block order; the Music Lab is a continuous cover flow; the8bureau updated to its v2 tools.
- **Project rules.** `CLAUDE.md`: every change in both languages and reflected in `/agents.md`.

Previous version, r13 (brand positioning): the site presents Tomás as a Brand Strategist & Brand Marketing Leader; work pages rebuilt from the CVs; the assistant stays on Groq's free plan with a fallback chain.

Full detail in [`CHANGELOG.md`](CHANGELOG.md).

## Versions and branches

Each version is published as its own branch and tag; earlier versions are never overwritten.

| Branch / tag | What it is |
|---|---|
| `main` | What Vercel deploys to production |
| `release/r14-nav-timeline-ai`, tag `r14` | This version |
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
