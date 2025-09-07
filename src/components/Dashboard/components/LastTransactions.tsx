import React from 'react'
import './customstyles/Table.css'


export const LastTransactions = () => {
    let data = [
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        },
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        },
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        },
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        },
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        },
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        },
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        },
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        },
        {
            ID: '#50989',
            IssuedDate: '31 March 2023',
            Total: '$200'
        }
    ]
    return (
        <>
        <div className="bg-white w-full dark:bg-gray-700 shadow-md">
            <div className="p-4 text-xl text-black dark:text-white">
                Last Transactions
            </div>
            <table>
                <thead className='bg-gray-300 dark:bg-gray-600 text-black dark:text-white'>
                    <tr>
                        <th>ID</th>
                        <th>Issued Date</th>
                        <th className='hidden'>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-black dark:text-gray-300'>
                    {data.map(e => {
                        return (
                            <>
                                <tr className='border-b border-gray-200 dark:border-gray-600'>
                                    <td>{e.ID}</td>
                                    <td>{e.IssuedDate}</td>
                                    <td className='hidden'>{e.Total}</td>
                                    <td className='text-blue-600 dark:text-blue-400 hover:underline cursor-pointer'>View Details</td>
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
