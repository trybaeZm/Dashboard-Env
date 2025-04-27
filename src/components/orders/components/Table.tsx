import React, { useState } from 'react'
import '@/css/Table.css'
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "@heroicons/react/16/solid";
import { Check, DotIcon, ImageIcon } from 'lucide-react';
import { MdArrowBack } from 'react-icons/md';

export const Table = ({ open, filter }: { open: any, filter: string }) => {
    // api for getting orders data can be pkaced here
    const [show, setShow] = useState(false)
    const [option, setOption] = useState<string | null>(null)
    let data = [
        {
            Order_Status: 'Pending',
            Order_Date: '08 Mar 2025',
            Customer_Name: 'John Doe',
            Product_Services: 'Web Hosting Plan',
            Order_ID: 'ORD10234',
            Payment_Status: 'Partly Paid'
        },
        {
            Order_Status: 'Complete',
            Order_Date: '06 Mar 2025',
            Customer_Name: 'Jane Smith',
            Product_Services: 'Laptop',
            Order_ID: 'ORD10235',
            Payment_Status: 'Fully Paid'
        },
        {
            Order_Status: 'Pending',
            Order_Date: '07 Mar 2025',
            Customer_Name: 'Michael Brown',
            Product_Services: 'Wireless Router',
            Order_ID: 'ORD10236',
            Payment_Status: 'Fully Paid'
        },
        {
            Order_Status: 'Complete',
            Order_Date: '05 Mar 2025',
            Customer_Name: 'Emily Johnson',
            Product_Services: 'Cloud Storage Upgrade',
            Order_ID: 'ORD10237',
            Payment_Status: 'Partly Paid'
        },
        {
            Order_Status: 'Pending',
            Order_Date: '09 Mar 2025',
            Customer_Name: 'Chris Williams',
            Product_Services: 'Software Subscription',
            Order_ID: 'ORD10238',
            Payment_Status: 'Partly Paid'
        },
        {
            Order_Status: 'Complete',
            Order_Date: '04 Mar 2025',
            Customer_Name: 'Sarah Miller',
            Product_Services: 'Smartphone',
            Order_ID: 'ORD10239',
            Payment_Status: 'Fully Paid'
        },
        {
            Order_Status: 'Pending',
            Order_Date: '10 Mar 2025',
            Customer_Name: 'David Anderson',
            Product_Services: 'Office Chair',
            Order_ID: 'ORD10240',
            Payment_Status: 'Partly Paid'
        }
    ]




    return (
        <>
            <div className={`fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 z-[999] ${option ? '' : 'hidden'} `}>
                <div onClick={() => setOption(null)} className='absolute h-full w-full bg-[#00000050] '></div>
                {data.filter(e => e.Order_ID === option).map(e => {
                    return (
                        <div className=' rounded-md overflow-y-auto max-h-[90vh] absolute bg-white shadow-md dark:bg-gray-800'>
                            <div className='flex p-5 gap-10 sticky top-0 bg-gray-200 dark:bg-gray-800 justify-between items-center'>
                                <div className='flex gap-5'>
                                    {
                                        show ?
                                            <button onClick={() => setShow(false)}>
                                                <MdArrowBack size={30} />
                                            </button>
                                            :
                                            <></>
                                    }
                                    <div className='text-2xl text-gray-800 dark:text-gray-200 font-bold'>Order Details</div>
                                </div>
                                <button className='bg-[#1A0670] text-white px-4 py-2 rounded-md flex items-center gap-2'>
                                    {e.Payment_Status === 'Pending' ? <ClockIcon className='size-4' /> : <CheckCircleIcon className='size-4' />}
                                    {e.Payment_Status}
                                </button>
                            </div>
                            <div className='mt-5 p-5 max-w-[500px]'>
                                {show ?
                                    <>
                                        <div className='text-lg font-bold'>
                                            Summarized Notes from Customer
                                        </div>
                                        <div className='pl-5'>
                                            <div className='flex'>
                                                <DotIcon /><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eveniet quod beatae explicabo temporibu</div>
                                            </div>
                                            <div className='flex'>
                                                <DotIcon /><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eveniet quod beatae explicabo temporibu</div>
                                            </div>
                                            <div className='flex'>
                                                <DotIcon /><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eveniet quod beatae explicabo temporibu</div>
                                            </div>
                                            <div className='flex'>
                                                <DotIcon /><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eveniet quod beatae explicabo temporibu</div>
                                            </div>
                                        </div>
                                        <hr className='border my-3 border-gray-600' />
                                        <div className='flex flex-col gap-3'>
                                            <div className='text-lg font-bold'>Images from the customer</div>
                                            <div className='flex overflow-y-auto  gap-4'>
                                                {
                                                    [1, 2, 3, 4, 5].map((e) =>
                                                        <div className='border border-black rounded-md p-10'>
                                                            <ImageIcon size={50} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>

                                    </>
                                    :
                                    <>
                                        <table>
                                            <tr className='text-gray-800 dark:text-gray-200 text-sm'>
                                                <th className='text-left'>Customer Name</th>
                                                <th className='text-left'>Order ID</th>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-lg'>
                                                <td className='text-left'>{e.Customer_Name}</td>
                                                <td className='text-left'>{e.Order_ID}</td>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-sm'>
                                                <th className='text-left'>Productt/Services</th>
                                                <th className='text-left'>Due Date</th>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-lg'>
                                                <td className='text-left'>{e.Product_Services}</td>
                                                <td className='text-left'>{e.Order_Date}</td>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-sm'>
                                                <th className='text-left'>Quantity</th>
                                                <th className='text-left'>Phone Number</th>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-lg'>
                                                <td className='text-left'>5</td>
                                                <td className='text-left'>0983828228</td>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-sm'>
                                                <th className='text-left'>Transaction Amoun</th>
                                                <th className='text-left'>Email</th>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-lg'>
                                                <td className='text-left'>ZMW 9000.00</td>
                                                <td className='text-left'>john@gmail.com</td>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-sm'>
                                                <th></th>
                                                <th className='text-left'>Adress</th>
                                            </tr>
                                            <tr className='text-gray-800 dark:text-gray-200 text-lg'>
                                                <td></td>
                                                <td className='text-left'>123 Main St, Anytown, USA</td>
                                            </tr>
                                        </table>

                                        <button onClick={() => setShow(true)} className='text-[#1A0670] font-bold border border-[#1A0670] rounded-lg text-center p-3 w-full'>View Customer Order Specifications</button>
                                    </>
                                }
                                <div className='mt-5 flex justify-end gap-2'>
                                    <button onClick={() => {setOption(null);setShow(false)}} className='border-gray-500 text-gray-800 border px-4 py-2 rounded-md flex items-center gap-2'>
                                        cancel
                                    </button>
                                    <button onClick={() => {setOption(null);setShow(false)}} className='bg-[#1A0670] text-white px-4 py-2 rounded-md flex items-center gap-2'>
                                        <Check />
                                        Mark as Setteled
                                    </button>
                                </div>

                            </div>

                        </div>
                    )
                })}
            </div>
            <div className='dark:bg-gray-800 text-sm md:text-md'>
                <table className='dark:text-gray-200'>
                    <thead className='bg-[#F8F9FA] shadow-md dark:bg-gray-700 dark:text-gray-200'>
                        <tr>
                            <th>ORDER STATUS</th>
                            <th>ORDER DATE</th>
                            <th>CUSTOMER NAME</th>
                            <th  className='md:block hidden'>PRODUCT/SERVICES</th>
                            <th className='md:block hidden'>ORDER ID</th>
                            <th  className='md:block hidden'>PAYMENT STATUS</th>
                        </tr>
                    </thead>
                    <tbody className='dark:text-gray-300'>
                        {data.filter(e => filter == '' ? e : e.Order_Status == filter).map(e => {
                            return (
                                <>
                                    <tr onClick={() => setOption(e.Order_ID)} className='cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600'>
                                        <td className='flex justify-center'>
                                            <div className={` ${e.Order_Status === 'Pending' ? 'bg-[#1A0670] text-white ' : 'text-[#1A0670]'}  py-1 px-3 dark:text-white rounded-md text-center flex items-center gap-2`}>
                                                {e.Order_Status === 'Pending' && <ClockIcon className='size-4' />}
                                                {e.Order_Status === 'Complete' && <CheckCircleIcon className='size-4' />}
                                                {e.Order_Status}
                                            </div>
                                        </td>
                                        <td>{e.Order_Date}</td>
                                        <td>{e.Customer_Name}</td>
                                        <td className='md:block hidden'>{e.Product_Services}</td>
                                        <td className='md:block hidden'>{e.Order_ID}</td>
                                        <td  className='md:block hidden'>{e.Payment_Status}</td>
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