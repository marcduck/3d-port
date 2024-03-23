import React, { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  BackSide,
} from "three";
import { useNavigate } from "react-router-dom";
import { latLongToVector3 } from "../../helpers";

const PointOnSurface = ({ city }) => {
  const meshRef = useRef(); // Ref for the visible point
  const hitboxRef = useRef(); // Ref for the invisible larger hitbox
  const outlineRef = useRef(); // Ref for the outline
  const [hovered, setHovered] = useState(false);
  const { camera, gl } = useThree();
  const position = latLongToVector3(city.lat, city.lon);
  const navigate = useNavigate();

  useEffect(() => {
    if (hovered) {
      gl.domElement.style.cursor = "pointer";
    } else {
      gl.domElement.style.cursor = "auto";
    }
  }, [hovered, gl.domElement.style]);

  useFrame(() => {
    const scale =
      camera.position.distanceTo(
        new Vector3(position[0], position[1], position[2])
      ) * 0.02;
    if (outlineRef.current) {
      outlineRef.current.scale.set(scale, scale, scale);
    }

    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  const handleCityClick = () => {
    navigate(`/city/${city.id}`);
  };

  return (
    <>
      {/* Visible point */}
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#11ee11" : "white"} />
      </mesh>

      {/* Invisible hitbox for easier interaction */}
      <mesh
        ref={hitboxRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={handleCityClick}
        visible={false} // Make the hitbox invisible
      >
        <sphereGeometry args={[0.2, 16, 16]} />{" "}
        {/* Larger than the visible sphere */}
        <meshBasicMaterial />
      </mesh>

      {/* Outline */}
      <mesh ref={outlineRef} position={position}>
        <sphereGeometry args={[0.1, 16, 16]} />{" "}
        {/* Slightly larger than the visible sphere */}
        <meshBasicMaterial color={"black"} side={BackSide} />
      </mesh>
    </>
  );
};

export default PointOnSurface;
