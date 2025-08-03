import { useNotification } from "../context/Notification";

function Home() {
  const { notify } = useNotification();
  return (
    <div>
      <button onClick={() => notify("Testing")}>Click Me</button>
    </div>
  );
}

export default Home;
