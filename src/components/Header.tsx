import { NavLink } from 'react-router-dom';
import { checkLogin } from '../checkLogin';

export const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Write a post</NavLink>
        <NavLink to="/posts">All posts</NavLink>
        {checkLogin() ? (
          <NavLink to="/logout">Logout</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
};
