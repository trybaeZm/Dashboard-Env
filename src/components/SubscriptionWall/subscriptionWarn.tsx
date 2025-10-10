'use client'
import { getData } from "@/lib/createCookie"
import { checkSub } from "@/services/subscription/subscriptionService"
import Cookies from "js-cookie"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ShouldShowSubscriptionWarn = () => {
    const showAdd = Cookies.get('showAdd')
    const [compShowAdd, setcompShowAdd] = useState(showAdd)
    const userData = getData()

    const checkSubs = () => {
        checkSub(userData?.id)
        .then((res)=>{
            if(res?.hasSubscription === false){
                setcompShowAdd('show')
            }
        })
    }

    useEffect(() => {
        checkSubs()
        console.log('showAdd cookie: ', showAdd)
    }, [])
    // Check if userData exists and hasSubscription is false
    return (
        <>
            {compShowAdd === 'show' ?
                <div className=" w-full h-16 flex justify-between px-10 pointer-events-none text-md  dark:text-gray-300 flex items-center justify-center bg-yellow-100/50 dark:bg-yellow-800/20 rounded-md mb-4 font-medium">
                    <div>
                    you currently do not have a subscription. please subscribe to continue using the service.
                    <Link href="" >Subscribe</Link>
                    </div>

                    <button onClick={()=> setcompShowAdd('hide')}>x</button>
                </div>
                :
                <></>
            }

        </>
    )


}