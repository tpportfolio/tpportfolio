"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

// Routes that bring their own page frame: no sidebar, menu button or assistant.
const BARE_ROUTES = ["/acento"]

type Props = {
  children: ReactNode
  sidebar: ReactNode
  menuButton: ReactNode
  scrollToTop: ReactNode
  assistant: ReactNode
}

export function SiteChrome({ children, sidebar, menuButton, scrollToTop, assistant }: Props) {
  const pathname = usePathname() || ""
  if (BARE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return <>{children}</>
  }

  return (
    <>
      <div className="flex min-h-screen">
        {sidebar}
        {menuButton}
        <div className="flex-1 min-w-0 lg:ml-64 w-full">
          {scrollToTop}
          {children}
        </div>
      </div>
      {assistant}
    </>
  )
}
