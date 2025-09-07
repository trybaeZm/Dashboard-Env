"use client";
import { ShuffleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TopProducts } from "./customcomponents/TopProducts";
import { getDataforsalseAnalytics, SalesAnalyticsData } from "@/services/api/products";
import { BusinessType } from "@/types/businesses";
import { getOrgData } from "@/lib/createCookie";
import { SalesRevenueByRegion } from "./customcomponents/SalesRevenueByRegion";
import { PeakSalePeriod } from "./customcomponents/PeakSalePeriod";
import AreaChart from "./components/AreaChart";
import { useCallback } from "react";
import { BestSeller } from "./customcomponents/BestSeller";

// Loading skeleton reused for multiple sections
const LoadingSkeleton = () => (
  <div className='h-24 grow bg-gray-700 animate-pulse min-h-[200px] rounded-lg'></div>
);

const SalesAnalytics: React.FC = () => {
  const navigation = useRouter();
  const businessData: BusinessType | null = getOrgData();
  const [data, setData] = useState<null | SalesAnalyticsData>(null);
  const [Loading, setLoading] = useState(true);
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
      setLoading(false)
      console.log('successfully requested data')
    } catch (errr) {
      console.log(errr);
      setError("Failed to fetch data. Please try again.");
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsPageData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4 py-20 justify-center">
      <div className="flex justify-end">
        <button
          onClick={() => navigation.push('sales-analytics/total_sales_over_time')}
          className="px-4 py-2 rounded-full bg-[#1A0670] dark:bg-blue-600 text-white text-sm font-medium hover:opacity-90 transition"
        >
          View Data
        </button>
      </div>


      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>
      )}

      <div className="flex flex-col gap-3 grow  items-center rounded-md dark:bg-gray-800">
        <div className="w-full font-bold dark:text-gray-200">
          Sales analysis by Product/Services
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 flex-wrap">
          {Loading ? <LoadingSkeleton /> : data ? <TopProducts data={data} /> : null}
          {Loading ? <LoadingSkeleton /> : data ? <SalesRevenueByRegion data={data} /> : null}
          {Loading ? <LoadingSkeleton /> : data ? <BestSeller/> : null}
        </div>
        <div className="flex w-full gap-4 flex-wrap">
          {Loading ? <LoadingSkeleton /> : data ? <PeakSalePeriod data={data} /> : null}
        </div>
      </div>



      <div className="border text-[#616262] dark:text-gray-400 grow border-[#C9C9C9] dark:border-gray-700  p-3 rounded-md dark:bg-gray-800">
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
