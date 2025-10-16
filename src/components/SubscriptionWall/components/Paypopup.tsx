import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Wallet, Banknote, CheckCircle2, AlertCircle, Loader2, Copy, Shield, Wallet2, LucideIcon, X, XCircle } from "lucide-react"
import { getSubscription, redirectToPayment } from "@/services/subscription/subscriptionService"
import { getData } from "@/lib/createCookie"
import { PayoutPopupProps, Subscription } from "@/types/Subscription"
import { useRouter } from "next/navigation"



export const PayoutPopup = ({
    isOpen,
    onClose,
    amountPayable,
    plan
}: PayoutPopupProps) => {
    const [loading, setLoading] = useState(false)
    const [payoutAmount, setPayoutAmount] = useState('')
    const [selectedMethod, setSelectedMethod] = useState('momo')
    const [withWallet, setWithWallet] = useState(true)
    const [step, setStep] = useState<'form' | 'confirmation' | 'success'>('form')
    const [error, setError] = useState('')
    const userData = getData()
    const route = useRouter()



    const payoutMethods = [
        {
            id: 'momo',
            name: 'mobile money',
            description: 'Direct to your mobile money',
            icon: <Banknote className="w-5 h-5" />,
            fee: '',
            processing: 'instant'
        },
    ]

    const handlePayout = async () => {
        setError('')
        setLoading(true)

        getSubscription(plan.id, userData?.id, (amountPayable ?? 0) *25, withWallet)
            .then((res) => {
                const result = res as { data: { paymentLink: string } }
                redirectToPayment(result.data.paymentLink)
                console.log(result.data.paymentLink)
                // console.log('from frontend: ',plan.id, userData?.id, withWallet)
                setStep('success')
                // route.push('/')
            })
            .catch((err) => {
                console.log(err)

            })
            .finally(() => {
                setLoading(false)
            })

    }

    const handleClose = () => {
        onClose()
    }


    const WalletCard = ({ name, Icon, value }: { name: string, Icon: LucideIcon, value: boolean }) => {
        return (
            <div
                onClick={() => setWithWallet(value)}
                className={`p-4 border-2 grow rounded-xl cursor-pointer transition-all duration-200 ${withWallet == value
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${withWallet == value
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}>
                            <Icon />
                        </div>
                        <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                                {name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[500px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-0 z-[9999] overflow-hidden">

                {/* Success State */}
                {step === 'success' ? (
                    <div className="p-6 text-center space-y-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>

                        <div>
                            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Payout Successful!
                            </DialogTitle>
                            <DialogDescription className="text-gray-600 dark:text-gray-400 text-lg">
                                ${payoutAmount} is on its way to your {payoutMethods.find(m => m.id === selectedMethod)?.name}
                            </DialogDescription>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                            <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                                <div className="flex justify-between">
                                    <span>Transaction ID:</span>
                                    <span className="font-mono flex items-center gap-1">
                                        TXN_{Date.now().toString().slice(-8)}
                                        <Copy className="w-3 h-3 cursor-pointer hover:text-green-800" />
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated arrival:</span>
                                    <span>{payoutMethods.find(m => m.id === selectedMethod)?.processing}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleClose}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <DialogHeader className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg">
                                    <Wallet className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                        Complete Purchase
                                    </DialogTitle>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="p-6 space-y-6">

                            {/* Amount Input */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Payout Amount
                                </label>

                                {/* Quick Amounts */}
                                <div className="flex flex-wrap gap-2">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        ${(amountPayable ?? 0).toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Do you want to use our wallet?
                                </label>
                                <div className="flex gap-4">
                                    <WalletCard name="Yes" value={true} Icon={Wallet2} />
                                    <WalletCard name="No" value={false} Icon={XCircle} />
                                </div>
                            </div>

                            {/* Payout Methods */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Payout Method
                                </label>

                                <div className="space-y-2">
                                    {payoutMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${selectedMethod === method.id
                                                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                                                : 'border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${selectedMethod === method.id
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                        }`}>
                                                        {method.icon}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                            {method.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {method.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fee Breakdown */}
                            {payoutAmount && (
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Payout Amount:</span>
                                        <span>${parseFloat(payoutAmount).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Processing Fee ({payoutMethods.find(m => m.id === selectedMethod)?.fee}):</span>
                                        {/* <span>-${calculateFee().toFixed(2)}</span> */}
                                    </div>
                                    <div className="flex justify-between font-semibold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600 pt-2">
                                        <span>You&apos;ll receive:</span>
                                        {/* <span>${calculateTotal().toFixed(2)}</span> */}
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                <button
                                    onClick={handleClose}
                                    disabled={loading}
                                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePayout}
                                    disabled={loading || !((amountPayable ?? 0) >= 0)}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 shadow-lg"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        'Request Payout'
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}