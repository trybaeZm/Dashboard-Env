import { CustomerPrice } from '@/types/Customers'
import { CrownIcon } from 'lucide-react'
import React, { use, useEffect } from 'react'

const TopCustomers = ({ cutomerDatas }: { cutomerDatas: CustomerPrice[] | null | any }) => {
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="">
                <div className="flex items-center flex-col gap-3">
                    {cutomerDatas?.sort((a:any, b:any) => b.amount - a.amount) // Sort by highest amount
                        .slice(0, 4) // Take only top 4
                        .map((e: CustomerPrice, r: number) => (
                            <div key={r} className="flex gap-3 items-center">
                                <CrownIcon className="size-4" />
                                <div>{e.name}</div>
                                <div>K{e.amount}.00</div> {/* Replace 45% with the actual amount */}
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