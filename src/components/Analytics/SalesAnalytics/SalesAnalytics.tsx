"use client";
import { CrownIcon, ShuffleIcon } from "lucide-react";
import ReactApexChart from "react-apexcharts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TopProducts } from "./customcomponents/TopProducts";
import { getDataforsalseAnalytics, SalesAnalyticsData } from "@/services/api/products";
import { BusinessType } from "@/types/businesses";
import { getOrgData } from "@/lib/createCookie";
import { SalesRevenueByRegion } from "./customcomponents/SalesRevenueByRegion";
import { PeakSalePeriod } from "./customcomponents/PeakSalePeriod";
import AreaChart from "./components/AreaChart";

// Loading skeleton reused for multiple sections
const LoadingSkeleton = () => (
  <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div>
);

const SalesAnalytics: React.FC = () => {
  const navigation = useRouter();
  const businessData: BusinessType | null = getOrgData();
  const [data, setData] = useState<null | SalesAnalyticsData>(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductsPageData = async () => {
    if (!businessData?.id) {
      setError("Missing business ID. Cannot fetch data.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res: any = await getDataforsalseAnalytics(businessData.id);
      setData(res);
    } catch (errr) {
      console.log(errr);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsPageData();
  }, []);

  return (
    <div className="flex flex-col gap-5 py-20 justify-center">
      <div className="flex justify-end">
        <button onClick={() => navigation.push('sales-analytics/total_sales_over_time')} className="py-1 px-2 rounded-[100px] bg-[#1A0670] dark:bg-blue-600 text-white">view data</button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>
      )}

      <div className="border dark:border-gray-700 flex flex-col gap-3 grow p-4 items-center rounded-md dark:bg-gray-800">
        <div className="w-full font-bold dark:text-gray-200">
          Sales analysis by Product/Services
        </div>
        <div className="flex w-full gap-4 flex-wrap">
          {Loading ? <LoadingSkeleton /> : data ? <TopProducts data={data} /> : null}
          {Loading ? <LoadingSkeleton /> : data ? <SalesRevenueByRegion data={data} /> : null}
        </div>
      </div>

      <div className="border dark:border-gray-700 flex flex-col gap-3 grow p-5 items-center rounded-md dark:bg-gray-800">
        <div className="w-full font-bold dark:text-gray-200">
          Sales performance
        </div>
        <div className="flex w-full gap-4 flex-wrap">
          {Loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="border dark:border-gray-700 grow border-[#C9C9C9] p-3 rounded-md dark:bg-gray-800">
              <div className="grow">
                <div className="max-w-[300px]">
                  <AreaChart />
                </div>
              </div>
              <div>
                <div className="text-[#1A0670] dark:text-blue-400">Best Sellers</div>
                <div className="flex text-[#1A0670] dark:text-blue-400 justify-between items-end gap-2">
                  <div className="flex items-end gap-2">
                    <div className="font-bold text-2xl">Top 5</div>
                    <div className="text-sm font-light">last 7 days</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {Loading ? <LoadingSkeleton /> : data ? <PeakSalePeriod data={data} /> : null}
        </div>
      </div>

      <div className="border text-[#616262] dark:text-gray-400 grow border-[#C9C9C9] dark:border-gray-700 p-3 rounded-md dark:bg-gray-800">
        <div className="font-bold text-black dark:text-white flex items-center justify-between">
          AI Insights
          <button>
            <ShuffleIcon className="size-4" />
          </button>
        </div>
        <div>
          {!data || (data.sales?.length ?? 0) < 10
            ? "Not enough transactions to recognize significant patterns. Perform more transactions to enable in-depth data analysis."
            : "Here are AI-generated insights based on your sales data!"}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
