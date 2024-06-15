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
      dispatch(fetchMovies({ type: 'movies' }));
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
      <div className='nav'>
        <Nav isScrolled={isScrolled} />
      </div>
      <div className='genre-selector'>
        <SelectGenre genres={genres} />
      </div>
      <div className='data'>
        {
          movies.length ? <Slider movies={movies} /> : <NotAvailable />
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  .nav {
    position: fixed;
    width: 100%;
    z-index: 10;
  }
  .genre-selector {
    margin-top: 5rem;
    display: flex;
    justify-content: left;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .data {
    margin-top: 2rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
