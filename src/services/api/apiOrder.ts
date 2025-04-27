import { supabase } from './../SupabaseConfig';

interface Order {
    id?: string;
    business_id?: string | null;
    customer_id?: string | null;
    total_amount: number;
    order_status: 'pending' | 'completed' | 'cancelled' | 'shipped'; 
    created_at?: string;
    updated_at?: string;
}

// Get all orders
export async function getOrders(): Promise<Order[] | null> {
    try {
        const { data, error } = await supabase.from('orders').select('*');

        if (error) {
            console.error("Error fetching orders:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching orders:", err);
        return null;
    }
}

// Get a specific order by ID
export async function getOrderById(id: string): Promise<Order | null> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching order:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching order:", err);
        return null;
    }
}

// Create a new order
export async function createOrder(newData: Order): Promise<Order | null> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert(newData)
            .select()
            .single();

        if (error) {
            console.error("Error creating order:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error creating order:", err);
        return null;
    }
}

// Update an order by ID
export async function updateOrder(id: string, updatedData: Partial<Order>): Promise<Order | null> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .update(updatedData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Error updating order:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error updating order:", err);
        return null;
    }
}

// Delete an order by ID
export async function deleteOrder(id: string): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting order:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error deleting order:", err);
        return false;
    }
}
