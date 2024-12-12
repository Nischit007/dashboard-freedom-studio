import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset link has been sent to your email.');
      } else {
        setMessage('Failed to send reset link. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#9A1D20] mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-2 text-gray-700 text-sm font-bold">
            Enter your email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A1D20]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#833738] hover:bg-[#9A1D20] text-white font-bold py-2 rounded transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:shadow-outline"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="text-center text-md mt-4 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
