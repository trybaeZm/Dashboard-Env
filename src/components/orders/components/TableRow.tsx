import { getOrgData } from "@/lib/createCookie"
import { getOrderImages, getOrdersByBusinessId, marckSettled } from "@/services/api/apiOrder"
import { updatePaymentStatus } from "@/services/api/apiOrder"
import { OrderData } from "@/types/Orders"
import { AlertTriangleIcon, BadgeCheckIcon, CheckCircleIcon, ClockIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MdArrowBack } from "react-icons/md"


const ImageComp = ({ data }: { data: string }) => {
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState<string[] | null>(null)

    const getOrderImage = () => {
        setLoading(true)
        getOrderImages(data)
            .then((response) => {
                // console.log(response)
                setImage(response)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getOrderImage()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className=' w-full justify-center flex  dark:border-gray-200 rounded-md p-1'>
            {
                loading ?
                    <div className='text-gray-500 dark:text-gray-400'>Loading images...</div>
                    :
                    <>
                        {
                            image?.map((img, index) => (
                                <Image
                                    key={index}
                                    src={img}
                                    width={100}
                                    height={100}
                                    alt={`Order Image ${index + 1}`}
                                // className='max-w-40 grow object-cover rounded-md'
                                />
                            ))
                        }
                    </>
            }
        </div>
    )
}


export const TableRow = ({ e, setOrderData }: { e: OrderData, setOrderData: (data: any) => void }) => {
    const [option, setOption] = useState<OrderData | null>(null)
    const [show, setShow] = useState(false)
    const [loding, setLoding] = useState(false)
    const [loading, setLoading] = useState(false)
    const businessData = getOrgData() // Assuming this function returns the business data

    const HundelSetteld = (data: string) => {
        setLoading(true)
        // console.log(data)
        marckSettled(data)
            .then((res) => {
                // console.log("res:", res)
                getOrdersByBusinessId(businessData?.id)
                    .then((response) => {
                        setOrderData(response)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const InfoBlock = ({ label, value }: { label: string; value?: string | number }) => (
        <div>
            <div className="text-sm font-bold">{label}</div>
            <div>{value || "—"}</div>
        </div>
    );

    const updateOrderPaymentStatus = (paymentId: string, token: string) => {
        // console.log("Updating payment status for:", paymentId, token)
        setLoding(true)
        updatePaymentStatus(paymentId, token)
            .then((res) => {
                console.log("Payment status updated successfully:", res);
                getOrdersByBusinessId(businessData?.id) // Refresh the order data after updating payment status
                    .then((res) => {
                        // console.log(res)
                        setOrderData(res)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.error("Error updating payment status:", error);
            })
            .finally(() => {
                setLoding(false)
            })
    }

    return (
        <>
            {
                option ?
                    <div className="fixed flex justify-center items-center  top-0 bottom-0 left-0 right-0 z-[999]" >
                        <div onClick={() => setOption(null)} className='absolute h-full w-full bg-[#00000050]'></div>
                        {option ?
                            <div className=' rounded-md overflow-y-auto max-h-[90vh] absolute bg-white shadow-md dark:bg-gray-800'>
                                <div className='flex p-5 gap-10 sticky top-0 bg-gray-200 dark:bg-gray-800 justify-between items-center'>
                                    <div className='flex gap-5'>
                                        {
                                            show ?
                                                <button onClick={() => setShow(false)}>
                                                    <MdArrowBack size={30} />
                                                </button>
                                                :
                                                <></>
                                        }
                                        <div className='text-2xl text-gray-800 dark:text-gray-200 font-bold'>Order Details</div>
                                    </div>
                                    <div className=" text-white px-4 py-2 rounded-md flex items-center gap-3">
                                        {/* Order Status */}
                                        {option?.order_payment_status === 'pending' ?
                                            ''
                                            :
                                            <button className="bg-[#1A0670] text-white px-4 py-2 rounded-md flex items-center gap-3">
                                                <span className="flex items-center gap-1">
                                                    {option?.order_status === 'Pending' ? (
                                                        <ClockIcon className="size-4" />
                                                    ) : (
                                                        <CheckCircleIcon className="size-4" />
                                                    )}
                                                    {option?.order_status}
                                                </span>
                                            </button>

                                        }

                                        <button
                                            className={`px-4 py-2 rounded-md flex items-center gap-2 
                                                        ${option?.order_payment_status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-green-100 text-green-800'}`}
                                        >
                                            <span className="flex items-center gap-1">
                                                {

                                                    loding ?
                                                        <span>Loading...</span>
                                                        :
                                                        <>
                                                            {option?.order_payment_status === 'pending' ? (
                                                                <>
                                                                    <AlertTriangleIcon className="size-4" />
                                                                    <span>Not Paid</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <BadgeCheckIcon className="size-4" />
                                                                    <span>Paid</span>
                                                                </>
                                                            )}

                                                        </>
                                                }
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className='mt-5 p-5 space-y-5'>
                                    {show ? (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                                {/* Summarized Notes */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                                                        Summarized Notes from Customer
                                                    </p>
                                                    <p className="text-gray-900 dark:text-gray-100">
                                                        {option?.sammarized_notes || "No notes available"}
                                                    </p>
                                                </div>

                                                {/* Images from Customer */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                                                        Images from the Customer
                                                    </p>
                                                    <div className="flex overflow-x-auto gap-4 mt-2">
                                                        <ImageComp data={option?.id} />
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Customer Name */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Customer Name</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{option?.customers?.name}</p>
                                                </div>

                                                {/* Order ID */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Order ID</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{option?.order_id}</p>
                                                </div>

                                                {/* Product/Services */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Product/Services</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{option?.products?.name}</p>
                                                </div>

                                                {/* Due Date */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Due Date</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{option?.created_at}</p>
                                                </div>

                                                {/* Quantity */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Quantity</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{option?.quantity}</p>
                                                </div>

                                                {/* Phone Number */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Phone Number</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{option?.customers?.phone}</p>
                                                </div>

                                                {/* Transaction Amount */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Transaction Amount</p>
                                                    <p className="text-gray-900 dark:text-gray-100">
                                                        ZMW {option?.total_amount ? option.total_amount.toFixed(2) : 0}
                                                    </p>
                                                </div>

                                                {/* Email */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Email</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{option?.customers?.email}</p>
                                                </div>

                                                {/* Address */}
                                                <div className="p-4 border rounded-lg dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Address</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{option?.delivery_location}</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setShow(true)}
                                                className="text-[#1A0670] bg-gray-600 font-bold border border-[#1A0670] rounded-lg text-center p-3 w-full mt-4"
                                            >
                                                View Customer Order Specifications
                                            </button>

                                        </>
                                    )}

                                    <div className='mt-5 flex justify-end gap-2'>
                                        <button onClick={() => { setOption(null); setShow(false) }} className='border-gray-500 text-white border px-4 py-2 rounded-md flex items-center gap-2'>
                                            cancel
                                        </button>

                                        {option?.order_status === 'completed' ?
                                            <button
                                                disabled
                                                className="bg-[#1A0670] opacity-[0.5] text-white px-4 py-2 rounded-md flex items-center gap-2"
                                            >
                                                Completed
                                            </button>
                                            :
                                            <>
                                                {option?.order_payment_status === 'completed' ?
                                                    <button
                                                        disabled={loading}
                                                        onClick={() => HundelSetteld(option?.id)}
                                                        className="bg-[#1A0670] text-white px-4 py-2 rounded-md flex items-center gap-2"
                                                    >
                                                        <CheckCircleIcon className="size-4" />
                                                        Mark Settled
                                                    </button>
                                                    :
                                                    <>
                                                        <button
                                                            disabled={loding}
                                                            onClick={() => {
                                                                // You can trigger a re-fetch or open a modal, etc.
                                                                updateOrderPaymentStatus(option?.transaction_id, option?.orderToken)

                                                            }}
                                                            className={`bg-[#1A0670] text-white px-4 py-2 rounded-md flex items-center gap-2 ${loding ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            {
                                                                loding ?
                                                                    <span>Loading..</span> :
                                                                    <>
                                                                        <AlertTriangleIcon className="size-4" />
                                                                        Check Payment Status
                                                                    </>
                                                            }
                                                        </button>
                                                    </>
                                                }
                                            </>

                                        }
                                    </div>
                                </div>

                            </div>
                            :
                            <>
                            </>
                        }
                    </div>
                    :
                    <></>
            }
            <tr
                key={e.id}
                onClick={() => {
                    setOption(e)
                    console.log("order: ", e)
                }}
                className=''
            >
                <td className='flex justify-center'>
                    <div className={`py-1 px-3 rounded-md text-center flex items-center gap-2 ${e.order_status === 'pending' ? 'bg-[#1A0670] text-white' : 'text-[#1A0670] dark:text-white'}`}>
                        {e.order_status === 'pending' && <ClockIcon className='size-4' />}
                        {e.order_status === 'complete' && <CheckCircleIcon className='size-4' />}
                        {e.order_status.charAt(0).toUpperCase() + e.order_status.slice(1)}
                    </div>
                </td>
                <td>{new Date(e.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td>{e.customers?.name}</td>
                <td className=''>{e.products.name}</td> {/* Product/Services not in structure – you can customize this if needed */}
                <td className=''>{e.order_id}</td>
                <td className=''>ZMW {e.total_amount?.toFixed(2)}</td>
                <td className="text-sm">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium ${e.order_payment_status !== 'pending'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {e.order_payment_status !== 'pending' ? (
                            <CheckCircleIcon className="size-4" />
                        ) : (
                            <AlertTriangleIcon className="size-4" />
                        )}
                        {e.order_payment_status === "pending" ? "Not Paid" : "Paid"}
                    </span>
                </td>
            </tr>
        </>
    )
}
