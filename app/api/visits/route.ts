import { NextResponse } from "next/server"

type VisitSource = "kv" | "disabled"

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

  try {
    const response = await fetch(`${baseUrl}/incr/portfolio_visits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return degraded("kv")
    }

    const result = await response.json()
    const rawCount = result?.result
    const count = typeof rawCount === "number" ? rawCount : Number(rawCount)

    if (!Number.isFinite(count)) {
      return degraded("kv")
    }

    return NextResponse.json({
      count,
      available: true,
      source: "kv",
    })
  } catch {
    return degraded("kv")
  }
}