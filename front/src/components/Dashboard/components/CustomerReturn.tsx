import React from 'react'
import AreaChart from './charts/AreaChart'

export const CustomerReturn = () => {
  return (
    <div className="rounded dark:bg-boxdark bg-white shadow-md p-4 rounded-md flex ">
      <div className='flex-col grow gap-4 flex'>
        <div className="text-xl">Cutsomer Return</div>
        <div className='font-thin text-sm'>last 7 days</div>
        <div className="text-3xl font-bold">5K</div>
        <div>
          {/* <FaArrowUp /> */}7% vs last 7 days
        </div>
      </div>
      <div className='grow'>
        <AreaChart />
      </div>
    </div>
  )
}
