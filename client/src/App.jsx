import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Emergency from './pages/Emergency.jsx';
import Login from './pages/Login.jsx';
import Game from './pages/Game.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Education from './pages/Education.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/game" element={<Game />} />
              <Route path="/profile" element={<UserProfile/>} />
              <Route path="/education" element={<Education/>} />
              <Route path="*" element={<div className="p-4">404 Not Found</div>} />
            </Routes>
          </main>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;