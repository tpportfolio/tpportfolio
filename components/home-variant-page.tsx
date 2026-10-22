"use client"

import { HomePageView } from "@/components/home-page-view"
import { HomeVariantShader } from "@/components/home-variant-shader"
import { useVisualMode } from "@/components/visual-mode-context"
import type { SummaryVariant } from "@/components/home-summary-variants"
import type { FaqVariant } from "@/components/home-answers"

export function HomeVariantPage({ summary, faq }: { summary?: SummaryVariant; faq?: FaqVariant }) {
  const { mode } = useVisualMode()

  return (
    <div className={`home-variant-page home-variant-page--${mode}`}>
      <div className="home-variant-page__backdrop" aria-hidden>
        <HomeVariantShader mode={mode} />
      </div>
      <div className="home-variant-page__content">
        <HomePageView className="relative z-10" variantMode={mode} summary={summary} faq={faq} />
      </div>
    </div>
  )
}
