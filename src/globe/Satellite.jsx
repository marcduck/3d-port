import { useGLTF } from "@react-three/drei";

import satteliteModelGltf from "/models/satellite_-_low_poly.glb";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function SatelliteModel(props) {
  const { nodes, materials } = useGLTF(satteliteModelGltf);
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 180, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.SatelliteSatellite_mat}
        />
      </group>
    </group>
  );
}

export const Satellite = ({
  radius = 4,
  altitude = 1,
  speed = -0.1,
  latitude = 0,
  scale = 1,
}) => {
  const pointLightRef = useRef();
  const groupRef = useRef();
  const [intensity, setIntensity] = useState(0);

  const tiltAmplitude = 0.5; // controls the tilt amplitude
  const tiltFrequency = 0.1; // controls the tilt frequency

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIntensity((intensity) => (intensity > 0 ? 0 : 1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const orbitRadius = radius + altitude;
    const orbitPosition = new Vector3(
      orbitRadius * Math.cos(elapsedTime * speed),
      tiltAmplitude * Math.sin(elapsedTime * tiltFrequency), // add the tilt to the latitude
      orbitRadius * Math.sin(elapsedTime * speed)
    );
    groupRef.current.position.copy(orbitPosition);
    pointLightRef.current.position.copy(orbitPosition);
  });

  return (
    <group ref={groupRef}>
      <SatelliteModel scale={0.01 * scale} />
      <pointLight
        ref={pointLightRef}
        color="red"
        intensity={intensity * scale}
        distance={9 * scale}
      />
      <mesh>
        <sphereGeometry args={[0.015 * scale, 16, 16]} />
        <meshStandardMaterial color={intensity ? 0xff0000 : 0x330000} />
      </mesh>
    </group>
  );
};
