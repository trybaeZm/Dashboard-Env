'use client'
import { useEffect } from "react"
import { ShouldShowSubscriptionWarn } from "../SubscriptionWall/subscriptionWarn"
import { checkuserexists } from "@/services/apiUsers"
import { getData, removeData } from "@/lib/createCookie"
import { useRouter } from "next/navigation"
import { Customers } from "@/types/Customers"

const Container = ({ children }: { children: any }) => {
    const router = useRouter()
    const userData = getData();
    useEffect(() => {
        checkuserexists(userData.id)
            .then((res) => {
                if (res) {
                    console.log()
                } else {
                    router.push('/login')
                    removeData()
                }
            })
            .catch((err) => {
                router.push('/login')
                removeData()
                if (err) {
                }
            })
    })
    return (
        <div className="grid grid-cols-12 gap-4 p-4 relative">
            {/* Left Spacer: hides on small screens, appears on md+ */}
            <div className="hidden md:block md:col-span-1 lg:col-span-2"></div>

            {/* Centered Content */}
            <div className="col-span-12  w-full lg:col-span-8 md:col-span-10  mx-auto">
                {/* Centered content goes here */}
                <ShouldShowSubscriptionWarn />
                {children}
            </div>

            {/* Right Spacer: hides on small screens, appears on md+ */}
            <div className="hidden md:block md:col-span-1 lg:col-span-2 "></div>
        </div>
    )
}

export default Container