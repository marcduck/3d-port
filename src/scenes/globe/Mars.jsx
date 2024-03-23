import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import marsColorMapImg from "/textures/2k_mars.jpg"; // Ensure you have a Mars texture
import { TextureLoader } from "three";
import { Sphere } from "@react-three/drei";

export function Mars({ segments = 32, scale = 1.5 }) {
  // Adjusted scale for Mars
  const marsRef = useRef();
  const marsColorMap = useLoader(TextureLoader, marsColorMapImg);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const marsRadius = 30; // Increased distance from Earth to Mars
    const marsSpeed = 0.03; // Slower orbital speed for Mars
    const marsX = Math.sin(t * marsSpeed) * marsRadius; // Calculate x coordinate
    const marsZ = Math.cos(t * marsSpeed) * marsRadius; // Calculate z coordinate

    // Set position of Mars relative to Earth
    marsRef.current.position.set(marsX, 0, marsZ);
  });

  return (
    <Sphere
      ref={marsRef}
      args={[1.5, segments * 2, segments]} // Adjusted size for Mars
      scale={scale}
      rotation={[0, 45, 60]} // You can adjust this as needed
    >
      <meshLambertMaterial map={marsColorMap} />
    </Sphere>
  );
}
