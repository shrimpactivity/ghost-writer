import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/">

      <img src={logo} height="60px" alt="Goober the Ghost"/>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/compose"
      >
        Compose
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
        GitHub
      </a>
    </nav>
  );
}
