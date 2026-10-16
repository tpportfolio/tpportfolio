# Changelog

## r33 (2026-10-15) — Audit tools can read the site; summary and FAQ on the home
Branch `release/r33-crawler-access`. Builds on r32.

- The intro screen is now shown only to real browsers (they send `Sec-Fetch-Dest: document`). Scripts and audit tools such as curl, node-fetch or the8bureau got the intro (a page with no text) before, which is why the re-run analysis still read "Portfolio Boot". Known crawlers still get the real page by name.
- The pattern that recognises crawlers no longer matches the Claude desktop app's browser (it contained "Claude"); it now lists ClaudeBot, Claude-User and Claude-SearchBot.
- Agents that ask the home for `Accept: text/markdown` get the bilingual summary (`/agents.md`).
- Home: a short summary (TL;DR) under the title, and a FAQ at the end with six questions and short answers (Spanish and English), with FAQPage structured data and an "updated" date. Facts only from the site.
- `/agents.md`: unchanged. No new content beyond what the site already said.

## r32 (2026-10-15) — /v2 becomes /highlights
Branch `release/r32-highlights`. Builds on r31. No content changes.

- The work-first version now lives at `/highlights` (it was `/v2`). `/v2` redirects to `/highlights` permanently.
- Canonical URL, intro exclusion and the note in `/agents.md` (Spanish and English) follow the new name.
- Still not indexed, still outside the sitemap.

## r31 (2026-10-15) — Home title
Branch `release/r31-home-title`. Builds on r30.

- The home kept its old title ("Tomás Peró | GEN_MARKETER.exe") because the page set its own. It now reads "Tomás Peró | Brand Strategist y líder de marketing", with its canonical URL.

## r30 (2026-10-15) — Visibility for search engines and AI
Branch `release/r30-ai-visibility`. Builds on r29. No visible change for visitors.

- Crawlers get the real pages: search engines, AI crawlers and link previews (GPTBot, ClaudeBot, PerplexityBot, Googlebot, LinkedIn, WhatsApp...) are no longer sent to the intro. Until now every bot only saw `/intro.html` ("Portfolio Boot", no text), which is what external audits measured. People still get the intro.
- `/robots.txt`: open to everyone, with explicit rules for AI crawlers; only `/api/`, `/drafts/` and `/home-variant` are closed. Points to the sitemap.
- `/sitemap.xml`: the ten public pages plus `/agents.md` and `/llms.txt`.
- `/llms.txt`: the same bilingual summary as `/agents.md`.
- Metadata: a title (30–60 characters), description (120–160), canonical URL, Open Graph and large Twitter card on every public page; shared preview image (`/opengraph-image`) and a favicon (`/icon.svg`).
- Structured data (JSON-LD): Person and WebSite on every page, ProfilePage on About. Only facts already on the site; LinkedIn as the external profile.
- Security headers: nosniff, referrer policy, frame options, permissions policy and HSTS.
- `/v2` keeps noindex, with a Spanish title and description and its own canonical. `/acento` is unchanged (it keeps its own metadata and noindex).
- `/agents.md`: notes about `/llms.txt` and crawler access (Spanish and English).

## r29 (2026-10-15) — Work-first version at /v2
Branch `release/r29-v2-work-first`. Builds on r28. The current home (`/`) and every other page are unchanged.

- New route `/v2`: an alternative home where the work comes first. Eight cases (Air New Zealand, Paradise.la, The Walt Disney Company, Stone Movistar, Airtm, AI experiments, $MAGAIBA, agencies), each opening with its result, then a video and the text as context, and a link to the full case.
- Air New Zealand opens with 3x visitors from Argentina in 2 years (+225% in the first year) and "distance is a barrier" dropping from 50% to 24%.
- Every case shows its dates and duration in the title bar; AI experiments reads "late 2022 – ongoing".
- The career story stays at the end as a short thread, with links to the timeline, About and Contact.
- Boot as texture, not as a gate: `/v2` skips the intro page; a short boot screen (same lines and look) shows over the page for about 1.5 s, lets clicks and scroll through, and goes away with any key, scroll or touch. Once per browser session; off with reduced motion.
- `/v2` is not indexed.
- `/agents.md` and the assistant's knowledge base: new Air New Zealand results (Spanish and English), and a note about `/v2`.
- Windows: on narrow screens, long title-bar text (dates, duration) moves under the title.

## r28 (2026-10-14) — New reel link
Branch `release/r28-reel-link`. Builds on r27 (current `main`).

- The REEL 2025/2026 video is now https://youtu.be/bC8TGT4mD3Q (it was https://youtu.be/5T6cRU6AdNs). Changed in the AI experiments page, in `/agents.md` and `/agents.txt` (Spanish and English) and in the reel of the Acento version.
- No other change.

## r27 (2026-10-14) — "Acento" at /acento
Branch `release/r27-acento-route`. Builds on r26.

- The "Acento" design moves from `/drafts/acento` to `/acento`, as an alternative home of the portfolio. `/acento` opens the Spanish version (`/acento/es`); the English one is at `/acento/en`. Case pages at `/acento/<lang>/work/<slug>`, profile at `/acento/<lang>/about`.
- The main home (`/`) and every other page are unchanged. `/acento` is not in the sidebar and stays out of search results (`noindex`), so `/` remains the canonical home.
- `/drafts/acento` and everything under it redirect permanently to the same page under `/acento` (`next.config.mjs`).
- Footer of `/acento`: "Ir a la home principal" / "Go to the main home", and the note now says it is an alternative version of the portfolio (it no longer says draft).
- Code: the folder is now `app/acento`; `components/site-chrome.tsx` and `middleware.ts` point to `/acento` (no sidebar, menu button or assistant there, and no first-visit intro, since it has its own loader).
- Agent mode of this version: new `/acento/agents.md` and `/acento/agents.txt` (bilingual), built only from the content of `/acento` (`app/acento/_content/agents.ts`): routes, idea, pillars, figures, the five work stages, profile and contact. Linked from the footer of `/acento` ("Modo agente" / "Agent mode").
- Nothing of the current version changes: the main site's `/agents.md`, `/agents.txt`, `lib/site-content.ts`, `lib/agents.ts` and the assistant's knowledge base are as they were.

## r26 (2026-10-14) — "Acento", an alternative design (draft)
Branch `release/r26-acento-alt`. Builds on r25. Adds a draft; no existing page, text or video changes.

The draft
- New route `/drafts/acento`, with its own pages in Spanish (`/drafts/acento/es`) and English (`/drafts/acento/en`): home, five case pages (`/work/<slug>`), profile (`/about`) and a 404.
- Built with the `awwwards` skill. Not indexed, not in the sidebar and not in `/agents.md`, like the other `/drafts` pages.
- Same facts as the main site, in both languages. Videos come from `lib/work-videos.ts`. No invented projects, clients or figures.

The design
- Idea: Tomás Peró carries the accent on the last syllable of both words, and a brand is a decision about where the accent goes.
- One typeface, Archivo, with two voices: light and narrow at rest, heavy and wide under stress. The name is set by syllable: "To" and "Pe" at rest, "más" and "ró" stressed.
- The acute accent is drawn as a red mark. It lands over the vowels of the name, in front of the stressed line of a list, in front of the current page in the navigation, and crosses the screen as a red stroke between pages.
- In each group only one item is stressed: the name, the three pillars, the work index, the figures, the video list.
- Home: the name across the screen (the visitor can move the stress to the wrong syllable and it goes back), a statement, three pillars on a fixed stage where the stress moves with the scroll and the proof changes with it, the work index, four figures, a profile teaser and the contact footer.
- Palette: paper, ballpoint blue ink and the red of a correcting pen. Stills are printed in the ink and turn to colour when their row takes the stress.
- Desktop: a short loader where the accents land on the name. Phones: no loader, the page is there at first paint.
- Keyboard focus, reduced motion and no-JavaScript paths keep all content visible.

How it is built
- `app/drafts/acento/`: `layout.tsx`, `acento.css` (every rule scoped to `.aw`), `DESIGN.md`, the pages under `[lang]/` and the private folders `_content` (all copy), `_components`, `_engine` (page lifecycle, smooth scroll, reveals, loader, transition) and `_motion` (the stress driver and the global motion).
- New dependencies: `gsap` and `lenis`.
- New `components/site-chrome.tsx`: the root layout uses it to leave out the sidebar, the menu button and the assistant on `/drafts/acento`. Every other route renders as before.
- `middleware.ts`: `/drafts/acento` skips the first-visit intro (it has its own loader), and `/_vercel` paths are no longer redirected to the intro.
- To remove the draft: delete `app/drafts/acento`, and optionally the two dependencies.

Agent mode
- No content of the site changed, so `/agents.md`, `/agents.txt` and the assistant's knowledge base stay as they were.


## r25 (2026-10-14) — Intro: tighter pace, lower volume ceiling
Branch `release/r25-intro-pace-2`. Builds on r24. No text changes.

- First part (up to the rabbit) 5% faster.
- From the terminal fade-out on, 25% faster than the original pace (r24 was 20%).
- Shorter wait before OPENING PORTFOLIO: the ACCESS GRANTED zoom lasts 2 s and the flash comes 1.5 s into it.
- The intro now lasts 9.9 s in total (r24: 11.3 s; before: 12.4 s).
- Volume: the slider's 100% is what used to be 50%, so it can never get loud. It still starts at 10% of the slider.
- The music itself is unchanged.

## r24 (2026-10-14) — Intro: faster second half, quieter start
Branch `release/r24-intro-pace`. Builds on r23. No text changes.

- From the moment the terminal (and the rabbit) fades out until the end, the intro runs 20% faster: 11.3 s in total instead of 12.4 s. The first part is unchanged.
- The volume starts at 10% (it was 20%). The slider moves in steps of 1% instead of 5%, and the level glides to the new value instead of jumping.

## r23 (2026-10-14) — The default mode follows the system
Branch `release/r23-system-mode`. Builds on r22. No text changes.

- First visit: the site opens in LIGHT or in terminal (dark) mode according to the visitor's system or browser setting. It used to open always in terminal mode.
- The LIGHT / DARK switch still wins: once used, that choice is remembered on that browser. Until then the site also follows a change of the system setting while it is open.
- The mode is set before the first paint, so there is no flash of the other mode.
- Earlier visitors start again from their system setting once (the old stored value could not tell a choice from a plain visit).

## r22 (2026-10-14) — LIGHT mode in the amber range
Branch `release/r22-light-mode`. Builds on r21. Only LIGHT mode changes; terminal mode is untouched. No text changes.

- Timeline: the falling characters are amber on the cream page (they were green on a grey veil).
- Window lights are amber tones instead of red, yellow and green (or cyan).
- Home: the glow of the AI card is amber instead of cyan, and the card text uses the amber-brown ink instead of dark green.
- Music Lab: track title and tag are readable again on the dark stage.
- The mode switch glow is amber.
- `/agents.md` and the assistant's knowledge base are unchanged.

## r21 (2026-10-13) — Copy tweaks
Branch `release/r21-copy-tweaks`. Builds on r20.

- AI experiments: new intro paragraph, in Spanish and English, with the years and the names Morfeo Academy and Paradise.la in bold. The LLM list now starts with Claude.
- About: the Spanish title is "ACERCA DE MI" (no accent), also in the navigation label used by `/agents.md`.
- Home: the intro line says "Brand Strategist y líder de marketing" / "Brand Strategist and Marketing Leader" and "más de 18 años" / "18+ years" (it used to compute the number of years).
- The assistant's knowledge base keeps the same facts, so it is unchanged.

## r20 (2026-10-13) — The window on the home cards and the AI panels
Branch `release/r20-window-everywhere`. Builds on r19. Step 2 of 2. No text changes.

- Home: the five project cards use the site window. The AI card keeps its cyan accent and glow; cards lift on hover.
- AI experiments: Music Lab (blue), the8bureau (cyan) and the webapps panel use the same window, each with its accent colour. In LIGHT mode all windows share the amber palette, as before.
- The window has accent tones (`tone`: default, cyan, blue, amber) and a card variant. `RetroPanel` and `RetroBrowser` keep their props and now draw the window.
- Fix: on screens around 1280 px wide, the home and About pages scrolled sideways (the main column could not shrink beside the sidebar).
- Fix: on phones, the AI experiments page title no longer causes a sideways scroll.
- Not changed: the timeline planets and the `/drafts` pages.
- `/agents.md` and the assistant's knowledge base are unchanged.

## r19 (2026-10-13) — The same window for work pages, About, Contact and MAGAIBA
Branch `release/r19-video-links`. Builds on r18. Step 1 of 2 of taking the r18 window to the whole site. No text changes.

- Text panels now use the same window as the videos (title bar with the three lights, rounded corners, one outer glow, status foot) in `/work/walt-disney-company`, `/work/air-new-zealand`, `/work/independent-consultant`, `/work/agency-experience`, `/about`, `/contact` and `/magaiba`.
- On the work pages the text windows are as wide as the video window; running text keeps a readable line length (78 characters).
- Links inside the windows of `/work/ai-experiments` (Watch on YouTube, Open popup, Video: YouTube) are cyan instead of magenta.
- `components/video-window.tsx` also exports the frame as `WindowFrame`, with an optional `id` for anchors.
- Not in this step: the home project cards (`RetroBrowser`), the AI experiments panels that still use `RetroPanel` (Music Lab, the8bureau, webapps) and the timeline.
- `/agents.md` and the assistant's knowledge base are unchanged.

## r18 (2026-10-13) — One video window for the whole site
Branch `release/r18-video-containers`. Builds on r17. Brings the video container of design lab proposal 6.2 AUDIT FIX v2 to the real pages. No text, video or order changes.

The window
- 12 px corners, green border, one soft outer glow, dark title bar with the three window lights, the title in neon green and the position ("4/4") at the right.
- The video sits centred on a black frame, 16:9, at most 60rem wide. It shows a still with a play button; the video loads when the visitor presses it.
- Under the screen: title and description at the left; previous arrow, one segment per video, "04 / 04" and next arrow at the right. The arrows no longer float over the video.
- Thumbnails are cards in a row (four per row, two on phones) with number, picture, title and source. The current one is marked in cyan and with `aria-current`.
- A thin status foot: "OK" and the number of videos.
- Every control has hover, pressed and keyboard-focus states. With focus inside the window, the left and right arrow keys change video.
- LIGHT mode has its own amber palette for the window.

Where it is used
- `/work/independent-consultant`, `/work/air-new-zealand`, `/work/agency-experience`: the video showcase.
- `/work/ai-experiments`: REEL 2025/2026, 2026 works (frame and arrows; the popup of a video item is the same window), 2025 works (frame) and the 2022-2024 archive.
- `/timeline`: the video dialog of each planet, with arrows, segments and a close button in the title bar.
- `/magaiba`: the recap video and the RADIO MAGAIBA playlist.

How it is built
- New `components/video-window.tsx`: `VideoWindowFrame` (the window), `VideoScreen` (the screen) and `VideoWindow` (both plus navigation and thumbnails). `VideoCarousel` is now a thin wrapper over it.
- Styles in the VIDEO WINDOW block at the end of `app/globals.css`, as `.vw-*` classes with colour tokens. The window answers to its own width (container queries), so it also fits half columns and dialogs.
- `.terminal`, `RetroPanel` and `RetroBrowser` are untouched for the rest of the content.
- Small labels have a minimum of 11 px (the lab drew them at about 9 px).

Agent mode
- No content changed, so `/agents.md`, `/agents.txt` and the assistant's knowledge base stay as they were.

## r17 (2026-10-13) — Design lab, round 2
Branch `release/r17-design-lab-v2`. Builds on r16. Only the `/drafts/design-lab` draft changes; no existing page is touched.

Second-round variants
- 3.2 RETRO OS v2: the RETRO OS windows in the portfolio's own palette (black, neon green, cyan, magenta, red counters, scanlines and glow); dark title bars with the minimise/maximise/close buttons in the colours of the original window lights; pixel-font labels replaced by a monospaced face; CLIPPY.EXE as a dark system window that keeps its tail.
- 4.2 PHOSPHOR POSTER v2: the same poster, lighter: smaller and lighter type, more space between and inside boxes, thinner borders, fainter background numerals, almost no tilt on the reel.
- 6.2 AUDIT FIX v2: keeps every structural fix of AUDIT FIX and brings back the portfolio's identity: neon green, cyan, magenta on hover, the three coloured window lights, a single outer glow and the sweeping scanline; the reel is large but bounded; CLIPPY.EXE reads as one more window.
- 8.2 DOT MATRIX v2: the finished version: the top text tape runs as a smooth continuous loop (it used to move in steps and sit empty), the reel list gets its thumbnails back in greyscale, the fact sheet puts each label above its value, labels go up to 12 px, and more figures use the dot-matrix face.

Lab
- The second-round tabs 3.2, 4.2, 6.2 and 8.2 appear after 0-8, as separate tabs.
- The left and right arrows go through all thirteen styles; keys 0-8 still go to the first round.
- Changing the URL hash (for example `#p6b`) with the lab open now switches the proposal.
- The ticker text is duplicated in the HTML so it can loop continuously.

How it is built
- New skins: `app/drafts/design-lab/_lab/skins/p3b.css`, `p4b.css`, `p6b.css` and `p8b.css`.
- Modified: `design-lab.tsx`, `content.ts` and `lab.css` in the same folder.
- Each new skin only contains rules that start with `.dl-stage[data-p="p3b"]` (and the same for p4b, p6b and p8b), so nothing outside the lab is affected.

## r16 (2026-10-13) — Intro, timeline planets, 2026 works
Branch `release/r16-intro-timeline`. Builds on r15.

Intro
- About 10% faster (13.85s to 12.40s) by trimming holds and fades; texts, objects and typing speed unchanged.
- SKIP, PLAY/PAUSE, MUTE and the volume slider are 10% larger and always on one line, down to 320px.
- SKIP and the automatic redirect now live in their own script, so they work from the first frame even if audio or the canvas fail. The redirect only accepts same-site paths.

Timeline
- Planets show only dates and company; the role stays in the text beside them.
- Airtm: the brand line is now HIGHLIGHTS (Airtalks, Axie Infinity, B2B Partnerships).
- Stone Movistar: full list of founders.

AI experiments — 2026 works
- New order and names: Messi Ad BURGER KING (WIP), Product Demo SUBWAY, Fashion Campaign AY NOT DEAD, UGC content.
- No locks on any item. The Messi ad plays https://youtu.be/pAdrOyzmmZs.
- New thumbnails for the Messi ad, the Subway demo and the AY NOT DEAD campaign.

Agent mode
- `/agents.md`, `/agents.txt` and the assistant's knowledge base reflect the new 2026 items and timeline tags.

## r15 (2026-10-12) — Design lab, timeline links, sidebar order
Branch `release/r15-design-lab`. Builds on r14. The design lab is additive and changes no existing page; the changes to the timeline, the sidebar and the visit counter are listed at the end of this entry.

Design lab
- New draft route `/drafts/design-lab`. Not indexed, not in the sidebar and not in `/agents.md`, like the other `/drafts` pages.
- A model page: sidebar, the Independent Consultant work page (reel, fact sheet, overview, engagements), a row of figures taken from the Disney page, the home project cards and a sample of the CLIPPY.EXE chat.
- Real content in Spanish and English.
- Nine interchangeable styles on the same HTML. 0 reproduces the current site as a reference; 1 to 8 are design proposals.
- Each proposal answers the same five points: container shape, window buttons in front of the titles, reel and trailer containers and size, PROJECT_OVERVIEW and other block widths, and CLIPPY.EXE containers.
- Controls: tabs 0-8 (also keys 0-8 and the left and right arrows), ES/EN, a Clippy button and a Notes panel with the description of each proposal. The chosen proposal stays in the URL hash (`#p3`).

Own proposals
- 1 SOFT SHELL: same terminal, rounded 14 px boxes, one box system, a single status LED instead of the three window lights, larger reel with a playlist, 1180 px page with a sticky fact sheet.
- 2 GLASS HUD: translucent panels over a grid, section labels riding the top border, reel as a full-width screening room, 1280 px page.
- 3 RETRO OS: real OS windows with filled title bars and minimise/maximise/close buttons, hard offset shadows, pixel type, reel as a media player, CLIPPY.EXE in its speech balloon.

Proposals built with a design skill
- 4 PHOSPHOR POSTER, with the `frontend-design` skill: poster typography, giant outlined section numbers, diagonally cut corners, amber second colour.
- 5 ZINC, with the `taste-skill` skill: zinc greys with a single emerald accent and no neon, boxes only where needed, asymmetric layout, bento figures.
- 6 AUDIT FIX, with the `redesign-skill` skill: the current design with each audit finding fixed (real typeface, tinted black, one accent, softer shadows, one 1240 px container, hover/active/focus states).
- 7 PAPER TERMINAL, with the `minimalist-skill` skill: warm paper, serif headings, 1 px borders, grey window circles; a candidate for light mode.
- 8 DOT MATRIX, with the `nothing-design` skill: OLED black monochrome, dot-matrix headline, instrument-style labels, a single red signal dot.

How it is built
- `app/drafts/design-lab/page.tsx` and the private folder `app/drafts/design-lab/_lab/` (`design-lab.tsx`, `content.ts`, `fonts.ts`, `lab.css` and `skins/p1.css` to `skins/p8.css`).
- Each skin only contains rules that start with `.dl-stage[data-p="pN"]`, so nothing outside the lab is affected.
- The proposal typefaces load with `next/font/google`, only on that route.
- To remove it, delete the folder `app/drafts/design-lab`.

Timeline, navigation and visit counter (commits `73f5738`, `c38dd0b`)
- Timeline: every planet (year, company, role) links to its section or subsection, and each block ends with a VER / VIEW action to the same place. New anchors in the consultant page (`paradise-la`, `drgea`, `sinerlogic`, `airtm`, `stone-movistar`, `go-broadway`) and the agency page (`jwt`, `altheim`).
- Timeline: brand names in bold under each description, grouped by relationship (sponsorships, partners, media, franchises, platforms, agency clients...). Data in `lib/timeline-extras.ts`, also used by `/agents.md`.
- Timeline: the three Disney roles each stay on one line.
- Links with a hash now land on their target; before, every navigation jumped to the top of the page.
- Sidebar order: Home, Timeline, Work, AI Experiments, About, Contact.
- Visit counter: the count lives in the KV store and is not affected by deploys (production and the store both read 423 on 2026-10-12). Production keeps adding visits even if `VERCEL_ENV` is not set.

## r14 (2026-10-12) — Navigation, timeline callouts, AI section
Branch `release/r14-nav-timeline-ai`. Builds on r13.

Project rules
- New `CLAUDE.md` with the owner's rules: every change in Spanish and English, every change reflected in `/agents.md`, versions never overwritten.

Navigation
- Sidebar order: Home, Work, Timeline, AI Experiments, About, Contact. MAGAIBA leaves the sidebar; `/magaiba` is reached from the timeline, from a RADIO MAGAIBA shortcut below the Music Lab, and from the assistant (new suggestion chip and a dedicated knowledge document).
- Contact is now a landing (`/contact`) with the links card that used to live in About (LinkedIn, email, location, profile note) and the message form. The sidebar entry links to it instead of opening a mail client.

About
- Shorter overview (seven short paragraphs) with brands, skills and key terms in bold.
- The links card moved to Contact; Skills spans the full width; a call to action leads to `/contact`.

Timeline
- The detail of each block is a boxless callout: a line leaves the centre-line node, runs under the role heading, and the description hangs below it. No rectangular panels.
- $MAGAIBA and DrGea each have their own row; planets alternate sides along the whole timeline.

AI experiments
- New first block: REEL 2025/2026.
- Block order: reel, 2026 works, AUDIO IA — MUSIC LAB, 2025 works, the8bureau, webapps, archive.
- 2026 works: Product Demo, Fashion Campaign, UGC content, Ad 30-40 Messi. The first two are open; Ad 30-40 Messi has no link.
- Music Lab: rebuilt as a continuous cover flow (drag with momentum, spring settling, interruptible; click, arrow keys and trackpad). The hint text was removed; controls sit in a fixed strip.
- the8bureau: new intro, Autonomous Ad Agency marked deprecated and moved to sixth place, new "New in v2" group (Prompt Studio, PDF Toolkit, Cost Calculator, Brand Analyzer), new screenshots of the v2 dashboard.

Agent mode and assistant
- `/agents.md` and `/agents.txt` updated: navigation with localized notes, timeline order, AI page structure, the8bureau tools, contact route.
- Assistant knowledge base: MAGAIBA document, contact details, updated AI lab notes.

## r13 (2026-10-12) — Brand positioning
Branch `release/r13-brand-positioning`. Builds on production (`main` @ `722a743`).

Positioning and content
- New positioning across the site: **Brand Strategist & Brand Marketing Leader**, at the intersection of brand strategy, cultural marketing and creative technology. Target roles: Head of Brand, Brand Lead, Brand Manager, Brand Marketing Manager, Brand Strategist, Cultural Marketing, Creative Technologist.
- About: full storytelling rewrite (seven paragraphs, ES + EN), new skills, context cards (trajectory, industries, brand leadership, education, target roles) and profile note.
- Home: new hero copy and marquee; project frames updated with the correct titles.
- Work pages rebuilt from the CVs, same facts in ES and EN:
  - Disney: three roles with dates (Promotions Coordinator, Digital Distribution Sales Coordinator, Disney Labs), stat row, highlights and brand takeaway.
  - Air New Zealand: strategy and launch, partnerships and sponsorships, agencies and execution, results.
  - Independent consultant: new overview, six engagements with titles and dates, sourced achievements, video showcase (Stone Movistar launch, Airtalks), Backstage launch links.
  - Agency years: exact dates and titles, tightened copy.
- Titles corrected everywhere: Airtm (Growth Marketing + R&D), Stone Movistar (Brand & Marketing Consultant), Go Broadway! (Marketing Consultant), Air New Zealand (Marketing Specialist & Market Development).
- AI experiments (the page shipped in this release, with the Music Lab): Spanish accents restored across the page, ES/EN parity fixes, intro with the creative-technologist framing.

Timeline
- Each block is a circular planet (year, company, role) with its description always visible next to it. Videos orbit the planet in a perfect circle on a visible ring; click opens the video in a dialog with previous/next. Satellites rest on the ring with reduced motion.
- New `$MAGAIBA` planet facing DrGea, with its video and a link to `/magaiba`.
- Single-column layout on mobile. Copy updated to the canonical titles and dates.
- Video lists live in one place: `lib/work-videos.ts` (used by the work pages and the timeline).

CLIPPY.EXE (assistant)
- Stays on Groq's free plan. `app/api/chat/route.ts` now tries three free models in order (`openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b`): a rate limit or a decommissioned model no longer takes the assistant offline.
- Input caps (message, history, route), context budget, best-effort per-visitor limit (8 per minute, 60 per day), 6-hour cache for repeated questions, and a "busy" message distinct from "offline".
- Plain-text answers (the widget does not render Markdown), shorter by default.
- Knowledge base rewritten to the new positioning (`content/assistant/profile.*`, `consulting.*`, targeted fixes in the Q&A file); documents are now retrieved per section instead of whole files.
- Includes the two fixes made earlier the same day: career dates stay attached to their employer, and the answer language follows the question.
- Character animation: idle float, attention gesture, hover wiggle, thinking state, hop when the answer arrives. Disabled with reduced motion.

Agent mode
- `/agents.md` and `/agents.txt` regenerated from the new content: positioning, pillars, target roles, what he brings, education, career facts, engagements.

Visitor counter
- The count lives in the KV store, so deploys never reset it. Only the production site adds visits: local runs and preview deploys read the number without incrementing it.
- The counter shows the last known value (or dashes) instead of zero while loading or when the store is unreachable; the store call has a 5-second timeout.

Text quality
- Fixed broken encoding (`Ã³`, `Â¿`, `â€™`) in `/magaiba` and the static mini tools; removed UTF-8 BOMs.
- Error / not-found pages and aria-labels are bilingual. Footer year and "last update" refreshed.

## r12 (2026-02-05)
- Sidebar: removed the extra outer border around the logo block; adjusted to a smaller, readable scale (desktop + mobile).
- Language coverage: added missing translation keys used across the site (timeline, return_to_mainframe, work page overviews).
- Spanish voice: cleaned up remaining ES copy that sounded neutral/3rd-person on Timeline + Consultant + Agency + Disney + About (now first-person).
- MAGAIBA: added full EN translation for MAGAIBA_DETAILS + bilingual tagline/media heading.
- Air New Zealand: bilingual DETAILS list (ES/EN) and first-person ES wording.
- Work slug page: now uses language context for core labels (client component).

## r11 (2026-02-05)
- Home: further reduced the vertical gap between "GEN_MARKETER.exe" and the collapse toggle when the typewriter is collapsed.
- Sidebar: widened/enlarged the top-left logo block (TP square + title stack) to better match nav width.
- Branding: replaced remaining "MARKETING STRATEGIST" marquee mentions with "GEN_MARKETER".

## r10 (2026-02-05)
- Security: bumped Next.js from 15.2.6 to 15.5.12 to address npm audit high-severity advisories.

## r9 (2026-02-05)
- Sidebar: slightly larger top-left logo block (TP square + title stack).
- Home: reduced vertical gap between "GEN_MARKETER.exe" and the collapse toggle when typewriter is collapsed.
- MAGAIBA: updated MAGAIBA_DETAILS copy to the new long-form text.

## r8 (2026-02-05)
- Branding: replaced "MARKETING_STRATEGIST.exe" with "GEN_MARKETER.exe" (Home + Sidebar).
- Sidebar logo: stacked "TOMÁS_PERÓ" + "GEN_MARKETER.exe" within the TP square height.

## r7 (2026-02-04)
- Home: typewriter cursor blinks after full reveal (not static).
- Home: typewriter collapse now animates (slower, easier to read) and collapsed state shows "volver a leer" label.

## r6 (2026-02-04)
- Home typewriter: +2.5px font size; updated ES opening paragraph with line break.
- Home typewriter: auto-collapses 2s after full reveal.
- Home: collapse/expand arrows doubled in size with a subtle glow.
- AI popup highlight aura: shifted palette to blue/cyan and increased solidity.

## r5 (2026-02-05)
- Home typewriter: updated ES/EN copy, added Morfeo Academy link, increased font size.
- Home: added collapse/expand toggle for the typewriter above "<BASE_DE_DATOS_PROYECTOS>".
- Home: added extra spacing between title and typewriter.
- AI popup highlight aura: green "liquid metal" slime/splash variant; kept behind text for readability.

## r4 (2026-02-05)
- Home typewriter: size + paragraph spacing tweaks; only one bold phrase with linked "introducción".
- AI popup highlight aura: slime-shaped aura and reduced protrusion.

## r3 (2026-02-05)
- Typewriter matched intro typography; added a bold line before closing.
- AI: removed duplicate RESUMEN; unified popup headers; updated Subway link.
- Consultant: moved ES copy toward first person.

## r2 (2026-02-05)
- Intro first-visit redirect + MIDI audio controls.
- AI: restructured page; added tools block and thumbnails.
- Home: popup ordering; typewriter speed + reveal.