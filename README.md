# Portfolio (Next.js) — Tomás Peró

Deploy: `tomaspero.vercel.app` (Vercel, from the `main` branch of this repository).

## Current version: r51 (2026-10-23) — "GEN_MARKETER.exe" only in the sidebar

What changed in this version:

- **Home.** No "GEN_MARKETER.exe" under the name; it stays in the sidebar.

Previous version: r50 (2026-10-23) — A more compact project list on the home.

Full detail in [`CHANGELOG.md`](CHANGELOG.md).

## Versions and branches

Each version is published as its own branch and tag; earlier versions are never overwritten.

| Branch / tag | What it is |
|---|---|
| `main` | What Vercel deploys to production |
| `release/r51-no-role-home`, tag `r51` | This version |
| `release/r50-compact-home`, tag `r50` | A more compact project list |
| `release/r49-spacing-cards`, tag `r49` | Tighter gap, shorter project windows |
| `release/r48-cards-weekly`, tag `r48` | No "[ACCESS DATA]", weekly regeneration |
| `release/r47-cards-tweak`, tag `r47` | Home project windows: shorter, smaller text |
| `release/r46-years-auto`, tag `r46` | Years of experience from August 2007 |
| `release/r45-home-ajustes`, tag `r45` | Home adjustments, /highlights boot |
| `release/r44-home-calma`, tag `r44` | A calmer home |
| `release/r43-webapps-v2-fixes`, tag `r43` | the8bureau webapps on v2, QA fixes |
| `release/r42-qa`, tag `r42` | QA tooling (`qa/`) |
| `release/r41-paradise-animatics`, tag `r41` | Paradise.la pitch animatics |
| `release/r40-full-width-text`, tag `r40` | Text uses the full width of each window |
| `release/r39-webapps-contact`, tag `r39` | PDF Toolkit, Image Compare, Maps code link, contact block |
| `release/r38-cases-ai-tweaks`, tag `r38` | Results first on cases, AI experiments tweaks |
| `release/r37-home-geist-strip`, tag `r37` | Geist Mono, In short band, FAQ to agents.md |
| `release/r36-agents-a11y`, tag `r36` | Meta indexer, alt text |
| `release/r33-crawler-access`, tag `r33` | Audit tools read the site; FAQ on the home (in production) |
| `release/r32-highlights`, tag `r32` | /v2 becomes /highlights (in production) |
| `release/r31-home-title`, tag `r31` | Home title (in production) |
| `release/r30-ai-visibility`, tag `r30` | Visibility for search engines and AI |
| `release/r29-v2-work-first`, tag `r29` | Work-first version (now /highlights) |
| `release/r28-reel-link`, tag `r28` | New reel link (in production) |
| `release/r27-acento-route`, tag `r27` | "Acento" at /acento (in production) |
| `release/r26-acento-alt`, tag `r26` | "Acento" design as a draft |
| `release/r25-intro-pace-2`, tag `r25` | Intro: tighter pace, lower volume ceiling |
| `release/r24-intro-pace`, tag `r24` | Intro: faster second half, quieter start |
| `release/r23-system-mode`, tag `r23` | Default mode follows the system |
| `release/r22-light-mode`, tag `r22` | LIGHT mode in the amber range |
| `release/r21-copy-tweaks`, tag `r21` | Copy tweaks (in production) |
| `release/r20-window-everywhere`, tag `r20` | Window on home cards and AI panels |
| `release/r19-video-links`, tag `r19` | Window on work pages, About, Contact, MAGAIBA |
| `release/r18-video-containers`, tag `r18` | One video window |
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
- Alternative home "Acento" (not in the sidebar, not indexed): `/acento` (`/acento/es`, `/acento/en`); its agent mode: `/acento/agents.md`, `/acento/agents.txt`

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
