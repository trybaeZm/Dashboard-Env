import { supabase } from '@/services/SupabaseConfig'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function getRelevantChunks(userMessage: string, businessId: string) {
  // Embed the user message
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: userMessage
  })
  const userEmbedding = embeddingResponse.data[0].embedding

  // Query Supabase vector table
  const { data: chunks } = await supabase.rpc('match_rag_chunks', {
    query_embedding: userEmbedding,
    business_id: businessId,
    match_count: 5
  })

  return chunks || []
}

async function getChatHistory(sessionId: number) {
  const { data: messages, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(10)

  if (error) throw error

  const { data: context } = await supabase
    .from('chat_context')
    .select('*')
    .eq('session_id', sessionId)
    .single()

  return { messages, context }
}
function buildPrompt(messages: any[], context: any, chunks: any[]) {
  // 1️⃣ Start with the system prompt (Lenny)
  let prompt = `
You are Lenny, the AI business assistant for Inxource.
Your mission is to help SMEs grow by analyzing their business data, identifying opportunities, and providing clear, actionable insights. 
You are professional yet approachable, proactive, and solution-oriented.
Keep all responses under 250 words and include clear action steps and a fact-check list.
`;

  // 2️⃣ Add business-specific context
  prompt += `Business ID: ${context?.last_business_id || 'N/A'}\n`
  if (context?.last_intent) {
    prompt += `Last known intent: ${context.last_intent}\n`
  }

  // 3️⃣ Add relevant RAG chunks
  if (chunks.length) {
    prompt += `\nRelevant database information:\n`
    chunks.forEach((c) => {
      prompt += `- ${c.chunk_text}\n`
    })
  }

  // 4️⃣ Add recent conversation history
  if (messages.length) {
    prompt += `\nConversation history:\n`
    messages.forEach((msg) => {
      prompt += `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.content}\n`
    })
  }

  // 5️⃣ AI reply placeholder
  prompt += "\nAI:"

  return prompt
}


export async function POST(req: Request) {
  try {
    const { sessionId, userMessage, businessId } = await req.json()

    // 1. Save user message
    await supabase.from('chat_messages').insert([
      { session_id: sessionId, sender: 'user', content: userMessage }
    ])

    // 2. Get chat history + context
    const { messages, context } = await getChatHistory(sessionId)


    // 3. build get chunk
    const chunks = await getRelevantChunks(userMessage, businessId)

    // 3. Build prompt
    const prompt = buildPrompt(messages || [], context || {}, chunks || [] )

    // 4. Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })

    const aiReply = completion.choices[0].message?.content ?? "..."

    // 5. Save AI reply
    await supabase.from('chat_messages').insert([
      { session_id: sessionId, sender: 'ai', content: aiReply }
    ])

    // 6. Return AI reply
    return NextResponse.json({ reply: aiReply })

  } catch (err: any) {

    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
