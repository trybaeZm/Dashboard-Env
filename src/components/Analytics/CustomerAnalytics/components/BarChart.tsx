import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {

    const series2 = [
        {
            name: 'Population',
            data: [44, 55, 13, 30, 89],
        },
    ];

    const options2: ApexOptions = {
        chart: {
            type: 'bar' as const,
            toolbar: {
                show: false,
            },
            background: 'transparent',
        },
        colors: ['#7165A6', '#D0CDFD', '#D0CDFD', '#1A06709E','#1A0670'],
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 8,
            },
        },
        xaxis: {
            categories: ['LSK', 'CB', 'SOUTH', 'CENTRAL', 'NW'],
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
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    return (
        <>
            <ReactApexChart
                options={options2}
                series={series2}
                type="bar"
                width="100%"
                height={200} />
        </>
    )
}

export default BarChart