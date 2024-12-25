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
            <table className="bg-white shadow-md">
                <thead className='bg-gray-300 dark:text-gray-500'>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Year</th>
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
        </>
    )
}
