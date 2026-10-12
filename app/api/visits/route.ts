import { NextResponse } from "next/server"

type VisitSource = "kv" | "disabled"

const VISITS_KEY = "portfolio_visits"
const KV_TIMEOUT_MS = 5000

function degraded(source: VisitSource) {
  return NextResponse.json({
    count: null,
    available: false,
    source,
  })
}

export async function POST() {
  const baseUrl = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN

  if (!baseUrl || !token) {
    return degraded("disabled")
  }

  // The count lives in the KV store, not in the code: deploys never reset it.
  // Only the production site adds visits; local runs and preview deploys just read the number.
  const countsVisit = process.env.VERCEL_ENV === "production"
  const readToken = process.env.KV_REST_API_READ_ONLY_TOKEN || token

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), KV_TIMEOUT_MS)

  try {
    const response = countsVisit
      ? await fetch(`${baseUrl}/incr/${VISITS_KEY}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
          signal: controller.signal,
        })
      : await fetch(`${baseUrl}/get/${VISITS_KEY}`, {
          headers: { Authorization: `Bearer ${readToken}` },
          cache: "no-store",
          signal: controller.signal,
        })

    if (!response.ok) {
      return degraded("kv")
    }

    const result = await response.json()
    const rawCount = result?.result
    const count = typeof rawCount === "number" ? rawCount : Number(rawCount)

    // A missing key reads as null: report it as unavailable instead of showing zero.
    if (rawCount === null || rawCount === undefined || !Number.isFinite(count)) {
      return degraded("kv")
    }

    return NextResponse.json({
      count,
      available: true,
      source: "kv",
      counted: countsVisit,
    })
  } catch {
    return degraded("kv")
  } finally {
    clearTimeout(timeout)
  }
}
