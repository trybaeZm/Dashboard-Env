"use client";
import React, { useEffect, useState } from "react";
import { OrdersCard } from "./components/OrdersCard";
import { TotalRevenue } from "./components/TotalRevenue";
import { CustomerReturn } from "./components/CustomerReturn";
import { GrowthRate } from "./components/GrowthRate";
import { Customers } from "./components/Customers";
import { LastTransactions } from "./components/LastTransactions";
import { SalesByCategory } from "./components/SalesByCategory";
import { TopSelling } from "./components/TopSelling";
import { TodayOrder } from "./components/TodayOrder";
import { RecentOrder } from "./components/RecentOrder";
import { dashboard, DashboardSummary } from "@/services/api/Dashboard";
import { getOrgData } from "@/lib/createCookie";
import { BusinessType } from "@/types/businesses";
// import { FaArrowUp } from "react-icons/fa";




const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const businesData: BusinessType | null = getOrgData()
  const [data, setData] = useState<DashboardSummary | null>()

  const GetDashData = () => {
    setLoading(true)
    dashboard(businesData?.id)
      .then((res) => {
        if (res) {
          console.log(res)
          setData(res)
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    GetDashData()
  }, [])
  return (
    <>
      <div className="flex pt-20 flex-col gap-5 dark:bg-gray-800">
        <div className="flex flex-wrap gap-5 ">
          <div className="grow flex-wrap gap-5 flex">
            <div className="grow flex flex-col gap-4">
              <div className="grow-0" >
                {loading ?
                  <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                  :
                  <SalesByCategory data={data} />
                }
              </div>
              <div className="grow">
                {loading ?
                  <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                  :
                  <GrowthRate data={data} />
                }
              </div>
              <div className="grow">
                {loading ?
                  <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                  :
                  <Customers data={data} />
                }
              </div>
              <div className="grow hidden md:block">
                {loading ?
                  <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                  :
                  <TodayOrder data={data} />

                }
              </div>
            </div>
            <div className="grow flex">
              {loading ?
                <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                :

                <TopSelling data={data} />
              }
            </div>
          </div>

          <div className="flex  grow flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <div className="grow">
                {loading ?
                  <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                  :
                  <OrdersCard data={data} />

                }
              </div>
              <div className="grow">
                {loading ?
                  <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                  :
                  <TotalRevenue data={data} />

                }
              </div>


              <div className="flex flex-wrap gap-1">
                <div className="grow hidden ">
                  {loading ?
                    <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                    :

                    <LastTransactions />
                  }
                </div>
                <div className="grow">
                  {loading ?
                    <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                    :
                    <CustomerReturn data={data} />

                  }
                </div>
                <div className="grow hidden md:block">
                  {loading ?
                    <div className='h-24 bg-gray-700 grow animate-pulse min-h-[150px] min-w-[300px] rounded-lg'></div>
                    :
                    <RecentOrder data={data} />

                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
