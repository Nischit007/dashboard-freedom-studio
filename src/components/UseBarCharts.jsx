import React, { useEffect, useState } from 'react';
import UserBarChart from './UserBarChart';

const UseBarCharts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/locations')
      .then((response) => response.json())
      .then((data) => {
        // Extract and group by province
        const groupedData = data.reduce((acc, curr) => {
          const province = curr.province; // Extract province
          const existing = acc.find(item => item.name === province);
          if (existing) {
            existing.visits += 1;
          } else {
            acc.push({ name: province, visits: 1 });
          }
          return acc;
        }, []);
        setData(groupedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data!</div>;
  }

  return (
    <div>
      <UserBarChart data={data} />
    </div>
  );
};

export default UseBarCharts;
