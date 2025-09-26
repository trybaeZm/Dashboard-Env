import { supabase } from "@/services/SupabaseConfig"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId, businessId } = await req.json()

    // Create chat session
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([
        {
          user_id: userId,       // <-- updated from customer_id
          business_id: businessId
        }
      ])
      .select()
      .single()

    if (error) throw error

    // Initialize chat context for this session
    await supabase.from('chat_context').insert([
      { session_id: data.id }
    ])

    return NextResponse.json({ session: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}