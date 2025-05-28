import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts';

const LatestChart = ({data}:{data:any}) => {
    const series = [data.new, data.repeat];  // Values for the pie slices
    const options: ApexOptions = {
      chart: {
        type: 'donut' as const,  // The type of chart we want (pie chart in this case)
        background: 'transparent',
      },
      labels: ['NEW', 'REPEAT'],  // Labels for each slice
      colors: ['#1A0670', '#877DFF'], // Custom colors for each segment
      dataLabels: {
        enabled: false, // Hides the numbers inside the chart
      },
      theme: {
        mode: 'dark',
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

export default LatestChart