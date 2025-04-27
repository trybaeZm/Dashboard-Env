"use client";
import React from 'react'
import { CrownIcon, ShuffleIcon } from "lucide-react";
import AreaChart from "./components/AreaChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import { useRouter } from "next/navigation";
import GenderPieChart from './components/GenderChart';
import LatestChart from './components/DemoLatest';

export const CustomerAnalytics = () => {
  const navigation = useRouter()
  return (
    <div className="flex flex-col dark:text-white  gap-5 py-20 justify-center">

      <div className='flex justify-end'>
        
      <button onClick={() => navigation.push('customer-analytics/customer_gender_ratio')} className="py-1 px-2 rounded-[100px] bg-[#1A0670] dark:bg-blue-600 text-white">view data</button>
      </div>

      <div className="border flex flex-col gap-3 grow p-4 items-center rounded-md dark:border-strokedark">
        <div className="w-full font-bold">
          Revenue & Spending
        </div>
        <div className="flex gap-4 w-full flex-wrap">

          <div className="border grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
            <div className="">
              <div className="flex items-center flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <CrownIcon className="size-4" />
                  <div>James Sakala</div>
                  <div>45%</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div>Samson Mumba</div>
                  <div>24%</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div>Jesica Mwelwa</div>
                  <div>18%</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div>Kelvin Mambo</div>
                  <div>18%</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[#1A0670] dark:text-white">Top Customers</div>
              <div className="flex text-[#1A0670] dark:text-white justify-between items-end">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">25.7K</div>
                  <div className="text-sm font-light">last 7 days</div>
                </div>
              </div>
            </div>
          </div>

          {/* chart */}
          <div className="border grow border-[#C9C9C9] dark:border-strokedark p-4 rounded-md">
            <div>
              <PieChart />
            </div>
            <div>
              <div className="text-[#1A0670] dark:text-white">High-Value vs. Low-Value Customers</div>
              <div className="flex text-[#1A0670] dark:text-white justify-between items-end">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">25.7K</div>
                  <div className="text-sm font-light">last 7 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border flex flex-col gap-3 grow p-5 items-center rounded-md dark:border-strokedark">
        <div className="w-full font-bold">
          Customer demographics
        </div>
        <div className="flex w-full gap-4 flex-wrap">
          <div className="border grow-0 border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
            <div className="grow">
              <div className="max-w-[300px]">
                <GenderPieChart />
              </div>
            </div>
            <div>
              <div className="text-[#1A0670] dark:text-white">Customer Gender Ratio</div>
              <div className="flex text-[#1A0670] dark:text-white justify-between items-end gap-2">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">25.7K</div>
                  <div className="text-sm font-light">last 7 days</div>
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="border grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
            <div className="">
              <BarChart />
            </div>
            <div>
              <div className="text-[#1A0670] dark:text-white">Geographical Location of Customers</div>
              <div className="flex text-[#1A0670] dark:text-white justify-between items-end gap-2">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">5 Locations</div>
                </div>
                <button onClick={() => navigation.push('customer-analytics/customer_gender_ratio')} className="py-1 px-2 rounded-[100px] bg-[#1A0670] dark:bg-boxdark text-white">view data</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border flex flex-col gap-3 grow p-5 items-center rounded-md dark:border-strokedark">
        <div className="w-full font-bold">
          Customer Behavior and Engagement
        </div>
        <div className="flex w-full gap-4 flex-wrap">
          <div className="border grow-0 border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
            <div className="grow">
              <div className="max-w-[300px]">
                <AreaChart />
              </div>
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
          {/* chart */}
          <div className="border grow border-[#C9C9C9] dark:border-strokedark p-3 rounded-md">
            <div className="">
              <LatestChart />
            </div>
            <div>
              <div className="text-[#1A0670] dark:text-white">New vs. Repeat Customers</div>
              <div className="flex text-[#1A0670] dark:text-white justify-between items-end gap-2">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">35% New</div>
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
