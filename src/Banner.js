import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './request';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Banner() {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchActionMovies);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error('Error fetching Netflix originals:', error);
      }
    }

    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str && str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  const opts = {
    height: '350',
    width: '100%',
    playerVars: {
      autoplay: 1,
      fullscreen: 1,
    },
  };

  const handleClick = () => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <header>
      <div
        className='banner'
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: 'center center',
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className='banner__buttons'>
            <button className='banner__button' onClick={handleClick}>
              {trailerUrl ? 'Stop Trailer' : 'Play Trailer'}
            </button>
            <button className='banner__button'>More Info</button>
          </div>

          <h1 className='banner__description'>{truncate(movie?.overview, 45)}</h1>
        </div>
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

      <div className='banner__fadeBottom' />
    </header>
  );
}

export default Banner;
