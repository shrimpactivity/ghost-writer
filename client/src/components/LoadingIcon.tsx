import Icon from "../assets/loading.png"
import "./LoadingIcon.css";

interface LoadingIconProps {
  size?: string;
}

function LoadingIcon({ size }: LoadingIconProps) {
  size = size || "50px";
  return (
    <img className="loading-icon" src={Icon} width={size} height={size} />
  )
}

export default LoadingIcon