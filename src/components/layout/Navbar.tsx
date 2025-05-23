import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BellRing as RingIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700/50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <RingIcon className="w-6 h-6 text-primary-500" />
          <span className="text-xl font-bold text-white">Altewear</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/shop" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
            Shop
          </Link>
          <Link to="/setup" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
            Activate Ring
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                Dashboard
              </Link>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleLogout}
                className="bg-dark-700 text-white hover:bg-dark-600 border-dark-600"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                Log In
              </Link>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate('/signup')}
                className="bg-primary-500 hover:bg-primary-600"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 md:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-dark-800 md:hidden z-50 border-l border-dark-700"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-dark-700">
                  <span className="text-lg font-semibold text-white">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                  <div className="flex flex-col space-y-1 px-2">
                    <Link 
                      to="/shop" 
                      className="text-gray-300 hover:text-white hover:bg-dark-700 px-3 py-2 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Shop
                    </Link>
                    <Link 
                      to="/setup" 
                      className="text-gray-300 hover:text-white hover:bg-dark-700 px-3 py-2 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Activate Ring
                    </Link>
                    
                    {isAuthenticated ? (
                      <>
                        <Link 
                          to="/dashboard" 
                          className="text-gray-300 hover:text-white hover:bg-dark-700 px-3 py-2 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="text-left text-gray-300 hover:text-white hover:bg-dark-700 px-3 py-2 rounded-lg transition-colors"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          className="text-gray-300 hover:text-white hover:bg-dark-700 px-3 py-2 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Log In
                        </Link>
                        <Link 
                          to="/signup" 
                          className="text-gray-300 hover:text-white hover:bg-dark-700 px-3 py-2 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;