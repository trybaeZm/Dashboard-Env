import React from 'react'
import AreaChart from './charts/AreaChart'

export const TotalRevenue = () => {
    return (
        <div className='flex bg-white flex flex-wrap dark:bg-gray-700 shadow-md p-4 rounded-md gap-3'>
            <div className="rounded flex grow flex-col gap-3">
                <div className="text-xl dark:text-white">Total Revenue</div>
                <div className='font-thin text-sm dark:text-gray-400'>last 7 days</div>
                <div className="text-3xl font-bold dark:text-white">50K</div>
                <div className="dark:text-gray-400">
                    {/* <FaArrowUp /> */}12% vs last 7 days
                </div>
            </div>
            <div className='grow'>
                <AreaChart/>
            </div>
        </div>
    )
}
