"use client"

// The designed 404 of this section. A not-found file gets no route params, so the language
// comes from the address.
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mark } from "../_components/name"
import { href, isLang, notFound as copy, type Lang } from "../_content/site"

export default function Lost() {
  const segment = (usePathname() || "").split("/")[3] ?? ""
  const lang: Lang = isLang(segment) ? segment : "es"

  return (
    <section className="lost wrap">
      <div className="lost__word">
        <h1>{copy.word[lang]}</h1>
        <span className="lost__mark" aria-hidden="true" data-sway-always="">
          <i />
        </span>
      </div>
      <div className="lost__body grid">
        <p>{copy.text[lang]}</p>
        <Link className="go" href={href(lang)}>
          <span className="lead">
            <Mark />
            <span className="stress">{copy.back[lang]}</span>
          </span>
        </Link>
      </div>
    </section>
  )
}
