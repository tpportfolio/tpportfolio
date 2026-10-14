import type { Metadata } from "next"
import Link from "next/link"
import { Mark } from "../../_components/name"
import { href, isLang, profile, site, type Lang } from "../../_content/site"

type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return {
    title: profile.title[lang],
    description: profile.description[lang],
    alternates: {
      canonical: href(lang, "/about"),
      languages: { es: href("es", "/about"), en: href("en", "/about") },
    },
  }
}

export default async function ProfilePage({ params }: { params: Params }) {
  const lang = (await params).lang as Lang

  return (
    <>
      <header className="about__head wrap">
        <p className="about__kicker" data-reveal="fade" data-intro data-delay="0.3">
          {profile.title[lang]}
        </p>
        <div className="grid">
          <h1 className="about__statement" data-split="lines" data-intro>
            {profile.statement[lang]}
          </h1>
        </div>
      </header>

      <div className="about__main wrap grid">
        <figure className="about__portrait" data-reveal="clip" data-intro data-delay="0.3">
          <div className="still">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cuadrada.jpg" alt={profile.portraitAlt[lang]} width={1920} height={1920} decoding="async" />
          </div>
          <figcaption className="meta">{`${site.name}, ${site.location[lang]}`}</figcaption>
        </figure>
        <div className="about__bio">
          {profile.bio.map((paragraph) => (
            <p key={paragraph.en}>{paragraph[lang]}</p>
          ))}
        </div>
      </div>

      <div className="about__lists wrap grid">
        {profile.lists.map((list) => (
          <section key={list.heading.en}>
            <h2>{list.heading[lang]}</h2>
            <ul>
              {list.items.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="path wrap" aria-labelledby="path-h">
        <h2 id="path-h">{profile.pathHeading[lang]}</h2>
        <ol>
          {profile.path.map((step) => {
            const row = (
              <>
                <span className="path__years">{step.years}</span>
                <span className="path__company">
                  <Mark />
                  <span className="stress">{step.company}</span>
                </span>
                <span className="path__role">{step.role}</span>
              </>
            )
            return (
              <li key={`${step.years}-${step.company}`}>
                {step.slug ? (
                  <Link className="path__row" href={href(lang, `/work/${step.slug}`)}>
                    {row}
                  </Link>
                ) : (
                  <div className="path__row">{row}</div>
                )}
              </li>
            )
          })}
        </ol>
      </section>
    </>
  )
}
