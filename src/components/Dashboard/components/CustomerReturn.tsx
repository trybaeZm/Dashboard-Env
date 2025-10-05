import React from 'react'
import { ApexOptions } from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import { DashboardSummary, formatNumber } from '@/services/api/Dashboard';
import { Users, TrendingUp, Calendar, RefreshCw } from 'lucide-react';

interface CustomerReturnProps {
  data: DashboardSummary | null | undefined;
  loading?: boolean;
}

export const CustomerReturn = ({ data, loading = false }: CustomerReturnProps) => {
  const getLast7Days = (): string[] => {
    const daysArray: string[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      daysArray.push(date.toISOString().split('T')[0]);
    }

    return daysArray;
  };

  const convertDate = (dateString: string) => {
    try {
      const date = new Date(dateString.replace(' ', 'T'));
      return date.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  };

  const getCustomerCounts = (): (number | null)[] => {
    const last7Days = getLast7Days();
    const counts: (number | null)[] = [];

    for (const day of last7Days) {
      const dayCount = data?.allCustomers
        ?.filter((customer) => convertDate(customer.created_at) === day)
        ?.length || 0;
      
      counts.push(dayCount > 0 ? dayCount : null);
    }

    return counts;
  };

  const getFormattedDates = (): string[] => {
    return getLast7Days().map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    });
  };

  const calculateTotalCustomers = (): number => {
    return data?.allCustomers?.length || 0;
  };

  const calculateGrowth = (): number => {
    const counts = getCustomerCounts().filter((v): v is number => v !== null);
    if (counts.length < 2) return 0;
    
    const firstHalf = counts.slice(0, 3).reduce((a, b) => a + b, 0);
    const secondHalf = counts.slice(3).reduce((a, b) => a + b, 0);
    
    if (firstHalf === 0) return secondHalf > 0 ? 100 : 0;
    return ((secondHalf - firstHalf) / firstHalf) * 100;
  };

  // const calculateReturnRate = (): number => {
  //   const totalCustomers = data?.allCustomers?.length || 0;
    
  //   const returningCustomers = data?.allCustomers?.filter(customer => 
  //     customer.orders && customer.orders.length > 1
  //   ).length || 0;
    
  //   if (totalCustomers === 0) return 0;
  //   return (returningCustomers / totalCustomers) * 100;
  // };

  const growth = calculateGrowth();
  const isPositiveGrowth = growth >= 0;
  // const returnRate = calculateReturnRate();

  const series = [{
    name: "New Customers",
    data: getCustomerCounts().map(v => v === null ? 0 : v),
  }];

  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      background: 'transparent',
      foreColor: '#6B7280',
      fontFamily: 'inherit',
      animations: {
        enabled: true,
        speed: 800,
      }
    },
    colors: ["#10B981"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
      lineCap: 'round'
    },
    markers: {
      size: 5,
      strokeWidth: 0,
      hover: {
        size: 7
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#10B981',
            opacity: 0.7
          },
          {
            offset: 100,
            color: '#10B981',
            opacity: 0.1
          }
        ]
      },
    },
    xaxis: {
      categories: getFormattedDates(),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#6B7280',
          fontFamily: 'inherit',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
          fontFamily: 'inherit',
          fontSize: '12px'
        }
      },
      min: 0
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    tooltip: {
      theme: 'light',
      style: {
        fontFamily: 'inherit'
      },
      y: {
        formatter: (value) => `${value} customers`
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: { height: 200 },
        xaxis: { labels: { rotate: -45 } }
      }
    }]
  };

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-6"></div>
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Analytics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              Last 7 days • <RefreshCw className="w-3 h-3" /> Real-time
            </p>
          </div>
        </div>
        
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
          isPositiveGrowth 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          <TrendingUp className={`w-4 h-4 ${!isPositiveGrowth ? 'rotate-180' : ''}`} />
          {Math.abs(growth).toFixed(1)}%
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-600 dark:from-gray-100 dark:to-green-400 bg-clip-text text-transparent">
            {formatNumber(calculateTotalCustomers())}
          </p>
        </div>
        {/* <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Return Rate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {returnRate.toFixed(1)}%
          </p>
        </div> */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Daily</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(calculateTotalCustomers() / 7)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={250}
        />
        
        {/* Chart Overlay Gradient */}
        <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t from-white/50 dark:from-gray-800/50 to-transparent" />
      </div>

      {/* Footer */}
      {/* <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {data?.allCustomers?.filter(c => c.orders && c.orders.length > 1).length || 0} returning customers
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">New customers</span>
        </div>
      </div> */}

      {/* Additional Insights */}
      {/* <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-300 text-center">
          {returnRate > 30 ? 'Excellent' : returnRate > 15 ? 'Good' : 'Needs improvement'} customer retention
        </p>
      </div> */}
    </div>
  );
};