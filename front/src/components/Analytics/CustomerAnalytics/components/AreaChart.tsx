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
        },
        colors: ["#FF5733"], // Custom area color
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