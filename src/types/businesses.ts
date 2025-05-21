export type businessType = {
    business_id: string
    created_at: string
    id: string
    int_business_id: number
    int_user_id: number
    owner_id: number
    user_id: string
}

export type businessesType = {
    id: string;
    business_id: string;
    user_id: string;
    owner_id: number;
    int_user_id: number;
    int_business_id: number;
    created_at: string; // or `Date` if you parse it
}
