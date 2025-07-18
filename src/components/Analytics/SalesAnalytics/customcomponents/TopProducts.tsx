import { AmountDistEntry, SalesAnalyticsData } from '@/services/api/products'
import { CrownIcon } from 'lucide-react'
import React, { useEffect } from 'react'

export type AmountDist = {

}
export const TopProducts = ({ data }: { data: SalesAnalyticsData | null }) => {
    useEffect(()=>{
        console.log('sales data', data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // 1️⃣ Highest amountMade
    const highestAmount = data?.amountDist.reduce(
        (max: number, curr: AmountDistEntry) => Math.max(max, curr.amountMade),
        0
    );

    // 2️⃣ Total amountMade
    const totalAmount = data?.amountDist.reduce(
        (sum: number, curr: AmountDistEntry) => sum + curr.amountMade,
        0
    );

    const sortedData = data?.amountDist.sort((a, b) => b.amountMade - a.amountMade)

    return (
        <div className='border dark:border-gray-700 flex flex-col justify-between grow border-[#C9C9C9] p-4 rounded-md dark:bg-gray-800'>
            <div className="">
                <div className="flex items-center flex-col gap-2">
                    {sortedData
                        ?.slice(0, 4) // Take only top 4
                        .map((e: AmountDistEntry, r: number) => (
                            <div key={r} className={"flex gap-3 items-center text-[#1A0670] dark:text-white px-4 bg-gray-400 p-2 rounded md"}>
                                {
                                    highestAmount == e.amountMade ?
                                        <CrownIcon className="size-4" />
                                        :
                                        <></>
                                }
                                <div>{e.product.name}</div>
                                <div>{((e.amountMade / (totalAmount ?? 1) || 0) * 100).toFixed(1)}%</div> {/* Replace 45% with the actual amount */}
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

        </div>

    )
}
