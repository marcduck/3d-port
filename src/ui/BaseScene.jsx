import { Loader, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Lights from "../components/Lights";
import Floor from "../components/Floor";
import { Perf } from "r3f-perf";

const BaseScene = ({ children }) => {
  const showPerf = true;
  return (
    <>
      {showPerf ? <Perf /> : null}
      <Physics gravity={[0, -9.8, 0]}>
        {children}
        <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
      </Physics>
      <Lights />

      <PointerLockControls />
      <Loader />
    </>
  );
};

export default BaseScene;
