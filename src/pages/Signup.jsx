import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Utilities/Firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadingGif from '../assets/loading.gif';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Sign up successful!');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <img src={loadingGif} alt="Loading" />
        </LoadingContainer>
      ) : (
        <Container>
          <BackgroundImage />
          <Header Login={true} />
          <div className="body flex column a-center j-center">
            <div className="text flex column a-center">
              <h1>Explore Unlimited Trailers</h1>
              <h4>Discover the latest trailers for movies and TV shows.</h4>
              <h6>
                Ready to dive in? Enter your email and click the get-start button.
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
                  <button onClick={() => setShowPassword(true)}>
                    Get Started
                  </button>
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
      )}
    </>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;

  .body {
    position: absolute;
    top: 10%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;

    .text {
      gap: 1rem;
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color:  #f40612;
      }
      h4 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color:  #f5f5dc;
      }
      h6 {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        color:  #f5f5dc;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 400px;
      margin-top: 240px;

      .input-container {
        display: flex;
        width: 100%;
        input {
          flex: 1;
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
            background-color:rgb(114, 10, 15);
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
        background-color: rgb(114, 10, 15);
      }
    }
  }

  @media (max-width: 768px) {
    .body {
      padding: 0 10px;

      .text {
        h1 {
          font-size: 2rem;
        }
        h4 {
          font-size: 1.2rem;
        }
        h6 {
          font-size: 1rem;
        }
      }
      .form {
        .input-container {
          flex-direction: column;
          input {
            margin-bottom: 0.5rem;
          }
          button {
            width: 100%;
          }
        }
        input[type="password"] {
          padding: 0.8rem;
        }
      }
      .button-container {
        .signup-button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .body {
      padding: 0 5px;

      .text {
        h1 {
          font-size: 1.5rem;
        }
        h4 {
          font-size: 1rem;
        }
        h6 {
          font-size: 0.8rem;
        }
      }
      .form {
        .input-container {
          input {
            padding: 0.8rem;
          }
          button {
            padding: 0.8rem;
            font-size: 1rem;
          }
        }
        input[type="password"] {
          padding: 0.8rem;
        }
      }
      .button-container {
        .signup-button {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
      }
    }
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
`;
