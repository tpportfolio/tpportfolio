// Years of experience, counted from August 2007 (first job). Used everywhere the site says "18+ years",
// so the number goes up by itself every August. Pages revalidate daily (see app/layout.tsx).
export const CAREER_START = { year: 2007, month: 8 }

export function careerYears(now: Date = new Date()): number {
  const months = (now.getFullYear() - CAREER_START.year) * 12 + (now.getMonth() + 1 - CAREER_START.month)
  return Math.floor(months / 12)
}

export const CAREER_YEARS = careerYears()
