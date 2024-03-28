import "./App.css";

// App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Scene from "./scenes/Scene";
import Navbar from "./components/Navbar";
import { NewScene } from "./scenes/globe/NewScene";
import CastleScene from "./scenes/buildingFpsScene/CastleScene";
import { cities } from "./helpers";
import Forest from "./forest/Forest";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Scene />} />
        <Route path="/forest" element={<Forest />} />
        <Route
          path="/city/toronto"
          element={
            <NewScene
              modelPath={cities.toronto.modelPath}
              cameraPosition={cities.toronto.cameraPosition}
              cameraRotation={cities.toronto.cameraRotation}
            />
          }
        />
        <Route path="/city/tokyo" element={<CastleScene />} />
        {/* {Object.values(cities).map((city) => (
          <Route
            key={city.id}
            path={`/city/${city.id}`}
            element={
              <NewScene
                modelPath={city.modelPath}
                cameraPosition={city.cameraPosition}
                cameraRotation={city.cameraRotation}
              />
            }
          />
        ))} */}
      </Routes>
    </Router>
  );
}

export default App;
