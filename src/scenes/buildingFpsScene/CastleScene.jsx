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

function CastleScene({ showPerf, setShowPerf }) {
  const point = useRef();
  const controls = useRef();
  const materials = useLoader(MTLLoader, "/models/Toledo.mtl");
  const obj = useLoader(OBJLoader, "/models/Toledo.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useHelper(point, PointLightHelper, "cyan");
  return (
    <>
      <pointLight ref={point} intensity={0.3} position={[20, 20, 0]} />
      <ambientLight intensity={0.2} />
      <OrbitControls ref={controls} />

      <group scale={0.01}>
        <primitive object={obj} />
      </group>
    </>
  );
}

export default CastleScene;
