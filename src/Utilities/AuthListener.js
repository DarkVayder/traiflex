import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../Utilities/Firebase';

export const AuthListener = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (location.pathname === '/login' || location.pathname === '/signup') {
          navigate("/");
        }
      } else {
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate("/login");
        }
      }
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return null;
};
