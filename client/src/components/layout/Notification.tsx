import { useNotification } from "../../context/Notification";
import CenterHorizontal from "./CenterHorizontal";
import "./Notification.css";

export default function Notification() {
  const { notification } = useNotification();

  return (
    <CenterHorizontal>
      <div className="notification">{notification}</div>
    </CenterHorizontal>
  );

  return null;
}
