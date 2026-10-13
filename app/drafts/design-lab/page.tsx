import type { Metadata } from "next"
import { DesignLab } from "./_lab/design-lab"

export const metadata: Metadata = {
  title: "Design Lab | Tomás Peró",
  description: "Draft: eight design proposals for the portfolio, shown on the same sample page.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DesignLabPage() {
  return <DesignLab />
}
