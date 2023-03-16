import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { useNavigate } from 'react-router-dom';
import { Logout } from './pages/Logout';

import './App.css';
import { AllPosts } from './pages/AllPosts';

function App() {
  const navigate = useNavigate();

  function loginAccount(jwt: string) {
    localStorage.setItem('token', jwt);
    localStorage.setItem('isLoggedIn', 'true');
  }

  function logoutAccount() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<Login loginAccount={loginAccount} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/posts" element={<AllPosts />} />
      <Route
        path="/logout"
        element={<Logout logoutAccount={logoutAccount} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
