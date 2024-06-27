import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../Utilities/Firebase';

export const AuthListener = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is authenticated
        if (location.pathname === '/login' || location.pathname === '/signup') {
          // Redirect to home if trying to access login or signup page
          navigate("/");
        }
      } else {
        // If user is not authenticated
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          // Redirect to login if trying to access any other page
          navigate("/login");
        }
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from auth listener
  }, [navigate, location.pathname]);

  return null; // AuthListener does not render anything visible
};
