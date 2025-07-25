'use client'
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
import { genderRatioData, getCustomersForBusiness } from '@/services/apiCustomers'
import { getData, getOrgData } from '@/lib/createCookie'
import { ApiDatatype } from '@/services/token'
import { Customers } from '@/types/Customers'
import { BusinessType } from '@/types/businesses'
import { Table } from '../components/Table'

const CustomerGenderRatio = () => {

    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customers | null>(null);
    const [gender, setGender] = useState<string>('all')
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [customerData, setCustomerData] = useState<Customers[] | null | undefined>(null)
    const navigation = useRouter()
    const userData: ApiDatatype = getData()
    const businessData: BusinessType | null = getOrgData()

    const getCustomers = () => {
        setLoading(true)
        getCustomersForBusiness(businessData?.id)
            .then((data: any) => {
                // console.log(data)
                if (data) {
                    setCustomerData(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const RevenueFromFemales = () => {
        genderRatioData(businessData?.id ?? '')
            .then((res) => {
                // console.log(res)
                setData(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

            })
    }


    useEffect(() => {
        getCustomers()
        RevenueFromFemales()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='pt-20 flex flex-col gap-5 items-center p-3 dark:bg-boxdark dark:text-white'>
            <div className='w-full'>
                <div className='flex gap-4 items-center'>
                    <button className='' onClick={() => navigation.back()}>
                        <ArrowLeftIcon className='size-4' />
                    </button>
                    <div className='text-[#8B909AA8] dark:text-bodydark text-xl flex gap-5 items-center font-bold'>
                        Customer Gender Ratio
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className='w-full'>
                <div className="w-full max-w-xs">
                    <label htmlFor="gender-select" className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                        Select Gender
                    </label>
                    <select
                        id="gender-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2 text-lg rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1A0670]"
                    >
                        <option value="all">All</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>


                <div className='w-full flex items-center pe-5 justify-end'>

                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex text-lg items-center bg-white dark:bg-boxdark'>
                            <FilterIcon className='size-4' />
                            sort</DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-boxdark">
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Total Sales Value</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Total Number of Transactions</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Date</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: Customer Name</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">By: dm</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent className="dark:bg-gray-800">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="dark:text-gray-200">Customer Details</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div className="flex flex-col gap-10">
                                        <div className="flex justify-between gap-10">
                                            <div>
                                                <div className="text-sm text-[#8B909A] dark:text-gray-400">Customer Name</div>
                                                <div className="text-lg font-bold dark:text-gray-200">
                                                    {selectedCustomer?.name ?? "N/A"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-[#8B909A] dark:text-gray-400">Customer Type</div>
                                                <div className="text-lg font-bold dark:text-gray-200">
                                                    {selectedCustomer?.customer_type ?? "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-10">
                                            <div>
                                                <div className="text-sm text-[#8B909A] dark:text-gray-400">Phone Number</div>
                                                <div className="text-lg font-bold dark:text-gray-200">
                                                    {selectedCustomer?.phone ?? "N/A"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-[#8B909A] dark:text-gray-400">Email</div>
                                                <div className="text-lg font-bold dark:text-gray-200">
                                                    {selectedCustomer?.email ?? "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-10">
                                            <div>
                                                <div className="text-sm text-[#8B909A] dark:text-gray-400">Location</div>
                                                <div className="text-lg font-bold dark:text-gray-200">
                                                    {selectedCustomer?.location ?? "N/A"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-[#8B909A] dark:text-gray-400">Gender</div>
                                                <div className="text-lg font-bold dark:text-gray-200">
                                                    {selectedCustomer?.gender ?? "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-[#8B909A] dark:text-gray-400">Customer Since</div>
                                            <div className="text-lg font-bold dark:text-gray-200">
                                                {selectedCustomer?.created_at
                                                    ? new Date(selectedCustomer.created_at).toLocaleDateString()
                                                    : "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel
                                    className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="bg-[#1C0F86] dark:bg-blue-600 dark:text-gray-200 dark:hover:bg-blue-700">
                                    Done
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
            {
                loading ?
                    <>
                        Loading...
                    </>
                    :
                    <>
                        {
                            customerData ?
                                <div className='flex w-full'>
                                    <div className='flex flex-col gap-5 grow'>
                                        <div className='flex flex-wrap justify-between '>
                                            <div className='grow text-center'>
                                                <div className='text-2xl text-[#1A0670] dark:text-white font-bold'>ZMW {gender == 'male' ? data?.Revenue.male : data?.Revenue.female}</div>
                                                <div className='font-light'>Revenue from {gender}</div>
                                            </div>
                                            <div className='grow text-center'>
                                                <div className='text-2xl text-[#1A0670] dark:text-white font-bold'>{gender == 'male' ? data?.NumberOfSales.male : data?.NumberOfSales.female}</div>
                                                <div className='font-light'>Number of Sales</div>
                                            </div>
                                            <div className='grow text-center'>
                                                <div className='text-2xl text-[#1A0670] dark:text-white font-bold'>{gender == 'male' ? data?.CustomerRatio.male : data?.CustomerRatio.female}%</div>
                                                <div className='font-light'>{gender} Customer Ratio</div>
                                            </div>
                                        </div>
                                        <div>
                                            <Table
                                                onCustomerClick={(customer: any) => setSelectedCustomer(customer)}
                                                setDialogOpen={setOpen}
                                                open={open}
                                                data={customerData?.filter(e => gender != 'all' ? e.gender === gender : e) ?? null}
                                            />
                                        </div>
                                    </div>
                                </div>
                                :
                                'No record for this user'
                        }
                    </>
            }
        </div>
    )
}

export default CustomerGenderRatio