import { Link } from "react-router";
import { useGhosts } from "../context/Ghosts";
import CenterHorizontal from "../components/layout/CenterHorizontal";

export default function Settings() {
  const { settings, setSettings } = useGhosts();

  return (
    <CenterHorizontal>
      <div>
        <h1>Settings</h1>
        <div className="form-group">
          <label>
            Ghost Mood
            <select
              id="mood"
              value={settings.predictionDepth}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  predictionDepth: Number(e.target.value),
                })
              }
            >
              <option value="3">Articulate</option>
              <option value="2">Intelligible</option>
              <option value="1">Experimental</option>
              <option value="0">Inebriated</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Prediction Length
            <input
              type="number"
              value={settings.predictionLength}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  predictionLength: Number(e.target.value),
                })
              }
            />
          </label>
        </div>
        <div>
          <Link to="/">Done</Link>
        </div>
      </div>
    </CenterHorizontal>
  );
}
