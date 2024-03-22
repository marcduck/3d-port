import React, { useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { SphereGeometry, MeshBasicMaterial, Mesh } from "three";

import { latLongToVector3 } from "../helpers";

const PointOnSurface = ({ city, setScene, setModelPath }) => {
  const meshRef = useRef(
    new Mesh(new SphereGeometry(0.07, 16, 16), new MeshBasicMaterial())
  );
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const position = latLongToVector3(city.lat, city.lon);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  const handleCityClick = () => {
    setScene(city.name); // Set the scene to the name of the city
    if (city.modelPath) {
      setModelPath(city.modelPath); // Set the model path if it exists for the city
    }
  };

  return (
    <primitive
      onClick={handleCityClick}
      object={meshRef.current}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        meshRef.current.material.color.set("#11ee11");
      }}
      onPointerOut={() => {
        setHovered(false);
        meshRef.current.material.color.set("white");
      }}
    >
      {hovered && (
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
          material-depthTest={false} // Disable depth testing for the text material
        >
          {city.name}
        </Text>
      )}
    </primitive>
  );
};

export default PointOnSurface;
