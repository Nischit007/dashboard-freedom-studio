import React from 'react';
import UseBarCharts from './UseBarCharts';
import ChartsTwo from './ChartsTwo';
import Calendar from './Calendar';

const Charts = () => {
  return (
    <>
    <div className="min-h-full  w-full  bg-gray-100 dark:bg-gray-900">
       <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 lg:flex lg:flex-row flex flex-col  justify-center p-3 ">
      
       <ChartsTwo/>
       
       <div className='hidden lg:block'>
       <UseBarCharts />
       </div>
  
       </div>
       <div className='-mt-60 w-[1000px] flex justify-center '>
       <Calendar></Calendar>
       </div>

       </div>
    </>
  );
};

export default Charts;
