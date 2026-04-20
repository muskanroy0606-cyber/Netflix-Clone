import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';
import { LogOut, Sun, Moon, User } from 'lucide-react';

const Profile = () => {
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300 pb-16">
      <Navbar />
      
      <div className="pt-28 px-4 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-8 border-b border-[var(--border-color)] pb-4">
          Edit Profile
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded shrink-0 bg-gray-500 overflow-hidden flex items-center justify-center">
            <User size={64} className="text-white" />
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="bg-[var(--bg-secondary)] p-4 rounded text-[var(--text-primary)] font-medium">
              user@example.com
            </div>
            
            <div className="border-b border-[var(--border-color)] pb-6">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Settings</h3>
              
              <div className="flex items-center justify-between bg-[var(--bg-secondary)] p-4 rounded cursor-pointer" onClick={toggleTheme}>
                <span className="text-[var(--text-primary)] font-medium">Appearance</span>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--border-color)] rounded text-[var(--text-primary)] font-medium hover:opacity-80 transition">
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </button>
              </div>
            </div>

            <div>
              <button 
                onClick={() => alert("Logout simulated!")}
                className="flex items-center gap-2 bg-[var(--color-netflix-red)] text-white font-bold py-3 px-6 rounded hover:bg-[var(--color-netflix-red-hover)] transition w-full md:w-auto justify-center"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
