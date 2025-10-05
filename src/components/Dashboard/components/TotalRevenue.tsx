import React from 'react'
import { ApexOptions } from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import { DashboardSummary, formatNumber } from '@/services/api/Dashboard';
import { TrendingUp, DollarSign, Calendar, RefreshCw, ArrowUpRight, BarChart3 } from 'lucide-react';

interface TotalRevenueProps {
  data: DashboardSummary | null | undefined;
  loading?: boolean;
}

export const TotalRevenue = ({ data, loading = false }: TotalRevenueProps) => {
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

  const getRevenueData = (): (number | null)[] => {
    const last7Days = getLast7Days();
    const amounts: (number | null)[] = [];

    for (const day of last7Days) {
      const dayRevenue = data?.allSales
        ?.filter((sale) => convertDate(sale.created_at) === day)
        ?.reduce((prev, cur) => prev + (cur.amount || 0), 0) || 0;
      
      amounts.push(dayRevenue > 0 ? dayRevenue : null);
    }

    return amounts;
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

  const calculateTotalRevenue = (): number => {
    return getRevenueData()
      .filter((v): v is number => v !== null)
      .reduce((prev, curr) => prev + curr, 0);
  };

  const calculateAverageDaily = (): number => {
    const revenueData = getRevenueData().filter((v): v is number => v !== null);
    return revenueData.length > 0 ? revenueData.reduce((a, b) => a + b, 0) / revenueData.length : 0;
  };

  const calculateGrowth = (): number => {
    const revenueData = getRevenueData().filter((v): v is number => v !== null);
    if (revenueData.length < 2) return 0;
    
    const firstHalf = revenueData.slice(0, 3).reduce((a, b) => a + b, 0);
    const secondHalf = revenueData.slice(3).reduce((a, b) => a + b, 0);
    
    if (firstHalf === 0) return secondHalf > 0 ? 100 : 0;
    return ((secondHalf - firstHalf) / firstHalf) * 100;
  };

  const getPeakDay = (): { day: string; revenue: number } => {
    const revenueData = getRevenueData();
    const dates = getFormattedDates();
    let maxRevenue = 0;
    let peakDay = '';

    revenueData.forEach((revenue, index) => {
      if (revenue && revenue > maxRevenue) {
        maxRevenue = revenue;
        peakDay = dates[index];
      }
    });

    return { day: peakDay, revenue: maxRevenue };
  };

  const totalRevenue = calculateTotalRevenue();
  const averageDaily = calculateAverageDaily();
  const growth = calculateGrowth();
  const isPositiveGrowth = growth >= 0;
  const peakDay = getPeakDay();

  const series = [{
    name: "Revenue",
    data: getRevenueData().map(v => v === null ? 0 : v),
  }];

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: 'transparent',
      foreColor: '#6B7280',
      fontFamily: 'inherit',
      animations: {
        enabled: true,
        // easing: 'easeinout',
        speed: 800,
      }
    },
    colors: ["#8B5CF6"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
      lineCap: 'round'
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
            color: '#8B5CF6',
            opacity: 0.7
          },
          {
            offset: 100,
            color: '#8B5CF6',
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
        },
        formatter: (value) => `K${formatNumber(value)}`
      }
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
        formatter: (value) => `K${formatNumber(value)}`
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Analytics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              Last 7 days • <RefreshCw className="w-3 h-3" /> Real-time tracking
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

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Revenue</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 dark:from-gray-100 dark:to-purple-400 bg-clip-text text-transparent">
            K{formatNumber(totalRevenue.toFixed(2))}
          </p>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Avg. Daily</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            K{formatNumber(averageDaily.toFixed(2))}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative mb-4">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={250}
        />
        
        {/* Chart Overlay Gradient */}
        <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t from-white/50 dark:from-gray-800/50 to-transparent" />
      </div>

      {/* Insights */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <BarChart3 className="w-3 h-3 text-purple-500" />
          <span className="text-gray-600 dark:text-gray-400">Peak: {peakDay.day}</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <Calendar className="w-3 h-3 text-blue-500" />
          <span className="text-gray-600 dark:text-gray-400">7-day period</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {data?.allSales?.length || 0} transactions processed
        </p>
        <button className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors">
          View details
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};