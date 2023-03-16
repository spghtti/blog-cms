import { NavLink } from 'react-router-dom';
import { checkLogin } from '../checkLogin';

export const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/home">Write a post</NavLink>
        <NavLink to="/posts">All posts</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {checkLogin() ? (
          <NavLink to="/logout">Logout</NavLink>
        ) : (
          <NavLink to="/">Login</NavLink>
        )}
      </nav>
    </header>
  );
};
