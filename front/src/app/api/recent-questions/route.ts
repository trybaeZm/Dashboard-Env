import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // To make sure SSR is fresh

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return new Response(JSON.stringify({ error: "Missing user_id" }), { status: 400 });
  }

  try {
    const res = await fetch(`http://127.0.0.1:8000/recent-questions?user_id=${user_id}`);
    if (!res.ok) throw new Error("Error fetching recent questions");
    const data = await res.json();

    return new Response(JSON.stringify({ recent: data.recent }), { status: 200 });
  } catch (err: any) {
    console.error("❌ Error in recent-questions API:", err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
