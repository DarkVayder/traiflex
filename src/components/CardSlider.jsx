import React from 'react';
import styled from 'styled-components';
import Card from './Card'; 

export default function CardSlider({ data, title }) {
  return (
    <Container>
      <h2>{title}</h2>
      <div className="card-slider">
        {data.map((movie, index) => (
          <Card movieData={movie} index={index} key={movie.id} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  
`;
