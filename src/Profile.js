import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';
import avatar from './Avatar.png';
import Nav from './Nav';
import { selectUser } from "./features/user/userSlice";
import { auth } from "./Firebase"

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <div className='Profile'>
      <Nav />
      <div className='profile_body'>
        <h1>My Profile</h1>
        <div className='profile_details'>
          <img src={avatar} alt='Avatar' className='profile_avatar' />
          <div className='profile_info'>
            <h2>{user?.email}</h2>
            <div className="profile__sub">
              <h3> Premium </h3>
              <button onClick = {() => auth.signOut()} 
              className="profile__logout">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
