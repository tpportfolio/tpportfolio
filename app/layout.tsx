import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import Sidebar from "@/components/sidebar";
import { Providers } from "./providers";
import { MobileMenuButton } from "@/components/mobile-menu-button";
import { ScrollToTop } from "@/components/scroll-to-top";

// Vercel
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Tomás Peró | GEN_MARKETER.exe",
  description: "Professional portfolio of Tomás Peró.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics */}
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
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
