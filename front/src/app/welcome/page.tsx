'use client'
import React, { useState } from 'react'
import { MainPage } from './MainPage'
import page from '../customers/page'


const Page = () => {
    const [pageNumber, setPageNumber] = useState(1)

    return (
        <div className='p-4 min-h-[100vh] flex flex-col'>
            {
                pageNumber == 7 ?
                    ""
                    :
                    <div className='flex justify-between'>
                        <button className='py-2 px-4 border border-black rounded-md'>
                            logo
                        </button>
                        <button className='py-2 px-4 border border-black rounded-md'>,
                            {
                                pageNumber > 1 ?
                                "Exit"
                                :
                            "log-in"
                            }
                        </button>
                    </div>
            }
            <div className='grow flex flex-col p-5'>
                <MainPage pageNumber={pageNumber} setPageNumber={setPageNumber} />
            </div>
        </div>
    )
}

export default Page