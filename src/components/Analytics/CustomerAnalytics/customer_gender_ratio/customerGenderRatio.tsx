'use client'
import { Table } from '@/app/sales-analytics/total_sales_over_time/components/Table'
import { ArrowLeftIcon, FilterIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCustomersForBusiness } from '@/services/apiCustomers'
import { getData } from '@/lib/createCookie'
import { ApiDatatype } from '@/services/token'
import { Customers } from '@/types/Customers'

const CustomerGenderRatio = () => {

    const [open, setOpen] = useState(false)
    const [gender, setGender] = useState<string>('female')
    const [loading, setLoading] = useState(false)
    const [customerData, setCustomerData] = useState<Customers[] | null>(null)
    const navigation = useRouter()
    const userData: ApiDatatype = getData()


    const getCustomers = () => {
        setLoading(true)
        getCustomersForBusiness(userData.user_id)
            .then((data: any) => {
                // console.log(data)
                if (data) {
                    setCustomerData(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }


    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <div className='pt-20 flex flex-col gap-5 items-center p-3 dark:bg-boxdark dark:text-white'>
            <div className='w-full'>
                <div className='flex gap-4 items-center'>
                    <button className='' onClick={() => navigation.back()}>
                        <ArrowLeftIcon className='size-4' />
                    </button>
                    <div className='text-[#8B909AA8] dark:text-bodydark text-xl flex gap-5 items-center font-bold'>
                        Customer Gender Ratio
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex overflowY-auto gap-6 text-xl'>
                    <button onClick={() => setGender('female')}>Female  {gender == 'female' ? <div className='h-[5px] bg-black dark:bg-white'></div> : <></>}</button>
                    <button onClick={() => setGender('male')}>Male {gender == 'male' ? <div className='h-[5px] bg-black dark:bg-white'></div> : <></>}</button>
                </div>

                <div className='w-full flex items-center pe-5 justify-end'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex text-lg items-center bg-white dark:bg-boxdark'>
                            <FilterIcon className='size-4' />
                            sort</DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-boxdark">
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Total Sales Value</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Total Number of Transactions</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Date</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Customer Name</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: dm</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={open}>
                        <AlertDialogContent className="dark:bg-gray-800">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="dark:text-gray-200">Transaction Details</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div className='flex flex-col gap-10'>
                                        <div className='flex justify-between gap-10'>
                                            <div>
                                                <div className='text-sm text-[#8B909A] dark:text-gray-400'>
                                                    Customer Name
                                                </div>
                                                <div className='text-lg font-bold dark:text-gray-200'>
                                                    James Sakala
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-[#8B909A] dark:text-gray-400'>
                                                    Transaction Date
                                                </div>
                                                <div className='text-lg font-bold dark:text-gray-200'>
                                                    12/12/2024
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between gap-10'>
                                            <div>
                                                <div className='text-sm text-[#8B909A] dark:text-gray-400'>
                                                    Product/Services
                                                </div>
                                                <div className='text-lg font-bold dark:text-gray-200'>
                                                    30 Day Non-Collateral Loan
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-[#8B909A] dark:text-gray-400'>
                                                    Phone Number
                                                </div>
                                                <div className='text-lg font-bold dark:text-gray-200'>
                                                    0934573913
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between gap-10'>
                                            <div>
                                                <div className='text-sm text-[#8B909A] dark:text-gray-400'>
                                                    Receipt No.
                                                </div>
                                                <div className='text-lg font-bold dark:text-gray-200'>
                                                    348210778
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-[#8B909A] dark:text-gray-400'>
                                                    Email
                                                </div>
                                                <div className='text-lg font-bold dark:text-gray-200'>
                                                    onejemsgalactic@gmail.com
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between gap-10'>
                                            <div>
                                                <div className='text-sm text-[#8B909A] dark:text-gray-400'>
                                                    Transaction Amount
                                                </div>
                                                <div className='text-lg font-bold dark:text-gray-200'>
                                                    3ZMW 4,500.00
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-[#8B909A] dark:text-gray-400'>
                                                    Adreess
                                                </div>
                                                <div className='text-lg font-bold dark:text-gray-200'>
                                                    41 Darlington Avenue, Wakanda
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600" onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-[#1C0F86] dark:bg-blue-600 dark:text-gray-200 dark:hover:bg-blue-700'>Done</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            {
                loading ?
                    <>
                        Loading...
                    </>
                    :
                    <>
                        {
                            customerData ?
                                <div className='flex w-full'>
                                    <div className='flex flex-col gap-5 grow'>
                                        <div className='flex flex-wrap justify-between '>
                                            <div className='grow text-center'>
                                                <div className='text-2xl text-[#1A0670] dark:text-white font-bold'>ZMW 12,000</div>
                                                <div className='font-light'>Revenue from Female</div>
                                            </div>
                                            <div className='grow text-center'>
                                                <div className='text-2xl text-[#1A0670] dark:text-white font-bold'>137</div>
                                                <div className='font-light'>Number of Sales</div>
                                            </div>
                                            <div className='grow text-center'>
                                                <div className='text-2xl text-[#1A0670] dark:text-white font-bold'>12%</div>
                                                <div className='font-light'>Female Customer Ratio</div>
                                            </div>
                                        </div>
                                        <div>
                                            <Table open={setOpen} data={customerData?.filter(e => e.gender == gender) ?? null} />
                                        </div>
                                    </div>
                                </div>
                                :
                                'No record for this user'
                        }
                    </>
            }
        </div>
    )
}

export default CustomerGenderRatio