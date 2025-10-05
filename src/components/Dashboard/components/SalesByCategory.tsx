import React from 'react'
import PieChart from './charts/PieChart'
import { FaGenderless } from 'react-icons/fa'
import { RefreshCw, TrendingUp } from 'lucide-react'

export const SalesByCategory = ({ data }: { data: any }) => {

      const growth = 9;
  const isPositiveGrowth = growth >= 0;
    return (
         <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Optional Icon */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <FaGenderless className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                           Sales by Gender
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            Last 7 days • <RefreshCw className="w-3 h-3" /> Updated just now
                        </p>
                    </div>
                </div>

                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${isPositiveGrowth
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    <TrendingUp className={`w-4 h-4 ${!isPositiveGrowth ? 'rotate-180' : ''}`} />
                    {Math.abs(growth).toFixed(1)}%
                </div>
            </div>

            {/* Chart */}
            <div className="w-full flex justify-center">
                <PieChart data={data} />
            </div>
        </div>

    )
}
