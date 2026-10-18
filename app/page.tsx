import type { Metadata } from "next"
import { HomeVariantPage } from "@/components/home-variant-page"
import type { SummaryVariant } from "@/components/home-summary-variants"

export const metadata: Metadata = {
  // Absolute: the home does not take the "| Tomás Peró" suffix of the other pages.
  title: { absolute: "Tomás Peró | Brand Strategist y líder de marketing" },
  alternates: { canonical: "/" },
}

const VARIANTS: SummaryVariant[] = ["terminal", "strip", "cards", "typed", "details"]

// EXPLORATION (fork explore/r35): ?resumen=<variant> shows one way of displaying the summary.
export default async function Page({ searchParams }: { searchParams: Promise<{ resumen?: string }> }) {
  const { resumen } = await searchParams
  const summary = VARIANTS.find((v) => v === resumen)
  return <HomeVariantPage summary={summary} />
}
