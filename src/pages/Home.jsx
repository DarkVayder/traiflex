import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import backgroundImage from "../assets/hero_banner.jpg";
import Movielogo from "../assets/hero_title.png";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <Nav isScrolled={isScrolled} />
      <img src={backgroundImage} alt="background" 
      className="background-image" />  
      <div className="logo">
        <img src={Movielogo} alt="Movie Logo"/> 
        <div className="buttons flex">
          <button className="flex j-center a center">
            <FaPlay /> Play 
          </button>  
          <button className="flex j-center a center">
            <AiOutlineInfoCircle /> More Info
          </button> 
        </div> 
      </div>   
    </div>
  );
}
