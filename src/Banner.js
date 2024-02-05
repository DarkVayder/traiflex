import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './request';

function Banner() {
  const [movie, setMovie] = useState({});

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
    return str && str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  
  
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
          <h1 className='banner__title'> {movie?.title || movie?.name || movie?.original_name}
          </h1>
          
            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>

            <h1 className='banner__description'>{movie?.overview}</h1>
            {truncate(movie?.overview, 150)}
        </div>
      </div>

        <div className= "banner__fadeBottom"/>


    </header>
  );
}

export default Banner;
