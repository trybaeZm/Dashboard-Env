import React from 'react'
import AreaChart from './charts/AreaChart'

export const CustomerReturn = () => {
  return (
    <div className="rounded flex flex-wrap bg-gray-700 shadow-md p-4 rounded-md flex">
      <div className='flex-col grow gap-4 flex'>
        <div className="text-xl text-white">Customer Return</div>
        <div className='font-thin text-sm text-gray-400'>last 7 days</div>
        <div className="text-3xl font-bold text-white">5K</div>
        <div className="text-gray-400">
          {/* <FaArrowUp /> */}7% vs last 7 days
        </div>
      </div>
      <div className='grow'>
        <AreaChart />
      </div>
    </div>
  )
}
