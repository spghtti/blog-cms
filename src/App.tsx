import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { useNavigate } from 'react-router-dom';
import { Logout } from './pages/Logout';
import { BlogLayout } from './pages/BlogLayout';

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
    navigate('/login');
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login loginAccount={loginAccount} />} />
      <Route path="posts">
        <Route index={true} element={<AllPosts />} />
        <Route path=":id" element={<BlogLayout />} />
      </Route>
      <Route
        path="/logout"
        element={<Logout logoutAccount={logoutAccount} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
