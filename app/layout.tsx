import { CAREER_YEARS } from "@/lib/career"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import Sidebar from "@/components/sidebar";
import { FloatingAssistant } from "@/components/floating-assistant";
import { Providers } from "./providers";
import { MobileMenuButton } from "@/components/mobile-menu-button";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteChrome } from "@/components/site-chrome";
import { Geist_Mono } from "next/font/google";

// The site's typeface (r37). /acento keeps its own.
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-geist-mono" });

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SITE_URL = "https://tomaspero.vercel.app";
const SITE_DESCRIPTION =
  `Tomás Peró, Brand Strategist y líder de marketing en Buenos Aires: más de ${CAREER_YEARS} años en estrategia de marca, marketing cultural y tecnología creativa con IA.`;

// Regenerate pages once a day (the years of experience change every August).
export const revalidate = 86400

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tomás Peró | Brand Strategist y líder de marketing",
    template: "%s | Tomás Peró",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Tomás Peró",
  authors: [{ name: "Tomás Peró", url: SITE_URL }],
  creator: "Tomás Peró",
  keywords: [
    "Tomás Peró",
    "Brand Strategist",
    "Brand Manager",
    "Head of Brand",
    "Brand Marketing Manager",
    "marketing cultural",
    "creative technologist",
    "IA generativa",
    "Buenos Aires",
  ],
  alternates: {
    canonical: "/",
    // The same content as Markdown, for agents and AI tools.
    types: { "text/markdown": [{ url: "/agents.md", title: "agents.md" }, { url: "/llms.txt", title: "llms.txt" }] },
  },
  openGraph: {
    type: "website",
    siteName: "Tomás Peró",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    title: "Tomás Peró | Brand Strategist y líder de marketing",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomás Peró | Brand Strategist y líder de marketing",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// Who the site is about, for search engines and AI answers. Only facts already published on the site.
const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Tomás Peró",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: "Brand Strategist & Brand Marketing Leader",
      description: SITE_DESCRIPTION,
      address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
      sameAs: ["https://www.linkedin.com/in/tomaspero"],
      knowsLanguage: ["es", "en"],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universidad de Ciencias Empresariales y Sociales (UCES)",
      },
      knowsAbout: [
        "Brand strategy",
        "Brand positioning",
        "Integrated go-to-market",
        "Cultural marketing",
        "Partnerships and sponsorships",
        "Creative technology",
        "Generative AI production workflows",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Tomás Peró",
      description: SITE_DESCRIPTION,
      inLanguage: ["es", "en"],
      publisher: { "@id": `${SITE_URL}/#person` },
      about: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={geistMono.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        {/* Set the visual mode before the first paint: the visitor's choice, or else the system setting. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var m=localStorage.getItem("tp.visual-mode.choice");if(m!=="dark"&&m!=="light"){m=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.visualMode=m;document.documentElement.style.colorScheme=m}catch(e){}`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G0MMW8J0LY"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G0MMW8J0LY');
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          <SiteChrome
            sidebar={<Sidebar />}
            menuButton={<MobileMenuButton />}
            scrollToTop={<ScrollToTop />}
            assistant={<FloatingAssistant />}
          >
            {children}
          </SiteChrome>
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

