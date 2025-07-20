import { OrderData } from '@/types/Orders';
import { supabase } from './../SupabaseConfig';

export interface Withdrawal {
    id?: string;
    business_id: string;
    amount: number;
    method: 'mobile' | 'bank';
    account_details: string;
    status?: 'pending' | 'approved' | 'rejected' | 'processed';
    requested_at?: string;
    processed_at?: string | null;
}

export async function getWithdrawals(): Promise<Withdrawal[] | null> {
    try {
        const { data, error } = await supabase
            .from('withdrawals')
            .select('*');

        if (error) {
            console.error("Error fetching withdrawals:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching withdrawals:", err);
        return null;
    }
}

export async function getWithdrawalById(id: string): Promise<Withdrawal | null> {
    try {
        const { data, error } = await supabase
            .from('withdrawals')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching withdrawal:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching withdrawal:", err);
        return null;
    }
}

export async function createWithdrawal(withdrawalData: Withdrawal): Promise<Withdrawal | null> {
    try {
        const newData: Withdrawal = {
            business_id: withdrawalData.business_id,
            amount: withdrawalData.amount,
            method: withdrawalData.method,
            status: 'pending',
            account_details: withdrawalData.account_details,
        };

        const { data, error } = await supabase
            .from('withdrawals')
            .insert([newData]) // ← array is required by Supabase insert
            .select()
            .single();

        if (error) {
            console.error("❌ Error creating withdrawal:", error.message);
            return null;
        }

        console.log("✅ Withdrawal was a success:", data);
        return data;

    } catch (err) {
        console.error("🔥 Unexpected error creating withdrawal:", err);
        return null;
    }

}

export async function updateWithdrawal(id: string, updatedData: Partial<Withdrawal>): Promise<Withdrawal | null> {
    try {
        const { data, error } = await supabase
            .from('withdrawals')
            .update(updatedData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Error updating withdrawal:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error updating withdrawal:", err);
        return null;
    }
}

export async function deleteWithdrawal(id: string): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('withdrawals')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting withdrawal:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error deleting withdrawal:", err);
        return false;
    }
}

export async function getWithdrawalsByBusinessId(business_id: string | null | undefined): Promise<{ withdrawData: Withdrawal[]; balance: number } | null> {
    let withdrawData: Withdrawal[] = [];
    let balance = 0;

    try {
        const { data, error } = await supabase
            .from('withdrawals')
            .select('*')
            .eq('business_id', business_id)
            .order('requested_at', { ascending: false });

        if (error) {
            console.error("Error fetching withdrawals for business:", error.message);
            return null;
        }

        withdrawData = data;
    } catch (err) {
        console.error("Unexpected error fetching business withdrawals:", err);
        return null;
    }


    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('business_id', business_id)

        if (error) {
            console.error("Error fetching withdrawals for business:", error.message);
            return null;
        }

        let orders: OrderData[] = data

        balance = orders.reduce((prev, curr) => prev + (curr.total_amount || 0), 0) - withdrawData.filter((e)=> e.status == "processed").reduce((prev, cur)=> prev + (cur.amount || 0),0);

    } catch (err) {
        console.error("Unexpected error fetching business withdrawals:", err);
        return null;
    }

    return { withdrawData: withdrawData, balance: balance };
}

export async function getWalletBalance(businessId: string | undefined | null | number): Promise<number | null> {
    try {
        const { data, error } = await supabase
            .from('businesses')
            .select('wallet_balance')
            .eq('id', businessId)
            .single();

        if (error) {
            console.error("Error fetching wallet balance:", error.message);
            return null;
        }

        return data.wallet_balance;
    } catch (err) {
        console.error("Unexpected error fetching wallet balance:", err);
        return null;
    }
}

