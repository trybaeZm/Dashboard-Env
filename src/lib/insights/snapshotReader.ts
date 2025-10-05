export async function readOsSnapshots(supabase: any, businessId: string) {
  const out: Record<string, any[]> = {};

  const tables = [
    { table: 'ai_churn_scores', key: 'churn' },
    { table: 'ai_inventory_plans', key: 'inventory' },
    { table: 'ai_price_tests', key: 'pricing' },
  ];

  for (const { table, key } of tables) {
    const { data } = await supabase
      .from(table)
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(2000);

    out[key] = data || [];
  }

  return out;
}
