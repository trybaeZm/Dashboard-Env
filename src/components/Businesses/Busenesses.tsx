'use client'
import { getData, storeOrgData } from '@/lib/createCookie'
import { getBusinessByOwnerID } from '@/services/api/apiBusiness'
import { BusinessType } from '@/types/businesses'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PiFunnel } from 'react-icons/pi'
import { Input } from '@/components/ui/input'

export const Busenesses = () => {
    const navigation = useRouter()
    const [loading, setLoading] = useState(false)
    const [organisationData, setOrganisationData] = useState<null | BusinessType[]>(null)
    const userData = getData()

    const storeDatatoCookies = (data: BusinessType) => {
        storeOrgData(data)
        navigation.push('/overview')
    }


    const getBusinessByUserID = async () => {
        setLoading(true);
        getBusinessByOwnerID(userData.id)
            .then((res) => {
                // console.log(res)
                setOrganisationData(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    };

    useEffect(() => {
        getBusinessByUserID()
    }, [])


    return (
        <div className='pt-20 space-y-10 text-sm px-5'>
            <div className='flex gap-2'>
                <button className='bg-gray-300  bg-gray-500 hover:bg-gray-600 duration-500 text-gray-300 border border-gray-400 p-1 px-2 rounded-md'>new Business</button>
                <input className='rounded-md p-1 bg-gray-600 border border-gray-400 text-gray-400 px-2 outline-none' />
                <button className='text-gray-300 border border-gray-400 rounded-md p-1 opacity-[0.5]'>
                    <PiFunnel size={20} />
                </button>
            </div>

            <div className='fixed top-0 bottom-0  left-0 grid grid-cols-12 right-0 bg-[#00000050] z-[999] justify-center flex items-center'>
                <div className='col-span-1'></div>
                <form className="flex col-span-10 bg-gray-700 p-5 flex-col gap-3">
                    <div className='flex flex-wrap gap-3'>
                        {/* Business Name */}
                        <div className='grow'>
                            <label className="text-black dark:text-white">
                                Business Name
                            </label>
                            <Input
                                required
                                type="text"
                                placeholder="Enter business name"
                                className="bg-white dark:bg-gray-800"
                                name="business_name"
                            />
                        </div>

                        {/* Company Alias */}
                        <div className='grow'>
                            <label className="text-black dark:text-white">
                                Company Alias
                            </label>
                            <Input
                                required
                                type="text"
                                placeholder="Enter company alias"
                                className="bg-white dark:bg-gray-800"
                                name="company_alias"
                            />
                        </div>
                    </div>


                    <div className='flex flex-wrap gap-3'>
                        {/* Industry */}
                        <div className='grow'>
                            <label className="text-black dark:text-white">
                                Industry
                            </label>
                            <Input
                                required
                                type="text"
                                placeholder="Enter industry (optional)"
                                className="bg-white dark:bg-gray-800"
                                name="industry"
                            />
                        </div>

                        {/* Registration Number */}
                        <div className='grow'>
                            <label className="text-black dark:text-white">
                                Registration Number
                            </label>
                            <Input
                                required
                                type="text"
                                placeholder="Enter registration number (optional)"
                                className="bg-white dark:bg-gray-800"
                                name="registration_number"
                            />
                        </div>
                        {/* Registration Number */}
                        <div className='grow'>
                            <label className="text-black dark:text-white">
                                Phone Number
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter registration number (optional)"
                                className="bg-white dark:bg-gray-800"
                                name="registration_number"
                            />
                        </div>
                    </div>
                    <div className='flex gap-3 justify-end'>
                        <button type='button' className='bg-gray-300 text-gray-600 py-2 px-4 rounded-[100px] flex items-center gap-2 hover:bg-[#2a1ba8] dark:hover:bg-[#150b66]'>
                            Close
                        </button>
                        <button type='submit' className='bg-[#1C0F86] text-white py-2 px-4 rounded-[100px] flex items-center gap-2 hover:bg-[#2a1ba8] dark:hover:bg-[#150b66]'>
                            Proceed
                        </button>
                    </div>

                </form>
                <div className='col-span-1'></div>


            </div>


            <div className='flex gap-3'>
                {
                    loading ?
                        <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                        :
                        <>
                            {
                                organisationData ?
                                    <><div className='text-white'>{ }</div>
                                        {organisationData.map((data, key) =>
                                            <div onClick={() => storeDatatoCookies(data)} key={key} className='min-h-[150px] cursor-pointer group min-w-[300px] bg-gray-700 hover:bg-gray-600 duration-500  text-gray-300 border border-gray-600 flex justify-between p-3 text-start text-sm rounded-md'>
                                                <div>
                                                    <div className=' text-lg text-white'>{data.business_name}</div>
                                                    <div className='text-[12px]'>{data.company_alias} | {data.industry}</div>
                                                </div>
                                                <div className='group-hover:translate-x-1 group-hover:text-white text-gray-400 duration-500'>
                                                    <ArrowRight size={20} />
                                                </div>
                                            </div>
                                        )}
                                    </>

                                    :
                                    <>
                                        <div className='text-gray-300'>
                                            no businesses found...create one?
                                        </div>
                                    </>

                            }
                        </>

                }
            </div>

        </div>
    )
}
