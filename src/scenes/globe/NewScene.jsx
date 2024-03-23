import React from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasContainer from "../../components/CanvasContainer";

export function NewScene({ modelPath, cameraPosition, cameraRotation }) {
  // The useGLTF hook loads the model and returns the scene, among other things.
  // Destructure the scene from the returned object.
  const { scene } = useGLTF(modelPath);

  return (
    <CanvasContainer>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        // These props allow for resetting the camera to a specific position and rotation
        position={cameraPosition} // Expecting an array [x, y, z]
        rotation={cameraRotation} // Expecting an array [x, y, z] in radians
      />
      <ambientLight intensity={0.5} />{" "}
      {/* Adds soft light to the entire scene */}
      <directionalLight position={[10, 10, 5]} intensity={1} />{" "}
      {/* Adds a directional light for more defined shadows */}
      <primitive object={scene} dispose={null} />;
    </CanvasContainer>
  );
}

export function SceneFromGLTFModel({ modelPath }) {
  return (
    <React.Suspense fallback={null}>
      {" "}
      {/* Provide a fallback for loading state if needed */}
      <Model modelPath={modelPath} />
    </React.Suspense>
  );
}
