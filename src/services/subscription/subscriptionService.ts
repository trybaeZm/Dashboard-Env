import { hasSubscribers } from "node:diagnostics_channel";
import { supabase } from "../SupabaseConfig"
import { Subscription } from "@/types/Subscription";

export const checkSub = async (userId: string) => {
    let userdata = null
    try {

        if (!userId) {
            console.log("User ID not found in cookies");
            return userdata; // directly return the fetched data
        } {
            const { data, error } = await supabase
                .from("users")
                .select("hasSubscription, created_at")
                .eq("id", userId)
                .single(); // returns one object instead of array

            if (error) {
                console.error("Error fetching user:", error.message);
                console.log(error);
            }

            userdata = data;
        }


        return userdata; // directly return the fetched data
    } catch (err) {
        console.log("checkSub error:", err);
        console.log(err);
    }
};

export const getSubscriptionsDetails = async () => {
    return new Promise<Subscription[] | null>(async (resolve, reject) => {
        try {
            const { data, error } = await supabase
                .from('subscriptionTable')
                .select('*')

            if (data) {
                resolve(data)
            }
            if (error) {
                reject(error)
            }

        } catch (err) {
            reject(err)
        }
    })
}

export const getSubDetails = async (userId: string) => {
    let subDetails = null
    try {
        if (!userId) {
            console.log("User ID not found in cookies");
            return subDetails; // directly return the fetched data
        } {
            const { data, error } = await supabase
                .from("subscriptions")
                .select(`*`)
                .eq("user_id", userId)

            if (error) {
                console.error("Error fetching subscription details:", error.message);
                console.log(error);
            }
            subDetails = data;
            console.log("Subscription details fetched:", data);
        }

        return subDetails;
    } catch (err) {
        console.log("getSubDetails error:", err);
        console.log(err);
    }
}

export const getSubscription = async (subId: string, userID: string, amount: number) => {
    new Promise(async (resolve, reject) => {
        try {
            const { data, error } = await supabase
                .from('sunhistory')
                .insert({ subid: subId, userId: userID, type: 'normal', amount: amount })
                .select('*')

            if (data) {
                const { data, error } = await supabase
                    .from('users')
                    .update({ hasSubscription: true })
                    .eq('id', userID)
                    .select('*')

                if (data) {
                    resolve(data)
                }

                if (error) {
                    reject(error)
                }

            }

            if (error) {
                reject(error)
            }

        } catch (err) {
            reject(err)
        }
    })
}