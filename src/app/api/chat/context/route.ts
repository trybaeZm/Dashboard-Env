import { supabase } from '@/services/SupabaseConfig'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sessionId, lastIntent, productId, orderId } = await req.json()

    const updates: any = { last_intent: lastIntent, updated_at: new Date() }
    if (productId) updates.last_product_id = productId
    if (orderId) updates.last_order_id = orderId

    const { data, error } = await supabase
      .from('chat_context')
      .update(updates)
      .eq('session_id', sessionId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ context: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
