"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useLanguage } from "./language-context"
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
    <div
      className={`retro-browser relative isolate rounded-sm ${highlight ? "overflow-visible" : "overflow-hidden"} flex flex-col transition-all duration-300 w-full h-72 md:h-80
        ${highlight
          ? "border-2 border-cyan-400 bg-black shadow-xl shadow-cyan-400/40 hover:shadow-cyan-400/70"
          : "border border-neon-green bg-black shadow-lg shadow-neon-green/20 hover:shadow-neon-green/40"}
      `}
    >
      {highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full ai-molecule-aura z-0"
        />
      )}
      <div
        className={`browser-title-bar flex items-center justify-between p-2 border-b
        ${highlight
          ? "bg-cyan-950 border-cyan-400"
          : "bg-gradient-to-r from-gray-900 to-gray-800 border-neon-green"}
      `}
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${highlight ? "bg-cyan-400" : "bg-red-500"}`}></div>
          <div className={`w-3 h-3 rounded-full mr-2 ${highlight ? "bg-cyan-200" : "bg-yellow-500"}`}></div>
          <div className={`w-3 h-3 rounded-full mr-2 ${highlight ? "bg-cyan-600" : "bg-green-500"}`}></div>
          <span className={`text-lg font-bold ${highlight ? "text-neon-cyan" : "text-neon-green"}`}>{resolvedTitle.toUpperCase()}</span>
        </div>
      </div>

      <div className={`browser-content p-4 flex-1 ${highlight ? "bg-black" : ""}`} style={{ position: "relative", zIndex: 10 }}>
        {children ? (
          children
        ) : (
          <Link href={`/work/${slug}`}>
            <div className="cursor-pointer h-full flex flex-col justify-between">
              <div className="year-client pl-4">
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
              <div className={`access-data text-center mt-4 font-bold text-lg ${highlight ? "text-cyan-400" : ""}`}>{t("access_data")}</div>
            </div>
          </Link>
        )}
      </div>

      <div
        className={`browser-status-bar p-1 border-t flex justify-between
        ${highlight ? "bg-cyan-950 border-cyan-400" : "bg-gray-900 border-neon-green"}
      `}
        style={{ position: "relative", zIndex: 10 }}
      >
        <span className={`text-xs ${highlight ? "text-cyan-400" : "text-neon-green"}`}>Done</span>
        <span className={`text-xs ${highlight ? "text-cyan-400" : "text-neon-green"}`}>{resolvedYear}</span>
      </div>
    </div>
  )
}
