import React, { useState, useEffect } from 'react';
import NetflixLogo from './Netflix logo.png';
import AvatarLogo from './Avatar.png';
import notification from './notification.png';
import search from './search.png';
import './Nav.css';
import { logout } from './Firebase';
import { IoMdArrowDropdown } from "react-icons/io";

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
      <div className="nav__links">
        <p className="nav__link">TV Shows</p>
        <p className="nav__link">Movies</p>
        <p className="nav__link">Popular</p>
        <p className="nav__link MyList">My List</p>
      </div>
      <img
        className="nav__notification"
        src={notification}
        alt='notification icon'
      />
      <img
        className="nav__search"
        src={search}
        alt='search icon'
      />
      <div className="nav__avatar-container">
        <img
          className="nav__avatar"
          src={AvatarLogo}
          alt='Avatar Logo'
        />
        <IoMdArrowDropdown className='dropdownicon' />
        <div className='dropdown'>
          <p onClick={logout}>Sign Out of My Profile</p>
        </div>
      </div>
    </div>
  );
}

export default Nav;
