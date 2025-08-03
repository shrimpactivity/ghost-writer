import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to="/search">Search for Ghosts</Link>
      <Link to="/settings">Settings</Link>
      <a href="https://github.com/shrimpactivity/ghost-writer" target="_blank">GitHub</a>
    </nav>
  )
}