import React from 'react'
import './customstyles/Table.css'
import { DashboardSummary } from '@/services/api/Dashboard'


export const RecentOrder = ({ data }: { data: null | undefined | DashboardSummary }) => {
    let data2 = [
        {
            ID: '#50989',
            Cutomer: 'Jack griffin',
            Status: 'Pending',
            Total: '$200'
        },
        {
            ID: '#50989',
            Cutomer: 'Jack griffin',
            Status: 'Complete',
            Total: '$200'
        },
        {
            ID: '#50989',
            Cutomer: 'Jack griffin',
            Status: 'Pending',
            Total: '$200'
        },
        {
            ID: '#50989',
            Cutomer: 'Jack griffin',
            Status: 'Complete',
            Total: '$200'
        },
        {
            ID: '#50989',
            Cutomer: 'Jack griffin',
            Status: 'Pending',
            Total: '$200'
        },
        {
            ID: '#50989',
            Cutomer: 'Jack griffin',
            Status: 'Complete',
            Total: '$200'
        }
    ]
    return (
        <>
            <div className="bg-white h-full dark:bg-gray-700 shadow-md rounded-xl overflow-hidden w-full">
                <div className="p-4 text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                    Recent Orders
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            <tr>
                                <th className="px-4 py-3 font-medium">ID</th>
                                <th className="px-4 py-3 font-medium">Customer</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 dark:text-gray-100">
                            {data?.OrderData.allOrders.map((e) => (
                                <tr
                                    key={e.id}
                                    className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <td className="px-4 py-2">{e.id}</td>
                                    <td className="px-4 py-2">{e.customer_id}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                  ${e.order_status === 'completed'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                                                    : e.order_status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                                                }`}
                                        >
                                            {e.order_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">K{e.total_amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
