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
        <div className="bg-white dark:bg-boxdark  shadow-md">
            <div  className=" p-4 text-xl">
                Last Transactions
            </div>
            <table >
                <thead className='bg-gray-300 dark:bg-gray-400 dark:text-gray-500'>
                    <tr>
                        <th>ID</th>
                        <th>Issued Date</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {data.map(e => {
                        return (
                            <>
                                <tr className=''>
                                    <td>{e.ID}</td>
                                    <td>{e.IssuedDate}</td>
                                    <td>{e.Total}</td>
                                    <td>View Details</td>
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
