import Link from "next/link"
import { BASE, footer, site, type Lang } from "../_content/site"
import { Mark } from "./name"

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="aw-footer wrap" id="contacto">
      <h2 className="aw-footer__ask" data-split="lines">
        {footer.heading[lang]}
      </h2>
      <p className="aw-footer__mail">
        <span className="meta">{footer.emailLabel[lang]}</span>
        <a href={`mailto:${site.email}`}>
          <Mark />
          <span className="stress">{site.email}</span>
        </a>
      </p>
      <dl className="aw-footer__cols grid">
        <div>
          <dt>{footer.linkedinLabel[lang]}</dt>
          <dd>
            <a className="link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              {site.linkedinLabel}
            </a>
          </dd>
        </div>
        <div>
          <dt>{footer.basedLabel[lang]}</dt>
          <dd>{site.location[lang]}</dd>
        </div>
        <div>
          <dt>{footer.mainSiteNote[lang]}</dt>
          <dd>
            <Link className="link" href="/">
              {footer.mainSite[lang]}
            </Link>
          </dd>
        </div>
      </dl>
      <p className="aw-footer__base">
        <span>{`© ${new Date().getFullYear()} ${site.name}`}</span>
        <span>
          {footer.colophon[lang]}{" "}
          <a className="link" href={`${BASE}/agents.md`} target="_blank" rel="noopener noreferrer">
            {footer.agentMode[lang]}
          </a>
        </span>
      </p>
    </footer>
  )
}
