import { NavLink } from "react-router";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/search"
      >
        Find Ghosts
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/settings"
      >
        Settings
      </NavLink>
      <a
        className="nav-link"
        href="https://github.com/shrimpactivity/ghost-writer"
        target="_blank"
      >
        Code
      </a>
    </nav>
  );
}
