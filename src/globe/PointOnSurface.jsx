import React, { useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { SphereGeometry, MeshBasicMaterial, Mesh, Vector3 } from "three";

import { latLongToVector3 } from "../helpers";

export const cities = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Toronto", lat: 43.65107, lon: -79.347015 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
  { name: "Moscow", lat: 55.7558, lon: 37.6173 },
];

const PointOnSurface = ({ lat, lon, name }) => {
  const meshRef = useRef(
    new Mesh(new SphereGeometry(0.07, 16, 16), new MeshBasicMaterial())
  );
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const position = latLongToVector3(lat, lon);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <primitive
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
          {name}
        </Text>
      )}
    </primitive>
  );
};

export default PointOnSurface;
