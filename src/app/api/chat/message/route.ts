import { supabase } from '@/services/SupabaseConfig'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sessionId, sender, text } = await req.json()

    // Store the message
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          session_id: sessionId,
          sender,      // 'customer' or 'ai'
          content: text
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ message: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
