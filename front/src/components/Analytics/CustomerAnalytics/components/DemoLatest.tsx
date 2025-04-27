import React from 'react'
import ReactApexChart from 'react-apexcharts'

const LatestChart = () => {
    const series = [44, 55];  // Values for the pie slices
    const options = {
      chart: {
        type: 'donut' as const,  // The type of chart we want (pie chart in this case)
      },
      labels: ['NEW', 'REPEAT'],  // Labels for each slice
      colors: ['#1A0670', '#877DFF'], // Custom colors for each segment
      dataLabels: {
        enabled: false, // Hides the numbers inside the chart
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