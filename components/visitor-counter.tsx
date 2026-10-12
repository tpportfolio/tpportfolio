"use client"

import { useEffect, useState } from "react"

const LAST_COUNT_KEY = "tp_last_visit_count"

function readLastCount() {
  try {
    const stored = Number(window.localStorage.getItem(LAST_COUNT_KEY))
    return Number.isFinite(stored) && stored > 0 ? stored : null
  } catch {
    return null
  }
}

export default function VisitorCounter() {
  // null = not known yet. The counter never shows zero while the real number is loading or unreachable.
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let active = true

    const lastKnown = readLastCount()
    if (lastKnown !== null) {
      setCount(lastKnown)
    }

    async function update() {
      try {
        const res = await fetch("/api/visits", { method: "POST" })
        if (!res.ok) {
          return
        }

        const data = await res.json()
        if (!active || data?.available === false || typeof data?.count !== "number") {
          return
        }

        setCount(data.count)
        try {
          window.localStorage.setItem(LAST_COUNT_KEY, String(data.count))
        } catch {
          // Storage can be blocked; the counter still works without it.
        }
      } catch {
        // Keep the last known value.
      }
    }

    update()

    return () => {
      active = false
    }
  }, [])

  const displayValue = count === null ? "-----" : String(count).padStart(5, "0")

  return <span>ACCESS_COUNT:{displayValue}</span>
}
