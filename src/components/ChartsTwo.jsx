import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
    height: '100%', // Ensures the chart takes full height of its container
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#FF6347', '#32CD32', '#FFD700'], // Colors for 7 districts
  labels: [
    'Koshi', 'Gandaki', 'Lumbini', 'Sudurpashim',
    'Bagmati', 'Province 1', 'Madhesh',
  ], // Labels for 7 districts
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 500, // Adjusted width for large screens
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 300, // Adjusted width for small screens
        },
      },
    },
  ],
};

const ChartsTwo = () => {
  const [series, setSeries] = useState([10, 20, 15, 12, 18, 8, 17]); // Data for the 7 districts

  return (
    <div className="-mt-32 sm:mt-0 sm:h-[500px] lg:h-[370px] bg-white lg:w-[350px] lg:ml-6">
      <div className="mb-3 flex justify-center gap-8 sm:flex text-center">
        <div className='text-center'>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Markers Analytics
          </h5>
        </div>
      </div>

      <div className="mb-2 h-[200px]">
        <div id="chartThree" className="mx-auto flex justify-center h-full">
          <ReactApexChart options={options} series={series} type="donut" height="100%" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-y-3">
        {['Koshi', 'Gandaki', 'Lumbini', 'Sudurpashim', 'Bagmati', 'Province 1', 'Madhesh'].map((district, index) => (
          <div key={district} className="w-full sm:w-1/2 px-8">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full`}
                style={{ backgroundColor: options.colors[index] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {district} </span>
                <span> {series[index]}% </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsTwo;
