import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const Page2 = ({ setPageNumber, pageNumber }: { setPageNumber: any, pageNumber: number }) => {
    return (
        <div className='flex flex-wrap items-center  items-center justify-center'>
            <div className='flex flex-col gap-3'>
                <div className='font-bold text-4xl text-center'>Choose the best plan to boost <br/>
                    your business</div>
                <div className='text-lg text-[#B9B9B9] text-center'>
                Let AI agents be your employees, tracking sales, tracking customer data, creating and closing customer leads while you focus on your product or service. 
                </div>
                <div className='flex gap-5 flex-wrap'>
                    <div className='md:grow-0 grow p-5 items-center rounded-3xl border border-[#CBD2E0] flex flex-col gap-4'>
                        <div className='font-bold text-2xl'>Basic Plan</div>
                        <div><span className='text-2xl text-[#1C0F86] font-bold'>USD 00.00</span> <span className='text-[#B9B9B9]'>/Month</span></div>
                        <button onClick={()=> setPageNumber(pageNumber+1)} className='bg-[#1C0F86] py-3 text-white text-center rounded-[100px] px-4'>Coming soon</button>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                        </div>
                        <div className='text-[#B9B9B9]'><u>View more</u></div>
                    </div>
                    <div className='md:grow-0 p-5 grow items-center rounded-3xl border border-[#CBD2E0] flex flex-col gap-4'>
                        <div className='font-bold text-2xl'>Pro Plan</div>
                        <div><span className='text-2xl text-[#1C0F86] font-bold'>USD 10.00</span> <span className='text-[#B9B9B9]'>/Month</span></div>
                        <button onClick={()=> setPageNumber(pageNumber+1)} className='bg-[#1C0F86] py-3 text-white text-center rounded-[100px] px-4'>Coming soon</button>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                        </div>
                        <div className='text-[#B9B9B9]'><u>View more</u></div>
                    </div>
                    <div className='md:grow-0 p-5 grow rounded-3xl border border-[#CBD2E0] items-center flex flex-col gap-4'>
                        <div className='font-bold text-2xl'> Enterprise Plan</div>
                        <div><span className='text-2xl text-[#1C0F86] font-bold'>USD 25.00</span> <span className='text-[#B9B9B9]'>/Month</span></div>
                        <button onClick={()=> setPageNumber(pageNumber+1)} className='bg-[#1C0F86] py-3 text-white text-center rounded-[100px] px-4'>Coming soon</button>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                            <div className='flex items-center'>
                                <CheckBadgeIcon className='w-[20px] text-[#B9B9B9]' />
                                <div className='text-[#B9B9B9]'>Lorem ipsum dolor sit amet consectetur.</div>
                            </div>
                        </div>
                        <div className='text-[#B9B9B9]'><u>View more</u></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
