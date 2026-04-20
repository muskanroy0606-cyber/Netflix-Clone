import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { useApp } from '../context/AppContext';

const MyList = () => {
  const { myList } = useApp();
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Navbar />
      
      <div className="pt-28 px-4 md:px-12 pb-16">
        <h2 className="text-[var(--text-primary)] text-3xl font-bold mb-8">
          My List
        </h2>

        {myList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {myList.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                isLargeRow={false} 
                onClick={(m) => setSelectedMovie(m)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-[var(--text-secondary)] text-lg h-64 flex items-center justify-center">
            You haven't added any movies to your list yet.
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default MyList;
