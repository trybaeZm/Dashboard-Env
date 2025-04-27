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
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const CustomerGenerRatio = () => {
    const navigation = useRouter()

    const [open, setOpen] = useState(false)
    return (
        <div className='pt-20 flex flex-col gap-5 items-center p-3'>
            <div className='w-full'>
                <div className='flex gap-4 items-center'>
                    <button className='' onClick={() => navigation.back()}>
                        <ArrowLeftIcon className='size-4' />
                    </button>
                    <div className='text-[#8B909AA8] text-xl flex gap-5 items-center font-bold'>
                    Customer Gender Ratio
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex overflowY-auto gap-6 text-xl'>
                    <button>Female  <div className='h-[5px] bg-black'></div></button>
                    <button>Male</button>
                </div>
                <div className='w-full flex items-center pe-5 justify-end'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex text-lg items-center'>
                            <FilterIcon className='size-4' />
                            sort</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>By: Total Sales Value</DropdownMenuItem>
                            <DropdownMenuItem>By: Total Number of Transactions</DropdownMenuItem>
                            <DropdownMenuItem>By: Date</DropdownMenuItem>
                            <DropdownMenuItem>By: Customer Name</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={open}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Transaction Details</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div className='flex flex-col gap-10'>
                                        <div className='flex justify-between gap-10'>
                                            <div>
                                                <div className='text-sm text-[#8B909A]'>
                                                    Customer Name
                                                </div>
                                                <div className='text-lg font-bold'>
                                                    James Sakala
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-[#8B909A]'>
                                                    Transaction Date
                                                </div>
                                                <div className='text-lg font-bold'>
                                                    12/12/2024
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between gap-10'>
                                            <div>
                                                <div className='text-sm text-[#8B909A]'>
                                                    Product/Services
                                                </div>
                                                <div className='text-lg font-bold'>
                                                    30 Day Non-Collateral Loan
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-[#8B909A]'>
                                                    Phone Number
                                                </div>
                                                <div className='text-lg font-bold'>
                                                    0934573913
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between gap-10'>
                                            <div>
                                                <div className='text-sm text-[#8B909A]'>
                                                    Receipt No.
                                                </div>
                                                <div className='text-lg font-bold'>
                                                    348210778
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-[#8B909A]'>
                                                    Email
                                                </div>
                                                <div className='text-lg font-bold'>
                                                    onejemsgalactic@gmail.com
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between gap-10'>
                                            <div>
                                                <div className='text-sm text-[#8B909A]'>
                                                    Transaction Amount
                                                </div>
                                                <div className='text-lg font-bold'>
                                                    3ZMW 4,500.00
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-sm text-[#8B909A]'>
                                                    Adreess
                                                </div>
                                                <div className='text-lg font-bold'>
                                                    41 Darlington Avenue, Wakanda
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-[#1C0F86]'>Done</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className='flex w-full'>
                <div className='flex flex-col gap-5 grow'>
                    <div className='flex justify-between '>
                        <div className='text-center'>
                            <div className='text-2xl text-[#1A0670] font-bold'>ZMW 12,000</div>
                            <div className='font-light'>Revenue from Female</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl text-[#1A0670] font-bold'>137</div>
                            <div className='font-light'>Number of Sales</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-2xl text-[#1A0670] font-bold'>12%</div>
                            <div className='font-light'>Female Customer Ratio</div>
                        </div>
                    </div>
                    <div>
                        <Table open={setOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerGenerRatio