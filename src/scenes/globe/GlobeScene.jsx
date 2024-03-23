import {
  Box,
  OrbitControls,
  Sphere,
  Stars,
  useGLTF,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { AdditiveBlending, BackSide, TextureLoader, Vector3 } from "three";
import {
  globeVertexShader,
  globeFragmentShader,
  atmosphereVertexShader,
  atmosphereFragmentShader,
} from "./Shaders";

import PointOnSurface from "./PointOnSurface";
import { Satellite } from "./Satellite";
import { Moon } from "./Moon";
import { Globe } from "./Globe";

import colorMapImg from "/textures/1_earth_8k.jpg";
import cloudsColorMapImg from "/textures/fair_clouds_8k.jpg";
import bumpMapImg from "/textures/elev_bump_8k.jpg";
import { Spin, cities } from "../../helpers";
import { Mars } from "./Mars";

function GlobeScene() {
  const point = useRef();
  const colorMap = useLoader(TextureLoader, colorMapImg);
  // const nightColorMap = useLoader(TextureLoader, '/textures/5_night_8k.jpg')
  // const citiesMap = useLoader(TextureLoader, '/textures/cities_8k.png')
  const bumpMap = useLoader(TextureLoader, bumpMapImg);
  const cloudsColorMap = useLoader(TextureLoader, cloudsColorMapImg);

  return (
    <>
      <pointLight ref={point} intensity={0.3} position={[20, 0, 0]} />
      <ambientLight intensity={0.4} />
      <OrbitControls enablePan={false} maxDistance={30} minDistance={6} />

      <Spin>
        {/* Earth - radius:  */}
        <Globe segments={256} renderOrder={-1} castShadow receiveShadow>
          <meshPhongMaterial
            map={colorMap}
            displacementMap={bumpMap}
            displacementScale={2.2}
            // displacementBias}
          />
        </Globe>
        {/* Earth - radius:  */}
        {/* <Clouds radius={4.1} cloudsTexture={cloudsColorMap} /> */}
        {/* <ObjectOnSurface /> */}
        <Satellite scale={0.6} />
        {/* <Satellite latitude={3.5} speed={0.2} scale={0.4} /> */}
        {/* Inner atmosphere */}
        <Globe scale={1.01} renderOrder={0}>
          <shaderMaterial
            vertexShader={globeVertexShader}
            fragmentShader={globeFragmentShader}
            blending={AdditiveBlending}
          />
        </Globe>
        {/* Map markers */}
        {Object.values(cities).map((city) => (
          <PointOnSurface key={city.name} city={city} />
        ))}

        {/* Outer Atmosphere */}
        <Globe renderOrder={-2} scale={1.2}>
          <shaderMaterial
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            blending={AdditiveBlending}
            side={BackSide}
            depthTest={false}
          />
        </Globe>
      </Spin>
      <Moon />

      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}

export default GlobeScene;
