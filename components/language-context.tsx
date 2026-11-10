"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import translations from "@/translations"
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_PARAM,
  LANGUAGE_STORAGE_KEY,
  isSiteLanguage,
  type SiteLanguage,
} from "@/lib/site-state"

type Language = SiteLanguage

type TranslationMap = Record<string, string>

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The server always renders the default language; the visitor's one is applied after load.
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)

  // ?lang= wins and is remembered; without it, the last choice; without that, the default.
  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get(LANGUAGE_PARAM)
      if (isSiteLanguage(fromUrl)) {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, fromUrl)
        setLanguageState(fromUrl)
        return
      }
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (isSiteLanguage(stored)) setLanguageState(stored)
    } catch {
      // noop
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next)
      // A ?lang= left in the address would bring the old language back on reload.
      const url = new URL(window.location.href)
      if (url.searchParams.has(LANGUAGE_PARAM)) {
        url.searchParams.delete(LANGUAGE_PARAM)
        window.history.replaceState(window.history.state, "", url)
      }
    } catch {
      // noop
    }
    setLanguageState(next)
  }, [])

  const t = (key: string): string => {
    const dictionary = translations[language] as TranslationMap
    return dictionary[key] ?? key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}