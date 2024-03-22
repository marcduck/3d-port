import { useState, useEffect } from "react";
import { Vector3 } from "three";

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
