'use client'
import { getData, getOrgData, storeOrgData } from '@/lib/createCookie'
import { createBusiness, getBusinessByOwnerID } from '@/services/api/apiBusiness'
import { BusinessType } from '@/types/businesses'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PiFunnel, PiPlusBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi"
import { Input } from '@/components/ui/input'

export const Busenesses = () => {
    const navigation = useRouter()
    const [loading, setLoading] = useState(false)
    const [loadings, setLoadings] = useState(false)
    const [openBusinessModel, setOpenBusinessModel] = useState(false);
    const [company_alias, setCompanyAlias] = useState<string>('')
    const [organisationData, setOrganisationData] = useState<null | BusinessType[]>(null)
    const userData = getData()
    const business = getOrgData()

    const storeDatatoCookies = (data: BusinessType) => {
        storeOrgData(data)
        navigation.push('/overview')

    }

    function getFirstTwoInitials(name: string): string {
        return name
            .split(' ')
            .map(word => word.slice(0, 1))
            .join('');
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

    const addBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoadings(true)
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const industry = formData.get('industry'); // get the selected industry value
        const business_name = formData.get('business_name') as string;
        const registration_number = formData.get('registration_number') as string;
        const phone_number = formData.get('phone_number') as string;


        console.log('Business added');
        console.log('Selected industry:', {
            industry: industry,
            business_name: business_name,
            registration_number: registration_number,
            phone_number: phone_number,
            company_alias: company_alias
        });

        createBusiness({
            industry: industry as string,
            business_name: business_name,
            registration_number: registration_number,
            phone: phone_number,
            company_alias: company_alias
        },
            userData)
            .then((res) => {
                console.log('business creation is a success', res)
                setOpenBusinessModel(false)
                if (res) {
                    getBusinessByUserID()
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoadings(false)
            })

        // Here, you can send the data to your backend or process it further
    };

    useEffect(() => {
        // getBusinessByUserID()
    }, [])


    return (
        <div className='pt-20 space-y-10 text-sm px-5'>
            <div className="flex gap-3 items-center p-2 bg-white dark:bg-boxdark rounded-md">
                {/* New Business Button */}
                <button
                    onClick={() => setOpenBusinessModel(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition duration-300"
                >
                    <PiPlusBold size={18} />
                    New Business
                </button>

                {/* Search Input */}
                <div className="relative">
                    <FiSearch
                        size={16}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search business..."
                        className="pl-8 pr-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Filter Button */}
                <button
                    className="flex items-center justify-center text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    title="Filter"
                >
                    <PiFunnel size={18} />
                </button>
            </div>
            {
                openBusinessModel ?
                    <div className='fixed top-0 bottom-0  left-0 right-0  z-[9999] justify-center flex items-center'>
                        <form onSubmit={addBusiness} className="flex md:col-span-8 col-span-12  dark:bg-gray-700 bg-gray-300 rounded-lg shadow-md p-5 flex-col gap-3">
                            {/* Business Name */}
                            <div className='grow space-y-2'>
                                <label className="text-black dark:text-white">
                                    Business Name
                                </label>
                                <Input
                                    required
                                    onChange={(e) => setCompanyAlias(getFirstTwoInitials(e.target.value).toUpperCase())}
                                    type="text"
                                    name="business_name"
                                    autoFocus
                                    placeholder="Enter business name"
                                    className="bg-white text-white dark:bg-gray-800"
                                />
                            </div>

                            {/* Company Alias */}
                            <div className='grow space-y-2'>
                                <label className="text-black dark:text-white">
                                    Company Alias
                                </label>
                                <div className='p-3 text-gray-400'>
                                    {company_alias ? company_alias : 'This will be used to identify your business in the system'}
                                </div>
                            </div>
                            {/* Industry */}
                            <div className="grow   space-y-2">
                                <label className="text-black dark:text-white" htmlFor="industry">
                                    Industry
                                </label>
                                <br />
                                <select
                                    id="industry"
                                    name="industry"
                                    required
                                    className="bg-white text-black w-full dark:bg-gray-800 dark:text-white p-2 rounded"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select industry (optional)
                                    </option>
                                    <option value="loans">Loans</option>
                                    <option value="phones">Phones</option>
                                    <option value="Cakes">Cakes</option>
                                    {/* Add more options as needed */}
                                </select>
                            </div>


                            <div className='flex gap-4'>
                                {/* Registration Number */}
                                <div className='grow space-y-2'>
                                    <label className="text-black dark:text-white">
                                        Registration Number (optional)
                                    </label>
                                    <Input
                                        type="text"
                                        name="registration_number"
                                        autoFocus
                                        placeholder="REG-1234"
                                        className="bg-white text-white dark:bg-gray-800"
                                    />
                                </div>
                                {/* Registration Number */}
                                <div className='grow space-y-2'>
                                    <label className="text-black dark:text-white">
                                        Phone Number(optional)
                                    </label>
                                    <Input
                                        type="text"
                                        name="phone_number"
                                        autoFocus
                                        placeholder="Enter registration number (optional)"
                                        className="bg-white text-white dark:bg-gray-800"
                                    />
                                </div>

                            </div>
                            <div className='flex gap-3 justify-end'>
                                <button disabled={loading} onClick={() => setOpenBusinessModel(false)} type='button' className='bg-gray-300 text-gray-600 py-2 px-4 rounded-[100px] flex items-center gap-2 hover:bg-[#2a1ba8] dark:hover:bg-[#150b66]'>
                                    Close
                                </button>
                                <button disabled={loading} type='submit' className='bg-[#1C0F86] text-white py-2 px-4 rounded-[100px] flex items-center gap-2 hover:bg-[#2a1ba8] dark:hover:bg-[#150b66]'>
                                    {loadings ? 'Creating...' : 'Create Business'}
                                </button>
                            </div>
                        </form>
                    </div>
                    :
                    <></>
            }


            <div className='flex flex-wrap gap-3'>
                {
                    loading ?
                        <div className=' grow space-y-3 gap-3'>
                            <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                            <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                            <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                        </div>
                        :
                        <>
                            {
                                organisationData ?
                                    <>
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
                                        <div className='text-sm text-gray-600 dark:text-gray-300'>
                                            No businesses have been added yet. To get started, create your first business profile so you can begin managing sales, inventory, and performance insights.
                                        </div>
                                    </>

                            }
                        </>

                }
            </div>
        </div>
    )
}
