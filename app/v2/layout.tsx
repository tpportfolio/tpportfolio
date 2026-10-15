import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Tomás Peró | Work first",
  description: "Alternative version of the portfolio: cases first, each opening with its result.",
  robots: { index: false, follow: true },
}

export default function V2Layout({ children }: { children: ReactNode }) {
  return children
}
