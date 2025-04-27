import React from 'react'

// images section
import image from '../../../public/images/Team work-bro 1.png'
import Image from 'next/image'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Input } from '@/components/ui/input'


export const Page1 = ({setPageNumber,pageNumber}:{setPageNumber:any,pageNumber:number}) => {
    return (
        <div className='flex flex-wrap items-center  items-center justify-center'>
            <div className='grow max-w-[500px]'>
                <Image src={image} className="w-[100%]" alt="" />
            </div>
            <div className='grow flex flex-col gap-3 max-w-[500px]'>
                <div className='font-bold text-4xl md:text-left text-center'>Sign-Up to InXource</div>
                <div className='text-lg md:text-left text-center'>
                Grow your business with inXource-your AI-powered team of virtual agents. From sales and accounting to lead generation and customer support, our smart agents handle it all, so you don’t have to hire extra employees. Focus on scaling while inXource does the work for you! 
                </div>
                <div className='flex flex-col gap-3'>
                    <div>
                        <div>
                            Enter email address
                        </div>
                        <Input type='email' />
                    </div>
                    <div>
                        <div>
                            Enter Password
                        </div>
                        <Input type='password' />
                    </div>
                    <div>
                        <div>
                            Confirm Password
                        </div>
                        <Input type='password' />
                    </div>
                    <div>
                        <div>
                            what Industry do you operate in?
                        </div>
                        <Input type='text' />
                    </div>
                </div>
                <div className='flex justify-end gap-5'>
                    <button className='border border-[#1C0F86] text-[#1C0F86] py-2 px-4 rounded-[100px] flex items-center gap-2'>Cancel</button>
                    <button onClick={()=> setPageNumber(pageNumber+1)} className='bg-[#1C0F86] text-white py-2 px-4 rounded-[100px] flex items-center gap-2'>
                        Proceed
                        <ArrowRightIcon className='w-[20px]' />
                    </button>
                </div>
            </div>
        </div>
    )
}
