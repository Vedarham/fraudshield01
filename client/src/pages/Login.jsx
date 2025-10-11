import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, loginWithGoogle } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021727] to-[#065b7c] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#E6F4FF] rounded-2xl shadow-2xl p-8"
        >
          
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 mx-auto mb-4 text-[#065b7c]" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-700">Sign in to protect yourself from scams</p>
          </div>

      
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-[#D4EBFF] border-2 border-[#A8D5FF] rounded-lg px-4 py-3 hover:bg-[#c8e4ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <Chrome className="h-5 w-5 text-[#065b7c]" />
            <span className="text-[#043b55] font-medium">Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#A8D5FF]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#E6F4FF] text-[#043b55]">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#043b55] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#065b7c]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-[#A8D5FF] rounded-lg bg-[#D4EBFF] text-gray-800 focus:ring-2 focus:ring-[#065b7c] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#043b55] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#065b7c]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-[#A8D5FF] rounded-lg bg-[#D4EBFF] text-gray-800 focus:ring-2 focus:ring-[#065b7c] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#065b7c] hover:text-[#043b55]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#065b7c] focus:ring-[#065b7c] border-[#A8D5FF] rounded bg-[#E6F4FF]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#043b55]">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-[#065b7c] hover:text-[#043b55] font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#021727] to-[#065b7c] text-white py-3 rounded-lg font-semibold hover:from-[#03213a] hover:to-[#0876a5] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#043b55]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#065b7c] hover:text-[#043b55] font-medium">
                Sign up
              </Link>
            </p>
          </div>

        
          <div className="mt-6 p-4 bg-[#D4EBFF] rounded-lg border border-[#A8D5FF]">
            <p className="text-sm text-[#043b55] font-medium mb-2">Demo Credentials:</p>
            <p className="text-sm text-[#065b7c]">
              Email: demo@fraudshield.com<br />
              Password: demo123
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
