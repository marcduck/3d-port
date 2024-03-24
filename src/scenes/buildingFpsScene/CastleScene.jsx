import {
  Box,
  Plane,
  FirstPersonControls,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { PointLightHelper } from "three";
import CanvasContainer from "../../components/CanvasContainer";
import BaseScene from "../../ui/BaseScene";
import DefaultScene from "./DefaultScene";

function CastleScene({ showPerf, setShowPerf }) {
  const point = useRef();
  const controls = useRef();
  const materials = useLoader(MTLLoader, "/models/Toledo.mtl");
  const obj = useLoader(OBJLoader, "/models/Toledo.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // useHelper(point, PointLightHelper, "cyan");
  return (
    <CanvasContainer>
      <DefaultScene>
        <pointLight ref={point} intensity={0.3} position={[20, 20, 0]} />
        <ambientLight intensity={0.2} />
        {/* <OrbitControls ref={controls} /> */}

        <group scale={0.1} position={[0, 0, 0]}>
          <primitive object={obj} />
        </group>
      </DefaultScene>
    </CanvasContainer>
  );
}

export default CastleScene;
