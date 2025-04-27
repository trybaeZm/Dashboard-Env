import React from 'react'
import AreaChart from './charts/AreaChart'

export const TodayOrder = () => {
    return (
        <div className="rounded dark:bg-gray-700 bg-white shadow-md p-4 rounded-md flex flex-wrap gap-4">
            <div className='flex flex-col gap-2'>
                <div className="text-xl text-black dark:text-white">Today Order</div>
                <div className="text-3xl font-bold text-black dark:text-white">5K</div>
                <div className='font-thin text-sm text-gray-600 dark:text-gray-400'>Orders over time</div>
            </div>
            <div>
                <AreaChart />
            </div>
        </div>
    )
}
