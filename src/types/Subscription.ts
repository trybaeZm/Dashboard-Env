export type Subscription = {
    id: string;
    features?: string[];
    plan_name?: number | null;
    created_at?: string;
    yearlydiscount?: string | null;
    price?: number;
    duration_in_days: number;
    popular: boolean;
    isActive:boolean
    description:string
};
export interface PayoutPopupProps {
    isOpen: boolean
    onClose: () => void
    plan: Subscription
    amountPayable: number | undefined
}