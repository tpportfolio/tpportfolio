import type { Metadata } from "next"
import { HomeVariantPage } from "@/components/home-variant-page"

export const metadata: Metadata = {
  // Absolute: the home does not take the "| Tomás Peró" suffix of the other pages.
  title: { absolute: "Tomás Peró | Brand Strategist y líder de marketing" },
  alternates: { canonical: "/" },
}

export default function Page() {
  return <HomeVariantPage />
}
