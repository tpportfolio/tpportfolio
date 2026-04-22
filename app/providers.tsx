"use client"

import { LanguageProvider } from "@/components/language-context"
import { VisualModeProvider } from "@/components/visual-mode-context"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <VisualModeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </VisualModeProvider>
  )
}
