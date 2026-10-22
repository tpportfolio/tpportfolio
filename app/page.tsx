import type { Metadata } from "next"
import { HomeVariantPage } from "@/components/home-variant-page"
import type { SummaryVariant } from "@/components/home-summary-variants"
import type { FaqVariant } from "@/components/home-answers"

export const metadata: Metadata = {
  // Absolute: the home does not take the "| Tomás Peró" suffix of the other pages.
  title: { absolute: "Tomás Peró | Brand Strategist y líder de marketing" },
  alternates: { canonical: "/" },
}

const VARIANTS: SummaryVariant[] = ["terminal", "strip", "cards", "typed", "details"]

// EXPLORATION (fork explore/r35): ?resumen=<variant> shows one way of displaying the summary.
export default async function Page({ searchParams }: { searchParams: Promise<{ resumen?: string; faq?: string }> }) {
  const { resumen, faq } = await searchParams
  const summary = VARIANTS.find((v) => v === resumen)
  const faqVariant = (["list", "accordion", "grid"] as FaqVariant[]).find((v) => v === faq)
  return <HomeVariantPage summary={summary} faq={faqVariant} />
}
