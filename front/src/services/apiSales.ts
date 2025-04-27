import { supabase } from "./SupabaseConfig";

export async function getSales(){
  

  let { data, error } = await supabase
  .from('sales')
  .select('*')



if(error){console.log(error);
  throw new Error("an error occured while fetching all sales")} 

return data;

}