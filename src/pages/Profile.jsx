import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/Avatar.png';
import { auth } from '../Utilities/Firebase';
import profilebackground from '../assets/background_banner.jpg';
import logo from '../assets/logo.png';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('User Email');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate('/login');
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
      <Logo>
        <img onClick={() => navigate('/')} src={logo} alt="Netflix Logo" />
      </Logo>
      <ProfileBody>
        <Title>My Profile</Title>
        <ProfileDetails>
          <Avatar src={avatar} alt="Avatar" />
          <ProfileInfo>
            <Email>{userEmail}</Email>
            <Subscription>
              <SubscriptionType>Premium</SubscriptionType>
              <LogoutButton onClick={handleSignOut}>Log Out</LogoutButton>
            </Subscription>
          </ProfileInfo>
        </ProfileDetails>
      </ProfileBody>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${profilebackground}) center/cover no-repeat;
  padding: 20px 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media (max-width: 768px) {
    padding: 10px 5%;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;

  img {
    height: 4.5rem;
    cursor: pointer;

    @media (max-width: 768px) {
      height: 3rem;
    }
  }
`;

const ProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 8%;

  @media (max-width: 768px) {
    width: 90%;
    padding-top: 20%;
  }

  @media (max-width: 480px) {
    padding-top: 30%;
  }
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 400;
  border-bottom: 1px solid rgb(117, 7, 7);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

const ProfileDetails = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Avatar = styled.img`
  height: 100px;

  @media (max-width: 768px) {
    height: 80px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    height: 60px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    align-items: center;
  }
`;

const Email = styled.h2`
  background-color: gray;
  padding: 15px 20px;
  font-size: 15px;

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 14px;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

const Subscription = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
    align-items: center;
  }
`;

const SubscriptionType = styled.h3`
  border-bottom: 1px solid #282c2d;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    padding-bottom: 8px;
  }

  @media (max-width: 480px) {
    padding-bottom: 6px;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 5%;
  width: 100%;
  color: white;
  background-color: rgb(117, 7, 7);
  border: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: rgba(109, 109, 110, 0.7);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

export default Profile;
