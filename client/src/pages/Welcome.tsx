import { Link } from "react-router";
import CenterHorizontal from "../components/layout/CenterHorizontal";

export default function Welcome() {
  return (
    <CenterHorizontal>
      <div style={{ maxWidth: "700px" }}>
        <CenterHorizontal>
          <h1>Welcome to GhostWriter</h1>
        </CenterHorizontal>
        <p style={{ fontSize: "0.8rem" }}>
          Text prediction from beyond the grave. Write with your favorite
          long-deceased (and therefore public domain) authors. Shakespeare,
          Dostoevsky, Austen, Homer, and more - summoned to collaborate on your
          next opus.
        </p>
        <p style={{ fontSize: "0.8rem" }}>
          <span style={{ color: "var(--tertiary)" }}>Content Warning:</span> The
          original texts from Project Gutenberg have not been modified or
          censored. Some of the words suggested by this app may be unsavory,
          offensive, or outdated: especially when removed from their original
          context.
        </p>
        <CenterHorizontal>
          <h1>How To</h1>
        </CenterHorizontal>
        <CenterHorizontal>
          <ul>
            <li>Begin typing</li>
            <li>Press the Tab key to accept the ghost's suggestion</li>
          </ul>
        </CenterHorizontal>
        <CenterHorizontal>
          <Link className="btn" to="/compose" style={{ marginTop: "1em" }}>
            Start Writing
          </Link>
        </CenterHorizontal>
      </div>
    </CenterHorizontal>
  );
}
