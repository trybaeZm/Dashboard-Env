import { supabase } from "./SupabaseConfig"

export const checkuserexists = async (id: string | null) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check is user exists in db
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)
                .single()
            if (data) {
                resolve(true)
            }
            if (error) {
                reject(false)
            }
        } catch (error) {
            reject(false)
        }
    })
}