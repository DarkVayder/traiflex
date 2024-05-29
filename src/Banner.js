import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './request';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import back from "./back.png";
import { useNavigate } from 'react-router-dom';

function Banner() {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setError('Error fetching Netflix originals. Please try again later.');
      }
    }

    fetchData();
  }, []);

  function truncate(str, n) {
    return str && str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      fs: 1,
    },
  };

  const handleClick = async () => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      setLoading(true);
      setError(null);
      try {
        const url = await movieTrailer(
          movie?.title || movie?.name || movie?.original_name || ''
        );
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      } catch (error) {
        console.log(error);
        setError('Error loading trailer. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
    const iframe = event.target.getIframe();
    const requestFullScreen =
      iframe.requestFullScreen ||
      iframe.mozRequestFullScreen ||
      iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
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
        <div className='banner__fadeBottom' />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {trailerUrl && (
        <div className='video-container'>
          <img src={back} alt='' onClick={()=>{navigate(-2)}} />
          <YouTube videoId={trailerUrl} opts={opts} onReady={onPlayerReady} />
        </div>
      )}
    </header>
  );
}

export default Banner;
