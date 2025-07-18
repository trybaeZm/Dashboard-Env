import React, { useEffect, useState } from 'react'
import '@/css/Table.css'
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "@heroicons/react/16/solid";
import { Check, DotIcon, ImageIcon } from 'lucide-react';
import { MdArrowBack } from 'react-icons/md';
import { OrderData } from '@/types/Orders';
import { getOrderImages, getOrdersByBusinessId, marckSettled } from '@/services/api/apiOrder';
import { getOrgData } from '@/lib/createCookie';
import Image from 'next/image';

export const Table = ({ open, filter, data, setData }: { open: any, filter: string, data: OrderData[] | undefined | null, setData: any }) => {
    // api for getting orders data can be pkaced here
    const [loading, setLoading] = useState(false)
    const businessData = getOrgData() // Assuming this function returns the business data

    const HundelSetteld = (data: string) => {
        setLoading(true)
        // console.log(data)
        marckSettled(data)
            .then((res) => {
                // console.log("res:", res)
                getOrdersByBusinessId(businessData?.id)
                    .then((response) => {
                        setData()
                    })
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const ImageComp = ({ data }: { data: string }) => {
        const [loading, setLoading] = useState(true)
        const [image, setImage] = useState<string[] | null>(null)

        const getOrderImage = () => {
            setLoading(true)
            getOrderImages(data)
                .then((response) => {
                    // console.log(response)
                    setImage(response)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }

        useEffect(() => {
            getOrderImage()
            
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        return (
            <div className=' w-full justify-center flex  dark:border-gray-200 rounded-md p-1'>
                {
                    loading ?
                        <div className='text-gray-500 dark:text-gray-400'>Loading images...</div>
                        :
                        <>
                            {
                                image?.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        width={100}
                                        height={100}
                                        alt={`Order Image ${index + 1}`}
                                    // className='max-w-40 grow object-cover rounded-md'
                                    />
                                ))
                            }
                        </>
                }
            </div>
        )
    }

    const TableRow = ({ e }: { e: OrderData }) => {
    const [option, setOption] = useState<OrderData | null>(null)
    const [show, setShow] = useState(false)

        return (
            <>
                {
                    option ?
                        <div className="fixed flex justify-center items-center  top-0 bottom-0 left-0 right-0 z-[999]" >
                            <div onClick={() => setOption(null)} className='absolute h-full w-full bg-[#00000050]'></div>
                            {option ?
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
                                            {option?.order_status === 'Pending' ? <ClockIcon className='size-4' /> : <CheckCircleIcon className='size-4' />}
                                            {option?.order_status}
                                        </button>
                                    </div>
                                    <div className='mt-5 p-5 space-y-5'>
                                        {show ?
                                            <>
                                                <div className='space-y-3 text-gray-800 dark:text-gray-200'>
                                                    <div className='text-lg font-bold'>
                                                        Summarized Notes from Customer
                                                    </div>
                                                    <div className='pl-5'>
                                                        -
                                                    </div>
                                                    <hr className='border my-3 border-gray-600' />
                                                    <div className='flex flex-col gap-3'>
                                                        <div className='text-lg font-bold'>Images from the customer</div>
                                                        <div className='flex overflow-y-auto  gap-4'>
                                                            <ImageComp data={option?.id} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                            :
                                            <>
                                                <div className=" text-gray-800 flex flex-wrap gap-5 dark:text-gray-200">
                                                    <div className='grow flex flex-col gap-3'>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Customer Name</div>
                                                            <div className="">{option?.customers.name}</div>
                                                        </div>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Order ID</div>
                                                            <div className="">{option?.order_id}</div>
                                                        </div>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Product/Services</div>
                                                            <div className=""></div>
                                                        </div>
                                                    </div>
                                                    <div className='grow flex flex-col gap-3'>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Due Date</div>
                                                            <div className="">{option?.created_at}</div>
                                                        </div>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Quantity</div>
                                                            <div className=""></div>
                                                        </div>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Phone Number</div>
                                                            <div className=""></div>
                                                        </div>
                                                    </div>

                                                    <div className='grow flex flex-col gap-3'>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Transaction Amount</div>
                                                            <div className="">{option?.total_amount ? "KMW " + option?.total_amount.toFixed(2) : "ZMW" + 0}</div>
                                                        </div>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Email:</div>
                                                            <div className=""></div>
                                                        </div>
                                                        <div className="">
                                                            <div className="text-sm font-bold">Address</div>
                                                            <div className="">123 Main St, Anytown, USA</div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <button onClick={() => setShow(true)} className='text-[#1A0670] bg-gray-600 font-bold border border-[#1A0670] rounded-lg text-center p-3 w-full'>View Customer Order Specifications</button>
                                            </>
                                        }
                                        <div className='mt-5 flex justify-end gap-2'>
                                            <button onClick={() => { setOption(null); setShow(false) }} className='border-gray-500 text-white border px-4 py-2 rounded-md flex items-center gap-2'>
                                                cancel
                                            </button>

                                            {
                                                loading ?
                                                    <>
                                                        Loading...
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            option?.order_status === 'completed' ?
                                                                <>
                                                                    <button disabled={loading} className='bg-[#1A0670] opacity-[0.5] text-white px-4 py-2 rounded-md flex items-center gap-2'>
                                                                        completed
                                                                    </button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button disabled={loading}
                                                                        onClick={() => {
                                                                            HundelSetteld(option?.id)
                                                                        }} className='bg-[#1A0670] text-white px-4 py-2 rounded-md flex items-center gap-2'>
                                                                        <CheckCircleIcon className='size-4' />
                                                                        Marck Settled
                                                                    </button>
                                                                </>
                                                        }
                                                    </>

                                            }

                                        </div>
                                    </div>

                                </div>
                                :
                                <>
                                </>
                            }
                        </div>
                        :
                        <></>
                }
                <tr
                    key={e.id}
                    onClick={() => setOption(e)}
                    className=''
                >
                    <td className='flex justify-center'>
                        <div className={`py-1 px-3 rounded-md text-center flex items-center gap-2 ${e.order_status === 'pending' ? 'bg-[#1A0670] text-white' : 'text-[#1A0670] dark:text-white'}`}>
                            {e.order_status === 'pending' && <ClockIcon className='size-4' />}
                            {e.order_status === 'complete' && <CheckCircleIcon className='size-4' />}
                            {e.order_status.charAt(0).toUpperCase() + e.order_status.slice(1)}
                        </div>
                    </td>
                    <td>{new Date(e.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>{e.customers?.name}</td>
                    <td className=''>–</td> {/* Product/Services not in structure – you can customize this if needed */}
                    <td className=''>{e.order_id}</td>
                    <td className=''>ZMW {e.total_amount?.toFixed(2)}</td>
                </tr>
            </>
        )
    }

    return (
        <>

            <div className='dark:bg-gray-700 p-4 shadow-md  text-sm md:text-md'>
                <table className='dark:text-gray-200'>
                    <thead className='bg-[#F8F9FA] shadow-md dark:bg-gray-700 dark:text-gray-200'>
                        <tr>
                            <th>ORDER STATUS</th>
                            <th>ORDER DATE</th>
                            <th>CUSTOMER NAME</th>
                            <th className=''>PRODUCT/SERVICES</th>
                            <th className=''>ORDER ID</th>
                            <th className=''>PAYMENT STATUS</th>
                        </tr>
                    </thead>
                    <tbody className='dark:text-gray-300 table-container'>
                        {data?.filter(e => filter === '' || e.order_status === filter).map(e => (
                            <>
                                <TableRow e={e} />
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}