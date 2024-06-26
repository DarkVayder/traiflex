import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Player from "./pages/Player";
import Profile from "./pages/Profile";
import { AuthListener } from './Utilities/AuthListener';
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import HelpCenter from "./components/HelpCenter";
import UserLiked from "./pages/UserLiked";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="dark" />
      <AuthListener />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/player" element={<Player />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/UserLiked" element={<UserLiked />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
