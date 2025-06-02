import React from 'react'

export const GrowthRate = ({ data }: { data: any }) => {
    const date = new Date().getFullYear()
    return (
        <div className="rounded  dark:bg-gray-700 bg-white shadow-md p-4 rounded-md flex flex-col gap-2 text-center justify-center">
            <div className="text-xl dark:text-white">Growth Rate</div>
            <div className='flex justify-center'>
                <div className='dark:bg-gray-500 rounded-md dark:text-gray-300 bg-gray-300 text-sm px-3 py-1 text-center '>{date}</div>
            </div>
            <div className="text-3xl font-bold dark:text-white">{data.GrowthRate}%</div>
            <div className='flex justify-center'>
                <div className='rounded-md text-sm px-3 py-1 text-center dark:text-gray-300'>
                    Annually
                </div>
            </div>
        </div>
    )
}
