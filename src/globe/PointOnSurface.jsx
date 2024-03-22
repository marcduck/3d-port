import React, { useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { SphereGeometry, MeshBasicMaterial, Mesh, Vector3 } from "three";

// Convert geographic coordinates (latitude and longitude) to a 3D vector
const latLongToVector3 = (lat, lon, earthRadius = 4) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new Vector3(
    -(earthRadius * Math.sin(phi) * Math.cos(theta)),
    earthRadius * Math.cos(phi),
    earthRadius * Math.sin(phi) * Math.sin(theta)
  );
};

const PointOnSurface = ({ lat, lon, name }) => {
  const meshRef = useRef(
    new Mesh(new SphereGeometry(0.05, 16, 16), new MeshBasicMaterial())
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
