"use client"

import { useEffect, useState } from "react"

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    let active = true

    async function update() {
      try {
        const res = await fetch("/api/visits", { method: "POST" })
        if (!res.ok) {
          if (active) {
            setAvailable(false)
          }
          return
        }

        const data = await res.json()
        if (!active) {
          return
        }

        if (data?.available === false) {
          setAvailable(false)
          return
        }

        if (typeof data?.count === "number") {
          setAvailable(true)
          setCount(data.count)
          return
        }

        setAvailable(false)
      } catch {
        if (active) {
          setAvailable(false)
        }
      }
    }

    update()

    return () => {
      active = false
    }
  }, [])

  const displayValue = available ? String(count ?? 0).padStart(5, "0") : "-----"

  return <span>ACCESS_COUNT:{displayValue}</span>
}