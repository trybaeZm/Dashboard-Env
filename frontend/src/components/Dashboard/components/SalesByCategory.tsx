import React from 'react'

export const SalesByCategory = () => {
    return (
        <div className="rounded  dark:bg-gray-600 bg-white shadow-md p-4 rounded-md  flex flex-col gap-4">
            <div className="text-xl">Total Orders</div>
            <div className='font-thin text-sm'>last 7 days</div>
            <div className="text-3xl font-bold">25.7K</div>
            <div>
                {/* <FaArrowUp /> */}6% vs last 7 days
            </div>
        </div>
    )
}
