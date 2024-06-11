import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import requests from '../request';

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
      
    </div>
  );
}
