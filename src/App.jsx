import { useState } from "react";
import "./App.css";
// import DefaultScene from "./scene/DefaultScene";
import GlobeScene from "./globe/GlobeScene";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App h-screen">
      <Canvas shadows="soft">
        <GlobeScene />
        <Stats showPanel={0} className="stats" />
      </Canvas>
    </div>
  );
}

export default App;
