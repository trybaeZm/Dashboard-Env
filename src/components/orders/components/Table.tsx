import React, { useEffect, useState } from 'react'
import '@/css/Table.css'
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "@heroicons/react/16/solid";
import { AlertTriangleIcon, BadgeCheckIcon, Check, DotIcon, ImageIcon } from 'lucide-react';
import { MdArrowBack } from 'react-icons/md';
import { OrderData } from '@/types/Orders';
import { getOrderImages, getOrdersByBusinessId, marckSettled } from '@/services/api/apiOrder';
import { getOrgData } from '@/lib/createCookie';
import Image from 'next/image';
import { TableRow } from './TableRow';

export const Table = ({ open, filter, data, businessLoading, setData }: { businessLoading: boolean, open: any, filter: string, data: OrderData[] | undefined | null, setData: any }) => {
    // api for getting orders data can be pkaced here


  
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
                            <th className=''>ORDER AMOUNT</th>
                            <th className=''>PAYMENT STATUS</th>
                        </tr>
                    </thead>
                    <tbody className='dark:text-gray-300 table-container'>
                        {data
                            ?.filter((e) => {
                                if (filter === '') return e.order_payment_status !== 'pending'; // show all
                                if (filter === 'pending') return e.order_status === 'pending' && e.order_payment_status !== 'pending';
                                if (filter === 'completed') return e.order_status === 'completed' && e.order_payment_status !== 'pending';
                                if (filter === 'failed') return e.order_payment_status === 'pending';
                                return false;
                            })
                            .map((e) => (
                                <TableRow setData={setData} key={e.id} e={e} />
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}