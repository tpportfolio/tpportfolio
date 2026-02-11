import { NextResponse } from "next/server";

export async function POST() {
  try {
    const baseUrl = process.env.KV_REST_API_URL!;
    const token = process.env.KV_REST_API_TOKEN!;

    // Upstash KV style increment:
    // POST <baseUrl>/incr/<key>
    const response = await fetch(`${baseUrl}/incr/portfolio_visits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Upstash KV error:", response.status);
      return NextResponse.json(
        { count: null, error: "KV increment failed" },
        { status: 500 }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      count: result.result,
    });
  } catch (err) {
    console.error("KV counter exception:", err);
    return NextResponse.json(
      { count: null, error: "KV exception" },
      { status: 500 }
    );
  }
}
