import React, { useState, useEffect } from 'react';
import NetflixLogo from './Netflix logo.png';
import AvatarLogo from './Avatar.png';
import './Nav.css';

function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src={NetflixLogo}
        alt='Netflix logo'
      />
      <img
        className="nav__avatar"
        src={AvatarLogo}
        alt='Avatar Logo'
      />
    </div>
  );
}

export default Nav;
