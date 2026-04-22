"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type VisualMode = "dark" | "light"

const STORAGE_KEY = "tp.visual-mode"

type VisualModeContextValue = {
  mode: VisualMode
  setMode: (mode: VisualMode) => void
  toggleMode: () => void
}

const VisualModeContext = createContext<VisualModeContextValue | null>(null)

function applyVisualMode(mode: VisualMode) {
  if (typeof document === "undefined") {
    return
  }

  document.documentElement.dataset.visualMode = mode
  document.documentElement.style.colorScheme = mode
}

export function VisualModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<VisualMode>("dark")

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "dark" || stored === "light") {
        setModeState(stored)
        applyVisualMode(stored)
        return
      }
    } catch {
      // noop
    }

    applyVisualMode("dark")
  }, [])

  useEffect(() => {
    applyVisualMode(mode)
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // noop
    }
  }, [mode])

  const value = useMemo<VisualModeContextValue>(
    () => ({
      mode,
      setMode: setModeState,
      toggleMode: () => setModeState((current) => (current === "dark" ? "light" : "dark")),
    }),
    [mode],
  )

  return <VisualModeContext.Provider value={value}>{children}</VisualModeContext.Provider>
}

export function useVisualMode() {
  const context = useContext(VisualModeContext)
  if (!context) {
    throw new Error("useVisualMode must be used within a VisualModeProvider")
  }

  return context
}
