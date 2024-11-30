import React from 'react';

import Login from './Login';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();

  return <>{location.pathname === '/login' && <Login />}</>;
};

export default Auth;