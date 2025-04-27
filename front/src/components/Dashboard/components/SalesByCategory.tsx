import React from 'react'
import PieChart from './charts/PieChart'

export const SalesByCategory = () => {
    return (
        <div className="rounded  dark:bg-boxdark bg-white shadow-md p-4 rounded-md  flex flex-col gap-4">
            <div className="text-xl">Sales By Category</div>
           <PieChart/>
        </div>
    )
}
