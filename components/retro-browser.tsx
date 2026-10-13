"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useLanguage } from "./language-context"
import { VideoWindowFrame } from "./video-window"
import type { LocalizedText } from "@/lib/site-content"

type MaybeLocalized = string | LocalizedText | undefined

interface RetroBrowserProps {
  year: string | LocalizedText
  title: string | LocalizedText
  bodyTitle?: string | LocalizedText
  titleLine2?: string | LocalizedText
  clientLine3?: string | LocalizedText
  slug: string
  children?: ReactNode
  highlight?: boolean
}

function resolveLocalized(value: MaybeLocalized, language: "es" | "en") {
  if (!value) return undefined
  if (typeof value === "string") return value
  return value[language]
}

export function RetroBrowser({
  year,
  title,
  bodyTitle,
  titleLine2,
  clientLine3,
  slug,
  children,
  highlight,
}: RetroBrowserProps) {
  const { t, language } = useLanguage()

  const resolvedTitle = resolveLocalized(title, language) ?? ""
  const resolvedYear = resolveLocalized(year, language) ?? ""
  const resolvedBodyTitle = resolveLocalized(bodyTitle, language) ?? resolvedTitle
  const resolvedTitleLine2 = resolveLocalized(titleLine2, language)
  const resolvedClientLine3 = resolveLocalized(clientLine3, language)

  return (
    <VideoWindowFrame
      title={resolvedTitle.toUpperCase()}
      tone={highlight ? "cyan" : "default"}
      className="vw--card h-[15.5rem] w-full sm:h-[16.5rem] md:h-80"
      footLeft="Done"
      footRight={resolvedYear}
      backdrop={
        highlight ? <div aria-hidden className="vw-backdrop pointer-events-none rounded-full ai-molecule-aura" /> : null
      }
    >
      <div className="min-h-0 flex-1">
        {children ? (
          children
        ) : (
          <Link href={`/work/${slug}`}>
            <div className="cursor-pointer h-full flex flex-col justify-between">
              <div className="year-client pl-2 sm:pl-4">
                <div className={`year text-2xl font-bold ${highlight ? "text-cyan-400" : ""}`}>// {resolvedYear}</div>
                <div className={`client text-2xl font-bold ${highlight ? "text-cyan-400" : ""}`}>// {resolvedBodyTitle}</div>
                {resolvedTitleLine2 && <div className={`client-line2 text-lg ${highlight ? "text-cyan-400" : ""}`}>{resolvedTitleLine2}</div>}
                {resolvedClientLine3 && (
                  <div
                    className={`client-line3 mt-1 ${resolvedBodyTitle === "AGENCY EXPERIENCE" || resolvedBodyTitle === "EXPERIENCIA EN AGENCIAS" ? "text-lg " + (highlight ? "text-cyan-400" : "") : "text-base " + (highlight ? "text-cyan-300" : "text-neon-green/80")}`}
                  >
                    {resolvedClientLine3}
                  </div>
                )}
              </div>
              <div className={`access-data mt-3 text-center text-base font-bold sm:mt-4 sm:text-lg ${highlight ? "text-cyan-400" : ""}`}>{t("access_data")}</div>
            </div>
          </Link>
        )}
      </div>

    </VideoWindowFrame>
  )
}
