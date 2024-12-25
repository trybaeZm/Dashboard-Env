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
// import { FaArrowUp } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <>
    <div className="flex flex-col gap-5">
        <div className="flex md:flex-nowrap flex-wrap gap-10">
          <div className="flex grow flex-col gap-10">
            <div className="flex gap-5 flex-wrap">
              <div className="grow-1">
                <TotalRevenue />
              </div>
              <div className="grow-1">
                <OrdersCard />
              </div>
              <div className="grow-1">
                <CustomerReturn />
              </div>
              <div className="grow-1">
                <GrowthRate />
              </div>
              <div className="grow-1">
                <Customers />
              </div>
            </div>
            <div className="grow-1">
              <LastTransactions />
            </div>
          </div>
          <div className="grow gap-5 flex flex-col">
            <div>
              <SalesByCategory />
            </div>
            <div>
            <TopSelling/>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grow-0">
            <TodayOrder />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
