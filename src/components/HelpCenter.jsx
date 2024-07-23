import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function HelpCenter() {
  const navigate = useNavigate();

  return (
    <HelpCenterContainer>
      <HelpCenterTitle>
        How Can i be of Assistance?
      </HelpCenterTitle>
      <HelpCenterDescription>
        Top of the day to you
        <br />
        Thank you for Contacting help center!!
      </HelpCenterDescription>
      <ReturnButton onClick={() => navigate('/')}>
        Return to Traiflex
      </ReturnButton>
    </HelpCenterContainer>
  );
}

const HelpCenterContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
`;

const HelpCenterTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const HelpCenterDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const ReturnButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color:  #e50914;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color:  #f40612;
  }
`;
