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

    const getBusinessByUserID = React.useCallback(async () => {
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
    }, [userData.id]);

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
    }, [getBusinessByUserID])


    return (
        <div className='pt-20 space-y-10 text-sm px-5'>
            <div className="flex gap-3 items-center p-2 bg-white dark:bg-boxdark dark:bg-boxdark rounded-md">
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
            {openBusinessModel && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-4">
                    <form
                        onSubmit={addBusiness}
                        className="w-full max-w-2xl bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg p-6 space-y-5"
                    >
                        {/* Header */}
                        <h2 className="text-xl font-semibold text-black dark:text-white text-center">Create New Business</h2>

                        {/* Business Name */}
                        <div className="space-y-1">
                            <label className="text-black dark:text-white">Business Name</label>
                            <Input
                                required
                                onChange={(e) =>
                                    setCompanyAlias(getFirstTwoInitials(e.target.value).toUpperCase())
                                }
                                type="text"
                                name="business_name"
                                autoFocus
                                placeholder="Enter business name"
                                className="bg-white text-white dark:bg-gray-800"
                            />
                        </div>

                        {/* Company Alias Display */}
                        <div className="space-y-1">
                            <label className="text-black dark:text-white">Company Alias</label>
                            <div className="p-3 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded">
                                {company_alias
                                    ? company_alias
                                    : "This will be used to identify your business in the system."}
                            </div>
                        </div>

                        {/* Industry */}
                        <div className="space-y-1">
                            <label className="text-black dark:text-white" htmlFor="industry">
                                Industry
                            </label>
                            <select
                                id="industry"
                                name="industry"
                                required
                                className="w-full bg-white text-black dark:bg-gray-800 dark:text-white p-2 rounded"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select industry (optional)
                                </option>
                                <option value="loans">Loans</option>
                                <option value="phones">Phones</option>
                                <option value="cakes">Cakes</option>
                                {/* Add more as needed */}
                            </select>
                        </div>

                        {/* Registration & Phone */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 space-y-1">
                                <label className="text-black dark:text-white">
                                    Registration Number <span className="text-sm text-gray-400">(optional)</span>
                                </label>
                                <Input
                                    type="text"
                                    name="registration_number"
                                    placeholder="REG-1234"
                                    className="bg-white text-white dark:bg-gray-800"
                                />
                            </div>

                            <div className="flex-1 space-y-1">
                                <label className="text-black dark:text-white">
                                    Phone Number <span className="text-sm text-gray-400">(optional)</span>
                                </label>
                                <Input
                                    type="text"
                                    name="phone_number"
                                    placeholder="Enter business phone number"
                                    className="bg-white text-white dark:bg-gray-800"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                disabled={loading}
                                type="button"
                                onClick={() => setOpenBusinessModel(false)}
                                className="bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white py-2 px-5 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                            >
                                Close
                            </button>

                            <button
                                disabled={loading}
                                type="submit"
                                className="bg-[#1C0F86] text-white py-2 px-5 rounded-full hover:bg-[#2a1ba8] dark:hover:bg-[#150b66] transition"
                            >
                                {loadings ? "Creating..." : "Create Business"}
                            </button>
                        </div>
                    </form>
                </div>
            )}



            <div className=''>
                {
                    loading ?
                        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                            {[...Array(4)].map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl p-4 bg-gray-100 dark:bg-gray-600 space-y-4 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="h-4 w-2/5 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded" />
                                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-600 rounded" />
                                </div>
                            ))}
                        </div>
                        :
                        <>
                            <div className=''>

                                {
                                    organisationData ?
                                        <>
                                            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3'>
                                                {organisationData.map((data, key) =>
                                                    <div
                                                        onClick={() => storeDatatoCookies(data)}
                                                        key={key}
                                                        className="min-h-[150px]  cursor-pointer group 
             bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
             transition duration-300 text-gray-700 dark:text-gray-300 
             border border-gray-300 dark:border-gray-600 
             flex justify-between items-start p-4 rounded-md shadow-md"
                                                    >
                                                        <div className="flex flex-col gap-1">
                                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                                {data.business_name}
                                                            </h3>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {data.company_alias} &bull; {data.industry}
                                                            </p>
                                                        </div>

                                                        <div className="self-center group-hover:translate-x-1 group-hover:text-black dark:group-hover:text-white text-gray-500 dark:text-gray-400 transition duration-300">
                                                            <ArrowRight size={20} />
                                                        </div>
                                                    </div>

                                                )}
                                            </div>
                                        </>

                                        :
                                        <>
                                            <div className='text-sm text-gray-600 dark:text-gray-300'>
                                                No businesses have been added yet. To get started, create your first business profile so you can begin managing sales, inventory, and performance insights.
                                            </div>
                                        </>

                                }
                            </div>
                        </>

                }
            </div>
        </div>
    )
}
