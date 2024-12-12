import { useState } from 'react';

const UseAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid email or password');
        return null;
      }

      const responseData = await response.json();
      return responseData.token;
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default UseAuth;
