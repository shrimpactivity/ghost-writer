import { useNotification } from "../context/Notification";

function Home() {
  const { notification, notify } = useNotification();
  return (
    <div>
      <h1>{notification}</h1>
      <button onClick={() => notify("Testing")}>Click Me</button>
    </div>
  );
}

export default Home;
