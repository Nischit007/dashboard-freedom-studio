import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import Charts from './components/Charts';
import Logout from './components/Logout';
import Calendar from './components/Calendar';
import Table from './components/Table';
import Auth from './components/Auth/Auth';

function App() {
  const [jwt, setJwt] = useState(() => localStorage.getItem('jwt'));
  const [isTokenValid, setIsTokenValid] = useState(null); // null = unknown, true/false = validity

  useEffect(() => {
    const validateToken = async () => {
      if (jwt) {
        try {
          const response = await fetch('http://localhost:8000/auth/validate', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          });

          if (response.ok) {
            setIsTokenValid(true);
          } else {
            // If token is invalid, clear it
            localStorage.removeItem('jwt');
            setJwt(null);
            setIsTokenValid(false);
          }
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('jwt');
          setJwt(null);
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [jwt]);

  // Show a loading indicator while validating the token
  if (isTokenValid === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isTokenValid ? (
        <Router>
          <div className="App flex">
            <Navigation />
            <div className="w-4/5">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/map" element={<Map />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/table" element={<Table />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </div>
        </Router>
      ) : (
        <Router>
          <Routes>
            {/* Unauthenticated Routes */}
            <Route path="/login" element={<Auth />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
