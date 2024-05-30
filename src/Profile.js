import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Here is the user's profile information and subscription history.</p>
    </div>
  );
};

export default Profile;
