import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { getOrgData, storeOrgData } from '@/lib/createCookie'
import { BusinessType } from '@/types/businesses'
import { useRouter } from 'next/navigation'
import { ArrowRight, EditIcon, TrashIcon } from 'lucide-react'
import { DeleteDiag } from './DeleteDiag';
import { EditDiag } from './EditDiag';

export const BusinessCard = ({ data }: { data: BusinessType }) => {
    const[isOpen, setIsOpen] = useState(false)
    const[editIsOpen, setEditIsOpen] = useState(false)
    const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null)
    const navigation = useRouter()
    
    const business = getOrgData()
    const storeDatatoCookies = (data: BusinessType) => {
        storeOrgData(data)
        navigation.push('/overview')
    }
    return (
        <>
        <DeleteDiag isOpen={isOpen} onClose={()=>setIsOpen(false)} />
        <EditDiag productImage={''} data={selectedBusiness} isOpen={editIsOpen} onClose={()=>setEditIsOpen(false)} />
            <div
                className="min-h-[150px] relative  cursor-pointer group 
                bg-gray-100 dark:bg-gray-700 hover:bg-gray-200  text-gray-700 dark:text-gray-300 
                border border-gray-300 dark:border-gray-600 
                flex flex-col justify-between items-start  rounded-md shadow-md"
            >
                <div className='p-4 flex flex-col items-end w-full'>
                    {/* Dropdown */}
                    
                    <DropdownMenu >
                        <DropdownMenuTrigger className="flex top-0 right-3 text-lg items-center">
                            <PiDotsThreeOutlineFill className="size-6 dark:text-gray-200" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white space-y-2 z-[99999999] shadow-md rounded-md dark:bg-boxdark">
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                
                                className=" cursor-pointer  text-gray-800 dark:text-gray-200"
                            // onSelect={() => setOpenModal(true)}
                            >
                                <div onClick={()=>{setEditIsOpen(true); setSelectedBusiness(data)}}  className='flex gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700' >
                                <EditIcon /> Edit
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex gap-2 text-gray-800 dark:text-gray-200">
                                <div onClick={()=>setIsOpen(true)} className='flex gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
                                <TrashIcon /> Delete

                                </div>

                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex w-full flex-col gap-1">
                        <h3 className="text-lg font-semibold text-black dark:text-white">
                            {data.business_name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {data.company_alias} &bull; {data.industry}
                        </p>
                    </div>
                </div>

                <div onClick={() => storeDatatoCookies(data)}
                className="self-center
                group-hover:text-black dark:group-hover:text-white dark:hover:bg-gray-800  dark:bg-gray-600 bg-gray-400 transition duration-300 w-full p-3 flex justify-end text-gray-500 dark:text-gray-400 transition duration-300"
                >
                    <ArrowRight size={20} />
                </div>
            </div>
        </>
    )
}
