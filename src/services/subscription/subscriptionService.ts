import { hasSubscribers } from "node:diagnostics_channel";
import { supabase } from "../SupabaseConfig"
import { Subscription } from "@/types/Subscription";


function hasDurationExpired(created_at: Date, durationInDays: number) {
    // Convert to Date objects if not already
    const startDate = new Date(created_at);
    const currentDate = new Date();


    // Calculate the end date by adding the duration
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationInDays);

    // Compare
    return currentDate < endDate;
}


export const checkSub = async (userId: string) => {
    console.log('checking subscription status...')
    let userdata = null
    let CheckitstillValid = false
    try {

        if (!userId) {
            console.log("User ID not found in cookies");
            return userdata; // directly return the fetched data
        } {

            //gets active subscriptions
            const { data, error } = await supabase
                .from("sunhistory")
                .select("*, subscriptionTable(*)")
                .eq("userId", userId)
                .eq('isactive', true)
                .single(); // returns one object instead of array


            if (data) {
                let duration = data.subscriptionTable.duration_in_days;
                CheckitstillValid = hasDurationExpired(data.created_at, duration)

                let retrievedSubhistData = data;

                if (!CheckitstillValid) {
                    try {
                        const { data, error } = await supabase
                            .from("sunhistory")
                            .update({ isactive: false })
                            .eq('id', retrievedSubhistData.id)
                            .select('*')
                            .single()

                        if (data) {
                            console.log('sub updated to nolonger active')
                        }
                        if (error) {
                            console.log('failed to update subdata')
                        }
                    } catch (error) {
                        console.log('some error i guess')
                    }
                }

                
            } else if (error) {
                console.error("Error fetching user:", error.message);
                console.log(error);
            }

            // console.log("these are the details retrieved: ", data)

            try {

                const { data, error } = await supabase
                    .from('users')
                    .update({ hasSubscription: CheckitstillValid })
                    .eq('id', userId)
                    .select('*')
                    .single()

                if (data) {
                    userdata = data;
                }

                if (error) {

                }
            } catch (error) {

            }

            // console.log('subscription id: ', userdata)
        }

        console.log(userdata)
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
                .insert({ subid: subId, userId: userID, types: 'normal', amount: amount })
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