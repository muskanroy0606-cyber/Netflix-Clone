import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('netflix-theme') || 'dark';
  });

  // My List state
  const [myList, setMyList] = useState(() => {
    const localData = localStorage.getItem('netflix-my-list');
    return localData ? JSON.parse(localData) : [];
  });

  // Apply theme class to HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('netflix-theme', theme);
  }, [theme]);

  // Save list to local storage
  useEffect(() => {
    localStorage.setItem('netflix-my-list', JSON.stringify(myList));
  }, [myList]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addToMyList = (movie) => {
    setMyList(prev => {
      if (prev.find(item => item.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromMyList = (movieId) => {
    setMyList(prev => prev.filter(item => item.id !== movieId));
  };

  const isInMyList = (movieId) => {
    return myList.some(item => item.id === movieId);
  };

  return (
    <AppContext.Provider value={{ 
      theme, 
      toggleTheme, 
      myList, 
      addToMyList, 
      removeFromMyList,
      isInMyList
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
