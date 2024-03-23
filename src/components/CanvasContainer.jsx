import React from "react";
import { Canvas } from "@react-three/fiber";

function CanvasContainer({ children }) {
  return (
    <div className="Scene h-screen">
      <Canvas
        shadows="soft"
        camera={{
          position: [0, 0, 10],
          rotation: [0, 0, 0],
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}

export default CanvasContainer;
