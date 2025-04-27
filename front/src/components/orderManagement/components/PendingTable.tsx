import { ChevronLeftIcon, ChevronRightIcon, ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import '../customstyles/Table.css'

export const PendingTable = ({filter}: {filter: any}) => {

    let data = [
        {
            orderID: "#50990",
            Created: "10 min ago",
            Customer: "Emily Carter",
            Total: "$150",
            Profit: "$110",
            Status: "Delivered"
        },
        {
            orderID: "#50991",
            Created: "45 min ago",
            Customer: "Michael Smith",
            Total: "$275",
            Profit: "$200",
            Status: "Pending"
        },
        {
            orderID: "#50992",
            Created: "1 hour ago",
            Customer: "Sarah Johnson",
            Total: "$320",
            Profit: "$240",
            Status: "Processing"
        },
        {
            orderID: "#50993",
            Created: "2 hours ago",
            Customer: "David Brown",
            Total: "$180",
            Profit: "$135",
            Status: "Picked"
        },
        {
            orderID: "#50994",
            Created: "3 hours ago",
            Customer: "Sophia Wilson",
            Total: "$400",
            Profit: "$300",
            Status: "Shipped"
        },
        {
            orderID: "#50995",
            Created: "4 hours ago",
            Customer: "James Taylor",
            Total: "$250",
            Profit: "$180",
            Status: "Confirmed"
        },
        {
            orderID: "#50996",
            Created: "5 hours ago",
            Customer: "Ava Martinez",
            Total: "$120",
            Profit: "$90",
            Status: "Pending"
        },
        {
            orderID: "#50997",
            Created: "6 hours ago",
            Customer: "Liam Anderson",
            Total: "$350",
            Profit: "$275",
            Status: "Delivered"
        },
        {
            orderID: "#50998",
            Created: "7 hours ago",
            Customer: "Olivia Thomas",
            Total: "$500",
            Profit: "$380",
            Status: "Shipped"
        },
        {
            orderID: "#50999",
            Created: "8 hours ago",
            Customer: "Ethan White",
            Total: "$280",
            Profit: "$210",
            Status: "Processing"
        },
        {
            orderID: "#51000",
            Created: "9 hours ago",
            Customer: "Mason Lee",
            Total: "$310",
            Profit: "$240",
            Status: "Picked"
        },
        {
            orderID: "#51001",
            Created: "10 hours ago",
            Customer: "Isabella Harris",
            Total: "$450",
            Profit: "$350",
            Status: "Confirmed"
        },
        {
            orderID: "#51002",
            Created: "11 hours ago",
            Customer: "Noah Clark",
            Total: "$260",
            Profit: "$190",
            Status: "Delivered"
        },
        {
            orderID: "#51003",
            Created: "12 hours ago",
            Customer: "Charlotte Hall",
            Total: "$230",
            Profit: "$175",
            Status: "Pending"
        },
        {
            orderID: "#51004",
            Created: "13 hours ago",
            Customer: "Lucas Walker",
            Total: "$170",
            Profit: "$120",
            Status: "Processing"
        }
    ]
    
    return (
        <div className='bg-gray-200 dark:bg-gray-700'>
            <table >
                <thead className='bg-gray-300 dark:bg-gray-400 dark:text-gray-600'>
                    <tr>
                        <th>ORDER ID</th>
                        <th>CREATED</th>
                        <th>CUSTOMER</th>
                        <th>TOTAL</th>
                        <th>PROFIT</th>
                        <th>STATUS</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className=''>
                    {data.filter((ee)=> filter ? ee.Status == filter : ee).map((e, key) => {
                        return (
                            <>
                                <tr key={key} className=''>
                                    <td>{e.orderID}</td>
                                    <td>{e.Created}</td>
                                    <td>{e.Customer}</td>
                                    <td>{e.Total}</td>
                                    <td>{e.Profit}</td>
                                    <td>
                                        <select style={{outline:'none'}} className={`px-2  py-1 ${
                                            e.Status == "Pending" ?
                                            'bg-warning text-white'
                                            :
                                            e.Status == "Confirmed" 
                                            ?
                                            'bg-success text-white'
                                            :
                                            e.Status == "Processing" 
                                            ?
                                            'bg-blue-400 text-white'
                                            :
                                            e.Status == "Shipped" 
                                            ?
                                            'bg-purple-400 text-white'
                                            :
                                            e.Status == "Delivered" 
                                            ?
                                            'bg-fuchsia-700 text-white'
                                            :
                                            
                                            e.Status == "Picked" 
                                            ?
                                            'text-black'
                                            :
                                            ''
                                            
                                        }`}>
                                            <option>{e.Status}</option>
                                            {
                                                ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"].filter((ee) => ee != e.Status).map((eee, key) => <option key={key} >{eee}</option>)

                                            }
                                            
                                        </select>
                                        
                                    </td>
                                    <td className='text-primary'>
                                        <ArrowDownCircleIcon className="size-7  font-bold text-gray-700 dark:text-gray-300 "/>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            <div className='p-5 flex justify-between'>
                <div className='flex items-center gap-1'>
                    Showing:
                    <select className='bg-gray-200 dark:bg-gray-700 border border-gray-400 px-2 py-1' style={{ outline: 'none' }}>
                        <option></option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                    of 50
                </div>
                <div className='flex dark:text-gray-700 gap-2'>
                    <button className=' bg-gray-300 rounded-sm p-1'><ChevronLeftIcon className="size-5 font-bold text-gray-700" /></button>
                    {
                        [1, 2, 3, 4, 5].map((e,key) =>
                            <button key={key} className='bg-gray-300 rounded-sm p-1 px-2'>{e}</button>
                        )
                    }

                    <button className='bg-gray-300  rounded-sm p-1'><ChevronRightIcon className="size-5 font-bold text-gray-700" /></button>
                </div>
            </div>
        </div>
    )

}
