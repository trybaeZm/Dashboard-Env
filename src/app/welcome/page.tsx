'use client'
import React, { useEffect, useState } from 'react'
import { MainPage } from './MainPage'
import page from '../customers/page'
import { firstTimeVisitToken } from '@/lib/createCookie'


const Page = () => {
    const [pageNumber, setPageNumber] = useState(1)
    
    useEffect(()=> {
        
    },[])

    return (
        <div className='p-4 min-h-[100vh] flex flex-col items-center bg-white dark:bg-boxdark'>
            {
                pageNumber == 7 ?
                    ""
                    :
                    <div className='flex justify-between w-full'>
                        <button className='py-2 px-4 border border-black dark:border-white rounded-md text-black dark:text-white'>
                            logo
                        </button>

                        {

                        }
                        <button onClick={()=>firstTimeVisitToken()} className='py-2 px-4 border border-black dark:border-white rounded-md text-black dark:text-white'>
                            {
                                pageNumber > 1 ?
                                "Exit"
                                :
                                "log-in"
                            }
                        </button>
                    </div>
            }
            <div className='grow flex flex-col p-5 max-w-[1200px]'>
                <MainPage pageNumber={pageNumber} setPageNumber={setPageNumber} />
            </div>
        </div>
    )
}

export default Page