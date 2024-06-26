import { useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { Vector3 } from "three";

import torontoModel from "/models/bench-scene.glb";
import tokyoModel from "/models/room.glb";

/*****************
 * Player Controls
 ****************/
export const usePlayerControls = () => {
  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump",
  };
  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};

export const latLongToVector3 = (lat, lon, earthRadius = 4) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new Vector3(
    -(earthRadius * Math.sin(phi) * Math.cos(theta)),
    earthRadius * Math.cos(phi),
    earthRadius * Math.sin(phi) * Math.sin(theta)
  );
};

export function Spin({ children, rotationRate = 0.0005 }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += rotationRate;
  });

  return <group ref={ref}>{children}</group>;
}

export const cities = {
  newYork: {
    name: "New York",
    id: "new-york",
    lat: 40.7128,
    lon: -74.006,
    disabled: true,
  },
  toronto: {
    name: "Toronto",
    id: "toronto",
    lat: 43.65107,
    lon: -79.347015,
    modelPath: torontoModel,
    cameraPosition: [20, 3, 0],
    cameraRotation: [-2, 0, -2],
  },
  tokyo: {
    name: "Tokyo",
    id: "tokyo",
    lat: 35.6895,
    lon: 139.6917,
    modelPath: tokyoModel,
  },
  paris: {
    name: "Paris",
    id: "paris",
    lat: 48.8566,
    lon: 2.3522,
    disabled: true,
  },
  moscow: {
    name: "Moscow",
    id: "moscow",
    lat: 55.7558,
    lon: 37.6173,
    disabled: true,
  },
};
