import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import "./App.css";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
