import { Link } from "react-router";
import { useGhosts } from "../context/Ghosts";
import CenterHorizontal from "../components/layout/CenterHorizontal";
import "./Settings.css";

export default function Settings() {
  const { settings, setSettings } = useGhosts();

  if (settings.predictionLength > 1000)
    setSettings({ ...settings, predictionLength: 1000 });

  return (
    <CenterHorizontal>
      <div>
        <div className="form-group">
          <label>
            Ghost Mood <span className="detail">(prediction search depth)</span>
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
              <option value="3">Articulate (3)</option>
              <option value="2">Intelligible (2)</option>
              <option value="1">Experimental (1)</option>
              <option value="0">Inebriated (0)</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Prediction Length
            <input
              type="number"
              min="1"
              max="1000"
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
        <div className="form-group">
          <label>
            Weighted Predictions{" "}
            <span className="detail">
              (if true, selects prediction with highest probability)
            </span>
            <input
              type="checkbox"
              checked={settings.weighted}
              onChange={(e) =>
                setSettings({ ...settings, weighted: e.target.checked })
              }
            />
          </label>
        </div>
        <div>
          <Link to="/" className="done-btn">Done</Link>
        </div>
      </div>
    </CenterHorizontal>
  );
}
