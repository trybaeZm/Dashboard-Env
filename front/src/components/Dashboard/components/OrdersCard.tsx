import React from 'react'
import AreaChart from './charts/AreaChart'

export const OrdersCard = () => {
    return (
        <>
            <div className="rounded dark:bg-boxdark bg-white shadow-md p-4 rounded-md flex gap-3">
                <div className='grow flex flex-col gap-3 '>
                    <div className="text-xl">Total Orders</div>
                    <div className='font-thin text-sm'>last 7 days</div>
                    <div className="text-3xl font-bold">25.7K</div>
                    <div>
                        {/* <FaArrowUp /> */}6% vs last 7 days
                    </div>
                </div>
                <div className='grow'>
                    <AreaChart />
                </div>
            </div>
        </>
    )
}
