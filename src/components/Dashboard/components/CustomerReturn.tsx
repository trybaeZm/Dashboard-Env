import React from 'react'
import { ApexOptions } from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import { DashboardSummary, formatNumber } from '@/services/api/Dashboard'

export const CustomerReturn = ({ data }: { data: DashboardSummary | null | undefined }) => {
  const getDate = (): (number | undefined)[] => {

    let lists = getLast7Days()

    let amounts: (number | undefined)[] = []

    for (let i = 0; i < lists.length; i++) {
      const filteredData = data?.allCustomers.filter((e) => convertDate(e.created_at) == lists[i]).length;

      amounts.push(filteredData)
    }

    return amounts

  }

  const convertDate = (dateString: string) => {
    // Convert to a Date object (replace the space with 'T' to make it ISO compatible)
    const date = new Date(dateString.replace(' ', 'T'));

    // Get only the date part
    const datePart = date.toISOString().split('T')[0];

    return (datePart);
  }

  function getLast7Days(): string[] {
    const daysArray: string[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      daysArray.push(date.toISOString().split('T')[0]); // format: 'YYYY-MM-DD'
    }

    return daysArray;
  }

  const series = [
    {
      name: "number", // Dataset name
      data: (getDate() ?? []).map(v => v === undefined ? null : v), // Ensure data is always an array
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area" as const,
      toolbar: {
        show: false, // ✅ Hides the options (menu) icon
      },
      background: 'transparent',
      foreColor: '#AEB7C0', // Text color for dark mode
    },
    colors: ["#3C50E0"], // Primary color from theme
    dataLabels: {
      enabled: false, // Hide labels on the chart
    },
    stroke: {
      curve: "smooth", // Smooth line
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: getLast7Days(), // X-axis labels
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#AEB7C0', // Text color for dark mode
        }
      }
    },
    grid: {
      borderColor: '#2E3A47', // strokedark from theme
      strokeDashArray: 7,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div className="rounded flex flex-wrap bg-gray-700 shadow-md p-4 rounded-md flex">
      <div className='flex-col grow gap-4 flex'>
        <div className="text-xl text-white">Customer Return</div>
        <div className='font-thin text-sm text-gray-400'>last 7 days</div>
        <div className="text-3xl font-bold text-white">{formatNumber(data?.allCustomers.length)}</div>
        <div className="text-gray-400">
          {/* <FaArrowUp /> */}7% vs last 7 days
        </div>
      </div>
      <div className='grow'>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
        />
      </div>
    </div>
  )
}
