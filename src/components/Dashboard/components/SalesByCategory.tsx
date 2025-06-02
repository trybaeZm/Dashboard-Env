import React from 'react'
import PieChart from './charts/PieChart'

export const SalesByCategory = ({data}:{data:any}) => {
    return (
        <div className="rounded dark:bg-gray-700 bg-white shadow-md p-4 rounded-md flex flex-col gap-4">
            <div className="text-xl dark:text-white">Sales By Gender</div>
            <PieChart data={data} />
        </div>
    )
}
