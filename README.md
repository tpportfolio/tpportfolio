# Portfolio (Next.js) — Tomás Peró

Deploy: `tomaspero.vercel.app` (Vercel, from the `main` branch of this repository).

## Current version: r15 (2026-10-12) — Design lab, timeline links, sidebar order

What changed in this version:

- **Design lab.** New draft page `/drafts/design-lab`: a model page in Spanish and English (sidebar, Independent Consultant work page with its reel and fact sheet, home project cards, a CLIPPY.EXE sample) with nine interchangeable styles. Style 0 reproduces the current site as a reference.
- **The lab is additive.** It changes no existing page. Each proposal answers the same five points: container shape, window buttons, reel and trailer containers, page and block widths, and CLIPPY.EXE containers.
- **Own proposals.** 1 SOFT SHELL, 2 GLASS HUD and 3 RETRO OS.
- **Proposals built with a design skill.** 4 PHOSPHOR POSTER (`frontend-design`), 5 ZINC (`taste-skill`), 6 AUDIT FIX (`redesign-skill`), 7 PAPER TERMINAL (`minimalist-skill`, candidate for light mode) and 8 DOT MATRIX (`nothing-design`).
- **Controls.** Tabs 0-8, keys 0-8 and the left and right arrows, ES/EN, a Clippy button and a Notes panel. The chosen proposal stays in the URL hash (`#p3`).
- **Where it lives.** `app/drafts/design-lab/page.tsx` and the private folder `app/drafts/design-lab/_lab/`. To remove it, delete the folder `app/drafts/design-lab`.
- **Timeline.** Every planet links to its section or subsection and each block ends with a VER / VIEW action; brand names in bold under each description.
- **Navigation.** Sidebar order is Home, Timeline, Work, AI Experiments, About, Contact. Links with a hash now land on their target.
- **Visit counter.** Production keeps adding visits even if `VERCEL_ENV` is not set.

Previous versions. r14: navigation, contact landing, boxless timeline callouts, and an AI section with the reel and the cover-flow Music Lab. r13 (brand positioning): the site presents Tomás as a Brand Strategist & Brand Marketing Leader; work pages rebuilt from the CVs; the assistant stays on Groq's free plan with a fallback chain.

Full detail in [`CHANGELOG.md`](CHANGELOG.md).

## Versions and branches

Each version is published as its own branch and tag; earlier versions are never overwritten.

| Branch / tag | What it is |
|---|---|
| `main` | What Vercel deploys to production |
| `release/r15-design-lab`, tag `r15` | This version |
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
