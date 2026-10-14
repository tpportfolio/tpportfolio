export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;
export const isMobile = () => matchMedia('(max-width: 767px)').matches;

// Shared easing vocabulary. Use these names everywhere; never invent per-component curves.
export const ease = {
  out: 'expo.out', // default entrance
  inOut: 'expo.inOut', // the stroke that crosses the page
  soft: 'power3.out', // small UI
  land: 'back.out(1.5)', // the accent landing on a word, nothing else
} as const;
