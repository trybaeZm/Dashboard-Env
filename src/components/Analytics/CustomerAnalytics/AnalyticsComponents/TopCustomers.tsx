import { Customers } from '@/types/Customers'
import { CrownIcon } from 'lucide-react'
import React, { use, useEffect } from 'react'

const TopCustomers = ({ cutomerData }: { cutomerData: Customers[] | null }) => {
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="">
                <div className="flex items-center flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <CrownIcon className="size-4" />
                        <div>James Sakala</div>
                        <div>45%</div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div>Samson Mumba</div>
                        <div>24%</div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div>Jesica Mwelwa</div>
                        <div>18%</div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div>Kelvin Mambo</div>
                        <div>18%</div>
                    </div>
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