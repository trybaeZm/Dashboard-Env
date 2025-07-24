import React from 'react'
import BarChart from '../components/BarChart'
import { SalesAnalyticsData } from '@/services/api/products'
import PieChart from '../components/PieChart'
import { isWithinLast7Days } from './TopProducts'

export const SalesRevenueByRegion = ({ data }: { data: SalesAnalyticsData | null }) => {
    return (
        <div className="border grow dark:border-gray-700 grow border-[#C9C9C9] p-4 rounded-md dark:bg-gray-800">
            <div>
                <PieChart data={data} />
            </div>
            <div>
                <div className="text-[#1A0670] dark:text-blue-400">Sales Revenue by region</div>
                <div className="flex text-[#1A0670] dark:text-blue-400 justify-between items-end">
                    <div className="flex items-end gap-2">
                        <div className="font-bold text-2xl">
                            {
                                data?.sales.filter(
                                    (e) => isWithinLast7Days(e.created_at))
                                    .reduce((prev, curr) => prev + curr.total_amount, 0).toFixed(2)
                            }
                        </div>
                        <div className="text-sm font-light">last 7 days</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
