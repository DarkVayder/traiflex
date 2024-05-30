import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NetflixLogo from './Netflix logo.png';
import AvatarLogo from './Avatar.png';
import notification from './notification.png';
import search from './search.png';
import './Nav.css';
import { logout } from './Firebase';
import { IoMdArrowDropdown } from "react-icons/io";

function Nav() {
  const [show, setShow] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src={NetflixLogo}
        alt="Netflix logo"
        onClick={() => navigate('/')}
      />
      <div className="nav__links">
        <p className="nav__link">TV Shows</p>
        <p className="nav__link">Movies</p>
        <p className="nav__link">Popular</p>
        <p className="nav__link MyList">My List</p>
      </div>
      <img
        className="nav__notification"
        src={notification}
        alt="notification icon"
      />
      <img
        className="nav__search"
        src={search}
        alt="search icon"
      />
      <div className="nav__avatar-container">
        <img
          onClick={() => navigate('/profile')}
          className="nav__avatar"
          src={AvatarLogo}
          alt="Avatar Logo"
        />
        <IoMdArrowDropdown className="dropdownicon" onClick={handleAvatarClick} />
        {dropdownVisible && (
          <div className="dropdown">
            <p onClick={logout}>Sign Out of My Profile</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
