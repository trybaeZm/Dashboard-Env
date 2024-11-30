// components/InsightCard.tsx
import { SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";

const InsightCard: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-end xl:w-72">
      {/* Year Tag */}
      <div className="mb-2 mr-2 rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-600">
        2024
      </div>

      {/* Card */}
      <div className="flex w-full flex-col items-center space-y-16 rounded-2xl border border-gray-200 bg-white p-4 text-center">
        {/* Insight Text */}
        <p className="px-4 pt-20 font-semibold text-purple-500">
          Sales tend to peak on weekends, consider running promotions from
          Thursday to Sunday
        </p>

        {/* View AI Insights Button */}
        <button className="mt-auto flex items-center space-x-2 rounded-full border border-purple-200 bg-transparent px-6 py-2 text-sm font-semibold text-gray-500 transition hover:bg-purple-200">
          <span>View AI Insights</span>
          <SparklesIcon className="h-5 w-5 text-purple-500" />
        </button>
      </div>
    </div>
  );
};

export default InsightCard;
