import React from 'react';
import './App.css';
import Row from './Row';
import requests from './request';
function App() {

  return (
    <div className="App">
      
    <h1>Netflix</h1>
    <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} />
    <Row title="TRENDING MOVIES" fetchUrl={requests.fetchTrending} />

    </div>
  );
}

export default App;
