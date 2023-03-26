import React, { useEffect, useRef, useState } from 'react'
import { Box, Cylinder, Sphere, Cone, Stars, Dodecahedron } from '@react-three/drei';
import { CylinderGeometry, Group, Mesh, MeshPhongMaterial, PlaneGeometry, Vector3 } from 'three';
import { useTexture } from '@react-three/drei';
import Acropolis, { Building, Building2, CafeBuilding, ComplexHouse, House1, House2, House3, WestminsterAbbey, WestminsterAbbey2 } from './Buildings';
import { Physics, usePlane, useBox, Debug } from '@react-three/cannon'



function Tree({ height, position }) {
  const trunkHeight = height / 2;
  const canopyHeight = height * 0.75;
  const canopyRadius = height / 3;

  return (
    <group position={position}>
      <Cylinder args={[1, 1, trunkHeight, 8]} position={[0, trunkHeight / 2, 0]} >
        <meshStandardMaterial color={'brown'} />
      </Cylinder>
      <Sphere args={[canopyRadius, 32, 32]} position={[0, canopyHeight, 0]} >
        <meshStandardMaterial color={'green'} />
      </Sphere>
    </group>
  );
}

function Rock({ size, color, position }) {
  return (
    <group position={position} >
      <Dodecahedron args={[size, 0]} >
        <meshStandardMaterial color={color} />
      </Dodecahedron>
    </group>
  );
}


function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  return (
    <mesh ref={ref}>
      <boxGeometry />
    </mesh>
  )
}



function DefaultScene() {


  const [trees, setTrees] = useState([]);
  const [rocks, setRocks] = useState([]);

  useEffect(() => {
    // generate some trees and rocks
    const treePositions = Array(30)
      .fill()
      .map(() => [Math.random() * 200 - 100, 0, Math.random() * 200 - 100]);
    setTrees(treePositions);

    const rockPositions = Array(10)
      .fill()
      .map(() => [Math.random() * 200 - 100, 0, Math.random() * 200 - 100]);
    setRocks(rockPositions);
  }, []);


    return (
      <>
        <spotLight position={[0, 50, 0]} angle={Math.PI / 6} penumbra={1} intensity={0.8} castShadow />
        <Stars />
        <Physics>
          {/* <Debug color="black" scale={1.1}> */}
            <Plane  />
            <Cube />
          {/* </Debug> */}
        </Physics>

        {/* Buildings */}
        <Building width={80} height={100} depth={80} color={'#FFE4C4'} position={[280, 0, 0]} />
        <Building width={80} height={75} depth={200} color={'#BADDAD'} position={[-380, 0, -400]} />
        <Building2 position={[380, 0, -400]} />
        <WestminsterAbbey position={[300, 0, 300]}/>
        <ComplexHouse position={[180, 0, 200]} />
        <Acropolis position={[200, 0, 290]} />
        <WestminsterAbbey2 position={[100, 0, 90]} />
        <CafeBuilding  position={[0, 0, 90]} />
        <House1 position={[-50, 0, 90]} />
        <House2 position={[-100, 0, 120]} />
        <House3 position={[0, 0, 50]} />

        {trees.map((position, i) => (
            <Tree key={i} height={Math.random() * 15 + 5} position={position} />
          ))}
        {rocks.map((position, i) => (
          <Rock key={i} size={Math.random() * 10 + 5} color={'#A9A9A9'} position={position} />
        ))}
</>
);
}

export default DefaultScene