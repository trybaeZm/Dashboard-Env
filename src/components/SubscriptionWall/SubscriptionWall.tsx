import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { Lock, Star, Zap, Shield, CheckCircle, ArrowRight, Crown, Sparkles } from 'lucide-react'
import { getSubscriptionsDetails } from '@/services/subscription/subscriptionService';
import { Subscription } from '@/types/Subscription';
import { PlanCard } from './components/PlanCard';
import { getData } from '@/lib/createCookie';

const SubscriptionWall = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
    const [plans, setPlans] = useState<Subscription[] | null>(null);
    const [loading, setLoaind] = useState(false)
    const features = [
        { icon: <Zap className="w-5 h-5" />, text: "Advanced AI Analytics", premium: true },
        { icon: <Shield className="w-5 h-5" />, text: "Priority Customer Support", premium: true },
        { icon: <Star className="w-5 h-5" />, text: "Exclusive Business Insights", premium: true },
        { icon: <CheckCircle className="w-5 h-5" />, text: "Real-time Data Processing", premium: true },
        { icon: <Sparkles className="w-5 h-5" />, text: "Custom Reporting Dashboard", premium: true },
        { icon: <Crown className="w-5 h-5" />, text: "Multi-user Access", premium: true }
    ]
    const userData = getData()

    const closeButtonVariants = {
        initial: { scale: 1, rotate: 0 },
        hover: {
            scale: 1.1,
            rotate: 90,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.9 }
    }


    const getSubs = () => {
        setLoaind(true)
        getSubscriptionsDetails(userData?.id)
            .then((res) => {
                setPlans(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoaind(false)
            })
    }

    useEffect(() => {
        getSubs()
    }, [])


    return (

        <div className="fixed top-0 bottom-0 left-0 right-0 p-5 z-[99999] bg-[#00000050] overflow-y-auto" >
            <div className="min-h-screen bg-gray-200 bg-gray-900 rounded-lg shadow-md flex items-center justify-center p-10">
                {/* Close Button */}
                <motion.button
                    type="button"
                    className="absolute top-7 right-7 text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors"
                    variants={closeButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setOpen(false)}
                    aria-label="Close contact form"
                >
                    ×
                </motion.button>
                <div className="max-w-6xl w-full">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <Lock className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <Crown className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 dark:from-gray-100 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                            Unlock Premium Features
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Upgrade your plan to access advanced analytics, AI-powered insights, and exclusive business tools that will transform your operations.
                        </p>
                    </div>

                    <div className="space-y-12 gap-12 ">
                        {/* Left Side - Features */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-purple-500" />
                                What You&apos;re Missing
                            </h2>

                            <div className="space-y-4">
                                <div className=' grid md:grid-cols-2 grid-cols-1 gap-4'>
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg">
                                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                                {feature.icon}
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-white">{feature.text}</span>
                                            {feature.premium && (
                                                <span className="ml-auto px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full font-medium">
                                                    PREMIUM
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Current Limitations */}
                            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Current Limitations
                                </h3>
                                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                                    <li>• Basic analytics only</li>
                                    <li>• Limited to 50 orders per month</li>
                                    <li>• Standard support response time</li>
                                    <li>• No AI-powered insights</li>
                                </ul>
                            </div>
                        </div>


                        {/* Right Side - Pricing Plans */}
                        {
                            loading ?
                                <div className="flex items-center justify-center ">
                                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>

                                :

                                <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 flex justify-center  flex-wrap gap-4">
                                    {plans?.map((plan, index) => (
                                        <PlanCard plan={plan} key={index} />
                                    ))}
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionWall