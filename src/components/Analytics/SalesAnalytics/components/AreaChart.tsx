import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from "react-apexcharts";

const AreaChart = () => {
    const series = [
        {
            name: "Population", // Dataset name
            data: [44, 55, 13, 30], // Values for each category
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "area" as const,
            toolbar: {
                show: false, // ✅ Hides the options (menu) icon
            },
            background: 'transparent'
        },
        colors: ["#1A0670"], // Custom area color
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
            categories: ["Lusaka", "Copperbelt", "Central", "Other"], // X-axis labels
            labels: {
                style: {
                    colors: '#616262'
                }
            }
        },
        yaxis: {
            tickAmount:3,
            labels: {
                style: {
                    colors: '#616262'
                }
            }
        },
        theme: {
            mode: 'dark'
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: "100%",
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={200} />

        </>
    )
}

export default AreaChart