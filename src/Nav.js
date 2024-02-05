import React from 'react';
import Netflix from './Netflix logo.png';
import avatar from './Avatar.png';
import 'Nav.css';


function Nav() {
  return (
    <div className='nav'>
      <img
        className="nav__logo"
        src={Netflix} 
        alt='Netflix logo'
      />
      <img
        className="nav__avatar"
        src={avatar} 
        alt='Avatar Logo'
      />
    </div>
    
  );
}

export default Nav;
