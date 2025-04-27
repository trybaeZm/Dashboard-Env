export type Sale = {
    sale_id: number;
    customer_id?: number | null;
    user_id?: number | null;
    amount: number;
    sale_date?: string | null;
};
