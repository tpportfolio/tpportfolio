import Link from "next/link"
import { Mark, Name } from "../_components/name"
import { ProjectStill } from "../_components/still"
import { home, href, projects, site, type Lang } from "../_content/site"

type Params = Promise<{ lang: string }>

// "Estrategia de marca" → ["Estrategia", "de marca"]: one line on desktop, two on phones.
const halves = (label: string) => {
  const at = label.indexOf(" ")
  return at < 0 ? [label] : [label.slice(0, at), label.slice(at + 1)]
}

export default async function AcentoHome({ params }: { params: Params }) {
  const lang = (await params).lang as Lang

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role[lang],
    url: site.url,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
    sameAs: [site.linkedin],
  }

  return (
    <>
      <section className="hero">
        <div className="hero__top grid">
          <p className="hero__role" data-split="lines" data-intro data-delay="0.1">
            {home.heroRole[lang]}
          </p>
          <p className="hero__say" data-reveal="fade" data-intro data-delay="0.45">
            {home.heroSay[lang]} <b>{home.heroPhonetic[lang]}</b> <em>{home.heroHint[lang]}</em>
          </p>
        </div>
        <div className="hero__name">
          <Name as="h1" className="name--mega" playable intro />
        </div>
        <div className="hero__foot" data-reveal="fade" data-intro data-delay="0.55">
          <a className="go" href="#trabajo">
            <span className="lead">
              <Mark />
              <span className="stress">{home.heroScroll[lang]}</span>
            </span>
          </a>
          <span className="meta">{site.location[lang]}</span>
        </div>
      </section>

      <section className="idea wrap grid">
        <p data-split="lines">{home.idea[lang]}</p>
      </section>

      <section className="pillars wrap" data-stress="pillars" data-sway aria-labelledby="pillars-h">
        <div className="pillars__stage">
          <div className="pillars__head">
            <h2 id="pillars-h">{home.pillarsHeading[lang]}</h2>
          </div>
          {home.pillars.map((pillar) => (
            <article className="pillar is-stressed" data-stress-item key={pillar.id}>
              <div className="pillar__line">
                <h3 className="pillar__label">
                  <Mark />
                  <span className="stress">
                    {halves(pillar.label[lang]).map((part, index) => (
                      <span key={part}>
                        {index > 0 ? " " : ""}
                        {part}
                      </span>
                    ))}
                  </span>
                </h3>
              </div>
              <div className="pillar__panel grid">
                <p className="pillar__lead">{pillar.lead[lang]}</p>
                <ul className="pillar__proofs">
                  {pillar.proofs.map((proof) => (
                    <li key={proof.who}>
                      <b>{proof.who}</b>
                      <span>{proof.what[lang]}</span>
                    </li>
                  ))}
                </ul>
                <Link className="go pillar__go" href={href(lang, `/work/${pillar.link.slug}`)}>
                  <span className="lead">
                    <Mark />
                    <span className="stress">{pillar.link.label[lang]}</span>
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work wrap" id="trabajo" aria-labelledby="work-h">
        <div className="work__head">
          <h2 id="work-h">{home.workHeading[lang]}</h2>
          <p className="meta">{home.workIntro[lang]}</p>
        </div>
        <ul className="index" data-stress="list" data-sway>
          {projects.map((project, index) => (
            <li className={`index__row${index === 0 ? " is-stressed" : ""}`} data-stress-item key={project.slug}>
              <Link className="index__link" href={href(lang, `/work/${project.slug}`)}>
                <span className="index__years">{project.years[lang]}</span>
                <span className="index__label">
                  <Mark />
                  <span className="stress">{project.label[lang]}</span>
                </span>
                <span className="index__role">
                  {project.role[lang]}
                  <span>{project.place[lang]}</span>
                </span>
                <ProjectStill project={project} lang={lang} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="facts wrap" aria-labelledby="facts-h">
        <h2 id="facts-h">{home.factsHeading[lang]}</h2>
        <ul className="facts__list" data-stress="list">
          {home.facts.map((fact, index) => (
            <li className={`fact${index === 0 ? " is-stressed" : ""}`} data-stress-item key={fact.label.en}>
              <span className="fact__value stress">{fact.value[lang]}</span>
              <span className="fact__label">{fact.label[lang]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="teaser wrap grid" aria-labelledby="teaser-h">
        <h2 id="teaser-h">{home.profileHeading[lang]}</h2>
        <div className="teaser__body">
          <p data-split="lines">{home.profileText[lang]}</p>
          <Link className="go" href={href(lang, "/about")}>
            <span className="lead">
              <Mark />
              <span className="stress">{home.profileLink[lang]}</span>
            </span>
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  )
}
