import { buildAcentoAgentsMarkdown } from "../_content/agents"

export const dynamic = "force-static"
export const revalidate = 604800

export async function GET() {
  return new Response(buildAcentoAgentsMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}
