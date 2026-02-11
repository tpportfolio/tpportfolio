# Portfolio (Next.js) — Tomás Peró

Deploy: `tomaspero.vercel.app`

Stack
- Next.js (App Router)
- React / ReactDOM: **18.3.1**
- TypeScript

Local setup
1) `npm install`
2) `npm run dev`

Key routes
- Home: `/`
- AI: `/work/ai-experiments`
- Consultant: `/work/independent-consultant`

Intro (first visit)
- Static page: `/intro.html` (served from `public/intro.html`)
- `middleware.ts` redirects first-time visits to the intro using a cookie flag (`tp_intro`).
- The intro returns to the original route via hash.

Mini tools (static)
- `/canva_productora` → `public/canva_productora/index.html`
- `/unyellower` → `public/unyellower/index.html`
- `/comparador_videos` → `public/comparador_videos/index.html`

Docs
- Business logic: `BUSINESS_LOGIC.md`
- Change log: `CHANGELOG.md`
