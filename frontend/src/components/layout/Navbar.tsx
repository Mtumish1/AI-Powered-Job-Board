import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Briefcase as BriefcaseBusiness, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <BriefcaseBusiness className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">NeoJobs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-300 hover:text-orange-400 transition-colors">Home</Link>
            <Link to="/browse" className="text-slate-300 hover:text-orange-400 transition-colors">Browse Jobs</Link>
            <Link to="/companies" className="text-slate-300 hover:text-orange-400 transition-colors">Companies</Link>
            <Link to="/about" className="text-slate-300 hover:text-orange-400 transition-colors">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-800 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-slate-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-300" />
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-slate-800 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-slate-300" />
            </button>
            <Link to="/login" className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition-colors">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-slate-200" /> : <Menu className="w-6 h-6 text-slate-200" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col">
              <Link to="/" className="py-3 text-slate-300 hover:text-orange-400 transition-colors">Home</Link>
              <Link to="/browse" className="py-3 text-slate-300 hover:text-orange-400 transition-colors">Browse Jobs</Link>
              <Link to="/companies" className="py-3 text-slate-300 hover:text-orange-400 transition-colors">Companies</Link>
              <Link to="/about" className="py-3 text-slate-300 hover:text-orange-400 transition-colors">About</Link>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
                <div className="flex gap-4">
                  <button 
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5 text-slate-300" />
                    ) : (
                      <Moon className="w-5 h-5 text-slate-300" />
                    )}
                  </button>
                  <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <Bell className="w-5 h-5 text-slate-300" />
                  </button>
                </div>
                <div className="flex gap-3">
                  <Link to="/login" className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition-colors">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;