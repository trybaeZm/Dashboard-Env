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
        <div className="bg-white dark:bg-boxdark  shadow-md">
            <div  className=" p-4 text-xl">
            Recent Order
            </div>
            <table >
                <thead className='bg-gray-300 dark:bg-gray-400 dark:text-gray-600'>
                    <tr>
                        <th>ID</th>
                        <th>Cutomer</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {data.map(e => {
                        return (
                            <>
                                <tr className=''>
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
