import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return new Response(JSON.stringify({ error: "Missing user_id" }), { status: 400 });
  }

  try {
    const res = await fetch(`http://127.0.0.1:8000/chat-history?user_id=${user_id}`);
    const data = await res.json();
    return new Response(JSON.stringify({ history: data.history }), { status: 200 });
  } catch (err) {
    console.error("❌ Chat history fetch error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
