export type Customers = {
  id: string;
  business_id: string;
  created_at: string; // or Date if you're parsing it
  customer_type: "new" | "returning" | string;
  email: string;
  gender: "male" | "female" | string;
  location: string;
  name: string;
  phone: string;
};

export type CustomerPrice = {
  id: string;
  name: string;
  amount: number;
};

export type LocationType = {
  location :string;
  number: number
}
export type genderType = { male: number; female: number }