import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Mark } from "../../../_components/name"
import { Reel } from "../../../_components/reel"
import { href, isLang, langs, projectBySlug, projects, ui, work, type Lang } from "../../../_content/site"

export function generateStaticParams() {
  return langs.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })))
}

type Params = Promise<{ lang: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  const project = projectBySlug(slug)
  if (!project || !isLang(lang)) return {}
  return {
    title: `${project.name[lang]} (${project.years[lang]})`,
    description: project.summary[lang],
    alternates: {
      canonical: href(lang, `/work/${slug}`),
      languages: { es: href("es", `/work/${slug}`), en: href("en", `/work/${slug}`) },
    },
  }
}

export default async function CasePage({ params }: { params: Params }) {
  const { lang: rawLang, slug } = await params
  const lang = rawLang as Lang
  const at = projects.findIndex((project) => project.slug === slug)
  if (at < 0) notFound()
  const project = projects[at]
  const next = projects[(at + 1) % projects.length]
  const videos = project.videos ?? (project.cover.kind === "video" ? [project.cover.video] : [])

  return (
    <article>
      <header className="case__head wrap">
        <dl className="case__meta" data-reveal="fade" data-intro data-delay="0.3">
          <div>
            <dt>{ui.years[lang]}</dt>
            <dd>{project.years[lang]}</dd>
          </div>
          <div>
            <dt>{ui.role[lang]}</dt>
            <dd>{project.role[lang]}</dd>
          </div>
          <div>
            <dt>{ui.where[lang]}</dt>
            <dd>{project.place[lang]}</dd>
          </div>
        </dl>
        <div className="case__title">
          <h1 data-split="lines" data-intro>
            {project.name[lang]}
          </h1>
        </div>
        <div className="grid">
          <p className="case__summary" data-split="lines" data-intro data-delay="0.2">
            {project.summary[lang]}
          </p>
        </div>
      </header>

      <div className="case__media wrap grid" data-reveal="clip" data-intro data-delay="0.35">
        {project.cover.kind === "video" ? (
          <Reel videos={videos} lang={lang} alt={project.cover.alt} eager />
        ) : (
          <div className="figure">
            <p className="figure__value">{project.cover.value[lang]}</p>
            <p className="figure__label">{project.cover.label[lang]}</p>
          </div>
        )}
      </div>

      <div className="case__body wrap grid">
        <h2 className="case__h">{work.context[lang]}</h2>
        <p className="case__text" data-split="lines">
          {project.context[lang]}
        </p>

        {project.stats ? (
          <ul className="facts__list case__stats">
            {project.stats.map((stat) => (
              <li className="fact" key={stat.label.en}>
                <span className="fact__value stress">{stat.value[lang]}</span>
                <span className="fact__label">{stat.label[lang]}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {project.blocks.map((block) => (
          <section className="case__block" key={block.heading.en} style={{ display: "contents" }}>
            <h2 className="case__h">{block.heading[lang]}</h2>
            <ul className="case__list">
              {block.items.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
          </section>
        ))}

        {project.entries ? (
          <section style={{ display: "contents" }}>
            <h2 className="case__h">{work.engagements[lang]}</h2>
            <div className="entries">
              {project.entries.map((entry) => (
                <div className="entry" key={entry.company}>
                  <div>
                    <h3>{entry.company}</h3>
                    <p className="meta">
                      {entry.title}
                      <br />
                      {entry.dates[lang]}
                      <br />
                      {entry.sector[lang]}
                    </p>
                  </div>
                  <p>{entry.text[lang]}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <h2 className="case__h">{project.outcome.heading[lang]}</h2>
        <p className="case__outcome" data-split="lines">
          {project.outcome.text[lang]}
        </p>

        {project.links ? (
          <section style={{ display: "contents" }}>
            <h2 className="case__h">{work.links[lang]}</h2>
            <ul className="case__links">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a className="link" href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {link.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <nav className="next wrap" aria-label={work.nextLabel[lang]}>
        <Link href={href(lang, `/work/${next.slug}`)}>
          <span className="next__label">{work.nextLabel[lang]}</span>
          <span className="next__name">
            <Mark />
            <span className="stress">{next.label[lang]}</span>
          </span>
        </Link>
      </nav>
    </article>
  )
}
