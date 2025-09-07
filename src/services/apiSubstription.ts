import { supabase } from './SupabaseConfig'; 
import { Subscription } from '@/types/Subscription'; 

// ✅ Create Subscription
export async function createSubscription(newSubscription: Omit<Subscription, 'subscription_id'>): Promise<Subscription | null> {
    try {
        const { data, error } = await supabase
            .from('subscriptions')
            .insert([{
                user_id: newSubscription.user_id,
                plan_id: newSubscription.plan_id,
                start_date: newSubscription.start_date ?? new Date().toISOString(),
                end_date: newSubscription.end_date ?? null,
                status: newSubscription.status ?? 'Active',
            }])
            .single();

        if (error) {
            console.error("Error creating subscription:", error.message);
            return null;
        }

        console.log("Subscription created successfully:", data);
        return data;
    } catch (err) {
        console.error("Unexpected error creating subscription:", err);
        return null;
    }
}

// ✅ Get All Subscriptions
export async function getAllSubscriptions(): Promise<Subscription[] | null> {
    try {
        const { data, error } = await supabase
            .from('subscriptions')
            .select('*');

        if (error) {
            console.error("Error fetching subscriptions:", error.message);
            return null;
        }

        console.log("Subscriptions fetched successfully:", data);
        return data;
    } catch (err) {
        console.error("Unexpected error fetching subscriptions:", err);
        return null;
    }
}

// ✅ Get Subscriptions by User ID
export async function getSubscriptionsByUserId(userId: number): Promise<Subscription[] | null> {
    try {
        const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error("Error fetching subscriptions:", error.message);
            return null;
        }

        console.log("Subscriptions fetched successfully:", data);
        return data;
    } catch (err) {
        console.error("Unexpected error fetching subscriptions:", err);
        return null;
    }
}

// ✅ Get Subscriptions by Plan ID
export async function getSubscriptionsByPlanId(planId: number): Promise<Subscription[] | null> {
    try {
        const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('plan_id', planId);

        if (error) {
            console.error("Error fetching subscriptions:", error.message);
            return null;
        }

        console.log("Subscriptions fetched successfully:", data);
        return data;
    } catch (err) {
        console.error("Unexpected error fetching subscriptions:", err);
        return null;
    }
}

// ✅ Update Subscription
export async function updateSubscription(subscriptionId: number, updatedSubscription: Partial<Omit<Subscription, 'subscription_id'>>): Promise<Subscription | null> {
    try {
        const { data, error } = await supabase
            .from('subscriptions')
            .update(updatedSubscription)
            .eq('subscription_id', subscriptionId)
            .single();

        if (error) {
            console.error("Error updating subscription:", error.message);
            return null;
        }

        console.log("Subscription updated successfully:", data);
        return data;
    } catch (err) {
        console.error("Unexpected error updating subscription:", err);
        return null;
    }
}

// ✅ Delete Subscription
export async function deleteSubscription(subscriptionId: number): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('subscriptions')
            .delete()
            .eq('subscription_id', subscriptionId);

        if (error) {
            console.error("Error deleting subscription:", error.message);
            return false;
        }

        console.log("Subscription deleted successfully");
        return true;
    } catch (err) {
        console.error("Unexpected error deleting subscription:", err);
        return false;
    }
}
