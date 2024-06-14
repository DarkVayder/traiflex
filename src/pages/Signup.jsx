import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Utilities/Firebase'; 
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const { email, password } = formValues;
      console.log('Signing up with:', email, password); 
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful, navigating to home page'); 
      navigate("/"); 
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <Header Login={true} />
      <div className="body flex column a-center j-center">
        <div className="text flex column a-center">
          <h1>Unlimited Movies, TV shows and more</h1>
          <h4>Watch anywhere. Cancel anytime</h4>
          <h6>
            Ready to watch? Enter your email to create or restart your membership.
          </h6>
        </div>
        <div className="form">
          <div className="input-container">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && (
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
          )}
        </div>
        <div className="button-container flex column a-center j-center">
          <button onClick={handleSignUp} className="signup-button">
            Sign Up
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  .body {
    position: absolute;
    top: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text {
      gap: 1rem;
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      h4 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      h6 {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 400px;
      .input-container {
        display: flex;
        width: 100%;
        input {
          width: calc(100% - 120px);
          padding: 1rem;
          margin-right: 1rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
        }
        button {
          padding: 1rem;
          background-color: #e50914;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          &:hover {
            background-color: #f40612;
          }
        }
      }
      input[type="password"] {
        margin-top: 1rem;
        width: 100%;
        padding: 1rem;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
      }
    }
    .button-container {
      margin-top: 1rem;
      button {
        margin-bottom: 0.5rem;
      }
    }
    .signup-button {
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      color: white;
      cursor: pointer;
      border-radius: 0.2rem;
      font-size: 1.2rem;
      &:hover {
        background-color: #f40612;
      }
    }
  }
`;
