import type { Metadata } from "next"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { Footer } from "../_components/footer"
import { Header } from "../_components/header"
import { home, href, isLang, langs, site, ui } from "../_content/site"

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }))
}

type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return {
    title: { default: home.title[lang], template: `%s | ${site.name}` },
    description: site.description[lang],
    alternates: {
      canonical: href(lang),
      languages: { es: href("es"), en: href("en") },
    },
    openGraph: { locale: lang === "es" ? "es_AR" : "en_US", title: home.title[lang], description: site.description[lang] },
  }
}

export default async function LangLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  return (
    <div lang={lang}>
      <a className="skip-link" href="#main">
        {ui.skip[lang]}
      </a>
      <Header lang={lang} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  )
}
