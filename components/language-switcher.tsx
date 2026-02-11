"use client"

import { useLanguage } from "./language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage("es")}
        className={`px-2 py-1 text-xs border ${
          language === "es" ? "border-neon-green text-neon-green" : "border-gray-600 text-gray-400"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-xs border ${
          language === "en" ? "border-neon-green text-neon-green" : "border-gray-600 text-gray-400"
        }`}
      >
        EN
      </button>
    </div>
  )
}
