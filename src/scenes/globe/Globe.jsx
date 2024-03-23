import { Sphere } from "@react-three/drei";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function Globe({
  scale = 1,
  segments = 128,
  renderOrder = 0,
  castShadow = false,
  receiveShadow = false,
  children,
}) {
  const globeSize = 4;

  return (
    <Sphere
      renderOrder={renderOrder}
      castShadow
      receiveShadow
      args={[globeSize, segments * 2, segments]}
      scale={scale}
    >
      {children}
    </Sphere>
  );
}
