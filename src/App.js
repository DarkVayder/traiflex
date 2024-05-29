import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from "./Login";
import Profile from "./Profile";
import { AuthListener } from "./AuthListener"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer theme="dark" />
      <AuthListener />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
