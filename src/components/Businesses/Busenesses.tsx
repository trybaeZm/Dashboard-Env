'use client'
import { getData } from '@/lib/createCookie'
import {  getBusinessByOwnerID } from '@/services/api/apiBusiness'
import { BusinessType } from '@/types/businesses'
import React, { useEffect, useState } from 'react'
import { PiFunnel, PiPlusBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi"
import { BusinessCard } from './component/BusinessCard'
import { CreateBusinessDiag } from './component/CreateBusinessDiag'

export const Busenesses = () => {
    const [loading, setLoading] = useState(false)
    const [openBusinessModel, setOpenBusinessModel] = useState(false);
    const [organisationData, setOrganisationData] = useState<null | BusinessType[]>(null)
    const userData = getData()





    const getBusinessByUserID = React.useCallback(async () => {
        if (!userData || !userData.id) {
            console.warn("User data is missing or invalid");
            return;
        }

        setLoading(true);

        getBusinessByOwnerID(userData.id)
            .then((res) => {
                setOrganisationData(res);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  


    useEffect(() => {
        // if((!userData || !userData.id) && !business) {
        //     // If userData is not available
        //     console.warn("User data is missing or invalid");
        //     navigation.push('/signin');
        // }
        getBusinessByUserID()
    }, [getBusinessByUserID]);


    return (
        <div className='space-y-10 text-sm px-5'>
            <CreateBusinessDiag isOpen={openBusinessModel} getBusinessByUserID={()=>getBusinessByUserID()} onClose={()=> setOpenBusinessModel(false)}/>
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
                                            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3'>
                                                {organisationData.map((data, key) =>
                                                    <BusinessCard getBusinessByUserID={getBusinessByUserID} data={data} key={key} />
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
