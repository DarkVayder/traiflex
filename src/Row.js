import React, { useEffect, useState } from 'react';
import axios from 'axios';
import instance from './axios';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      //setMovies(request.data.results);
      //return request;
      console.log(request)
    }
    fetchData();
  }, [fetchUrl]);

  console.table(movies);



  return (
    <div className="row">
      <h2>{title}</h2>
      
      <div className="row__posters">

      {movies.map(movie => (
        
        <img src={`${base_url}${movie.poster_path}`} alt={movie.name} />
      
      ))}

      </div>

    </div>
  );
}

export default Row;