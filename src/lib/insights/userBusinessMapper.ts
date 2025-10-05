import { supabase } from "@/services/SupabaseConfig";

export async function getBusinessIdForUser( userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('business_owners')
    .select('business_id')
    .eq('user_id', userId)
    .maybeSingle();

    console.log(data)


  if (error || !data) {
    console.log(error)
    return null};
  
  return data.business_id;
}
