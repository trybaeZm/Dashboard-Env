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
      <div className="flex pt-20 p-4 flex-col gap-5">
        <div className="flex md:flex-nowrap flex-wrap gap-10">
          <div className="flex grow flex-col gap-10">
            <div className="flex gap-1 flex-wrap">
              <div className="grow">
                <OrdersCard />
              </div>
              <div className="grow">
                <TotalRevenue />
              </div>
              <div className="grow">
                <CustomerReturn />
              </div>
              <div className="grow">
                <GrowthRate />
              </div>
              <div className="grow">
                <Customers />
              </div>
            </div>
            <div className="grow">
              <LastTransactions />
            </div>
          </div>

          <div className="grow gap-5 flex flex-col">
            <div>
              <SalesByCategory />
            </div>
            <div>
              <TopSelling />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="grow-0">
            <TodayOrder />
          </div>
          <div className="grow">
            <RecentOrder />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
