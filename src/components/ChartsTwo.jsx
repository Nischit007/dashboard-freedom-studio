import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ChartsTwo = () => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors] = useState([
    '#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#FF6347', '#32CD32', '#FFD700',
  ]);

  const options = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
      height: '100%',
    },
    colors: colors,
    labels: labels,
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
            width: 500,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  // Fetch data and calculate percentages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('map-backend-eight.vercel.app/api/locations');
        const data = response.data;

        // Group data by province
        const provinceCounts = data.reduce((acc, curr) => {
          acc[curr.province] = (acc[curr.province] || 0) + 1;
          return acc;
        }, {});

        // Calculate total and percentages
        const total = Object.values(provinceCounts).reduce((sum, count) => sum + count, 0);
        const calculatedSeries = Object.values(provinceCounts).map((count) =>
          parseFloat(((count / total) * 100).toFixed(2))
        );
        const calculatedLabels = Object.keys(provinceCounts);

        setSeries(calculatedSeries);
        setLabels(calculatedLabels);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="-mt-32 sm:mt-0 sm:h-[500px] lg:h-[370px] bg-white lg:w-[350px] lg:ml-6">
      <div className="mb-3 flex justify-center gap-8 sm:flex text-center">
        <div className="text-center">
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Markers Analytics
          </h5>
        </div>
      </div>

      <div className="mb-2 h-[200px]">
        <div id="chartThree" className="mx-auto flex justify-center h-full">
          {series.length > 0 ? (
            <ReactApexChart options={options} series={series} type="donut" height="100%" />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No data available</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-y-3">
        {labels.map((label, index) => (
          <div key={label} className="w-full sm:w-1/2 px-8">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full`}
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{label}</span>
                <span>{series[index]}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsTwo;
