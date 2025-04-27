'use client'
import React from 'react'
import './customestyles/Table.css'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
export const TransactionTable = ({popup}:{popup:React.Dispatch<React.SetStateAction<boolean>>}) => {

    let data = 
    [
        {
            customerName: 'Jack Griffin',
            productService: 'Service/Product Name',
            id: '#50989',
            issuedDate: '30 Jan 2024',
            total: '$200'
        },
        {
            customerName: 'Jack Griffin',
            productService: 'Service/Product Name',
            id: '#50989',
            issuedDate: '30 Jan 2024',
            total: '$200'
        },
        {
            customerName: 'Jack Griffin',
            productService: 'Service/Product Name',
            id: '#50989',
            issuedDate: '30 Jan 2024',
            total: '$200'
        },
        {
            customerName: 'Jack Griffin',
            productService: 'Service/Product Name',
            id: '#50989',
            issuedDate: '30 Jan 2024',
            total: '$200'
        },
        {
            customerName: 'Jack Griffin',
            productService: 'Service/Product Name',
            id: '#50989',
            issuedDate: '30 Jan 2024',
            total: '$200'
        },
        {
            customerName: 'Jack Griffin',
            productService: 'Service/Product Name',
            id: '#50989',
            issuedDate: '30 Jan 2024',
            total: '$200'
        }
    ]
    
    return (
        <div className='bg-gray-200 dark:bg-gray-700'>
            <table >
                <thead className='bg-gray-300 dark:bg-gray-400 dark:text-gray-600'>
                    <tr>
                        <th>Cutomer name</th>
                        <th>Product/ Service</th>
                        <th>Id</th>
                        <th>Issued Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {data.map(e => {
                        return (
                            <>
                                <tr className=''>
                                    <td className='cursor-pointer hover:opacity-[0.4] duration-300 transition' onClick={()=> popup(true)}>{e.customerName}</td>
                                    <td>{e.productService}</td>
                                    <td>{e.id}</td>
                                    <td>{e.issuedDate}</td>
                                    <td>{e.total}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}
