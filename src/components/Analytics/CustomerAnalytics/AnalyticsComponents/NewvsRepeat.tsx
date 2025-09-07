import React from 'react'
import LatestChart from '../components/DemoLatest'

export const NewvsRepeat = ({data}: {data:any}) => {
  return (
         <div className="border grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
            <div className="max-w-[300px]">
              <LatestChart  data={data} />
            </div>
            <div>
              <div className="text-[#1A0670] dark:text-white">New vs. Repeat Customers</div>
              <div className="flex text-[#1A0670] dark:text-white justify-between items-end gap-2">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">{(data.new /  (data.repeat + data.new ))*100}% New</div>
                </div>
              </div>
            </div>
          </div>
  )
}
