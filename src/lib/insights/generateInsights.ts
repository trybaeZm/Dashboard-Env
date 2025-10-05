import { openai } from '../openai';
import { getBusinessIdForUser } from './userBusinessMapper';
import { readOsSnapshots } from './snapshotReader';
import { buildPromptFromOS } from './buildPrompt';
import { GenerateParams, Insight } from '@/types/aiinsights/insightsTypes';
import { hashText, nowIso } from './utils';

export async function generateInsightsAndStore({
  supabase,
  userId,
  businessId,
  model = 'gpt-4o-mini',
}: GenerateParams): Promise<Insight[]> {

  
  console.log(businessId)
  if (!businessId) {
    businessId = await getBusinessIdForUser(userId);
    console.log(businessId)
    if (!businessId) return [];
  }

  const osData = await readOsSnapshots(supabase, businessId);
  const prompt = buildPromptFromOS(osData);

  const resp = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: 'You write brief, actionable business insights.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.3,
  });

  const created: any[] = [];

  const content = (resp.choices[0]?.message?.content || '').trim();
  const lines = content
    .split('\n')
    .map((l) => l.trim().replace(/^[-•\s]*/, ''))
    .filter(Boolean)
    .slice(0, 3);

  for (const line of lines) {
    const insightType = 'lenny_insight';
    const hash = hashText(line);
    const { data: existing } = await supabase
      .from('ai_insights')
      .select('id')
      .eq('business_id', businessId)
      .eq('insight_type', insightType)
      .eq('hash', hash)
      .maybeSingle();

    if (existing) continue;

    const timestamp = nowIso();
    const row = {
      business_id: businessId,
      title: line.slice(0, 60),
      summary: line,
      insight_type: insightType,
      insight_data: { source: 'os_tables' },
      confidence: 0.8,
      generated_at: timestamp,
      source_refs: { tables: Object.keys(osData).filter((k) => osData[k].length) },
      model_version: model,
      hash,
      created_at: timestamp,
      updated_at: timestamp,
    };

    const { data: inserted } = await supabase
      .from('ai_insights')
      .insert([row])
      .select('*')
      .maybeSingle();

    if (inserted) created.push(inserted);
  }

  return created;
}
