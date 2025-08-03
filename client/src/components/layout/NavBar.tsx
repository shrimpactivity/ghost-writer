import { Link } from "react-router";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Link className="nav-item" to="/search">
        Find Ghosts
      </Link>
      <Link className="nav-item" to="/settings">
        Settings
      </Link>
      <a
        className="nav-item"
        href="https://github.com/shrimpactivity/ghost-writer"
        target="_blank"
      >
        GitHub
      </a>
    </nav>
  );
}
