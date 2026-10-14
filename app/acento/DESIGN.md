# Acento: alternative design (draft)

An alternative design for the portfolio, built with the `awwwards` skill. It lives at
`/acento` (Spanish at `/acento/es`, English at `/acento/en`) as an alternative home: not in
the sidebar and not indexed, so `/` stays the canonical home. The main site is untouched.

## Brief

- Subject: Tomás Peró, Brand Strategist and Brand Marketing Leader, Buenos Aires. 18+ years
  across agencies (Altheim, JWT), The Walt Disney Company, Air New Zealand, independent
  consulting and AI-assisted production.
- Audience: recruiters and hiring managers for brand roles (Head of Brand, Brand Lead, Brand
  Manager, Brand Marketing Manager, Brand Strategist, Cultural Marketing, Creative Technologist).
- Job of the site: get hired or contacted.
- Assets: the real content of the current site, its YouTube videos, the portrait
  (`public/images/cuadrada.jpg`) and the 2026 AI stills.
- Language: Spanish (rioplatense, first person) and English, same facts.
- Constraints: Next.js 15 App Router, React 18, existing repository. No invented projects,
  clients or figures.

## Concept

Three concepts from three territories were considered:

| | A. El acento (name) | B. Formats (material) | C. Route board (place) |
|---|---|---|---|
| Idea | Tomás Peró carries the accent on the last syllable of both words; a brand is deciding where the accent goes | One screen that takes the aspect ratio of each era of his work, from 4:3 TV to 9:16 | His career as departures on an airline board |
| Anchor | His own name, and what a brand strategist does: choose the emphasis | His work is video across 18 years of formats | He launched Air New Zealand's route in South America |
| Signature | One stressed thing per frame; the stress moves with scroll and pointer | The frame reshapes itself between chapters | Split-flap rows |
| Originality / Fit / Feasibility / Portability | 5 / 5 / 4 / 1 | 4 / 3 / 4 / 3 | 2 / 3 / 4 / 3 |

Picked A: it depends on a fact only this person has, it gives rules for type, layout, motion,
colour and copy, and it is honest (no data is needed to make it work).

```
Idea:        A brand is a decision about where the accent goes, and Tomás Peró carries his at the end.
Metaphor:    Spoken stress and the written acute accent (the red pen that marks a missing accent).
Signature:   One stressed line at a time. In the pillars stage the stress moves from line to line
             with the scroll; the stressed line turns heavy and wide, the accent lands in front of
             it and its proof replaces the previous one. (Sticky stage + the stress driver.)
Emotion:     Precision and wit: a name set the way it sounds.
Motion verb: Fall and land.
Screenshot:  "Tomás Peró" at full width, the stressed syllables heavy and wide, two red accents.
```

## System

**Palette** (from a school notebook: paper, ballpoint blue, the correcting red pen)

| Role | Value | Use |
|---|---|---|
| ground | `#f3f4f0` | page |
| ink | `#151a6b` | all text |
| muted | `#5a5f92` | secondary text (5.4:1 on ground) |
| line | ink at 16% | hairlines |
| accent | `#d4241a` | the accent mark, focus ring, selection, hover of inline links |
| curtain | accent | page transition |

One committed theme. No dark mode in this version.

**Type.** One family, Archivo (variable, width 62 to 125, weight 100 to 900), with two voices:
at rest light and narrow (weight 300, width 78%), under stress heavy and wide (weight 800,
width 122%). The name is set by syllable: `To` and `Pe` at rest, `más` and `ró` stressed.
Display tracking -0.03 to -0.04em, leading 0.86 to 1. Body 16 to 18 px, leading 1.5.
Numbers are tabular.

**The mark.** The acute accent is drawn as a wedge, not typed, so it can land, lift and move.
It is the only graphic shape on the site. It appears over the vowels of the name, in front of
a stressed line or link, in front of the current page in the navigation, and as the red stroke
that crosses the screen between pages. It is never placed over a vowel of a normal word, so no
word is misspelled.

**Rule.** Inside a group (the name, the three pillars, the work index, the figures, the video
list) exactly one item is stressed.

**Grid and rhythm.** 12 columns, fluid gutter, outer margin equal to the gutter. Text hangs
from columns 1, 5 and 7. Section spacing uses four moods (8u, 12u, 16u, a full screen).

**Shape.** Radius 0 everywhere. The only diagonal is the accent.

**Images.** Stills are printed in the ink (greyscale under a blue screen blend) and turn to
full colour when their row or player takes the stress. Ratio 16:9; the portrait is 4:5.

**Motion language.** Eases: `expo.out` for entrances, `expo.inOut` for the stroke that crosses
the page, and one overshoot curve reserved for the accent landing. Stress changes take 0.55 s.
Text reveals 1.1 to 1.2 s with 0.08 s stagger. Page transition 0.75 s each way.

**Micro-interactions.** One treatment per role:
- Primary targets (navigation, project rows, pillar links, next case, email): the accent lands
  in front and the label takes the stress.
- Inline links in text: underline at rest that thickens and turns red.
- The play button of a video: the block floods red, the triangle nudges, the still turns to colour.

**Idle state.** The landed accents sway a few degrees and lean toward the pointer. It is the
concept's own object moving, nothing else moves at rest. Off under reduced motion.
The home page and the 404 move at rest. The case and profile pages hold still on purpose: they
are for reading, and their life is in the hovers and the video list.

## Composition

```
HOME
 hero (poster, name as image)        role text top-left, how to say the name top-right,
                                     the name across the bottom, link and city in the corners
 idea (statement)                    one large paragraph on columns 3 to 11
 pillars (sticky narrative)          three full-width lines, one stressed; lead bottom-left,
                                     proof list bottom-right
 work (index list)                   years | name | role and place | still
 figures (data)                      four numerals, one stressed
 profile teaser (asymmetric pair)    label on column 1, text on columns 5 to 11
 footer (finale)                     question, email at full width, links

CASE   meta row, title, summary on columns 6 to 12, video or figure on columns 3 to 12,
       context, figures, lists, clients, outcome set large, next case
PROFILE statement, sticky portrait + biography, four lists, career path
404    the word at full width at rest, the accent fallen on the floor
```

## Decisions and assumptions

- Phones get no loader. The page is visible at first paint and the accents land when the
  script arrives. A loader that waits for the script on a slow connection ran past 4 seconds.
- In the loader the name already has its stressed syllables and only the accents fall, because
  animating the width of the name before any interaction counted as layout shift.
- On phones and short windows the pillars are stacked and the pillar at mid-screen takes the
  stress. Under reduced motion the three are stressed and nothing moves.
- No WebGL: the concept is typographic.
- `/acento` is not indexed (`robots: noindex`): `/` stays the canonical home.
- The email and LinkedIn are the ones already published on the contact page.

## Genericness test

Changed after asking "would a generic model land here?":
- A black page with one bright accent became blue ink on paper with a red pen.
- A hover preview that follows the cursor became stills inside each row that turn to colour.
- A centred hero became a name that fills the width and can be played with.
- Decorative numbering of sections was removed; the video list keeps its numbers because it is a sequence.
