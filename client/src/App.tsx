import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Search from './pages/Search'
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="search" element={<Search />} />s
    </Routes>
  )
}

export default App
