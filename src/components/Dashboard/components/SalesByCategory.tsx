import React from 'react'
import PieChart from './charts/PieChart'

export const SalesByCategory = ({ data }: { data: any }) => {
    return (
        <div className="relative rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-900 shadow-xl p-6 flex flex-col gap-6 border dark:border-gray-600 border-gray-200">
            {/* Optional Icon */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white rounded-full p-2 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2v1H8v2h2v6h2v-6h2v-2h-2v-1c0-.55.45-1 1-1h1V8h-1z" />
                </svg>
            </div>

            {/* Title */}
            <div className="text-lg font-semibold text-center text-gray-800 dark:text-white mt-2">
                Sales By Gender
            </div>

            {/* Chart */}
            <div className="w-full flex justify-center">
                <PieChart data={data} />
            </div>
        </div>

    )
}
