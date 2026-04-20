import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { fetchMovies, requests } from '../services/api';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // In a real app we'd call a search endpoint. 
        // Here we just fetch trending and filter locally for simulation.
        const { data } = await fetchMovies(requests.fetchTrending);
        if (query) {
          const filtered = data.results.filter(movie => {
            const title = movie.title || movie.name || movie.original_name;
            return title?.toLowerCase().includes(query.toLowerCase()) || 
                   movie.overview?.toLowerCase().includes(query.toLowerCase());
          });
          // Duplicate them a bit just to fill screen for demo if there's only 1 match
          setResults([...filtered, ...filtered.map(f => ({...f, id: f.id + 1000}))]);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Navbar />
      
      <div className="pt-28 px-4 md:px-12 pb-16">
        <h2 className="text-[var(--text-primary)] text-2xl font-bold mb-6">
          Search Results for "{query}"
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie, index) => (
              <MovieCard 
                key={`${movie.id}-${index}`} 
                movie={movie} 
                isLargeRow={false} 
                onClick={(movie) => setSelectedMovie(movie)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-[var(--text-secondary)] text-lg h-64 flex items-center justify-center">
            No movies found matching your query.
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default Search;
