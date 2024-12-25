import React from 'react'

export const CustomerReturn = () => {
  return (
    <div className="rounded dark:bg-gray-600 bg-white shadow-md p-4 rounded-md flex flex-col gap-4">
                <div className="text-xl">Cutsomer Return</div>
                <div className='font-thin text-sm'>last 7 days</div>
                <div className="text-3xl font-bold">5K</div>
                <div>
                    {/* <FaArrowUp /> */}7% vs last 7 days
                </div>
            </div>
  )
}
