'use client'
import React from 'react'
import { Lock, Star, Zap, Shield, CheckCircle, ArrowRight, Crown, Sparkles } from 'lucide-react'

const SubscriptionWall = () => {
    const features = [
        { icon: <Zap className="w-5 h-5" />, text: "Advanced AI Analytics", premium: true },
        { icon: <Shield className="w-5 h-5" />, text: "Priority Customer Support", premium: true },
        { icon: <Star className="w-5 h-5" />, text: "Exclusive Business Insights", premium: true },
        { icon: <CheckCircle className="w-5 h-5" />, text: "Real-time Data Processing", premium: true },
        { icon: <Sparkles className="w-5 h-5" />, text: "Custom Reporting Dashboard", premium: true },
        { icon: <Crown className="w-5 h-5" />, text: "Multi-user Access", premium: true }
    ]

    const plans = [
        {
            name: "Standard",
            price: "$29",
            period: "/month",
            description: "Perfect for small businesses",
            features: ["Basic Analytics", "Email Support", "Up to 100 orders/month"],
            cta: "Get Started",
            popular: true
        },
        {
            name: "Enterprise",
            period: "monthly",
            description: "For large organizations",
            features: ["All Professional features", "Dedicated account manager", "API Access", "White-label solutions"],
            cta: "Contact Sales",
            popular: false
        }
    ]

    return (
        <div className="min-h-screen bg-gray-200 bg-gray-900 rounded-lg shadow-md flex items-center justify-center p-4">
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

                    {/* Additional CTA Section */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/50">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Ready to Transform Your Business?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                                Join thousands of businesses that have upgraded to premium and seen an average of 40% growth in their operations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                                </button>
                                <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                                    Schedule Demo
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Right Side - Pricing Plans */}
                    <div className="space-y-6 flex justify-center flex-wrap gap-4">
                        {plans.map((plan, index) => (
                            <div key={index} className={`
                    relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl
                    ${plan.popular
                                    ? 'border-purple-500 shadow-lg'
                                    : 'border-gray-200/50 dark:border-gray-700/50 shadow-md'
                                }
                `}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1 mb-2">
                                        <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 dark:from-gray-100 dark:to-purple-400 bg-clip-text text-transparent">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`
                    w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
                    ${plan.popular
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }
                    `}>
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>



                {/* FAQ Section */}
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Why upgrade?</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Premium features are designed to help you make data-driven decisions, automate processes,
                            and scale your business efficiently with AI-powered insights.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Need help deciding?</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Our team is here to help you choose the right plan. Contact us for a personalized recommendation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionWall