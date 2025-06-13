import { ProductWithSales } from '@/services/api/products'
import { Product } from '@/types/product'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { CopyIcon, EditIcon, ImageIcon, TrashIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { PiDotsThreeOutlineFill } from 'react-icons/pi'

export const ProductCard = ({ setModal, e }: { setModal: any, e: ProductWithSales }) => {
    useEffect(() => {
        
    }, [])
    return (
        <>
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
                    <div className='text-lg font-bold dark:text-gray-200'>{e.name}</div>
                    <div className='text-[#1C0F86] dark:text-blue-400 font-bold text-md'>{'ZMK ' + e.price.toFixed(2)}</div>
                    <div className='font-light text-sm dark:text-gray-400'>{e.sales.length} {e.sales.length > 0 ? 'Units' : 'Unit'} Sold</div>
                </div>
            </div>
        </>
    )
}
