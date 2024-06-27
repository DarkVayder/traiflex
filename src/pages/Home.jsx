import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import backgroundImage from "../assets/hero_banner.jpg";
import Movielogo from "../assets/hero_title.png";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../Utilities/store';
import Slider from "../components/Slider";
import Footer from "../components/Footer";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]); 

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: 'all' }));
    }
  }, [genresLoaded, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <div className="app">
        <Nav isScrolled={isScrolled} />
        <div className="hero">
          <img src={backgroundImage} alt="background" className="background-image" />
          <div className="container">
            <div className="logo">
              <img src={Movielogo} alt="Movie Logo" />
            </div>
            <div className="buttons flex">
              <button className="play flex j-center a-center" onClick={() => navigate("/player")}>
                <FaPlay className="icon" /> <hi>Play Trailer </hi>
              </button>
              <button className="info flex j-center a-center">
                <AiOutlineInfoCircle className="icon" /> More Info
              </button>
            </div>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;

    .background-image {
      filter: brightness(60%);
      height: 100vh;
      width: 100vw;
      object-fit: cover;
    }

    .container {
      position: absolute;
      bottom: 5rem;
      left: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .logo {
      img {
        width: 100%;
        max-width: 40rem;
        margin-bottom: 2rem;
      }
    }

    .buttons {
      display: flex;
      gap: 1rem;

      button {
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 2.4rem;
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.5rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;

        .h1 {
          color: black;
        }

        &:hover {
          opacity: 0.8;
        }

        &.play {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
          display: block;

          &:hover {
            background-color: rgba(109, 109, 110, 0.7);
          }

          .icon {
            margin-right: 0.5rem;
          }
        }

        &.info {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;

          &:hover {
            background-color: rgba(109, 109, 110, 0.5);
          }

          .icon {
            font-size: 1.4rem;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .hero {
      .container {
        bottom: 3rem;
        left: 1rem;
      }

      .buttons {
        button {
          font-size: 1rem;
          padding: 0.4rem;
          padding-left: 1.5rem;
          padding-right: 1.8rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .hero {
      .background-image {
        height: 50vh;
      }

      .container {
        bottom: 2rem;
        left: 1rem;
      }

      .logo {
        img {
          max-width: 20rem;
        }
      }

      .buttons {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        button {
          font-size: 0.9rem;
          padding: 0.3rem;
          padding-left: 1rem;
          padding-right: 1.2rem;
        }
      }
    }
  }
`;
