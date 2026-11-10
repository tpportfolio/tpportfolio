// Where the site keeps its state, in one place. Rule: what a visitor can choose is readable from
// the URL and from <html>; storage only remembers the choice.
//
//   language     ?lang=es|en  ->  <html lang>              remembered in LANGUAGE_STORAGE_KEY
//   visual mode  (switch)     ->  <html data-visual-mode>  remembered in VISUAL_MODE_STORAGE_KEY
//                the webapps under /public read TOOL_THEME_KEYS, which the site keeps in step
//   AI filter    ?filter=imagen|video|audio on /work/ai-experiments (no storage)
//   intro        INTRO_COOKIE, set by middleware.ts and by public/intro.html (a static file: it
//                repeats the cookie name by hand)

export const LANGUAGES = ["es", "en"] as const
export type SiteLanguage = (typeof LANGUAGES)[number]
export const DEFAULT_LANGUAGE: SiteLanguage = "es"
export const LANGUAGE_PARAM = "lang"
export const LANGUAGE_STORAGE_KEY = "tp.lang.choice"

export function isSiteLanguage(value: unknown): value is SiteLanguage {
  return value === "es" || value === "en"
}

// Written only when the visitor uses the switch. Without it, the site follows the system setting.
// (The older "tp.visual-mode" key was written on every visit, so it does not tell a choice apart.)
export const VISUAL_MODE_STORAGE_KEY = "tp.visual-mode.choice"

// Theme keys read by the the8bureau webapps served from /public (same origin). The site writes its
// current mode to them, so a tool opens in the mode the visitor is browsing in. All take "light" | "dark".
export const TOOL_THEME_KEYS = ["t8b.retro.visual-mode.choice", "t8b_theme_mode", "t8b-theme"] as const

export const AI_FILTER_PARAM = "filter"

export const INTRO_COOKIE = "tp_intro"

// The sidebar owns the open/closed state of the mobile menu; the button asks and listens.
export const MOBILE_MENU_TOGGLE_EVENT = "tp-mobile-menu-toggle"
export const MOBILE_MENU_STATE_EVENT = "tp-mobile-menu-state"
