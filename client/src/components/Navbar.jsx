import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  Menu,
  X,
  LogOut,
  User,
  Home,
  Search,
  FileText,
  Gamepad2,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { path: "/scan", icon: <Search className="h-5 w-5" />, label: "Scan" },
    { path: "/reports", icon: <FileText className="h-5 w-5" />, label: "Reports" },
    { path: "/game", icon: <Gamepad2 className="h-5 w-5" />, label: "Game" },
    { path: "/emergency", icon: <AlertTriangle className="h-5 w-5" />, label: "Emergency" },
    { path: "/education", icon: <BookOpen className="h-5 w-5" />, label: "Education" },
    { path: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
  ];

  const userAvatar =
    user?.avatar ||
    `https://placehold.co/40x40/E2E8F0/4A5568?text=${user?.name?.[0] || "U"}`;

  return (
    <nav className="fixed top-4 left-1/2  transform -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-[80%] rounded-full bg-[#031a2a]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-cyan-400" />
          <span className="text-lg font-semibold text-white">Fraud Shield</span>
        </Link>

       {/* Desktop Nav Icons */}
<div className="hidden md:flex items-center space-x-6">
  {navItems.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      className={`flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 ${
        isActive(item.path)
          ? "bg-[#0b2e45] text-cyan-400"
          : "text-gray-300 hover:text-cyan-300 hover:bg-[#0b2e45]"
      }`}
    >
      <div className="mb-1">{item.icon}</div>
      <span className="text-xs font-medium">{item.label}</span>
    </Link>
  ))}
</div>


        {/* User / Login */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <img
                src={userAvatar}
                alt={user.name}
                className="h-8 w-8 rounded-full border border-cyan-400 shadow-[0_0_10px_#00ffff]"
              />
              <button
                onClick={logout}
                className="flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-gray-200 hover:text-red-400 hover:bg-red-900/20 transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-5 py-1.5 rounded-full text-sm font-medium text-white border border-transparent bg-transparent transition-all duration-300 hover:shadow-[0_0_12px_#00ffff]"
              style={{
                background:
                  "linear-gradient(#021727, #021727) padding-box, linear-gradient(90deg, #00ffff, #a855f7, #ff7ae9) border-box",
                border: "2px solid transparent",
              }}
            >
              <User className="h-4 w-4 mr-1" />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-200 hover:text-cyan-400 transition-all duration-300"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#031a2a]/90 border-t border-cyan-400/10 backdrop-blur-lg rounded-b-3xl"
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-cyan-900/30 text-cyan-400"
                    : "text-gray-200 hover:text-cyan-300 hover:bg-cyan-800/20"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            {user ? (
              <div className="border-t border-cyan-800/30 pt-3 mt-3">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <img
                    src={userAvatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border border-cyan-400"
                  />
                  <span className="text-sm text-gray-200">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-lg text-base font-medium text-red-400 hover:bg-red-900/20 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center px-4 py-2 mt-2 rounded-full text-base font-medium text-white transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(#021727, #021727) padding-box, linear-gradient(90deg, #00ffff, #a855f7, #ff7ae9) border-box",
                  border: "2px solid transparent",
                }}
              >
                <User className="h-4 w-4 mr-2" />
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
