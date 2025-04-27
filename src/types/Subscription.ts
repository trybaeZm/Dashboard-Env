export type Subscription = {
    subscription_id: number;
    user_id?: number | null;
    plan_id?: number | null;
    start_date?: string;
    end_date?: string | null;
    status?: string;
};
