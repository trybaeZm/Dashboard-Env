import { CustomerPrice } from '@/types/Customers'
import { CrownIcon } from 'lucide-react'
import React, { use, useEffect } from 'react'

const TopCustomers = ({ cutomerDatas }: { cutomerDatas: CustomerPrice[] | null | any }) => {
    const totalAmount = cutomerDatas?.reduce((sum: number, item: CustomerPrice) => sum + item.amount, 0) || 1; // fallback 1 to avoid division by zero

    const sortedCustomers = cutomerDatas?.sort((a: any, b: any) => b.amount - a.amount) // Sort by highest amount 
    const highestAmount = sortedCustomers?.[0].amount

    return (
        <>
            <div className="">
                <div className="flex items-center flex-col gap-2">
                    {sortedCustomers
                        .slice(0, 4) // Take only top 4
                        .map((e: CustomerPrice, r: number) => (
                            <div key={r} className={"flex gap-3 items-center text-black px-4 bg-gray-400 p-2 rounded md"}>
                                {
                                    highestAmount == e.amount ?
                                        <CrownIcon className="size-4" />
                                        :
                                        <></>
                                }
                                <div>{e.name}</div>
                                <div>{((e.amount / totalAmount) * 100).toFixed(1)}%</div> {/* Replace 45% with the actual amount */}
                            </div>
                        ))}
                </div>
            </div>
            <div>
                <div className="text-[#1A0670] dark:text-white">Top Customers</div>
                <div className="flex text-[#1A0670] dark:text-white justify-between items-end">
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