export async function readOsSnapshots(supabase: any, businessId: string, authToken?: string) {
  const { data, error } = await supabase
    .from('os_snapshots')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) return {};
  return data[0];
}
