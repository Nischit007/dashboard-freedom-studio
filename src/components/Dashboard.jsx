import React, { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const Dashboard = () => {
  const [jwt, setJwt] = useState(() => localStorage.getItem('jwt'));
  const [formData, setFormData] = useState({
    longitude: '',
    latitude: '',
    momentIssue: '',
    description: '',
    url: '',
    file: null,
    videoFile: null, // Add videoFile to state
    province: '', // Add province to state
    actors: '',
    district: ''
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:8000/api/locations', {
        method: 'POST',
        body: data,
        headers: {        
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setSuccess(true);
        setFormData({
          longitude: '',
          latitude: '',
          momentIssue: '',
          description: '',
          url: '',
          file: null,
          province: '', // Reset province on submission
          actors: '',
          district: ''
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        const responseText = await response.text();
        console.error('Error submitting form:', responseText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mt-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Submit Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">Latitude</label>
              <input
                type="text"
                name="latitude"
                id="latitude"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">Longitude</label>
              <input
                type="text"
                name="longitude"
                id="longitude"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="momentIssue">Movement Issue</label>
              <input
                type="text"
                name="momentIssue"
                id="momentIssue"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.momentIssue}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">URL</label>
              <input
                type="url"
                name="url"
                id="url"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Province</label>
              <input
                type="text"
                name="province"
                id="province"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.province}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="actors">Actors</label>
              <input
                type="text"
                name="actors"
                id="actors"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.actors}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">District</label>
              <input
                type="text"
                name="district"
                id="district"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">File</label>
              <input
                type="file"
                name="file"
                id="file"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {success && (
            <div className="flex items-center justify-center mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <FiCheckCircle className="mr-2" size={24} />
              <span className="block sm:inline">Submitted successfully!</span>
            </div>
          )}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-[#833738] hover:bg-[#9A1D20] text-white font-bold py-2 px-4 rounded transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
