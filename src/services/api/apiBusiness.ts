import { supabase } from './../SupabaseConfig';

interface Business {
    id?: string;
    business_name: string;
    industry?: string;
    registration_number?: string;
    created_at?: string;
    deleted_at?: string | null;
}

// Get all businesses
export async function getBusinesses(): Promise<Business[] | null> {
    try {
        const { data, error } = await supabase.from('businesses').select('*');

        if (error) {
            console.error("Error fetching businesses:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching businesses:", err);
        return null;
    }
}

// Get a specific business by ID
export async function getBusinessById(id: string): Promise<Business | null> {
    try {
        const { data, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching business:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching business:", err);
        return null;
    }
}

// Create a new business
export async function createBusiness(newData: Business): Promise<Business | null> {
    try {
        const { data, error } = await supabase
            .from('businesses')
            .insert(newData)
            .select()
            .single();

        if (error) {
            console.error("Error creating business:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error creating business:", err);
        return null;
    }
}

// Update a business by ID
export async function updateBusiness(id: string, updatedData: Partial<Business>): Promise<Business | null> {
    try {
        const { data, error } = await supabase
            .from('businesses')
            .update(updatedData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Error updating business:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error updating business:", err);
        return null;
    }
}

// Soft-delete a business (update deleted_at timestamp)
export async function softDeleteBusiness(id: string): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('businesses')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error("Error deleting business:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error deleting business:", err);
        return false;
    }
}
