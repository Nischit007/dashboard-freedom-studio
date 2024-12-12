import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const Dashboard = () => {
  const [jwt] = useState(() => localStorage.getItem('jwt'));
  const [formData, setFormData] = useState({
    longitude: '',
    latitude: '',
    momentIssue: '',
    description: '',
    url: '',
    heroSectionImage: null, // Single image
    actors: '',
    province: '', // Initially empty, will hold the selected province
    district: '',
    duration: '',
    momentSubTitle: '',
    momentSlogan: '',
    AboutTitle: '',
    AboutDescription: '',
    AboutImage1: null, // Single image
    AboutImage2: null, // Single image
    issuedDetailTitle: '',
    issuedDetailDescription: '',
    issuedDetailImage1: null, // Single image
    issuedDetailImage2: null, // Single image
    gallery: [], // Array of image files
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Array of province options for dropdown
  const provinces = [
    'Koshi',
    'Madhesh',
    'Bagmati',
    'Gandaki',
    'Lumbini',
    'Karnali',
    'Sudurpashchim',
  ];

  const handleChange = (e) => {
    const { name, value, files, multiple } = e.target;
    if (files) {
      if (multiple) {
        setFormData({
          ...formData,
          [name]: [...files], // Handle multiple files for the gallery
        });
      } else {
        setFormData({
          ...formData,
          [name]: files[0], // Handle single file inputs
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'gallery') {
        formData.gallery.forEach((file) => {
          if (file.size > 5 * 1024 * 1024) { // 5MB limit per file
            setError('One of the files is too large.');
            setIsLoading(false);
            return;
          }
          data.append('gallery', file);
        });
      } else {
        data.append(key, formData[key]);
      }
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
        setSuccess(true);
        setFormData({
          longitude: '',
          latitude: '',
          momentIssue: '',
          description: '',
          url: '',
          heroSectionImage: null,
          actors: '',
          province: '', // Reset province
          district: '',
          duration: '',
          momentSubTitle: '',
          momentSlogan: '',
          AboutTitle: '',
          AboutDescription: '',
          AboutImage1: null,
          AboutImage2: null,
          issuedDetailTitle: '',
          issuedDetailDescription: '',
          issuedDetailImage1: null,
          issuedDetailImage2: null,
          gallery: [],
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const errorMessage = await response.text();
        setError(`Submission failed: ${errorMessage}`);
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mt-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Submit Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-4 col-span-2">
              <label className="block text-[#9A1D20] text-sm font-bold mb-2" htmlFor="province">
                Province
              </label>
              <select
                name="province"
                id="province"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                value={formData.province}
                onChange={handleChange}
                required
              >
                <option value="">Select Province</option>
                {provinces.map((province, idx) => (
                  <option key={idx} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            {/* Input fields */}
            {[ 
              { name: 'longitude', type: 'text', label: 'Longitude', color: 'text-[#9A1D20]' },
              { name: 'latitude', type: 'text', label: 'Latitude', color: 'text-[#9A1D20]' },
              { name: 'momentIssue', type: 'text', label: 'Movements', color: 'text-[#9A1D20]' },
              { name: 'description', type: 'textarea', label: 'Short description for Card', maxLength: 150, color: 'text-[#9A1D20]' },
              { name: 'actors', type: 'text', label: 'Organizer / Actor', color: 'text-[#9A1D20]' },
              { name: 'district', type: 'text', label: 'District', color: 'text-[#9A1D20]' },
              { name: 'duration', type: 'text', label: 'Duration', color: 'text-[#9A1D20]' },
              { name: 'momentSubTitle', type: 'text', label: 'Moment SubTitle', color: 'text-gray-700' },
              { name: 'momentSlogan', type: 'text', label: 'Moment Slogan', color: 'text-gray-700' },
              { name: 'AboutTitle', type: 'text', label: 'About Title', color: 'text-gray-700' },
              { name: 'AboutDescription', type: 'textarea', label: 'About Description', color: 'text-gray-700' },
              { name: 'issuedDetailTitle', type: 'text', label: 'Issued Detail Title', color: 'text-gray-700' },
              { name: 'issuedDetailDescription', type: 'textarea', label: 'Issued Detail Description', color: 'text-gray-700' },
              { name: 'url', type: 'url', label: 'YouTube URL', color: 'text-gray-700' },
            ].map((field, idx) => (
              <div className="mb-4 col-span-2" key={idx}>
                <label className={`block ${field.color} text-sm font-bold mb-2`} htmlFor={field.name}>
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    id={field.name}
                    maxLength={field.maxLength}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500`}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}

          


            {/* File inputs */}
            {[ 
              { name: 'heroSectionImage', label: 'Hero Section Image' },
              { name: 'AboutImage1', label: 'About Image 1' },
              { name: 'AboutImage2', label: 'About Image 2' },
              { name: 'issuedDetailImage1', label: 'Issued Detail Image 1' },
              { name: 'issuedDetailImage2', label: 'Issued Detail Image 2' },
            ].map((field, idx) => (
              <div className="mb-4 col-span-2" key={idx}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  type="file"
                  name={field.name}
                  id={field.name}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Gallery */}
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gallery">
                Gallery (Up to 50 images)
              </label>
              <input
                type="file"
                name="gallery"
                id="gallery"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
                multiple
              />
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="flex items-center justify-center mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <FiCheckCircle className="mr-2" size={24} />
              <span className="block sm:inline">Submitted successfully!</span>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <FiXCircle className="mr-2" size={24} />
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-[#833738] hover:bg-[#9A1D20] text-white font-bold py-2 px-4 rounded transform hover:scale-110 transition-transform duration-300 focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
