import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import MovieModal from '../components/MovieModal';
import { requests } from '../services/api';

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300 pb-16">
      <Navbar />
      <Banner />
      
      {/* Rows */}
      <div className="-mt-32 md:-mt-48 relative z-20">
        <Row 
          title="Trending Now" 
          fetchUrl={requests.fetchTrending} 
          isLargeRow 
          onMovieClick={handleMovieClick} 
        />
        <Row 
          title="Top Rated" 
          fetchUrl={requests.fetchTopRated} 
          onMovieClick={handleMovieClick} 
        />
        <Row 
          title="Action Movies" 
          fetchUrl={requests.fetchActionMovies} 
          onMovieClick={handleMovieClick} 
        />
        <Row 
          title="Comedy Movies" 
          fetchUrl={requests.fetchComedyMovies} 
          onMovieClick={handleMovieClick} 
        />
        <Row 
          title="Horror Movies" 
          fetchUrl={requests.fetchHorrorMovies} 
          onMovieClick={handleMovieClick} 
        />
        <Row 
          title="Romance Movies" 
          fetchUrl={requests.fetchRomanceMovies} 
          onMovieClick={handleMovieClick} 
        />
        <Row 
          title="Documentaries" 
          fetchUrl={requests.fetchDocumentaries} 
          onMovieClick={handleMovieClick} 
        />
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
