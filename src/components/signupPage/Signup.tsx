import { SignInButton, SignUpButton } from '@clerk/nextjs'
import React from 'react'

const Signup = () => {
    return (
        <div className='pt-20'>
            <div className=''>
                <div className='text-white grow-0 p-5  flex items-center '>
                    <div className='text-center text-lg w-full'>
                        Welcome to <span className='text-5xl font-bold '>Inxource</span>
                        <div className='text-lg'>inXource provides AI-powered agents that manage sales, marketing, inventory, accounting, and more—all in one place.</div>
                    </div>
                </div>
                <div className='grow flex items-center justify-center'>
                    <div className='text-lg text-white text-center '>
                        <div className='flex items-center gap-4'>
                            <div className='flex gap-4'>
                                <div className='bg-gray-300 grow rounded-md py-2 px-10 text-black hover:opacity-[0.4] cursor-pointer duration-500 '>
                                    <SignUpButton />
                                </div>
                                <div className='bg-gray-300 grow rounded-md py-2 px-10 text-black hover:opacity-[0.4] cursor-pointer duration-500 '>
                                    <SignInButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup