import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, Check } from 'lucide-react';
import YouTube from 'react-youtube';
import { useApp } from '../context/AppContext';

const MovieModal = ({ movie, onClose }) => {
  const { isInMyList, addToMyList, removeFromMyList } = useApp();

  if (!movie) return null;

  const inList = isInMyList(movie.id);

  const handleListSelect = (e) => {
    e.stopPropagation();
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-[var(--bg-secondary)] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden my-8 mt-24 sm:mt-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black text-white rounded-full transition"
          >
            <X size={24} />
          </button>

          {/* Header Video/Image */}
          <div className="relative w-full aspect-video bg-black">
            {movie.trailer_id ? (
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <YouTube 
                  videoId={movie.trailer_id} 
                  opts={opts} 
                  className="w-full h-full"
                  iframeClassName="w-full h-full object-cover"
                />
              </div>
            ) : (
              <img 
                src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ''} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            )}
            {/* Gradient to blend with content */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none"></div>
            
            {/* Action Buttons Overlay */}
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition">
                <Play fill="black" size={20} />
                Play
              </button>
              <button 
                onClick={handleListSelect}
                className="p-2 border-2 border-white/50 text-white rounded-full hover:border-white hover:bg-white/10 transition"
              >
                {inList ? <Check size={24} /> : <Plus size={24} />}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              {movie.title || movie.name || movie.original_name}
            </h2>
            
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="text-green-500">98% Match</span>
              <span className="text-[var(--text-primary)] text-opacity-80">
                {movie.release_date ? movie.release_date.substring(0, 4) : '2024'}
              </span>
              <span className="border border-gray-500 px-1 rounded text-gray-400">HD</span>
            </div>

            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mt-4">
              {movie.overview || "No description available for this title."}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieModal;
