import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('jwt'); 
      
      window.location.reload(); 
    };

    handleLogout();
  }, [navigate]); 

  return null; 
};

export default Logout;
