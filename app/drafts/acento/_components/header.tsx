"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BASE, href, isLang, site, ui, type Lang } from "../_content/site"

export function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname() || href(lang)
  const rest = pathname.slice(`${BASE}/${lang}`.length) // "", "/about", "/work/slug"
  const other: Lang = lang === "es" ? "en" : "es"
  const first = pathname.split("/")[3] ?? ""
  // A 404 has no twin in the other language: send the switch to the home page.
  const known = rest === "" || rest === "/about" || rest.startsWith("/work/")
  const switchHref = isLang(first) && known ? href(other, rest) : href(other)

  return (
    <header className="aw-header">
      <Link href={href(lang)} className="aw-header__name" aria-label={ui.home[lang]} aria-current={rest === "" ? "page" : undefined}>
        {site.name}
      </Link>
      <nav aria-label={ui.navLabel[lang]}>
        <ul>
          <li>
            <Link href={`${href(lang)}#trabajo`} className="nav-link" aria-current={rest.startsWith("/work/") ? "page" : undefined}>
              {ui.nav.work[lang]}
            </Link>
          </li>
          <li>
            <Link href={href(lang, "/about")} className="nav-link" aria-current={rest === "/about" ? "page" : undefined}>
              {ui.nav.profile[lang]}
            </Link>
          </li>
          <li>
            <a href="#contacto" className="nav-link">
              {ui.nav.contact[lang]}
            </a>
          </li>
          <li>
            <Link href={switchHref} className="nav-link nav-link--lang" hrefLang={other} lang={other}>
              {ui.switchShort[lang]}
              <span className="sr-only">{` (${ui.switchTo[lang]})`}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
