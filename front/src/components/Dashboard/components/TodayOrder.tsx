import React from 'react'
import AreaChart from './charts/AreaChart'

export const TodayOrder = () => {
    return (
        <div className="rounded dark:bg-boxdark bg-white shadow-md p-4 rounded-md flex flex-col gap-4">
            <div className="text-xl">Today Order</div>
            <div className="text-3xl font-bold">5K</div>
            <div className='font-thin text-sm'>Orders over time</div>
            <div>
                <AreaChart />
            </div>
        </div>
    )
}
