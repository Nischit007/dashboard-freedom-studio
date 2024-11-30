import React, { useEffect, useState } from 'react';
import UserBarChart from './UserBarChart';

const UseBarCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/sampleData.json')
      .then((response) => response.json())
      .then((data) => {
        const groupedData = data.reduce((acc, curr) => {
          const existing = acc.find(item => item.name === curr.name);
          if (existing) {
            existing.visits += 1;
          } else {
            acc.push({ name: curr.name, visits: 1 });
          }
          return acc;
        }, []);
        setData(groupedData);
      })
      .catch((error) => console.error('Error fetching the data:', error));
  }, []);

  return (
    <div>
      <UserBarChart data={data} />
    </div>
  );
};

export default UseBarCharts;
