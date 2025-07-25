"use client";
import React, { useEffect, useState } from 'react'
import { CrownIcon, ShuffleIcon } from "lucide-react";
import AreaChart from "./components/AreaChart";
import BarChart from "./components/BarChart";
import { useRouter } from "next/navigation";
import GenderPieChart from './components/GenderChart';
import LatestChart from './components/DemoLatest';
import { getCustomersForBusiness, getCuststomerSales } from '@/services/apiCustomers';
import { Customers, genderType, LocationType } from '@/types/Customers';
import { getData, getOrgData } from '@/lib/createCookie';
import { ApiDatatype } from '@/services/token';
import TopCustomers from './AnalyticsComponents/TopCustomers';
import TopArea from './AnalyticsComponents/TopArea';
import { NewvsRepeat } from './AnalyticsComponents/NewvsRepeat';
import { GeographicalLocation } from './AnalyticsComponents/GeographicalLocation';
import { businessesType, BusinessType } from '@/types/businesses';

export const CustomerAnalytics = () => {
  const navigation = useRouter()
  const [customerData, setCustomerData] = useState<Customers[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<LocationType[] | null>(null)
  const [gender, setGender] = useState<genderType | null>(null)
  const [numberOfNewRepeat, setNumberOfNewRepeat] = useState<number | null>(null)
  const userData: ApiDatatype = getData()
  const business: BusinessType | null = getOrgData()

  const getCustomers = React.useCallback(() => {
    setLoading(true)
    getCuststomerSales(business?.id)
      .then((res) => {
        console.log(res)
        setCustomerData(res.customer)
        setLocation(res.location)
        console.log(res.location)
        setNumberOfNewRepeat(res.customerNumber)
        setGender(res.gender)

      })
      .catch((er) => {
        console.log(er)
        setLoading(false)
      }
      )
      .finally(() => {
        setLoading(false)
      })
  }, [business?.id])

  useEffect(() => {
    getCustomers()
  }, [getCustomers])

  return (
    <div className="flex flex-col text-sm dark:text-white  gap-5 py-20 justify-center">

      <div className="flex justify-end">
        <button
          onClick={() => navigation.push('customer-analytics/customer_gender_ratio')}
          className="px-4 py-2 rounded-full bg-[#1A0670] dark:bg-blue-600 text-white text-sm font-medium hover:opacity-90 transition"
        >
          View Data
        </button>
      </div>

      <div className=" flex flex-col gap-3 grow items-center rounded-md dark:border-strokedark">
        <div className="w-full font-bold">
          Revenue & Spending
        </div>
        <div className="grid md:grid-cols-3  grid-cols-1 gap-4 w-full flex-wrap">

          {
            loading ?
              <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div>
              :
              <div className="border flex flex-col justify-between grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
                {customerData ?
                  <TopCustomers cutomerDatas={customerData} />
                  :
                  <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div>
                }
              </div>
          }




          {
            loading ?
              <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div>
              :
              <>

                {
                  gender ?
                    <>
                      <div className="border grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
                        <div className="grow">
                          <div className="max-w-[300px]">
                            <GenderPieChart gender={gender} />
                          </div>
                        </div>
                        <div>
                          <div className="text-[#1A0670] dark:text-white">Customer Gender Ratio</div>
                          <div className="flex text-[#1A0670] dark:text-white justify-between items-end gap-2">
                            <div className="flex items-end gap-2">
                              {/* will have to worrk on this later */}
                              <div className="font-bold text-2xl">25.7K</div>
                              <div className="text-sm font-light">last 7 days</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </>
                    :
                    <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div>
                }
              </>
          }



          {/* chart */}
          {
            loading ?
              <>
                <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div>
              </>
              :
              <>
                {
                  numberOfNewRepeat ?
                    <NewvsRepeat data={numberOfNewRepeat} />
                    :
                    <>
                      No data...
                    </>
                }

              </>
          }
        </div>
      </div>

      <div className="border hidden flex flex-col gap-3 grow p-5 items-center rounded-md dark:border-strokedark">
        <div className="w-full font-bold">
          Customer demographics
        </div>
        <div className="flex w-full gap-4 flex-wrap">

          {/* chart */}
          <div className="border grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
            {
              loading ?
                <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div> :
                <>
                  {
                    location && location.length > 0 ?
                      <>
                        <GeographicalLocation location={location} />
                      </>
                      :
                      <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div>
                  }
                </>
            }
          </div>
        </div>
      </div>


      <div className="border flex flex-col gap-3 grow p-5 items-center rounded-md dark:border-strokedark">
        <div className="w-full font-bold">
          Customer Behavior and Engagement
        </div>
        <div className="flex w-full gap-4 flex-wrap">

          <div className=" grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
            <div className="grow">
              <AreaChart />
            </div>
            <div>
              <div className="text-[#1A0670] dark:text-white">Customer Retention Rates</div>
              <div className="flex text-[#1A0670] dark:text-white justify-between items-end gap-2">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">35%</div>
                  <div className="text-sm font-light">Growth</div>
                </div>
              </div>
            </div>
          </div>




        </div>
      </div>

      <div className="border text-[#616262] dark:text-bodydark grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
        <div className="font-bold text-black dark:text-white flex items-center justify-between">
          AI Insights
          <button>
            <ShuffleIcon className="size-4" />
          </button>
        </div>
        <div>
          Not enough transactions to recognize significant patterns. Perform more transactions to enable in-depth data analysis.
        </div>
      </div>
    </div>
  )
}
