import React from 'react';

export const SkeletonRow = () => {
  return (
    <div className="pl-4 md:pl-12 mt-8 w-full animate-pulse">
      <div className="w-48 h-6 bg-[var(--bg-secondary)] rounded mb-4"></div>
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="w-[160px] h-[90px] sm:w-[240px] sm:h-[135px] flex-none bg-[var(--bg-secondary)] rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonBanner = () => {
  return (
    <div className="w-full h-[60vh] sm:h-[80vh] bg-[var(--bg-secondary)] animate-pulse relative">
      <div className="absolute bottom-[20%] left-4 md:left-12 flex flex-col space-y-4 w-1/2">
        <div className="w-3/4 h-12 bg-gray-500 rounded"></div>
        <div className="w-full h-4 bg-gray-600 rounded"></div>
        <div className="w-5/6 h-4 bg-gray-600 rounded"></div>
        <div className="flex space-x-3 pt-4">
          <div className="w-24 h-10 bg-gray-500 rounded"></div>
          <div className="w-32 h-10 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};
