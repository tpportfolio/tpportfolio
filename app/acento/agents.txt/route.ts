import { buildAcentoAgentsText } from "../_content/agents"

export const dynamic = "force-static"
export const revalidate = 86400

export async function GET() {
  return new Response(buildAcentoAgentsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}
