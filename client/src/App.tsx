import { Route, Routes } from "react-router";
import Compose from "./pages/Compose";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import "./App.css";
import { AppProvider } from "./context/AppProvider";
import NavBar from "./components/layout/NavBar";
import Notification from "./components/layout/Notification";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <AppProvider>
      <NavBar />
      <Notification />
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="compose" element={<Compose />} />
        <Route path="search" element={<Search />} />
        <Route path="settings" element={<Settings />} />
        <Route path="welcome" element={<Welcome />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
