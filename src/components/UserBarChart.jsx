import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserBarChart = ({ data }) => {
  return (
    <div className="-mt-8 h-[433px] flex justify-center p-8 bg-gray-100 sm:w-[750px]">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">No of Marker in different provinces</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 0, left: 0, bottom: 30 }}  // Increased bottom margin to avoid overlap
            barCategoryGap="15%"  // Adjust space between bars
            barGap={6}  // Adjust space between bars more specifically
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ 
                fontSize: '0.7rem',  // Default font size for larger screens
              }}
              tickLine={false}
              className="sm:text-xs md:text-xss lg:text-xs xl:text-xs hidden sm:block"  // Adjust text size based on screen size
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar  dataKey="visits" fill="#9A1D20" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserBarChart;
