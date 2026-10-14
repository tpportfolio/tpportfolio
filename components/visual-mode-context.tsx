"use client"

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"

export type VisualMode = "dark" | "light"

// Written only when the visitor uses the switch. Without it, the site follows the system setting.
// (The older "tp.visual-mode" key was written on every visit, so it does not tell a choice apart.)
const STORAGE_KEY = "tp.visual-mode.choice"

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
  const chosenRef = useRef(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "dark" || stored === "light") {
        chosenRef.current = true
        setModeState(stored)
        return
      }
    } catch {
      // noop
    }

    // No choice yet: follow the system (light or dark), also if it changes while the page is open.
    const system = window.matchMedia("(prefers-color-scheme: light)")
    const followSystem = () => {
      if (!chosenRef.current) setModeState(system.matches ? "light" : "dark")
    }
    followSystem()
    system.addEventListener("change", followSystem)
    return () => system.removeEventListener("change", followSystem)
  }, [])

  useEffect(() => {
    applyVisualMode(mode)
  }, [mode])

  const value = useMemo<VisualModeContextValue>(() => {
    const choose = (next: VisualMode) => {
      chosenRef.current = true
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // noop
      }
      setModeState(next)
    }
    return {
      mode,
      setMode: choose,
      toggleMode: () => choose(mode === "dark" ? "light" : "dark"),
    }
  }, [mode])

  return <VisualModeContext.Provider value={value}>{children}</VisualModeContext.Provider>
}

export function useVisualMode() {
  const context = useContext(VisualModeContext)
  if (!context) {
    throw new Error("useVisualMode must be used within a VisualModeProvider")
  }

  return context
}
