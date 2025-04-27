import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from "react-apexcharts";

const AreaChart = () => {
    const series = [
        {
            name: "Population",
            data: [44, 55, 13, 30],
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "area" as const,
            toolbar: {
                show: false,
            },
            background: 'transparent',
        },
        colors: ["#1A0670"],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
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
            categories: ["Lusaka", "Copperbelt", "Central", "Other"],
            labels: {
                style: {
                    colors: '#616262',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#616262',
                },
            },
        },
        grid: {
            borderColor: '#C9C9C9',
        },
        theme: {
            mode: 'light',
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
                width="100%" />
        </>
    )
}

export default AreaChart