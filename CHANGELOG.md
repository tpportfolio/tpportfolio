# Changelog

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