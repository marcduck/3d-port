import React, { useEffect, useRef, useState } from 'react'
import { Box, Cylinder, Sphere, Cone, Stars, Dodecahedron, Sky, SoftShadows } from '@react-three/drei';
import { CylinderGeometry, Group, Mesh, MeshPhongMaterial, PlaneGeometry, Vector3 } from 'three';
import { useTexture } from '@react-three/drei';
import Acropolis, { Building, Building2, CafeBuilding, ComplexHouse, House1, House2, House3, WestminsterAbbey, WestminsterAbbey2 } from './Buildings';
import { Physics, usePlane, useBox, Debug } from '@react-three/cannon'
import BasicScene from '../ui/BaseScene';
import BaseBox from '../ui/BaseBox';
import BaseCharacter from '../ui/BaseCharacter';
import ThreeModel from '../components/ThreeModel';
import RoomModel from '../components/RoomModel';






function DefaultScene() {


  const [trees, setTrees] = useState([]);
  const [rocks, setRocks] = useState([]);

  useEffect(() => {
    // generate some trees and rocks
    const r = 100
    const treePositions = Array(30)
      .fill()
      .map(() => [Math.random() * 2*r - r, 0, Math.random() * 2*r - r]);
    setTrees(treePositions);


  }, []);


  
    return (
      <>
        <BasicScene>
          <SoftShadows />
          <BaseBox text={false} position={[0, 0.5, 0]} args={[2, 1, 2]} color="red" />
          <BaseBox text={false} position={[5, 1, 0]} args={[1.5, 2, 1.3]} color="orange" />
          <BaseBox text={false} position={[0, 0.5, 5]} args={[3, 1, 1.3]} color="green" />
          <BaseBox text={false} position={[2, 0.5, 5]} args={[3, 1, 1.3]} color="green" />

          <BaseCharacter controls position={[0, 2, 0]} args={[0.5]} color="yellow" />
          <pointLight position={[3, 1, -3]} intensity={0.5} />
          <light position={[0,0,0]} intensity={2.5} />
          <RoomModel position={[0,.1,0]} />
          {/* {trees.map((position, i) => (
              // <Tree key={i} height={Math.random() * 15 + 5} position={position} />
              // <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, -5]} />
              <ThreeModel key={i} scale={0.5 + Math.random()*0.5} position={position} />
            ))} */}

          <Sky />
        </BasicScene >


</>
);
}

export default DefaultScene