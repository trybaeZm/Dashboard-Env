'use client'
import { Table } from '@/app/sales-analytics/total_sales_over_time/components/Table'
import { ArrowLeftIcon, FilterIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const TotalSalesOverTime = () => {
    const navigation = useRouter()

    const [open, setOpen] = useState(false)
    return (
        <div className='pt-20 flex flex-col gap-10 items-center p-3'>
            <div className='w-full'>
                <div className='flex gap-4 items-center'>
                    <button className='dark:text-gray-200' onClick={() => navigation.back()}>
                        <ArrowLeftIcon className='size-4' />
                    </button>
                    <div className='text-[#8B909AA8] dark:text-gray-400 text-xl flex gap-5 items-center font-bold'>
                        Total Sales Over Time  <span className='text-[#1A0670] dark:text-blue-400 text-2xl'> ZMW 27,500 </span>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex flex-wrap gap-6 text-xl dark:text-gray-200'>
                    <button>January  <div className='h-[5px] bg-black dark:bg-white'></div></button>
                    <button>February</button>
                    <button>March</button>
                    <button>April</button>
                    <button>May</button>
                    <button>June</button>
                    <button>July</button>
                    <button>August</button>
                    <button>September</button>
                    <button>October</button>
                    <button>November</button>
                    <button>December</button>
                </div>
                <div className='w-full flex items-center pe-5 justify-end'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex text-lg items-center bg-white text-gray-800 dark:text-gray-200 dark:bg-boxdark'>
                            <FilterIcon className='size-4' />
                            sort</DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-boxdark">
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Total Sales Value</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Total Number of Transactions</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Date</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Customer Name</DropdownMenuItem>
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
                                <AlertDialogCancel onClick={() => setOpen(false)} className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-[#1C0F86] dark:bg-blue-600 dark:text-gray-200 dark:hover:bg-blue-700'>Done</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className='flex w-full'>
                <div className='grow'>
                    <div className='flex flex-wrap justify-between'>
                        <div className='grow text-center'>
                            <div className='text-2xl text-[#1A0670] dark:text-blue-400 font-bold'>ZMW 12,000</div>
                            <div className='font-light dark:text-gray-300'>Current Month Revenue</div>
                        </div>
                        <div className='grow text-center'>
                            <div className='text-2xl text-[#1A0670] dark:text-blue-400 font-bold'>137</div>
                            <div className='font-light dark:text-gray-300'>Number of Sales</div>
                        </div>
                        <div className='grow text-center'>
                            <div className='text-2xl text-[#1A0670] dark:text-blue-400 font-bold'>12%</div>
                            <div className='font-light dark:text-gray-300'>Growth from Previous Month</div>
                        </div>
                    </div>
                    <div className='grow'>
                        <Table open={setOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalSalesOverTime