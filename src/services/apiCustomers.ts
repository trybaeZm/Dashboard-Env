import { supabase } from './SupabaseConfig';
import { Customers } from '@/types/Customers';
import Swal from 'sweetalert2';

export async function getCustomers() {
    try {
        const { data, error } = await supabase.from('customers').select('*');

        if (error) {
            console.error("Error fetching customers:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching customers:", err);
        return null;
    }
}

export async function getCustomer(customerId: number): Promise<Customers | null> {
    try {
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .eq('customer_id', customerId)
            .single();

        if (error) {
            console.error("Error fetching customer:", error.message);
            return null;
        }

        if (data === null) {
            return null;
        }

        return data as Customers;
    } catch (err) {
        console.error("Unexpected error fetching customer:", err);
        return null;
    }
}

export async function updateCustomer(customerId: number, updatedData: Customers): Promise<Customers | null> {
    try {
        const { data, error } = await supabase
            .from('customers')
            .update(updatedData)
            .eq('customer_id', customerId);

        if (error) {
            console.error("Error updating customer:", error.message);
            return null;
        }

        if (data === null) {
            return null;
        }

        console.log("Customer updated successfully:", data);
        return data as Customers;
    } catch (err) {
        console.error("Unexpected error updating customer:", err);
        return null;
    }
}


// users should not be able to delete customers
export async function deleteCustomer(customerId: string): Promise<Customers | null> {
    try {
        // console.log('deleting data')
        // this line is working just fine i think lololool...
        const { data, error } = await supabase
            .from('customers')
            .delete()
            .eq('id', `${customerId}`);
            
            // error handling
        if (error) {
            console.error("Error deleting customer:", error.message);
            return null;
        }

        // if success but table returns empty array
        if (data === null) {
            return null;
        }

        console.log("Customer deleted successfully:", data);
        // returns array if data has a value
        return data as Customers;
    } catch (err) {
        console.error("Unexpected error deleting customer:", err);
        return null;
    }
}

