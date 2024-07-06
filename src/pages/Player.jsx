import React from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoId = location.state?.videoId;

  return (
    <Container>
      <div className='player'>
        <div className="back" onClick={() => navigate(-1)}>
          <BsArrowLeft />
        </div>
        <div className="video">
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .back {
      position: absolute;
      top: 1rem;
      left: 1rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: white;
      font-size: 2rem;
      svg {
        margin-right: 0.5rem;
      }

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
    }

    .video {
      width: 100%;
      height: 100%;
      iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
