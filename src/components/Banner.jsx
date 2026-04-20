import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Info } from 'lucide-react';
import { fetchMovies, requests } from '../services/api';
import { useApp } from '../context/AppContext';
import { SkeletonBanner } from './Skeleton';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isInMyList, addToMyList, removeFromMyList } = useApp();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await fetchMovies(requests.fetchNetflixOriginals);
        // Set a random movie perfectly suitable for the banner
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];
        setMovie(randomMovie || data.results[0]);
      } catch (error) {
        console.error("Failed to fetch banner movie", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  };

  if (loading || !movie) return <SkeletonBanner />;

  const inList = isInMyList(movie?.id);

  const handleListSelect = () => {
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  return (
    <header 
      className="relative h-[70vh] sm:h-[85vh] text-[var(--text-primary)] object-contain"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: '100% 30%', 
        backgroundImage: `url("${movie?.backdrop_path || movie?.poster_path}")`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-[var(--bg-primary)] to-transparent via-black/40"></div>
      
      <div className="relative pt-[25vh] md:pt-[35vh] px-4 md:px-12 w-full h-full">
        <h1 className="text-4xl md:text-6xl font-extrabold pb-2 drop-shadow-lg text-white">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        
        <div className="flex gap-4 mb-4 pt-4">
          <button className="flex items-center gap-2 bg-white text-black font-semibold text-lg hover:bg-gray-200 px-6 md:px-8 py-2 md:py-3 rounded transition shadow-lg">
            <Play fill="black" size={24} />
            Play
          </button>
          <button 
            onClick={handleListSelect}
            className="flex items-center gap-2 bg-gray-500/70 text-white font-semibold text-lg hover:bg-gray-500/90 px-6 md:px-8 py-2 md:py-3 rounded transition shadow-lg backdrop-blur-sm"
          >
            {inList ? <Check size={24} /> : <Plus size={24} />}
            My List
          </button>
        </div>

        <h1 className="w-full md:w-[45rem] leading-snug pt-2 text-sm md:text-lg font-medium drop-shadow-md text-gray-200">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
    </header>
  );
};

export default Banner;
