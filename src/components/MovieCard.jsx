import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MovieCard = ({ movie, isLargeRow, onClick }) => {
  const [imgError, setImgError] = useState(false);

  // Use backdrop or poster based on row type
  const baseUrl = ""; // Using full URLs in mock data. If using TMDB: "https://image.tmdb.org/t/p/w500"
  const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path;
  const imageUrl = imagePath ? `${baseUrl}${imagePath}` : null;

  if (!imageUrl || imgError) {
    // Return a placeholder or skip if no image
    return (
      <div 
        className={`bg-gray-800 rounded-md flex-none flex items-center justify-center text-center p-2 snap-center cursor-pointer transition-transform duration-300 hover:scale-105
          ${isLargeRow ? 'w-[160px] h-[240px] sm:w-[200px] sm:h-[300px]' : 'w-[160px] h-[90px] sm:w-[240px] sm:h-[135px]'}`}
        onClick={() => onClick(movie)}
      >
        <p className="text-xs text-gray-400 font-semibold">{movie.name || movie.title || movie.original_name}</p>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "tween", duration: 0.3 }}
      className={`relative rounded-md overflow-hidden flex-none snap-center cursor-pointer shadow-lg
        ${isLargeRow ? 'w-[160px] h-[240px] sm:w-[200px] sm:h-[300px]' : 'w-[160px] h-[90px] sm:w-[240px] sm:h-[135px]'}`}
      onClick={() => onClick(movie)}
    >
      <img
        src={imageUrl}
        alt={movie.name || movie.title}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover rounded-md"
        loading="lazy"
      />
      
      {/* Title Overlay on hover (Optional, common for Netflix horizontal rows) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-2 sm:p-4">
        <h3 className="text-white font-bold text-xs sm:text-sm drop-shadow-md">
          {movie.name || movie.title || movie.original_name}
        </h3>
      </div>
    </motion.div>
  );
};

export default MovieCard;
