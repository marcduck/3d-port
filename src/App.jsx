import { useState } from "react";
import "./App.css";
// import DefaultScene from "./scene/DefaultScene";
import GlobeScene from "./globe/GlobeScene";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { FadeEffect } from "./globe/FadeEffect";
import { NewScene } from "./globe/NewScene";
import { cities } from "./helpers";

function App() {
  const [count, setCount] = useState(0);
  const [scene, setScene] = useState("globe"); // 'globe' or 'Toronto'
  const [modelPath, setModelPath] = useState("");
  return (
    <div className="App h-screen">
      <Canvas
        shadows="soft"
        camera={
          scene === "globe"
            ? {
                position: [0, 0, 10],
                rotation: [0, 0, 0],
              }
            : {
                position: cities.toronto.cameraPosition,
                rotation: cities.toronto.cameraRotation,
              }
        }
      >
        {scene === "globe" ? (
          <GlobeScene setScene={setScene} setModelPath={setModelPath} />
        ) : (
          scene === "Toronto" && (
            <NewScene
              modelPath={modelPath}
              cameraPosition={cities.toronto.cameraPosition}
              cameraRotation={cities.toronto.cameraRotation}
            />
          )
        )}
        <Stats showPanel={0} className="stats" />
      </Canvas>
    </div>
  );
}

export default App;
