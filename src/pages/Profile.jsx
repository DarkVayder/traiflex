import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/Avatar.png';
import { auth } from '../Utilities/Firebase';
import profilebackground from "../assets/ProfileBackground.jpg";
import logo from "../assets/Netflix logo.png";

const Profile = () => {
  const [userEmail, setUserEmail] = useState('User Email');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate('/login'); // Navigate to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Container>
      <div className='logo'>
        <img onClick={() => navigate('/')} src={logo} alt="Netflix Logo" />
      </div>
      <div className="profile_body">
        <h1>My Profile</h1>
        <div className="profile_details">
          <img src={avatar} alt="Avatar" />
          <div className="profile_info">
            <h2>{userEmail}</h2>
            <div className="profile_sub">
              <h3>Premium</h3>
              <button onClick={handleSignOut} className="profile_logout">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${profilebackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  .logo {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .logo img {
    height: 4.5rem;
    cursor: pointer;
  }

  .profile_body {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 8%;
    max-width: 800px;
  }

  .profile_details {
    display: flex;
  }

  .profile_details > img {
    height: 100px;
  }

  .profile_body > h1 {
    font-size: 60px;
    font-weight: 400;
    border-bottom: 1px solid rgb(117, 7, 7);
    margin-bottom: 20px;
  }

  .profile_info > h2 {
    background-color: gray;
    padding: 15px;
    font-size: 15px;
    padding-left: 20px;
  }

  .profile_logout {
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 5%;
    width: 100%;
    color: white;
    background-color: rgb(117, 7, 7);
    cursor: pointer;
    border: none;
    font-weight: 600;
    &:hover {
      opacity: 0.5;
      background-color: rgba(109, 109, 110, 0.7);
    }
  }

  .profile_sub > h3 {
    border-bottom: 1px solid #282c2d;
    padding-bottom: 10px;
  }
`;

export default Profile;
