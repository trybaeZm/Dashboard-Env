import React from 'react'
import './customstyles/Table.css'


export const RecentOrder = () => {
    let data = [
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
        <div className="bg-white w-full dark:bg-gray-700 shadow-md">
            <div className="p-4 text-xl text-black dark:text-white">
                Recent Order
            </div>
            <table>
                <thead className='bg-gray-300 dark:bg-gray-600 text-black dark:text-white'>
                    <tr>
                        <th>ID</th>
                        <th>Cutomer</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className='text-black dark:text-gray-300'>
                    {data.map(e => {
                        return (
                            <>
                                <tr className='border-b border-gray-200 dark:border-gray-600'>
                                    <td>{e.ID}</td>
                                    <td>{e.Cutomer}</td>
                                    <td>{e.Status}</td>
                                    <td>{e.Total}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}
