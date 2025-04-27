import React from 'react'
import AreaChart from './charts/AreaChart'

export const TotalRevenue = () => {
    return (
        <div className='flex dark:bg-boxdark dark:bg-white shadow-md p-4 rounded-md  gap-3'>
            <div className="rounded flex grow flex-col gap-3">
                <div className="text-xl">Total Revenue</div>
                <div className='font-thin text-sm'>last 7 days</div>
                <div className="text-3xl font-bold">50K</div>
                <div>
                    {/* <FaArrowUp /> */}12% vs last 7 days
                </div>
            </div>
            <div className='grow'>
                <AreaChart/>
            </div>
        </div>
    )
}
