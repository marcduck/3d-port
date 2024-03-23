import React, { useRef, useState, useTransition } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { SphereGeometry, MeshBasicMaterial, Mesh } from "three";
import { useNavigate } from "react-router-dom";

import { latLongToVector3 } from "../../helpers";

const PointOnSurface = ({ city }) => {
  const meshRef = useRef(
    new Mesh(new SphereGeometry(0.07, 16, 16), new MeshBasicMaterial())
  );
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const position = latLongToVector3(city.lat, city.lon);

  const navigate = useNavigate();

  // React Transition
  const [isPending, startTransition] = useTransition();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  const handleCityClick = () => {
    startTransition(() => {
      navigate(`/city/${city.id}`);
    });
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
      {/* Conditional rendering based on isPending */}
    </primitive>
  );
};

export default PointOnSurface;
