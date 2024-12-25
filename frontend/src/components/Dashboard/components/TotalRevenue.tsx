import React from 'react'

export const TotalRevenue = () => {
    return (
        <div className='flex dark:bg-gray-600 bg-white shadow-md p-4 rounded-md  gap-3'>
            <div className="rounded flex grow flex-col gap-4">
                <div className="text-xl">Total Revenue</div>
                <div className='font-thin text-sm'>last 7 days</div>
                <div className="text-3xl font-bold">50K</div>
                <div>
                    {/* <FaArrowUp /> */}12% vs last 7 days
                </div>
            </div>
            <div className='grow'>
                <button className='btn dark:bg-gray-500 dark:text-gray-300 py-1 px-4 rounded text-gray-500 font-bold bg-gray-300'>Withdraw funds</button>
            </div>
        </div>
    )
}
