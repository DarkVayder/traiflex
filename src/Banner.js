import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './request';

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
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
          <h1>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Banner;