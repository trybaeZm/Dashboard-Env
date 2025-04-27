"use client";
import { CrownIcon, ShuffleIcon } from "lucide-react";
import ReactApexChart from "react-apexcharts";
import { styleText } from "util";
import AreaChart from "./components/AreaChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import { useRouter } from "next/navigation";

const SalesAnalytics: React.FC = () => {
  const navigation = useRouter()


  
  return (
    <div className="flex flex-col gap-5 pt-20 justify-center   ">
      <div className="border flex flex-col gap-3 grow p-4 items-center rounded-md">
        <div className="w-full font-bold">
          Sales analysis by Product/Services
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="border grow border-[#C9C9C9] p-3 rounded-md">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-end gap-3">
                <div className="flex  gap-3 items-center">
                  <CrownIcon className="size-4" />
                  <div>14 Day Loans</div>
                  <div>45%</div>
                </div>
                <div className="flex  gap-3 items-center">
                  <div>Salary advances</div>
                  <div>24%</div>
                </div>
                <div className="flex  gap-3 items-center">
                  <div>30 Day Loans</div>
                  <div>18%</div>
                </div>
                <div className="flex  gap-3 items-center">
                  <div>7 Day Loans</div>
                  <div>18%</div>
                </div>
              </div>

            </div>
            <div>
              <div className="text-[#1A0670] ">Best Sellers</div>
              <div className="flex text-[#1A0670] justify-between items-end">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">Top 5</div>
                  <div className="text-sm font-light">last 7 days</div>
                </div>
                <button onClick={()=> navigation.push('sales-analytics/total_sales_over_time')} className="py-1 px-2 rounded-[100px] bg-[#1A0670] text-white">view data</button>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="border grow border-[#C9C9C9] p-4 rounded-md">
            <div>
             <PieChart/>
            </div>
            <div>
              <div className="text-[#1A0670] ">Sales Revenue by region</div>
              <div className="flex text-[#1A0670] justify-between items-end">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">25.7K</div>
                  <div className="text-sm font-light">last 7 days</div>
                </div>
                <button onClick={()=> navigation.push('sales-analytics/total_sales_over_time')} className="py-1 px-2 rounded-[100px] bg-[#1A0670] text-white">view data</button>
              </div>
            </div>
          </div>

          <div className="border text-[#616262] grow border-[#C9C9C9] p-3 rounded-md">
            <div className="font-bold text-black flex items-center justify-between">
              AI Insights
              <button>
                <ShuffleIcon className="size-4" />
              </button>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur. Etiam tortor id nulla rutrum sed vitae vivamus velit vel. At lectus urna mi nec. Cursus maecenas adipiscing semper etiam in. Integer adipiscing non porttitor magna ut viverra praesent. Lorem ipsum dolor sit amet consectetur. Etiam tortor id nulla rutrum sed vitae vivamus velit vel. At lectus urna mi nec. Cursus maecenas adipiscing semper etiam in. Integer adipiscing non porttitor magna ut viverra praesent.
            </div>
          </div>
        </div>
      </div>
      <div className="border flex flex-col gap-3 grow p-5 items-center   rounded-md">
        <div className="w-full font-bold">
        Sales performance
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="border grow border-[#C9C9C9] p-3 rounded-md">
            <div className="grow">
              <div className="max-w-[300px]">
                <AreaChart/>
              </div>
            </div>
            <div>
              <div className="text-[#1A0670] ">Best Sellers</div>
              <div className="flex text-[#1A0670] justify-between items-end gap-2">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">Top 5</div>
                  <div className="text-sm font-light">last 7 days</div>
                </div>
                
                <button onClick={()=> navigation.push('sales-analytics/total_sales_over_time')} className="py-1 px-2 rounded-[100px] bg-[#1A0670] text-white">view data</button>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="border grow border-[#C9C9C9] p-3 rounded-md">
            <div className="">
             <BarChart/>
            </div>
            <div>
              <div className="text-[#1A0670] ">Peak Sales Periods</div>
              <div className="flex text-[#1A0670] justify-between items-end gap-2">
                <div className="flex items-end gap-2">
                  <div className="font-bold text-2xl">Fridays</div>
                </div>
                <button onClick={()=> navigation.push('sales-analytics/total_sales_over_time')} className="py-1 px-2 rounded-[100px] bg-[#1A0670] text-white">view data</button>
              </div>
            </div>
          </div>

          <div className="border text-[#616262] grow border-[#C9C9C9] p-3 rounded-md">
            <div className="font-bold text-black flex items-center justify-between">
              AI Insights
              <button>
                <ShuffleIcon className="size-4" />
              </button>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur. Etiam tortor id nulla rutrum sed vitae vivamus velit vel. At lectus urna mi nec. Cursus maecenas adipiscing semper etiam in. Integer adipiscing non porttitor magna ut viverra praesent. Lorem ipsum dolor sit amet consectetur. Etiam tortor id nulla rutrum sed vitae vivamus velit vel. At lectus urna mi nec. Cursus maecenas adipiscing semper etiam in. Integer adipiscing non porttitor magna ut viverra praesent.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
