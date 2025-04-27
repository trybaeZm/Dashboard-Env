'use client'
import React, { useState } from 'react'
import { TransactionTable } from './components/TransactionTable'
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { PlusIcon, SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export const Transaction = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
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
            <div className='p-20 flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <div className='text-2xl font-bold'>Transactions</div>
                    <div>
                        <div className="relative w-full">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 outline-none border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <TransactionTable popup={setOpen} />
                </div>
            </div>
        </div>
    )
}
