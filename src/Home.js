import React from 'react';
import './Home.css';
import Row from './Row';
import requests from './request';
import Banner from './Banner';
import './Banner.css';
import Nav from './Nav';
import Footer from './Footer';

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending right Now" fetchUrl={requests.fetchTrending} />
      <Row title="Today's top pick for you" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy TV" fetchUrl={requests.fetchComedyMovies} />
      <Row title="TV Horror" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romantic TV" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <Footer />
    </div>
  );
}

export default App;
