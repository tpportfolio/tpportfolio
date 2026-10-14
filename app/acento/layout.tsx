import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Archivo } from "next/font/google"
import { Motion } from "./_components/motion"
import { Name } from "./_components/name"
import { site } from "./_content/site"
import "./acento.css"

// One family, two voices: light and narrow at rest, heavy and wide under stress.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--font-archivo" })

// Alternative home of the portfolio. Not indexed, so search engines keep the main home as the canonical one.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  robots: { index: false, follow: false },
  openGraph: { type: "website", siteName: site.name },
  twitter: { card: "summary_large_image" },
}

// Runs before first paint: hidden-until-revealed styles only apply when JS and motion are on.
// Phones get no loader: the page is there at first paint and the accents land when the script arrives.
const flags = `var h=document.documentElement.classList;h.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)h.add('motion');if(matchMedia('(max-width: 47.99rem)').matches)h.add('no-loader');var d=function(){h.add('fonts-ready')};try{var f=getComputedStyle(document.currentScript.parentNode).getPropertyValue('--font-archivo').split(',')[0];document.fonts.load('800 16px '+f).then(d,d)}catch(e){d()}setTimeout(d,4000)`

export default function AcentoLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`aw ${archivo.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: flags }} />
      <div id="curtain" aria-hidden="true">
        <div className="curtain__panel" />
      </div>
      <div id="loader" role="status" aria-label={site.name}>
        <div className="hero__name" aria-hidden="true">
          <Name as="p" className="name--mega" bare />
        </div>
        <div className="loader__foot" aria-hidden="true">
          <span>Buenos Aires</span>
          <span className="loader__count">
            <span data-loader-count>000</span>
          </span>
        </div>
        <div className="loader__bar" data-loader-bar />
      </div>
      {children}
      <Motion />
    </div>
  )
}
