import { AmountDistEntry, SalesAnalyticsData } from '@/services/api/products'
import { CrownIcon } from 'lucide-react'
import React, { useEffect } from 'react'

export function isWithinLast7Days(dateToCheck: any) {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return new Date(dateToCheck) >= sevenDaysAgo && new Date(dateToCheck) <= now;
}

export const TopProducts = ({ data }: { data: SalesAnalyticsData | null }) => {
    useEffect(() => {
        console.log("sales data", data);
    }, [data]);

    // 🔢 Total sales amount
    const totalAmount = data?.amountDist.reduce(
        (sum: number, curr: AmountDistEntry) => sum + curr.amountMade,
        0
    );

    // 🏆 Top 5 products by amountMade
    const topFive = [...(data?.amountDist || [])]
        .sort((a, b) => b.amountMade - a.amountMade)
        .slice(0, 5);

    const topFiveTotal = topFive.reduce(
        (sum, entry) => sum + entry.amountMade,
        0
    );

    // 📅 Last 7 days sales
    const salesLast7Days = data?.sales
        .filter((e) => isWithinLast7Days(e.created_at))
        .reduce((prev, curr) => prev + curr.total_amount, 0)
        .toFixed(2);

    return (
        <div className="border dark:border-gray-700 flex flex-col   border-[#C9C9C9] p-4 rounded-md dark:bg-gray-800">
            {/* Title + Icon */}
            <div className="flex items-center justify-between ">
                <h2 className="text-[#1A0670] dark:text-white font-semibold text-lg">
                    Top Products
                </h2>
                <CrownIcon className="text-yellow-500 size-5" />
            </div>

            {/* Top 5 Total */}
            <div className="mb-6">
                <p className="text-sm text-[#1A0670] dark:text-gray-300">
                    Top 5 Contribution
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {topFiveTotal.toFixed(2)}
                </p>
            </div>

            {/* 7 Days Total */}
            <div className="flex justify-between items-end text-[#1A0670] dark:text-white">
                <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">{salesLast7Days}</div>
                    <div className="text-sm font-light">last 7 days</div>
                </div>
            </div>
        </div>
    );
};
