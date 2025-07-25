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
            type: "bar",
            toolbar: {
                show: false,
            },
            background: "transparent",
        },
        colors: ["#1A0670"],
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "45%",
                borderRadius: 4,
            },
        },
        xaxis: {
            categories: ["Lusaka", "Copperbelt", "Central", "Other"],
            labels: {
                style: {
                    colors: "#616262",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616262",
                },
            },
        },
        grid: {
            borderColor: "#C9C9C9",
        },
        theme: {
            mode: "light",
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
                type="bar"
                height={250}
                width="100%" />
        </>
    )
}

export default AreaChart