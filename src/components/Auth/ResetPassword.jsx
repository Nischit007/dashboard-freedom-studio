import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', // Added email field
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError(''); // Clear error message when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email, // Include email in the request body
          token,
          newPassword: formData.newPassword,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message || 'Failed to reset password. Please try again.');
        return;
      }

      setMessage('Password reset successfully! You can now log in with your new password.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#9A1D20] mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <label htmlFor="email" className="block mb-2 text-gray-700 text-sm font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A1D20]"
            required
          />

          {/* New Password field */}
          <label htmlFor="newPassword" className="block mb-2 text-gray-700 text-sm font-bold">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A1D20]"
            required
          />

          {/* Confirm Password field */}
          <label htmlFor="confirmPassword" className="block mb-2 text-gray-700 text-sm font-bold">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A1D20]"
            required
          />

          {error && <p className="text-red-500 text-center text-md mb-4">{error}</p>}
          {message && <p className="text-green-500 text-center text-md mb-4">{message}</p>}
          <button
            type="submit"
            className="w-full bg-[#833738] hover:bg-[#9A1D20] text-white font-bold py-2 rounded transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
