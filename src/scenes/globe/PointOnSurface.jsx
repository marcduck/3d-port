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
  const meshRef = useRef();
  const hitboxRef = useRef();
  const outlineRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
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

  const handlePointerMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#11ee11" : "white"} />
      </mesh>

      <mesh
        ref={hitboxRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onPointerMove={handlePointerMove}
        onClick={handleCityClick}
        visible={false}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial />
      </mesh>

      <mesh ref={outlineRef} position={position}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={"black"} side={BackSide} />
      </mesh>
    </>
  );
};

export default PointOnSurface;
