import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchMovies } from '../services/api';
import MovieCard from './MovieCard';
import { SkeletonRow } from './Skeleton';

const Row = ({ title, fetchUrl, isLargeRow, onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchMovies(fetchUrl);
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies for row", title, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchUrl, title]);

  const handleClick = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <SkeletonRow />;
  
  if (movies.length === 0) return null;

  return (
    <div 
      className="pl-4 md:pl-12 mt-8 z-10 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-[var(--text-primary)] font-bold md:text-xl text-lg mb-4">{title}</h2>
      
      <div className="relative group">
        <ChevronLeft 
          className={`absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-10 md:w-12 cursor-pointer bg-black/50 text-white transition-opacity duration-300 hover:scale-110 
            ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}
          onClick={() => handleClick('left')}
        />

        <div 
          ref={rowRef}
          className="flex items-center gap-3 md:gap-4 overflow-x-scroll hide-scroll-bar snap-x snap-mandatory pt-2 pb-6 pr-12"
        >
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isLargeRow={isLargeRow} 
              onClick={onMovieClick}
            />
          ))}
        </div>

        <ChevronRight 
          className={`absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-10 md:w-12 cursor-pointer bg-black/50 text-white transition-opacity duration-300 hover:scale-110 
            ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

export default Row;
