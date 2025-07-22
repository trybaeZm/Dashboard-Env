export type OrderData = {

  id: string;
  order_id: number;
  business_id: string;
  customer_id: string;
  order_status: string; // extend with more statuses if needed
  total_amount: number;
  created_at: string; // ISO date string
  product_id: string
  sammarized_notes: string;
  delivery_location: string
  customers: {
    name: string;
    email: string;
    phone: string
  };
  products: {
    name: string;
    price: number
  }
};