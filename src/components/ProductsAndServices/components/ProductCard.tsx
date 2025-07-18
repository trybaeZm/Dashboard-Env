import { getProductImages, ProductWithSales } from '@/services/api/products'
import { Product } from '@/types/product'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { CopyIcon, EditIcon, ImageIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PiDotsThreeOutlineFill } from 'react-icons/pi'

export const ProductCard = ({ setModal, e }: { setModal: any, e: ProductWithSales }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const getImages = () => {
        getProductImages(e.id)
            .then((res) => {
                console.log(res, res?.length)
                if (res && res.length > 0) {
                    setImageUrl(res[0])
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

            })
    }
    useEffect(() => {
        getImages()

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div className=''>
                    {
                        imageUrl ?
                        <div className='p-9 '>
                            <Image
                                src={imageUrl}    // Path relative to the `public` folder
                                alt="Description of image"
                                width={100}                  // Required width
                                height={100}
                                style={{ objectFit: 'contain' }}              // Required height
                            />
                        </div>
                            :
                            <div className='p-9 bg-[#EDF0F7] dark:bg-gray-700'>
                                <ImageIcon className='size-[50px] dark:text-gray-200' />
                            </div>

                    }
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
