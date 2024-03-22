import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export const FadeEffect = ({ onFinish }) => {
  const mesh = useRef();
  const [fadingOut, setFadingOut] = useState(true);

  useFrame((state, delta) => {
    if (fadingOut) {
      mesh.current.material.opacity -= delta;
      if (mesh.current.material.opacity <= 0) {
        setFadingOut(false);
        onFinish && onFinish();
      }
    } else {
      mesh.current.material.opacity += delta;
      if (mesh.current.material.opacity >= 1) {
        state.active = false; // Stop the rendering loop if necessary
      }
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="black" transparent={true} opacity={1} />
    </mesh>
  );
};
