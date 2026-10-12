# Changelog

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
- Videos orbit each block along its perimeter (CSS motion path); click opens the video in a dialog with previous/next. Static layout with reduced motion; row of thumbnails inside the card on mobile.
- New `$MAGAIBA` block facing DrGea, with its video and a link to `/magaiba`.
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