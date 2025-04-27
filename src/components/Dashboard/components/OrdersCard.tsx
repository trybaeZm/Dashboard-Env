import React from 'react'
import AreaChart from './charts/AreaChart'

export const OrdersCard = () => {
    return (
        <>
            <div className="rounded dark:bg-gray-700 bg-white shadow-md p-4 rounded-md flex flex-wrap gap-3">
                <div className='grow flex flex-col gap-3'>
                    <div className="text-xl dark:text-white">Total Orders</div>
                    <div className='font-thin text-sm dark:text-gray-400'>last 7 days</div>
                    <div className="text-3xl font-bold dark:text-white">25.7K</div>
                    <div className="dark:text-gray-400">
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
