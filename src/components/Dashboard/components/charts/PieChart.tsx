import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const PieChart = ({data}:{data:any}) => {
    const series = [data?.GenderSales.Salesbyfemale, data?.GenderSales.Salesbymale];  // Values for the pie slices
    const options: ApexOptions = {
      chart: {
        type: 'donut' as const,  // The type of chart we want (pie chart in this case)
        background: 'transparent',
        foreColor: '#AEB7C0', // Text color for dark mode
      },
      labels: ['Women', 'Men'],  // Labels for each slice
      colors: ['#1A0670', '#877DFF'], // Custom colors for each segment
      dataLabels: {
        enabled: false, // Hides the numbers inside the chart
      },
      legend: {
        labels: {
          colors: '#AEB7C0', // Legend text color for dark mode
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      theme: {
        mode: 'dark',
      },
    };
    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height={200} />
        </>
    )
}

export default PieChart