import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <Container className="flex a-center j-between">
      <div className='logo'>
        <img src={logo} alt="Netflix Logo" />
      </div>
      <button onClick={() => navigate(props.Login ? "/login" : "/signup")}>
        {props.Login ? "Log In" : "Sign In"}
      </button>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 4rem;
  background-color: inherit; 

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo img {
    height: 1.5rem;
  }

  button {
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
`;
