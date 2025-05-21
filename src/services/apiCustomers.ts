import { businessesType, businessType } from '@/types/businesses';
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






export const getCustomersForBusiness = async (id: any): Promise<Customers | null> => {

    return new Promise(async (resolve, reject) => {
        console.log('getting user  data...')

        const getbusinssId = async (userId: any) => {
            try {
                // console.log('deleting data')
                // this line is working just fine i think lololool...
                const { data, error } = await supabase
                    .from('business_owners')
                    .select('*')
                    .eq('owner_id', userId);

                // error handling
                if (error) {
                    console.error("Error getting business:", error.message);
                    return null;
                }

                // if success but table returns empty array
                if (data === null) {
                    reject(null)
                    return null;
                }

                // console.log("Customer retrieved successfully:", data);
                // returns array if data has a value
                return data;


            } catch (err) {
                console.error("Unexpected error getting business:", err);
                reject(null)
                return null;
            }
        }
        const getCustomers = async (business_id: any) => {
            try {
                // console.log('deleting data')
                // this line is working just fine i think lololool...
                const { data, error } = await supabase
                    .from('customers')
                    .select('*')
                    .eq('business_id', business_id)
                // error handling
                if (error) {
                    console.error("Error deleting customer:", error.message);
                    reject(null)
                    return null;
                }
                // if success but table returns empty array
                if (data === null) {
                    return null;
                }
                //    console.log("customers retrieved successfully: ", data.length);
                // returns array if data has a value
                return data;
            } catch (err) {
                console.error("Unexpected error retrieving customer:", err);
                reject(null)
                return null;
            }
        }



        const BusinessData: businessType[] | any = await getbusinssId(id)
        if(BusinessData) {
            const businessDatas: businessesType[] | any = await getCustomers(BusinessData[0].business_id)
            resolve(businessDatas)
        } else {
            reject(null )
        }


    })
}