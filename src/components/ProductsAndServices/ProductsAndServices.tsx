'use client'
import { CopyIcon, EditIcon, ImageIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PhotoIcon } from '@heroicons/react/24/outline';

export const ProductsAndServices = () => {

    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [open, setOpen] = useState(false)

    const options = [
        {
            title: "15 Day Non-Collateral Loans",
            amount: "ZMK2,500.00",
            quantity: "2400 Units Sold"
        },
        {
            title: "30 Day Non-Collateral Loans", 
            amount: "ZMK2,500.00",
            quantity: "2400 Units Sold"
        },
        {
            title: "60 Day Non-Collateral Loans",
            amount: "ZMK2,500.00", 
            quantity: "2400 Units Sold"
        },
    ]
    return (
        <div className='pt-20  dark:text-gray-200'>
            <div className={`fixed top-0 bottom-0 flex transition-all duration-300 left-0 right-0 flex justify-end z-999 ${modal ? "translate-x-0" : " translate-x-full"}`}>
                <div className='absolute z-0 top-0 bottom-0 left-0 right-0 flex justify-end bg-[#00000050] ' onClick={() => setModal(false)}></div>
                <div className='bg-white dark:bg-boxdark shadow-lg shadow-black/10 z-4 pt-20 top-0 bottom-0 absolute overflow-y-auto px-10 py-5'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-4xl font-bold dark:text-gray-200'>
                            Edit Product/Service
                        </div>
                        <div className='flex max-w-[500px] border border-black dark:border-gray-700 rounded-lg'>
                            <div className='px-6 flex items-center bg-[#EDF0F7] dark:bg-gray-700'>
                                <PhotoIcon className='w-[40px] dark:text-gray-200' />
                            </div>
                            <div className='p-4 flex flex-col gap-1'>
                                <div className='font-bold dark:text-gray-200'>Product/Service Name Card</div>
                                <div className='text-sm text-[#717D96] dark:text-gray-400'>ZMW XXXX</div>
                                <div className='text-[#717D96] dark:text-gray-400'>product description</div>
                            </div>
                        </div>
                        <hr className='dark:border-gray-700' />
                        <div className='flex flex-col gap-4'>
                            <div className='p-10 border border-[#717D96] dark:border-gray-700 rounded-lg flex items-center justify-center'>
                                <PhotoIcon className='w-[30px] dark:text-gray-200' />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Product/Service</label>
                                    <Select>
                                        <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="dark:bg-gray-700">
                                            <SelectItem value="option" className="dark:text-gray-200">option</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter Product/Service Name</label>
                                    <Input type='text' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter the Selling Price</label>
                                    <Input type='text' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Describe the Product/Service Briefly (Optional)</label>
                                    <Input type='textarea' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                            </div>

                            <div className='flex gap-3 justify-end'>
                                <button onClick={() => setModal(false)} className='border py-2 rounded-[100px] border-[#B9B9B9] text-[#B9B9B9] dark:border-gray-600 dark:text-gray-400 px-4'>Cancel</button>
                                <button onClick={() => setModal(false)} className='bg-[#1C0F86] py-2 rounded-[100px] text-white px-4'>Finish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className={`fixed top-0 bottom-0 flex transition-all duration-300 left-0 right-0 flex justify-end z-999 ${modal2 ? "translate-x-0" : " translate-x-full"}`}>
                <div className='absolute z-0 top-0 bottom-0 left-0 right-0 flex justify-end ' onClick={() => setModal2(false)}></div>
                <div className='bg-white dark:bg-boxdark shadow-lg shadow-black/10 pt-20 top-0 bottom-0 absolute overflow-y-auto px-10 py-5'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-4xl font-bold dark:text-gray-200'>
                            Add Product/Service
                        </div>
                        <div className='flex max-w-[500px] border border-black dark:border-gray-700 rounded-lg'>
                            <div className='px-6 flex items-center bg-[#EDF0F7] dark:bg-gray-700'>
                                <PhotoIcon className='w-[40px] dark:text-gray-200' />
                            </div>
                            <div className='p-4 flex flex-col gap-1'>
                                <div className='font-bold dark:text-gray-200'>Product/Service Name Card</div>
                                <div className='text-sm text-[#717D96] dark:text-gray-400'>ZMW XXXX</div>
                                <div className='text-[#717D96] dark:text-gray-400'>product description</div>
                            </div>
                        </div>
                        <hr className='dark:border-gray-700' />
                        <div className='flex flex-col gap-4'>
                            <div className='p-10 border border-[#717D96] dark:border-gray-700 rounded-lg flex items-center justify-center'>
                                <PhotoIcon className='w-[30px] dark:text-gray-200' />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Product/Service</label>
                                    <Select>
                                        <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="dark:bg-gray-700">
                                            <SelectItem value="option" className="dark:text-gray-200">option</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter Product/Service Name</label>
                                    <Input type='text' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter the Selling Price</label>
                                    <Input type='text' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Describe the Product/Service Briefly (Optional)</label>
                                    <Input type='textarea' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                            </div>

                            <div className='flex gap-3 justify-end'>
                                <button onClick={() => setModal(false)} className='border py-2 rounded-[100px] border-[#B9B9B9] text-[#B9B9B9] dark:border-gray-600 dark:text-gray-400 px-4'>Cancel</button>
                                <button onClick={() => setModal(false)} className='bg-[#1C0F86] py-2 rounded-[100px] text-white px-4'>Finish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='flex justify-between z-1'>
                <div className='text-2xl font-bold dark:text-gray-200'>Products and Services</div>
                <div>
                    <button onClick={()=> setModal2(true)} className='flex items-center rounded-md gap-3 border border-black dark:border-gray-600 py-1 px-3 dark:text-gray-200'>
                        <PlusIcon className='size-4' />
                        Add Products/Services
                    </button>
                </div>
            </div>
            <div className='flex justify-center z-1 py-5'>
                <div className='max-w-[800px] flex flex-col gap-5 w-full'>
                    {
                        options.map((e) =>
                            <div className='border relative flex gap-4 items-center border-black dark:border-gray-700 rounded-md'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='flex absolute top-3 right-3 text-lg items-center'>
                                        <PiDotsThreeOutlineFill className='size-6 dark:text-gray-200' />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white dark:bg-boxdark">
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={() => setModal(true)}> <EditIcon /> Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"> <CopyIcon /> Duplicate</DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"> <TrashIcon /> Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className='p-9 bg-[#EDF0F7] dark:bg-gray-700'>
                                    <ImageIcon className='size-[50px] dark:text-gray-200' />
                                </div>
                                <div className='p-4'>
                                    <div className='text-lg font-bold dark:text-gray-200'>{e.title}</div>
                                    <div className='text-[#1C0F86] dark:text-blue-400 font-bold text-md'>{e.amount}</div>
                                    <div className='font-light text-sm dark:text-gray-400'>{e.quantity}</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
