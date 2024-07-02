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
import movieTrailer from "movie-trailer";

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

  const handlePlayTrailer = (movieName) => {
    movieTrailer(movieName)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");
        navigate("/player", { state: { videoId } });
      })
      .catch((error) => console.error("Error fetching trailer:", error));
  };

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
              <button className="play flex j-center a-center" onClick={() => handlePlayTrailer("The Protector")}>
                <FaPlay className="icon" /> <span>Play Trailer</span>
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
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5rem; 
        gap: 0.5rem; 
        border-radius: 0.6rem;
        padding: 0.4rem 1rem; 
        border: none;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          margin-right: 0.5rem;
        }

        &:hover {
          opacity: 0.8;
        }

        &.play {
          background-color: white;
          color: black;
          .icon {
            color: black;
          }

          &:hover {
            background-color: rgba(255, 255, 255, 0.8);
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
