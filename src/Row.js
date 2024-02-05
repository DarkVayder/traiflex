import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from 'react-youtube';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className={`row__posters ${isLargeRow && "row__posterLarge"}`}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <YouTube videoId={trailerUrl} opts={opts} />
    </div>
  );
}

export default Row;
