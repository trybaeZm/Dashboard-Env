import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {

    const series2 = [
        {
            name: 'Population', // Name for the dataset
            data: [44, 55, 13, 30, 89], // Values for each category
        },
    ];

    const options2: ApexOptions = {
        chart: {
            type: 'bar' as const,
            toolbar: {
                show: false, // ✅ Hides the options (menu) icon
              },
        },
        colors: ['#7165A6', '#D0CDFD', '#D0CDFD', '#1A06709E','#1A0670'], // Custom bar colors
        dataLabels: {
            enabled: false, // Hide numbers on bars
        },
        plotOptions: {
            bar: {
                horizontal: false, // Change to true for horizontal bars
                columnWidth: '50%', // Adjust bar width
                borderRadius: 8, // Round bar edges
            },
        },
        xaxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // X-axis labels
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