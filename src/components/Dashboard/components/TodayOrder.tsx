import React from 'react'
import { ApexOptions } from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import { DashboardSummary } from '@/services/api/Dashboard'

export const TodayOrder = ({ data }: { data: DashboardSummary | null | undefined }) => {
    const getDate = (data1: string) => {
        const data = new Date(data1)

        return data.getDate()
    }
    const series = [
        {
            name: "amount", // Dataset name
            data: data?.OrderData.allOrders.map((e: any) => e.total_amount) ?? [], // Ensure data is always an array
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
            categories: data?.OrderData.allOrders.map((e: any) => getDate(e.created_at)), // X-axis labels
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
        <div className="rounded dark:bg-gray-700 bg-white shadow-md p-4 rounded-md flex flex-wrap gap-4">
            <div className='flex flex-col gap-2'>
                <div className="text-xl text-black dark:text-white">Today Order</div>
                <div className="text-3xl font-bold text-black dark:text-white">
                    K{data?.OrderData.allOrders.filter((e:any)=> getDate(e.created_at) == new Date().getDay()).reduce((prev, curr)=> prev+curr.total_amount, 0).toFixed(2)
                    }</div>
                <div className='font-thin text-sm text-gray-600 dark:text-gray-400'>Orders over time</div>
            </div>
        </div>
    )
}
