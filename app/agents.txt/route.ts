import { buildAgentsText } from "@/lib/agents"

export const dynamic = "force-static"

export async function GET() {
  return new Response(buildAgentsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}