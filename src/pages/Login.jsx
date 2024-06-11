import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Utilities/Firebase'; 
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Sign In</h3>
            </div>
            <div className="container flex column">
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
            </div>
            <button onClick={handleLogIn}>Log In</button>
            <div className="extras flex a-center j-between">
              <div className="remember-me flex a-center">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="need-help">
                <a href=" ">Need help?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-rows: 15vh 85vh;
    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      height: 85vh;
      .form {
        gap: 2rem;
        padding: 3rem;
        color: white;
        width: 100%;
        max-width: 450px;
        background-color: rgba(0, 0, 0, 0.75);
        border-radius: 8px;
        .title {
          margin-bottom: 1rem;
          h3 {
            color: #fff;
            font-size: 2rem;
            font-weight: 500;
          }
        }
        .container {
          display: flex;
          flex-direction: column;
          width: 100%;
          input {
            width: 100%;
            padding: 1rem;
            margin-bottom: 1.5rem;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            background-color: #333;
            color: #fff;
          }
        }
        button {
          width: 100%;
          padding: 1rem;
          background-color: #e50914;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1.2rem;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 1.5rem;
          &:hover {
            background-color: #f40612;
          }
        }
        .extras {
          display: flex;
          justify-content: space-between;
          width: 100%;
          color: #b3b3b3;
          font-size: 0.9rem;
          .remember-me {
            display: flex;
            align-items: center;
            input {
              margin-right: 0.5rem;
            }
            label {
              cursor: pointer;
            }
          }
          .need-help {
            a {
              color: #b3b3b3;
              text-decoration: none;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
`;