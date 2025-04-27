// src/app/api/chat-session/route.ts
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  const session_id = searchParams.get("session_id");

  if (!user_id || !session_id) {
    return new Response(JSON.stringify({ error: "Missing user_id or session_id" }), { status: 400 });
  }

  try {
    const res = await fetch(`http://127.0.0.1:8000/chat-session?user_id=${user_id}&session_id=${session_id}`);
    if (!res.ok) throw new Error("Server returned error");

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: any) {
    console.error("❌ /api/chat-session error:", err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
