import React from 'react';
import styled from 'styled-components';
import Card from './Card';

export default function CardSlider({ data, title }) {
  return (
    <Container>
      <h2>{title}</h2>
      <div className="slider">
        {data.map((movie, index) => (
          <Card movieData={movie} key={movie.id} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 2rem 0;
  h2 {
    color: white;
    margin-bottom: 1rem;
  }
  .slider {
    display: flex;
    overflow-x: scroll;
    padding: 1rem;
    gap: 1rem;
  }
`;
