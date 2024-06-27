import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../Utilities/store";
import Nav from "../components/Nav";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import styled from "styled-components";
import SelectGenre from "../components/SelectGenre";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]); 

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: 'movie' }));
    }
  }, [genresLoaded, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <NavWrapper>
        <Nav isScrolled={isScrolled} />
      </NavWrapper>
      <GenreSelector>
        <SelectGenre genres={genres} type='movie' />
      </GenreSelector>
      <Content>
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: #141414;
  min-height: 100vh;
  color: #fff;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const NavWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 10;
`;

const GenreSelector = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: flex-start;
  padding: 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid #333;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    margin-top: 4rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin-top: 3rem;
  }
`;

const Content = styled.div`
  margin-top: 1rem;  /* Reduced space between genre selector and slider */
  padding: 2rem;

  .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;

    @media (max-width: 768px) {
      margin-top: 3rem;
    }

    @media (max-width: 480px) {
      margin-top: 2rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;
