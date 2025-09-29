import { openai } from '@/lib/utils'
import { supabase } from '@/services/SupabaseConfig'
import { NextResponse } from 'next/server'
import { ChatCompletionMessageParam } from 'openai/resources/index'

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

function buildSystemPrompt(context: any, chunks: any[]) {
  let prompt = `
You are Lenny, the AI business assistant for Inxource. 
Your mission is to help SMEs grow by analyzing their business data, identifying opportunities, and providing clear, actionable insights. 
You are professional yet approachable, proactive, and solution-oriented. 
Keep all responses under 250 words and include clear action steps and a fact-check list.
`

  // Add business info
  prompt += `\nBusiness ID: ${context?.last_business_id || 'N/A'}`
  if (context?.last_intent) {
    prompt += `\nLast known intent: ${context.last_intent}`
  }

  // Add relevant chunks
  if (chunks.length) {
    prompt += `\n\nRelevant database info:\n`
    chunks.forEach((c, i) => {
      prompt += `[${i + 1}] ${c.chunk_text}\n`
    })
  }

  // Final reminder
  prompt += `\nAlways end your answer with a "Fact-Check List".`

  return prompt
}


function buildMessages(messages: any[], userMessage: string): ChatCompletionMessageParam[] {
  const formatted: ChatCompletionMessageParam[] = messages
    .filter((msg) => msg.sender === 'user' || msg.sender === 'ai')
    .map((msg) => {
      // Only add 'name' if required by the role (e.g., 'function')
      if (msg.sender === 'function' && msg.name) {
        return {
          role: 'function',
          content: msg.content,
          name: msg.name,
        };
      }
      return {
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      };
    });

  // Add the latest user message at the end
  formatted.push({ role: 'user', content: userMessage });

  return formatted;
}


async function getChatHistory(sessionId: number) {
  const { data: messages, error: msgError } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(10)

  if (msgError) throw msgError

  const { data: context, error: ctxError } = await supabase
    .from('chat_context')
    .select('*')
    .eq('session_id', sessionId)
    .single()

  if (ctxError && ctxError.code !== 'PGRST116') throw ctxError // ignore "not found"

  return { messages: messages || [], context: context || {} }
}


export async function POST(req: Request) {
  try {
    const { sessionId, userMessage, businessId } = await req.json()

    if (!sessionId || !userMessage || !businessId) {
      return NextResponse.json(
        { error: "sessionId, userMessage, and businessId are required" },
        { status: 400 }
      )
    }

    // Save user message
    await supabase.from('chat_messages').insert([
      { session_id: sessionId, sender: 'user', content: userMessage },
    ])

    // Get chat + context
    const { messages, context } = await getChatHistory(sessionId)

    // Get relevant chunks
    const chunks = await getRelevantChunks(userMessage, businessId)

    // Build system + conversation messages
    const systemPrompt = buildSystemPrompt(context, chunks)
    const conversation: ChatCompletionMessageParam[] = buildMessages(messages, userMessage)

    // OpenAI call
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversation,
      ],
    })

    const aiReply = completion.choices[0].message?.content ?? "..."

    // Save AI reply
    await supabase.from('chat_messages').insert([
      { session_id: sessionId, sender: 'ai', content: aiReply },
    ])

    return NextResponse.json({ reply: aiReply })
  } catch (err: any) {
    console.error("Embedding error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
