import { CustomerPrice } from '@/types/Customers'
import { CrownIcon } from 'lucide-react'
import React, { use, useEffect } from 'react'

const TopCustomers = ({ cutomerDatas }: { cutomerDatas: CustomerPrice[] | null | any }) => {
    const totalAmount = cutomerDatas?.reduce((sum: number, item: CustomerPrice) => sum + item.amount, 0) || 1; // fallback 1 to avoid division by zero

    const sortedCustomers = cutomerDatas?.sort((a: any, b: any) => b.amount - a.amount) // Sort by highest amount 
    const highestAmount = sortedCustomers?.[0].amount

    return (
        <>
            {/* Top Customers Section */}
            <div className="flex flex-col gap-4 items-stretch w-full mt-6">
                <h3 className="text-lg font-semibold text-[#1A0670] dark:text-white mb-1">Top Customers</h3>
                {sortedCustomers.slice(0, 4).map((customer: CustomerPrice, index: number) => {
                    const isTop = highestAmount === customer.amount;
                    const percentage = ((customer.amount / (totalAmount ?? 1)) * 100).toFixed(1);

                    return (
                        <div
                            key={index}
                            className={`
          flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-sm transition
          ${isTop ? "bg-yellow-100 dark:bg-yellow-800/20" : "bg-gray-100 dark:bg-gray-700"}
          text-[#1A0670] dark:text-white
        `}
                        >
                            <div className="flex items-center gap-2">
                                {isTop && (
                                    <div className="text-yellow-600 dark:text-yellow-400">
                                        <CrownIcon className="w-5 h-5" />
                                    </div>
                                )}
                                <span className="font-medium">{customer.name}</span>
                            </div>
                            <div className="text-sm font-semibold">{percentage}%</div>
                        </div>
                    );
                })}

                {/* Summary - Total Sales */}
                <div className="flex justify-between items-end text-[#1A0670] dark:text-white mt-2">
                    <div className="flex items-end gap-2">
                        <div className="font-bold text-2xl">25.7K</div>
                        <div className="text-sm font-light">last 7 days</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopCustomers