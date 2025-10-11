import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/scan', label: 'Scan' },
    { path: '/reports', label: 'Reports' },
    { path: '/game', label: 'Game' },
    { path: '/emergency', label: 'Emergency' },
    { path: '/education', label: 'Education' },
    { path: '/profile', label: 'Profile' },
  ];

  const userAvatar =
    user?.avatar ||
    `https://placehold.co/40x40/E2E8F0/4A5568?text=${user?.name?.[0] || 'U'}`;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0a1124] via-[#0c1b33] to-[#081122] shadow-[0_0_15px_rgba(0,255,255,0.2)] border-b border-cyan-900/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-7 w-7 text-cyan-400 drop-shadow-[0_0_6px_#00ffff]" />
            <span className="text-lg font-semibold text-white">
              Fraud <span className="text-cyan-400">Shield</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-300'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className={`absolute inset-0 rounded-md bg-cyan-400/10 opacity-0 transition-opacity duration-300 ${
                    isActive(item.path) ? 'opacity-10' : 'hover:opacity-10'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* User/Login Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={userAvatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border border-cyan-500/40"
                  />
                  <span className="text-sm text-cyan-100">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="relative flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-border before:absolute before:inset-0 before:rounded-full before:p-[2px] before:bg-gradient-to-r before:from-cyan-400 before:to-pink-500 before:-z-10 hover:shadow-[0_0_15px_#00e0ff] transition-all duration-300"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0d152b] border-t border-cyan-900/40"
        >
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all ${
                  isActive(item.path)
                    ? 'text-cyan-400 bg-cyan-900/20'
                    : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-800/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="border-t border-cyan-900/40 pt-4 mt-3">
                <div className="flex items-center space-x-3 px-3">
                  <img
                    src={userAvatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border border-cyan-500/40"
                  />
                  <span className="text-cyan-100">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="mt-3 flex items-center px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block mt-3 text-center px-3 py-2 rounded-full font-medium text-white border-2 border-transparent bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-[0_0_15px_#00e0ff] transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
