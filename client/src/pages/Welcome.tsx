import { Link } from "react-router";

export default function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <ul>
        <li>note about offensive language</li>
      </ul>
      <Link to="/">Start Writing</Link>
    </div>
  )
}