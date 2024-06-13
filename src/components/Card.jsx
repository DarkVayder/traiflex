import React from 'react';
import styled from 'styled-components';

function Card({ movieData, isLiked = false }) {
  if (!movieData) {
    return null; 
  }

  const { image, name, genres } = movieData;

  return (
    <Container>
      {image ? (
        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt='Movie Poster' />
      ) : (
        <p>No image available</p>
      )}
      <div className="info">
        <h3>{name}</h3>
        <p>{genres.join(', ')}</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background-color: #444;
  color: white;
  max-width: 200px;
  margin: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .info {
    padding: 0.5rem;

    h3 {
      margin: 0.5rem 0;
      font-size: 1rem;
    }

    p {
      margin: 0;
      font-size: 0.8rem;
      color: #bbb;
    }
  }
`;

export default Card;
