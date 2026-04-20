import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[var(--bg-primary)] shadow-md' : 'bg-transparent bg-gradient-to-b from-black/70 to-transparent'}`}>
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Left Side: Logo and Navigation Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-[var(--color-netflix-red)] text-2xl md:text-3xl font-extrabold tracking-wider z-10 font-sans">
            NETFLIX
          </Link>
          <ul className="hidden md:flex gap-5 text-sm">
            <li><Link to="/" className="hover:text-gray-300 transition-colors font-semibold">Home</Link></li>
            <li><Link to="/" className="hover:text-gray-300 transition-colors font-semibold">TV Shows</Link></li>
            <li><Link to="/" className="hover:text-gray-300 transition-colors font-semibold">Movies</Link></li>
            <li><Link to="/" className="hover:text-gray-300 transition-colors font-semibold">New & Popular</Link></li>
            <li><Link to="/mylist" className="hover:text-gray-300 transition-colors font-semibold">My List</Link></li>
          </ul>
        </div>

        {/* Right Side: Search, Bell, Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          <form 
            onSubmit={handleSearchSubmit} 
            className={`flex items-center transition-all duration-300 ease-in-out ${isSearchActive ? 'bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-1 rounded' : ''}`}
          >
            <button 
              type="button" 
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <Search size={22} color={isScrolled ? 'var(--text-primary)' : 'white'} />
            </button>
            <input 
              type="text" 
              placeholder="Titles, people, genres"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`transition-all duration-300 ease-in-out bg-transparent outline-none text-sm ${isSearchActive ? 'w-32 sm:w-48 xl:w-64 ml-2 opacity-100 text-[var(--text-primary)]' : 'w-0 opacity-0'}`}
              onBlur={() => !searchQuery && setIsSearchActive(false)}
            />
          </form>

          <Link to="/profile" className="flex items-center gap-2 group cursor-pointer relative">
            <div className="w-8 h-8 rounded bg-gray-500 overflow-hidden border border-transparent group-hover:border-white transition-all">
              {/* Simple avatar placeholder */}
              <User className="w-full h-full p-1 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
