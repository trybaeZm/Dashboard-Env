import { Product, ProductInsert } from "@/types/product"
import { supabase } from "../SupabaseConfig"
import { Sale } from "@/types/Sales";
import { Customers } from "@/types/Customers";



// Define AmountDistEntry type
export type AmountDistEntry = {
    product: Product;
    amountMade: number;
};

// Define the overall data structure
export type SalesAnalyticsData = {
    products: Product[];
    revenueData: RevenueData[]
    amountDist: AmountDistEntry[];
    sales: Sale[]
};

export type RevenueData = {
    locations: string;
    scrappedSales: number
}


export type ProductWithSales = Product & { sales: Sale[] };



export const getDataforsalseAnalytics = async (business_id: any): Promise<null | SalesAnalyticsData> => {
    return new Promise(async (resolve, reject) => {
        const products: Product[] = []
        const salesByBusiness: Sale[] = []
        const allcustomers: Customers[] = []


        // getall customers from db
        try {
            const { data, error } = await supabase
                .from('customers')
                .select('*')

            if (data) {
                allcustomers.push(...data)
            }
            if (error) {
                console.log(error)
            }

        } catch (err) {
            console.log(err)
        }

        // getting products
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('business_id', business_id)

            console.log(data)
            if (data) {
                products.push(...data)
            }
            if (error) {
                console.log(error)
            }
        } catch (err) {
            console.log(err)
            reject(null)
        }


        // getting sales per products
        try {
            const { data, error } = await supabase
                .from('sales')
                .select('*')
                .eq('business_id', business_id)

            if (data) {
                salesByBusiness.push(...data)
            }
            if (error) {

            }
        } catch (err) {
            console.log(err)
        }



        // since i now have both sales by business and all customers ill filter them
        let foundcustomer = []
        for (let i = 0; i < salesByBusiness.length; i++) {

            for (let j = 0; j < allcustomers.length; j++) {
                if (String(salesByBusiness[i].customer_id) === String(allcustomers[j].id)) {
                    foundcustomer.push(...Array(allcustomers[j]))
                }
            }
        }

        // Extract locations to a new array
        const locations: string[] = foundcustomer.map(customer => customer.location);

        let LocationAmount = []
        
        
        for(let i = 0; i < locations.length; i++){

            // gets all customers and adds them to this based on location
            let foundCustomers = []
            for(let j = 0; j < foundcustomer.length; j++){
                if(foundcustomer[j].location == locations[i]){
                    foundCustomers.push(...Array(foundcustomer[j]))
                }
            }


            // using the location we are getting all the sales
            let scrappedSales  = []

            for(let j = 0; j < foundCustomers.length; j++){
                for(let k = 0; k < salesByBusiness.length; k++){
                    if(String(salesByBusiness[k].customer_id) == String(foundCustomers[j].id)){
                        scrappedSales.push(...Array(salesByBusiness[k]))
                    }
                }
            }

            let totalAmount =  scrappedSales.reduce((prev, curr) => Number(prev) + Number(curr.amount), 0)
            LocationAmount.push({scrappedSales:totalAmount, locations: locations[i]})

        }
        
        let productstoTotalSales = []

        for (let i = 0; i < products.length; i++) {

            let filteredSales = salesByBusiness.filter((e) => e.product_id == products[i].id).map((e) => e.amount)

            productstoTotalSales.push({ product: products[i], amountMade: filteredSales.reduce((prev, curr) => prev + curr) })
            // get all sales for the specific product

        }

        resolve({ products: products, amountDist: productstoTotalSales, revenueData: LocationAmount, sales : salesByBusiness })
    })
}


export const getProductsAndServices = (business_id:string | null | undefined) : Promise<any|null> => {
    return new Promise(async (resolve, reject)=> {
        const products: Product[] = []
        const sales:Sale[] = []

        const combinedData = []

        try{
            const{data, error} = await supabase
            .from('products')
            .select('*')
            .eq('business_id', business_id)

            if(data){
                products.push(...data)
            }

            if(error){
                reject(error)
            }

        } catch (error) {
            reject(error)
        }


        try{
            const{data, error} = await supabase
            .from('sales')
            .select('*')
            .eq('business_id', business_id)

            if(data){
                sales.push(...data)
            }

            if(error){
                reject(error)
            }

        } catch (error) {
            reject(error)
        }


        for(let i = 0; i < products.length; i++){
             const product = products[i];
            const collectedSales  = sales.filter((e)=> e.product_id == product.id)
            combinedData.push({...product,sales:collectedSales })
        }

        resolve(combinedData)
    })
}

export const createProductAndService = async (product: ProductInsert): Promise<Product | null> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select()
            .single();

        if (error) {
            console.error("Error creating product:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error creating product:", err);
        return null;
    }
}