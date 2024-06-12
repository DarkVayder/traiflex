import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Player from "./pages/Player"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Utilities/Firebase';
import { AuthListener } from './AuthListener';

function App () {
 
  return (
    <BrowserRouter>
      <ToastContainer theme="dark" />
      <AuthListener />
      <Routes>
            <Route exact path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/player" element={<Player />} />
            <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
