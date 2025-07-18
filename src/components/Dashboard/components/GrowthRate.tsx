import React from 'react'

export const GrowthRate = ({ data }: { data: any }) => {
    const date = new Date().getFullYear()
    return (
        <div className="relative h-full rounded-xl dark:bg-gray-800 bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-900 shadow-xl p-6 flex flex-col gap-4 text-center justify-center border dark:border-gray-600 border-gray-200">
            {/* Decorative Top Icon */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full p-2 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            {/* Title */}
            <div className="text-lg font-semibold dark:text-white text-gray-800 mt-2">Growth Rate</div>

            {/* Year Badge */}
            <div className="flex justify-center">
                <div className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full">
                    {date}
                </div>
            </div>

            {/* Main Value */}
            <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-400">{data.GrowthRate}%</div>

            {/* Subtitle */}
            <div className="flex justify-center">
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium tracking-wide">
                    Annually
                </div>
            </div>
        </div>

    )
}
