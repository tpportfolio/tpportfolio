import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import Sidebar from "@/components/sidebar";
import { FloatingAssistant } from "@/components/floating-assistant";
import { Providers } from "./providers";
import { MobileMenuButton } from "@/components/mobile-menu-button";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteChrome } from "@/components/site-chrome";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Tom\u00e1s Per\u00f3 | GEN_MARKETER.exe",
  description:
    "Tomás Peró: Brand Strategist & Brand Marketing Leader. Brand strategy, cultural marketing and creative technology. 18+ years building, launching and scaling brands.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
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

