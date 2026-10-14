import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLang, notFound as copy } from "../../_content/site"

// Any other address under /drafts/acento/<lang>/ shows the section's own 404.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return { title: copy.title[isLang(lang) ? lang : "es"] }
}

export default function CatchAll() {
  notFound()
}
