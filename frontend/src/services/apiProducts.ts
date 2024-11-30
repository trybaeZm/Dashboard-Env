import { supabase } from "./SupabaseConfig";

export async function getProducts(){
  
let { data, error } = await supabase
.from('products')
.select('*')


if(error){console.log(error);
  throw new Error("an error occured while fetching all products")} 

return data;

}