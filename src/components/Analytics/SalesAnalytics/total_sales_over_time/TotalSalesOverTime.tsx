'use client'
import { Table } from '@/app/sales-analytics/total_sales_over_time/components/Table'
import { ArrowLeftIcon, FilterIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getOrgData } from '@/lib/createCookie'
import { BusinessType } from '@/types/businesses'
import { getSalesAnalysis } from '@/services/api/apiSale'
import { Sale } from '@/types/Sales'
import { OrderData } from '@/types/Orders'
import { Customers } from '@/types/Customers'
import { TransactionTableType } from '@/types/TransactionsTablePopup'

// Define available months
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const getMonth = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth(); // getMonth() returns 0-11, so add 1 for 1-12

    return month
}

interface TransactionDetails {
    customers?: Customers;
    created_at: string;
    product_id: string;
    phone_number: string;
    receiptNo: string;
    email: string;
    amount: number;
    address: string;
}

const TotalSalesOverTime = () => {
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Total Sales Value");
    const [selectedM, setSelectedMonth] = useState<number>(new Date().getMonth())
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const businessData: BusinessType | null = getOrgData()
    const [data, setData] = useState<null | TransactionTableType | undefined>(null)
    const [Loading, setLoading] = useState(false)

    const handleTransactionClick = (customer_id: string, order: OrderData) => {
        // console.log("this is clicked: ",customer_id)

        let userData = data?.CustomerData.filter((e) => e.id == customer_id)[0]

        let PayloadData = {
            customers: userData, // assign the full Customers object
            created_at: order?.created_at ?? "",
            product_id: order?.product_id ?? "",
            phone_number: userData?.phone ?? "",
            receiptNo: order.id ?? "",
            email: userData?.email ?? "",
            amount: order.total_amount ?? "",
            address: userData?.location ?? "",
        }
        setTransactionDetails(PayloadData);
        setOpenDialog(true);
    };

    const getProductsPageData = React.useCallback(() => {
        setLoading(true)
        getSalesAnalysis(businessData?.id ?? null)
            .then((res: any) => {
                // console.log(res)
                setData(res)
            })
            .catch((errr) => {
                console.log(errr)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [businessData?.id])

    useEffect(() => {
        getProductsPageData()
    }, [getProductsPageData])


    const growthRate = () => {
        const previouse = data?.orderData.filter((e) => getMonth(e.created_at) == selectedM - 1).reduce((prev, cur) => prev + cur.total_amount, 0) ?? 0;
        const current = data?.orderData.filter((e) => getMonth(e.created_at) == selectedM).reduce((prev, cur) => prev + cur.total_amount, 0) ?? 0;

        if (previouse === 0) return 0;
        return ((current - previouse) / previouse) * 100;
    }


    return (
        <div className='pt-20 flex flex-col gap-10 items-center p-3'>
            {/* Header */}
            <div className='w-full'>
                <div className='flex gap-4 items-center'>
                    <button className='dark:text-gray-200' onClick={() => router.back()}>
                        <ArrowLeftIcon className='size-4' />
                    </button>
                    <div className='text-[#8B909AA8] dark:text-gray-400 text-xl flex gap-5 items-center font-bold'>
                        Total Sales Over Time
                        <span className='text-[#1A0670] dark:text-blue-400 text-2xl'> ZMW {data?.orderData.reduce((prev, curr) => prev + curr.total_amount, 0)} </span>
                    </div>
                </div>
            </div>
            {/* Month Selector */}
            <div className='w-full flex flex-wrap gap-6 text-xl dark:text-gray-200'>
                {months.map((month, key) => (
                    <button
                        key={month}
                        onClick={() => setSelectedMonth(key)}
                        className={`relative ${selectedM == key ? 'font-bold text-[#1A0670] dark:text-blue-400' : ''
                            }`}
                    >
                        {month}
                        {selectedM === key && <div className='h-[5px] bg-black dark:bg-white w-full'></div>}
                    </button>
                ))}
            </div>
            {/* Filter Dropdown */}
            <div className='w-full flex justify-end pe-5'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex text-lg items-center bg-white text-gray-800 dark:text-gray-200 dark:bg-boxdark'>
                        <FilterIcon className='size-4' />
                        {selectedFilter}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-boxdark">
                        <DropdownMenuSeparator />
                        {["Total Sales Value", "Total Number of Transactions", "Date", "Customer Name"].map(filter => (
                            <DropdownMenuItem
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                            >
                                By: {filter}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Stats Section */}
            <div className='flex w-full'>
                <div className='grow'>
                    <div className='flex flex-wrap justify-between'>
                        {[
                            {
                                value: 'ZMW ' + (data?.orderData ?? [])
                                    .filter(e => getMonth(e.created_at) == selectedM)
                                    .reduce((sum, e) => sum + (e.total_amount ?? 0), 0), label: 'Current Month Revenue'
                            },
                            { value: data?.orderData?.filter((e) => getMonth(e?.created_at) == selectedM).length, label: 'Number of Sales' },
                            { value: growthRate().toFixed(2) + '%', label: 'Growth from Previous Month' }
                        ].map(stat => (
                            <div key={stat.label} className='grow text-center'>
                                <div className='text-2xl text-[#1A0670] dark:text-blue-400 font-bold'>{stat.value}</div>
                                <div className='font-light dark:text-gray-300'>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Table with transaction click */}
                    <Table
                        open={openDialog}
                        setDialogOpen={setOpenDialog}
                        customers={data?.CustomerData}
                        data={data?.orderData.filter((e) => getMonth(e.created_at) == selectedM)}
                        onTransactionClick={handleTransactionClick}
                    />
                </div>
            </div>

            {/* Dynamic AlertDialog for Transaction Details */}
            <AlertDialog open={openDialog}>
                <AlertDialogContent className="dark:bg-gray-800  bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-gray-200">Transaction Details</AlertDialogTitle>
                        <AlertDialogDescription>
                            {transactionDetails ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left border dark:border-gray-700">
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-600">Customer Name</th>
                                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{transactionDetails.customers?.name}</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-600">Transaction Date</th>
                                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{transactionDetails.created_at}</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-600">Product/Services</th>
                                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{transactionDetails.product_id}</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-600">Phone Number</th>
                                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{transactionDetails.phone_number}</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-600">Receipt No.</th>
                                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{transactionDetails.receiptNo}</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-600">Email</th>
                                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{transactionDetails.email}</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-600">Transaction Amount</th>
                                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">ZMW {transactionDetails.amount}</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-600">Address</th>
                                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{transactionDetails.address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">No transaction selected.</p>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setOpenDialog(false)}
                            className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            Close
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-[#1C0F86] dark:bg-blue-600 dark:text-gray-200 dark:hover:bg-blue-700">
                            Done
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}

// Helper component for detail items
const DetailItem = ({ label, value }: { label: string; value: any }) => (
    <div>
        <div className='text-sm text-[#8B909A] dark:text-gray-400'>{label}</div>
        <div className='text-lg font-bold dark:text-gray-200'>{value}</div>
    </div>
);

export default TotalSalesOverTime;
