import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [data, setData] = useState([]);
  const [jwt, setJwt] = useState(() => localStorage.getItem('jwt'));
  useEffect(() => {
    // Fetch data from the API
    axios.get('https://map-backend-eight.vercel.app/api/locations',{
      headers: {        
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(response => {
        console.log('API response:', response.data); // Log the API response
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEdit = (id) => {
   
    console.log(`Edit item with id: ${id}`);
    
    window.location.href = `/dashboard/${id}`; 
  };

  const handleDelete = (id) => {
    console.log(`Attempting to delete item with id: ${id}`);
    axios.delete(`https://map-backend-eight.vercel.app/api/locations/${id}`,{
      headers: {        
        Authorization: `Bearer ${jwt}`,
      },
    })
        .then(response => {
            console.log(`Delete successful: ${response.data.message}`);
            setData(data.filter(item => item._id !== id)); // Update state after deletion
            window.location.reload();

        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
};



  const getImageUrl = (fileName) => {
    console.log("-----",fileName);
    
    return fileName ? `https://map-backend-eight.vercel.app/uploads/${fileName.replace('\\', '/')}` : 'https://via.placeholder.com/150';
  };

  return (
    <div className="container min-h-screen bg-gray-100 p-4">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-2 text-left text-red-700">District</th>
            <th className="py-2 px-2 text-left text-red-700">Movement Issue</th>
            <th className="py-2 px-2 text-left text-red-700">Image</th>
            <th className="py-2 px-3 text-left text-red-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-t bg-white hover:bg-gray-100 transition duration-150 ease-in-out">
              <td className="py-1 px-2">{item.district}</td>
              <td className="py-1 px-2">{item.momentIssue}</td>
              <td className="py-1 px-2">
                <img 
                  src={getImageUrl(item.heroSectionImage)} 
                  alt={item.actors || 'No actor'} 
                  className="w-20 h-20 object-cover rounded-lg" 
                  onError={(e) => {
                    console.error('Image error:', e);
                    e.target.src = 'https://via.placeholder.com/150'; // Fallback image
                  }} 
                />
              </td>
              <td className="py-3 px-3 flex space-x-2">
                {/* <button onClick={() => handleEdit(item._id)} className="text-blue-500 hover:text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536L7 21H3v-4L16.732 3.232z" />
                  </svg>
                </button> */}
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
