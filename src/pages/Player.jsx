import React from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoId = location.state?.videoId;

  if (!videoId) {
    return <ErrorContainer>No video ID found. Please try again.</ErrorContainer>;
  }

  return (
    <Container>
      <PlayerWrapper>
        <BackButton onClick={() => navigate(-1)} aria-label="Go back">
          <BsArrowLeft />
        </BackButton>
        <VideoWrapper>
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </VideoWrapper>
      </PlayerWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
`;

const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 2rem;

  @media (max-width: 768px) {
    top: 0.5rem;
    left: 0.5rem;
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    top: 0.25rem;
    left: 0.25rem;
    font-size: 1rem;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  background-color: black;
  font-size: 1.5rem;
`;
