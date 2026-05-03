import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import Sidebar from "@/components/sidebar";
import { FloatingAssistant } from "@/components/floating-assistant";
import { Providers } from "./providers";
import { MobileMenuButton } from "@/components/mobile-menu-button";
import { ScrollToTop } from "@/components/scroll-to-top";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Tom\u00e1s Per\u00f3 | GEN_MARKETER.exe",
  description: "Professional portfolio of Tom\u00e1s Per\u00f3.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
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
          <div className="flex min-h-screen">
            <Sidebar />
            <MobileMenuButton />
            <div className="flex-1 lg:ml-64 w-full">
              <ScrollToTop />
              {children}
            </div>
          </div>
          <FloatingAssistant />
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

