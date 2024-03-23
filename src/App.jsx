import "./App.css";

// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scene from "./scenes/Scene";
import Navbar from "./components/Navbar";
import Toronto from "./scenes/Toronto";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Scene />} />
        <Route path="/city/toronto" element={<Toronto />} />
      </Routes>
    </Router>
  );
}

export default App;
