"use client";
import React, { useEffect } from "react";
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
// import { FaArrowUp } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex pt-20 flex-col gap-5 dark:bg-gray-800">
        <div className="flex flex-wrap gap-5 ">
          <div className="grow flex-wrap gap-5 flex">
            <div className="grow flex flex-col gap-4">
              <div className="grow-0" >
                <SalesByCategory  />
              </div>
              <div className="grow">
                  <GrowthRate />
                </div>
                <div className="grow">
                  <Customers />
                </div>
            </div>
            <div className="grow flex">
              <TopSelling />
            </div>
          </div>

          <div className="flex  grow flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <div className="grow">
                <OrdersCard />
              </div>
              <div className="grow">
                <TotalRevenue />
              </div>
              <div className="grow">
                <CustomerReturn />
              </div>
              <div className="grow hidden md:block">
                <TodayOrder />
              </div>
              
              <div className="flex flex-wrap gap-1">
                <div className="grow hidden md:block">
                  <LastTransactions />
                </div>
                <div className="grow hidden md:block">
                  <RecentOrder />
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
