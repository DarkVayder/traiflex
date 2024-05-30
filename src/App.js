import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Login from "./Login";
import Profile from "./Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/user/userSlice';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase';
import { AuthListener } from "./AuthListener";

const App = () => {
  const user = useSelector(selectUser);  
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
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer theme="dark" />
      <AuthListener />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={
          user ? <Profile /> : <Navigate to='/login' />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
