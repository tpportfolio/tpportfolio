import { SpeedInsights } from "@vercel/speed-insights/next";  
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import { Providers } from "./providers"
import { MobileMenuButton } from "@/components/mobile-menu-button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Analytics } from "@vercel/analytics/next";


export const metadata: Metadata = {
  title: "Tomás Peró | Marketing Strategist & Creative Director",
  description:
    "Professional portfolio of Tomás Peró, a marketing strategist and creative director with over 15 years of experience.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G0MMW8J0LY"></script>
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
              <SpeedInsights /> {/* <-- AGREGADO */}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
