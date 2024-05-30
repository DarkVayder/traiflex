import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase';

export const AuthListener = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && location.pathname !== '/login') {
        console.log("Logged Out");
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return null; 
};
