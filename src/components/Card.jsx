import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { useDispatch } from "react-redux";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utilities/Firebase";
import movieTrailer from "movie-trailer";

const Card = ({ index, movieData, isLiked = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate('/login');
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isHovered) {
      movieTrailer(movieData.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setVideoId(urlParams.get("v"));
        })
        .catch((error) => console.error("Error fetching trailer:", error));
    }
  }, [isHovered, movieData.name]);

  const addToList = useCallback(async () => {
    try {
      await axios.post("http://localhost:3000/api/user/add", { email, data: movieData });
    } catch (err) {
      console.error(err);
    }
  }, [email, movieData]);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate('/player', { state: { videoId } })}
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() => navigate('/player', { state: { videoId } })}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate('/player', { state: { videoId } })}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate('/player', { state: { videoId } })}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck title="Remove from List" />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Card);

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;

  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.5s ease-in-out;

    .image-video-container {
      position: relative;
      height: 140px;

      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
    }

    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }

    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }

      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
          color: #b8b8b8;
        }
      }
    }

    .genres {
      ul {
        display: flex;
        gap: 1rem;

        li {
          padding-right: 0.7rem;

          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 180px;
    width: 180px;

    .hover {
      width: 16rem;

      .image-video-container {
        height: 120px;

        img {
          height: 120px;
        }
      }

      .info-container {
        padding: 0.8rem;
      }

      .icons {
        svg {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    max-width: 150px;
    width: 150px;

    .hover {
      width: 14rem;
      top: -15vh;

      .image-video-container {
        height: 100px;

        img {
          height: 100px;
        }
      }

      .info-container {
        padding: 0.5rem;
      }

      .icons {
        svg {
          font-size: 1.2rem;
        }
      }
    }
  }
`;
