export type SubscriptionPlan = {
    plan_id: number;
    plan_name: string;
    features?: Record<string, any>;
    price: number;
    duration_in_days: number;
};
