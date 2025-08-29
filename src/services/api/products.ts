import { Product, ProductInsert } from "@/types/product"
import { supabase } from "../SupabaseConfig"
import { Sale } from "@/types/Sales";
import { Customers } from "@/types/Customers";
import { OrderData } from "@/types/Orders";



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
    sales: OrderData[]
};

export type RevenueData = {
    locations: string;
    scrappedSales: number
}


export interface ImagePreview {
    name: string;
    url: string;
    file: File;
}
export type ProductWithSales = Product & { sales: OrderData[] };



export const getDataforsalseAnalytics = async (business_id: any): Promise<null | SalesAnalyticsData> => {
    return new Promise(async (resolve, reject) => {
        const products: Product[] = []
        const salesByBusiness: OrderData[] = []
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


        // getting orders per products
        try {
            const { data, error } = await supabase
                .from('orders')
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



        // since i now have both orders by business and all customers we  will filter them
        let foundcustomer = []
        for (let i = 0; i < salesByBusiness.length; i++) {

            for (let j = 0; j < allcustomers.length; j++) {
                if (String(salesByBusiness[i].customer_id) == String(allcustomers[j].id)) {
                    foundcustomer.push(...Array(allcustomers[j]))
                }
            }
        }

        // console.log("found customers:", foundcustomer)
        // Extract locations to a new array
        const locations: string[] = foundcustomer.map(customer => customer.location);

        let LocationAmount = []


        for (let i = 0; i < locations.length; i++) {

            // gets all customers and adds them to this based on location
            let foundCustomers = []
            for (let j = 0; j < foundcustomer.length; j++) {
                if (foundcustomer[j].location == locations[i]) {
                    foundCustomers.push(...Array(foundcustomer[j]))
                }
            }
            // using the location we are getting all the sales
            let getCities = Array.from(new Set(salesByBusiness.map(e => e.delivery_location)));
            console.log("cisties: ", getCities)

            let currentCity = getCities[i];

            let TotalAmount = salesByBusiness.filter((e) => e.delivery_location == currentCity).reduce((prev, curr) => prev + curr.total_amount, 0)
            console.log(TotalAmount)

            LocationAmount.push({ scrappedSales: TotalAmount, locations: currentCity })

            console.log("location data: ", LocationAmount)

        }

        let productstoTotalSales = []
        // console.log("products: ", products)
        // console.log("sales: ", salesByBusiness)
        for (let i = 0; i < products.length; i++) {

            let filteredSales = salesByBusiness.filter((e) => e.product_id === products[i].id).map((e) => e.total_amount)
            console.log("filteredData ", filteredSales);

            productstoTotalSales.push({ product: products[i], amountMade: filteredSales.length > 0 ? filteredSales.reduce((prev, curr) => prev + curr) : 0 })
            // get all sales for the specific product
        }

        if (productstoTotalSales.length <= 0) {
            reject(null)
        }
        resolve({ products: products, amountDist: productstoTotalSales, revenueData: LocationAmount, sales: salesByBusiness })
    })
}

export const getProductsAndServices = (business_id: string | null | undefined): Promise<any | null> => {
    return new Promise(async (resolve, reject) => {
        const products: Product[] = []
        const sales: Sale[] = []

        const combinedData = []

        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('business_id', business_id)

            if (data) {
                products.push(...data)
            }

            if (error) {
                reject(error)
            }

        } catch (error) {
            reject(error)
        }


        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('business_id', business_id)

            if (data) {
                sales.push(...data)
            }

            if (error) {
                reject(error)
            }

        } catch (error) {
            reject(error)
        }


        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const collectedSales = sales.filter((e) => e.product_id == product.id)
            combinedData.push({ ...product, sales: collectedSales })
        }

        resolve(combinedData)
    })
}

export const createProductAndService = async (product: ProductInsert, imageData: ImagePreview[]): Promise<Product | null> => {

    return new Promise(async (resolve, reject) => {
        console.log('adding product')
        try {
            const { data: productData, error } = await supabase
                .from('products')
                .insert(product)
                .select()
                .single();

            if (error) {
                console.error("Error creating product:", error.message);
                reject(error);
            }

            if (productData) {
                try {
                    // If imageData is provided, insert images into the 'product_images' table
                    for (const image of imageData) {
                        const { data, error } = await supabase.storage
                            .from('uploaded-files')
                            .upload(
                                `products/${productData.id}/${image.name}`,
                                image.file
                            )

                        if (data) {
                            console.log(data)
                        }
                        if (error) {
                            console.log(error)
                            reject(error);
                            break;
                        }
                    }

                    resolve(productData);

                } catch (error) {
                    console.error("Error inserting product images:", error);
                    reject(error);
                }
            }

        } catch (err) {
            console.error("Unexpected error creating product:", err);
            reject(err);
        }
    })
}

export const getProductImages = async (productId: string): Promise<string[] | null> => {
    // console.log(productId)
    return new Promise(async (resolve, reject) => {
        try {
            const { data, error } = await supabase
                .storage
                .from("uploaded-files")
                .list(`products/${productId}/`, { limit: 100 });

            if (error) throw error;
            if (!data || data.length === 0) return [];
            // Map to public URLs (if bucket is PUBLIC)
            const urls: string[] = data.map((file) => {
                return supabase.storage
                    .from("uploaded-files")
                    .getPublicUrl(`products/${productId}/${file.name}`).data.publicUrl;
            });


            resolve(urls);
        } catch (error) {
            console.error("Error fetching product images:", error);
            reject(error);
        }
    })
}