import React from 'react';
import styled from 'styled-components';

export default function CardSlider({ data, title }) {
  return (
    <Container>
      <h2>{title}</h2>
      <div className="slider">
        {data.map((movie, index) => (
          <div className="card" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt={movie.name} />
            <div className="info">
              <h3>{movie.name}</h3>
              <p>{movie.genres.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    margin-left: 1rem;
    color: white;
  }

  .slider {
    display: flex;
    overflow-x: auto;
    padding: 1rem;
    gap: 1rem;
  }

  .card {
    min-width: 200px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #444;
    color: white;

    img {
      width: 100%;
      object-fit: cover;
    }

    .info {
      padding: 1rem;
      
      h3 {
        margin: 0 0 0.5rem 0;
      }
      
      p {
        margin: 0;
        font-size: 0.9rem;
        color: #bbb;
      }
    }
  }
`;
