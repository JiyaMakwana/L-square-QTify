import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumPage from "./pages/AlbumPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/album/:id" element={<AlbumPage />} />
    </Routes>
  );
}

export default App;