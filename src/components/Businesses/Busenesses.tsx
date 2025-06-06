'use client'
import { getData, getOrgData, storeOrgData } from '@/lib/createCookie'
import { createBusiness, getBusinessByOwnerID } from '@/services/api/apiBusiness'
import { BusinessType } from '@/types/businesses'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PiFunnel } from 'react-icons/pi'
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
        getBusinessByUserID()
    }, [])


    return (
        <div className='pt-20 space-y-10 text-sm px-5'>
            <div className='flex gap-2'>
                <button onClick={() => setOpenBusinessModel(true)} className='bg-gray-300  bg-gray-500 hover:bg-gray-600 duration-500 text-gray-300 border border-gray-400 p-1 px-2 rounded-md'>new Business</button>
                <input className='rounded-md p-1 bg-gray-600 border border-gray-400 text-gray-400 px-2 outline-none' />
                <button className='text-gray-300 border border-gray-400 rounded-md p-1 opacity-[0.5]'>
                    <PiFunnel size={20} />
                </button>
            </div>
            {
                openBusinessModel ?
                    <div className='fixed top-0 bottom-0  left-0 grid grid-cols-12 right-0 bg-[#00000050] z-[999] justify-center flex items-center'>
                        <div className='col-span-2'></div>
                        <form onSubmit={addBusiness} className="flex md:col-span-8 col-span-12  bg-gray-700 rounded-lg shadow-md p-5 flex-col gap-3">
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
                        <div className='col-span-2'></div>
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
