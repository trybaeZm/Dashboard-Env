'use client'
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export const ShouldShowSubscriptionWarn = () => {
    const showAdd = Cookies.get('showAdd')
    const [compShowAdd, setcompShowAdd] = useState(showAdd)

    useEffect(() => {
        console.log('showAdd cookie: ', showAdd)
    }, [])
    // Check if userData exists and hasSubscription is false
    return (
        <>
            {compShowAdd === 'show' ?
                <div className=" w-full h-16 flex justify-between px-10 pointer-events-none text-md  dark:text-gray-300 flex items-center justify-center bg-yellow-100/50 dark:bg-yellow-800/20 rounded-md mb-4 font-medium">
                    you are currently using a free plan and it will only last for X days. upgrade to pro for more features
                    <button>x</button>
                </div>
                :
                <></>
            }

        </>
    )


}