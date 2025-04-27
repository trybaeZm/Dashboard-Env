import { PhotoIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'

export const Page4 = ({ setPageNumber, pageNumber }: { setPageNumber: any, pageNumber: number }) => {
    const [modal, setModal] = useState(false)
    return (
        <div className=''>
            <div className={`fixed top-0 bottom-0 flex left-0 right-0 flex justify-end  ${modal ? "" : "hidden"}`}>
                <div className='absolute z-0 top-0 bottom-0 left-0 right-0 flex justify-end bg-[#00000050] ' onClick={()=> setModal(false)}></div>
                <div className='bg-white z-4 top-0 bottom-0  absolute overflow-y-auto px-10 py-5 '>
                    <div className=' flex flex-col gap-4'>
                        <div className='text-4xl font-bold '>
                            Add New Product/Service
                        </div>
                        <div className='flex max-w-[500px] border border-black rounded-lg'>
                            <div className='px-6 flex items-center bg-[#EDF0F7]'>
                                <PhotoIcon className='w-[40px]' />
                            </div>
                            <div className='p-4 flex flex-col gap-1'>
                                <div className='font-bold'>Product/Service Name Card</div>
                                <div className='text-sm text-[#717D96]'>ZMW XXXX</div>
                                <div className='text-[#717D96]'>product description</div>
                            </div>
                        </div>
                        <hr />
                        <div className='flex flex-col gap-4'>
                            <div className='p-10 border border-[#717D96] rounded-lg flex items-center justify-center'>
                                <PhotoIcon className='w-[30px]' />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] text-sm'>Product/Service</label>
                                    <Select >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="option">option</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] text-sm'>Enter Product/Service Name</label>
                                    <Input type='text' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] text-sm'>Enter the Selling Price</label>
                                    <Input type='text' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] text-sm'>Describe the Product/Service Briefly (Optional)</label>
                                    <Input type='textarea' />
                                </div>
                            </div>

                            <div className='flex gap-3 justify-end'>
                                <button onClick={()=> setModal(false)} className='border py-2 rounded-[100px] border-[#B9B9B9] text-[#B9B9B9] px-4'>Cancel</button>
                                <button onClick={()=> setModal(false)} className='bg-[#1C0F86] py-2 rounded-[100px] text-white px-4 '>Finish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <div className='text-4xl font-bold '>
                        Add Products/Services that your<br />
                        Business offers
                    </div>
                    <div>
                    Provide key details—edit anytime if needed.
                    </div>
                </div>
                <div className='flex bg-linear-to-r from-cyan-500 to-blue-500 flex-col'>
                    <div className='flex hidden flex-col min-h-[300px]'>
                        <div className='flex grow-0  gap-4'>
                                <div className='border rounded-md font-bold p-3 border-black'>
                                    <div>Product/Service Name Card</div>
                                    <div className='text-[10px]'>ZMW XXX</div>
                                    <div><u>Edit</u></div>
                                </div>
                                <button onClick={()=> setModal(true)} className='border flex items-center px-5 rounded-md font-bold p-3 border-black'>
                                <PlusIcon className='w-[20px]' />
                                </button>
                        </div>
                    </div>
                    <div className='grow flex items-center min-h-[300px]   justify-center'>
                        <button onClick={()=> setModal(true)} className='bg-[#1C0F86] flex text-white py-2 px-4 rounded-[100px] items-center gap-3'>
                            <PlusIcon className='w-[20px]' />
                            Add Product/Service
                        </button>
                    </div>
                    <div>
                        <div className='h-[2px] bg-black'></div>
                        <div className='py-3 justify-end flex gap-5'>
                            <button className='text-[#2D3648]'>Skip</button>
                            <button onClick={()=> setPageNumber(pageNumber+1)} className='border border-[#2D3648] rounded-[100px] py-2 px-4 text-[#2D3648]'>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
