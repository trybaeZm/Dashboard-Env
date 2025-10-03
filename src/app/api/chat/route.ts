import { openai } from '@/lib/utils'
import { supabase } from '@/services/SupabaseConfig'
import { NextResponse } from 'next/server'
import { ChatCompletionMessageParam } from 'openai/resources/index'

export async function getRelevantChunks(userMessage: string, businessId: string, userId: string) {
  try {
    console.log('📥 Generating embedding for user message...')

    // 1. Generate embedding
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: userMessage,
    })

    const userEmbedding = embeddingResponse.data[0].embedding

    // 2. Query Supabase RPC
    console.log(`📡 Fetching chunks for business_id=${businessId}, user_id=${userId}...`)
    const { data: chunks, error } = await supabase.rpc('match_rag_chunks', {
      query_embedding: userEmbedding,
      p_user_id: userId,
      p_business_id: businessId,
      p_limit: 5,
    })

    if (error) {
      console.error('❌ Chunk fetch error:', error)
      return { chunks: [], error: error.message }
    }

    console.log(`✅ Retrieved ${chunks?.length || 0} chunks.`)
    return { chunks: chunks || [] }
  } catch (err: any) {
    console.error('🔥 Unexpected error in getRelevantChunks:', err)
    return { chunks: [], error: err.message }
  }
}

function buildSystemPrompt(context: any, chunks: any[]) {
  // 🎯 Base assistant persona
  let prompt = `You are Lenny, the AI business assistant for Inxource. 
Your mission is to help SMEs grow by analyzing their business data, identifying opportunities, and providing clear, actionable insights. 
You are professional yet approachable, proactive, and solution-oriented. 
Keep all responses under 250 words and include clear action steps and a fact-check list.
`;

  // 📊 Add business context
  prompt += `\n\n📌 Business Context:`;
  prompt += `\n- Business ID: ${context?.last_business_id || 'N/A'}`;
  if (context?.last_intent) {
    prompt += `\n- Last Known Intent: ${context.last_intent}`;
  }

  // 📚 Add relevant chunks
  if (chunks?.length > 0) {
    prompt += `\n\n📚 Relevant Database Info:\n`;
    chunks.forEach((c, i) => {
      const title = c.title || c.source_table || `Chunk ${i + 1}`;
      prompt += `[${i + 1}] (${title}) ${c.chunk_text}\n`;
    });
  }

  // ✅ Reminder
  prompt += `\n\nAlways end your answer with a "Fact-Check List".`;

  return prompt.trim();
}


function buildMessages(
  messages: any[],
  userMessage: string,
  businessContext?: string
): ChatCompletionMessageParam[] {
  // Map chat history
  const formatted: ChatCompletionMessageParam[] = messages
    .filter((msg) => msg.sender === "user" || msg.sender === "ai")
    .map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.content,
    }));

  // Build the latest user turn
  let latestUserContent = userMessage;
  if (businessContext) {
    latestUserContent = `${businessContext}\n\nUser's Question: ${userMessage}`;
  }

  formatted.push({
    role: "user",
    content: latestUserContent,
  });

  return formatted;
}



export async function getChatHistory(sessionId: number): Promise<{
  messages: ChatCompletionMessageParam[]
  context: Record<string, any>
}> {
  // 1. Fetch messages
  const { data: rawMessages, error: msgError } = await supabase
    .from("chat_messages")
    .select("sender, content, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(10)

  if (msgError) throw msgError

  // 2. Format messages into OpenAI format
  const messages: ChatCompletionMessageParam[] = (rawMessages || []).map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.content,
  }))

  // 3. Fetch context
  const { data: context, error: ctxError } = await supabase
    .from("chat_context")
    .select("*")
    .eq("session_id", sessionId)
    .single()

  if (ctxError && ctxError.code !== "PGRST116") throw ctxError

  return {
    messages,
    context: context || {},
  }
}

export async function POST(req: Request) {
  try {
    const { sessionId, userMessage, businessId, userId } = await req.json()

    if (!sessionId || !userMessage || !businessId) {
      return NextResponse.json(
        { error: 'sessionId, userMessage, and businessId are required' },
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
    const chunks = await getRelevantChunks(userMessage, businessId, userId)

    // Build prompts
    const systemPrompt = buildSystemPrompt(context, chunks.chunks)
    const conversation: ChatCompletionMessageParam[] = buildMessages(messages, userMessage)

    // OpenAI call
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, ...conversation],
    })

    const aiReply = completion.choices[0].message?.content ?? '...'

    // Save AI reply
    await supabase.from('chat_messages').insert([
      { session_id: sessionId, sender: 'ai', content: aiReply },
    ])

    // 🔥 Update or insert chat_context
    await supabase.from('chat_context').upsert({
      session_id: sessionId,
      last_business_id: businessId,
      last_intent: userMessage, // or extract intent from aiReply later
      updated_at: new Date(),
    })

    return NextResponse.json({ reply: aiReply })
  } catch (err: any) {
    console.error('Embedding error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}