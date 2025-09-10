import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { getOrgData, storeOrgData } from '@/lib/createCookie'
import { BusinessType } from '@/types/businesses'
import { useRouter } from 'next/navigation'
import { ArrowRight, EditIcon, ImageIcon, TrashIcon } from 'lucide-react'
import { DeleteDiag } from './DeleteDiag';
import { EditDiag } from './EditDiag';
import { getProductImages } from '@/services/api/apiBusiness';

export const BusinessCard = ({ data, getBusinessByUserID }: { data: BusinessType, getBusinessByUserID: () => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [editIsOpen, setEditIsOpen] = useState(false)
    const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null)
    const navigation = useRouter()

    const business = getOrgData()
    const storeDatatoCookies = (data: BusinessType) => {
        storeOrgData(data)
        navigation.push('/overview')
    }
    const getImages = () => {
        getProductImages(data?.id, data.imageName)
            .then((res) => {
                console.log("images collected", res)
                if (res && res.length > 0) {
                    setImageUrl(res)
                }
            })
            .catch((err) => console.error(err))
    }



    useEffect(() => {
        getImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <DeleteDiag getBusinessByUserID={getBusinessByUserID} data={data} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <EditDiag  getBusinessByUserID={getBusinessByUserID} productImage={imageUrl} data={selectedBusiness} isOpen={editIsOpen} onClose={() => setEditIsOpen(false)} />
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
                                <div onClick={() => { setEditIsOpen(true); setSelectedBusiness(data) }} className='flex gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700' >
                                    <EditIcon /> Edit
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex gap-2 text-gray-800 dark:text-gray-200">
                                <div onClick={() => setIsOpen(true)} className='flex gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700'>
                                    <TrashIcon /> Delete

                                </div>

                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Product Image */}
                    <div className='flex gap-4 w-full items-center'>
                        
                        <div>
                            {imageUrl ? (
                                <div
                                    className="w-20 h-20 bg-cover rounded-md overflow-hidden"
                                    style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }} // replace with your bg image
                                ></div>

                            ) : (
                                <div className="p-9 w-40 h-40 bg-[#EDF0F7] items-center flex  justify-center dark:bg-gray-700">
                                    <ImageIcon className="size-[50px] dark:text-gray-200" />
                                </div>
                            )}
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                {data.business_name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {data.company_alias} &bull; {data.industry}
                            </p>
                        </div>

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
