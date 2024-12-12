import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('jwt'); 
      
      window.location.reload(); 
      navigate("/login")
    };

    handleLogout();
  }, [navigate]); 

  return null; 
};

export default Logout;
