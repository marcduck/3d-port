import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import moonColorMapImg from "/textures/moon_1k.jpg";
import { TextureLoader } from "three";
import { Sphere } from "@react-three/drei";

export function Moon({ segments = 32, scale = 1, children }) {
  const moonRef = useRef();
  const moonColorMap = useLoader(TextureLoader, moonColorMapImg);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // Get time elapsed since animation started
    const moonRadius = 15; // Distance from earth to moon
    const moonSpeed = 0.05; // Speed at which the moon orbits the earth
    const moonX = Math.sin(t * moonSpeed) * moonRadius; // Calculate x coordinate
    const moonZ = Math.cos(t * moonSpeed) * moonRadius; // Calculate z coordinate

    // Set position of moon relative to earth
    moonRef.current.position.set(moonX, 0, moonZ);
  });

  return (
    <Sphere
      ref={moonRef}
      args={[1, segments * 2, segments]}
      scale={scale}
      rotation={[0, 45, 60]}
    >
      <meshLambertMaterial map={moonColorMap} />
    </Sphere>
  );
}
