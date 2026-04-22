"use client"

import { HomePageView } from "@/components/home-page-view"
import { HomeVariantShader } from "@/components/home-variant-shader"
import { useVisualMode } from "@/components/visual-mode-context"

export function HomeVariantPage() {
  const { mode } = useVisualMode()

  return (
    <div className={`home-variant-page home-variant-page--${mode}`}>
      <div className="home-variant-page__backdrop" aria-hidden>
        <HomeVariantShader mode={mode} />
      </div>
      <div className="home-variant-page__content">
        <HomePageView className="relative z-10" variantMode={mode} />
      </div>
    </div>
  )
}
