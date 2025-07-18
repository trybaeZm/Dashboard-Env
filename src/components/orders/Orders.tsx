'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { FilterIcon,  Link } from 'lucide-react'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { Table } from './components/Table'
import { usePathname } from 'next/navigation'
import Container from '../Layouts/Container'
import { OrderData } from '@/types/Orders'
import { getOrdersByBusinessId } from '@/services/api/apiOrder'
import { getOrgData } from '@/lib/createCookie'

export const Orders = () => {
    const [open, setOpen] = useState(false)
    const router = usePathname()
    const [orderData, setOrderData] = useState<null | OrderData[] | undefined>()
    const [filterValue, setFilterValue] = useState('')
    const [loading, setLoading] = useState(false)
    const businessData = getOrgData() // Assuming this function returns the business data


    const getBusinessDat = () => {
        setLoading(true)
        getOrdersByBusinessId(businessData?.id)
            .then((res) => {
                // console.log(res)
                setOrderData(res)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            });
    }

    useEffect(() => {
        getBusinessDat()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div>
            <div className='pt-20 flex flex-col gap-3'>
                <div className='flex items-center gap-10'>
                    <button onClick={() => setFilterValue('')} className={`${filterValue === '' ? 'text-gray-800 text-2xl font-bold dark:text-gray-200' : 'text-gray-500 text-lg dark:text-gray-400'} transition-all duration-300`}>All</button>
                    <button onClick={() => setFilterValue('pending')} className={`${filterValue === 'pending' ? 'text-gray-800 text-2xl font-bold dark:text-gray-200' : 'text-gray-500 text-lg dark:text-gray-400'} transition-all duration-300`}>Pending</button>
                    <button onClick={() => setFilterValue('completed')} className={`${filterValue === 'completed' ? 'text-gray-800 text-2xl font-bold dark:text-gray-200' : 'text-gray-500 text-lg dark:text-gray-400'} transition-all duration-300`}>Settled</button>
                </div>

                <div className='flex items-center gap-3'>
                    <Input placeholder='Search' className='max-w-md w-full outline-none border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200' />
                    <button className='flex items-center gap-2 text-gray-800 dark:text-gray-200'>
                        <FilterIcon className='size-5' />
                        Filer
                    </button>
                    <button className='flex items-center gap-2 text-gray-800 dark:text-gray-200'>
                        <FunnelIcon className='size-5' />
                        Sort
                    </button>
                </div>
                <div className='mt-5'>
                    <Container>
                        <Table setData={getBusinessDat} data={orderData} filter={filterValue} open={setOpen} />
                    </Container>
                </div>
            </div>

        </div>
    )
}
