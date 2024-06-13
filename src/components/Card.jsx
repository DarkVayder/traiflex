import React from 'react';
import styled from 'styled-components';

function Card({ movieDta, isLiked = false }) {
  if (!movieDta) {
    return null; 
  }

  const { image } = movieDta;

  return (
    <Container>
      {image ? (
        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt='Movie Poster' />
      ) : (
        <p>No image available</p>
      )}
    </Container>
  );
}


const Container = styled.div`

`;


export default Card;
