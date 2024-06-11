import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Utilities/Firebase';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/user/userSlice';

export const AuthListener = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({
          email: user.email,
          uid: user.uid,
        }));
      } else {
        dispatch(logout());
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return null; 
};
