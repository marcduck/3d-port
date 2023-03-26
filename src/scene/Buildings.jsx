import React from 'react';
// import { Canvas } from 'react-three-fiber';
import { Box, Cylinder, MeshWobbleMaterial, Sphere, Torus, Cone } from '@react-three/drei';
import { BoxGeometry, MeshBasicMaterial, MeshStandardMaterial } from 'three';

export function ComplexHouse({position}) {
  return (
    <group position={position}>
      <pointLight position={[10, 10, 10]} />
      {/* Walls */}
      <Box position={[0, 2, 0]} args={[10, 4, 1]}>
        <meshStandardMaterial color="gray" />
      </Box>
      <Box position={[0, 0, 0]} args={[10, 4, 1]}>
        <meshStandardMaterial color="gray" />
      </Box>
      <Box position={[5.5, 2, 0]} args={[1, 4, 2]}>
        <meshStandardMaterial color="gray" />
      </Box>
      <Box position={[-5.5, 2, 0]} args={[1, 4, 2]}>
        <meshStandardMaterial color="gray" />
      </Box>
      <Box position={[0, 2, 3.5]} args={[10, 4, 1]}>
        <meshStandardMaterial color="gray" />
      </Box>
      <Box position={[0, 2, -3.5]} args={[10, 4, 1]}>
        <meshStandardMaterial color="gray" />
      </Box>
      {/* Roof */}
      <Cylinder position={[0, 4.5, 0]} args={[8, 8, 1, 32]}>
        <meshStandardMaterial color="white" />
      </Cylinder>
      <Sphere position={[0, 4, 0]} args={[2, 32, 32]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      {/* Columns */}
      <Torus position={[3, 0, 3]} args={[1.5, 0.5, 8, 32]}>
        <meshStandardMaterial color="white" />
      </Torus>
      <Torus position={[-3, 0, 3]} args={[1.5, 0.5, 8, 32]}>
        <meshStandardMaterial color="white" />
      </Torus>
      <Torus position={[3, 0, -3]} args={[1.5, 0.5, 8, 32]}>
        <meshStandardMaterial color="white" />
      </Torus>
      <Torus position={[-3, 0, -3]} args={[1.5, 0.5, 8, 32]}>
        <meshStandardMaterial color="white" />
      </Torus>
    </group>
  );
}

export function Acropolis({position}) {
  return (
    <group position={position}>
      <pointLight position={[10, 10, 10]} />
      {/* Base */}
      <Box position={[0, 0.5, 0]} args={[20, 1, 20]}>
        <meshStandardMaterial color="gray" />
      </Box>
      {/* Columns */}
      <Cylinder position={[3.5, 3, 3.5]} args={[0.5, 0.5, 10, 32]}>
        <meshStandardMaterial color="white" />
      </Cylinder>
      <Cylinder position={[-3.5, 3, 3.5]} args={[0.5, 0.5, 10, 32]}>
        <meshStandardMaterial color="white" />
      </Cylinder>
      <Cylinder position={[3.5, 3, -3.5]} args={[0.5, 0.5, 10, 32]}>
        <meshStandardMaterial color="white" />
      </Cylinder>
      <Cylinder position={[-3.5, 3, -3.5]} args={[0.5, 0.5, 10, 32]}>
        <meshStandardMaterial color="white" />
      </Cylinder>
      {/* Pediments */}
      <Box position={[0, 5, 0]} args={[20, 1, 6]}>
        <meshStandardMaterial color="white" />
      </Box>
      <Sphere position={[0, 5.5, 3]} args={[3, 32, 32]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <Sphere position={[0, 5.5, -3]} args={[3, 32, 32]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      {/* Parthenon */}
      <Box position={[0, 3, 0]} args={[10, 6, 6]}>
        <meshStandardMaterial color="white" />
      </Box>
      <Box position={[0, 6, 0]} args={[10, 2, 6]}>
        <meshStandardMaterial color="white" />
      </Box>
      {/* Entablature */}
      <Box position={[0, 8.5, 0]} args={[10, 1, 6]}>
        <meshStandardMaterial color="white" />
      </Box>
      <Torus position={[0, 9, 0]} args={[3, 0.5, 32, 32]}>
        <meshStandardMaterial color="white" />
      </Torus>
      <Torus position={[0, 10, 0]} args={[3.5, 0.5, 32, 32]}>
        <meshStandardMaterial color="white" />
      </Torus>
    </group>
  );
}

export function WestminsterAbbey({position}) {
  // const { nodes } = useGLTF('/westminster_abbey.glb');

  return (
    <group position={position}>
      {/* Main body */}
      <group position={[0, 0, 0]}>
        <Box args={[15, 100, 30]} position={[0, 50, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[15, 10, 30]} position={[0, 95, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[35, 10, 30]} position={[0, 80, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[25, 10, 30]} position={[0, 70, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[25, 10, 30]} position={[0, 60, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[25, 10, 30]} position={[0, 40, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[25, 10, 30]} position={[0, 30, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[15, 10, 30]} position={[0, 15, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
      </group>
      
      {/* Towers */}
      <group position={[0, 0, 0]}>
        <Box args={[10, 10, 10]} position={[25, 95, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[10, 30, 10]} position={[25, 85, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[10, 30, 10]} position={[25, 55, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[10, 30, 10]} position={[25, 25, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        <Box args={[10, 10, 10]} position={[25, 15, 0]}>
          <meshPhongMaterial attach="material" color="#D8D8D8" />
        </Box>
        
        <Box args={[10, 10, 10]} position={[-25, 95, 0]}>
    <meshPhongMaterial attach="material" color="#D8D8D8" />
  </Box>
  <Box args={[10, 30, 10]} position={[-25, 85, 0]}>
    <meshPhongMaterial attach="material" color="#D8D8D8" />
  </Box>
  <Box args={[10, 30, 10]} position={[-25, 55, 0]}>
    <meshPhongMaterial attach="material" color="#D8D8D8" />
  </Box>
  <Box args={[10, 30, 10]} position={[-25, 25, 0]}>
    <meshPhongMaterial attach="material" color="#D8D8D8" />
  </Box>
  <Box args={[10, 10, 10]} position={[-25, 15, 0]}>
    <meshPhongMaterial attach="material" color="#D8D8D8" />
  </Box>
</group>

{/* Roof */}
<group position={[0, 0, 0]}>
  <Box args={[55, 4, 32]} position={[0, 106, 0]}>
    <meshPhongMaterial attach="material" color="#A0A0A0" />
  </Box>
  <Box args={[65, 4, 42]} position={[0, 103, 0]}>
    <meshPhongMaterial attach="material" color="#A0A0A0" />
  </Box>
  <Box args={[75, 4, 52]} position={[0, 100, 0]}>
    <meshPhongMaterial attach="material" color="#A0A0A0" />
  </Box>
  <Box args={[85, 4, 62]} position={[0, 97, 0]}>
    <meshPhongMaterial attach="material" color="#A0A0A0" />
  </Box>
  <Box args={[90, 4, 72]} position={[0, 94, 0]}>
    <meshPhongMaterial attach="material" color="#A0A0A0" />
  </Box>
</group>

{/* Windows */}
<group position={[0, 0, 0]}>
  <Box args={[5, 30, 30]} position={[-15, 70, 0]}>
    <meshPhongMaterial attach="material" color="#FFFFFF" />
  </Box>
  <Box args={[5, 30, 30]} position={[15, 70, 0]}>
    <meshPhongMaterial attach="material" color="#FFFFFF" />
  </Box>
  <Box args={[5, 20, 20]} position={[-15, 40, 0]}>
    <meshPhongMaterial attach="material" color="#FFFFFF" />
  </Box>
  <Box args={[5, 20, 20]} position={[15, 40, 0]}>
    <meshPhongMaterial attach="material" color="#FFFFFF" />
  </Box>
</group>
</group>
);
}

export const WestminsterAbbey2 = ({ position }) => {
  return (
    <group position={position}>
      <Box args={[40, 20, 100]} position={[0, 10, 0]}>
        <MeshWobbleMaterial color={'#D8BFD8'} speed={2} factor={0.5} />
      </Box>
      <Cylinder args={[12, 12, 20, 32]} position={[0, 30, 0]}>
        <MeshWobbleMaterial color={'#D8BFD8'} speed={2} factor={0.5} />
      </Cylinder>
      <Box args={[30, 20, 60]} position={[0, 55, 0]}>
        <MeshWobbleMaterial color={'#D8BFD8'} speed={2} factor={0.5} />
      </Box>
      <Box args={[40, 20, 40]} position={[0, 85, 0]}>
        <MeshWobbleMaterial color={'#D8BFD8'} speed={2} factor={0.5} />
      </Box>
      <Cylinder args={[12, 12, 20, 32]} position={[0, 110, 0]}>
        <MeshWobbleMaterial color={'#D8BFD8'} speed={2} factor={0.5} />
      </Cylinder>
      <Box args={[40, 20, 100]} position={[0, 135, 0]}>
        <MeshWobbleMaterial color={'#D8BFD8'} speed={2} factor={0.5} />
      </Box>
      <Box args={[30, 20, 60]} position={[0, 155, 0]}>
        <MeshWobbleMaterial color={'#D8BFD8'} speed={2} factor={0.5} />
      </Box>
      <Box args={[40, 20, 40]} position={[0, 185, 0]}>
        <MeshWobbleMaterial color={'#D8BFD8'} speed={2} factor={0.5} />
      </Box>
    </group>
  );
};

export const CafeBuilding = ({ position }) => {
  const wallColor = '#CFCFCF';
  const roofColor = '#ABABAB';
  const windowColor = '#F5F5F5';
  const doorColor = '#6E4B2B';

  const houseGroup = React.useRef();

  React.useEffect(() => {
    houseGroup.current.rotation.y = Math.PI / 4;
  }, []);

  return (
    <group position={position} ref={houseGroup}>
      {/* Walls */}
      <mesh
        geometry={new BoxGeometry(30, 20, 20)}
        material={new MeshStandardMaterial({ color: wallColor })}
        position={[0, 10, 0]}
      />

      {/* Roof */}
      <mesh
        geometry={new BoxGeometry(32, 2, 22)}
        material={new MeshStandardMaterial({ color: roofColor })}
        position={[0, 21, 0]}
      />

      {/* Window 1 */}
      <mesh
        geometry={new BoxGeometry(8, 8, 2)}
        material={new MeshStandardMaterial({ color: windowColor })}
        position={[-10, 13, 10]}
      />

      {/* Window 2 */}
      <mesh
        geometry={new BoxGeometry(8, 8, 2)}
        material={new MeshStandardMaterial({ color: windowColor })}
        position={[10, 13, 10]}
      />

      {/* Door */}
      <mesh
        geometry={new BoxGeometry(8, 12, 2)}
        material={new MeshStandardMaterial({ color: doorColor })}
        position={[0, 6, 10]}
      />
    </group>
  );
};

export const House1 = ({ position }) => {
  const wallColor = '#CFCFCF';
  const roofColor = '#ABABAB';
  const windowColor = '#F5F5F5';
  const doorColor = '#6E4B2B';

  const houseGroup = React.useRef();

  React.useEffect(() => {
    houseGroup.current.rotation.y = Math.PI / 4;
  }, []);

  return (
    <group position={position} ref={houseGroup}>
      {/* Walls */}
      <mesh
        geometry={new BoxGeometry(30, 20, 20)}
        material={new MeshStandardMaterial({ color: wallColor })}
        position={[0, 10, 0]}
      />

      {/* Roof */}
      <mesh
        geometry={new BoxGeometry(32, 2, 22)}
        material={new MeshStandardMaterial({ color: roofColor })}
        position={[0, 21, 0]}
      />

      {/* Window 1 */}
      <mesh
        geometry={new BoxGeometry(8, 8, 2)}
        material={new MeshStandardMaterial({ color: windowColor })}
        position={[-10, 13, 10]}
      />

      {/* Window 2 */}
      <mesh
        geometry={new BoxGeometry(8, 8, 2)}
        material={new MeshStandardMaterial({ color: windowColor })}
        position={[10, 13, 10]}
      />

      {/* Door */}
      <mesh
        geometry={new BoxGeometry(8, 12, 2)}
        material={new MeshStandardMaterial({ color: doorColor })}
        position={[0, 6, 10]}
      />
    </group>
  );
};

export const House2 = ({ position }) => {
  const wallColor = '#D9D9D9';
  const roofColor = '#F2F2F2';
  const windowColor = '#FFFFFF';
  const doorColor = '#8C4B0B';

  const houseGroup = React.useRef();

  React.useEffect(() => {
    houseGroup.current.rotation.y = -Math.PI / 4;
  }, []);

  return (
    <group position={position} ref={houseGroup}>
      {/* Walls */}
      <mesh
        geometry={new BoxGeometry(40, 20, 10)}
        material={new MeshStandardMaterial({ color: wallColor })}
        position={[0, 10, 0]}
      />

      {/* Roof */}
      <mesh
        geometry={new BoxGeometry(42, 2, 12)}
        material={new MeshStandardMaterial({ color: roofColor })}
        position={[0, 21, 0]}
      />

      {/* Window 1 */}
      <mesh
        geometry={new BoxGeometry(6, 6, 2)}
        material={new MeshStandardMaterial({ color: windowColor })}
        position={[-10, 13, 5]}
      />

      {/* Window 2 */}
      <mesh
        geometry={new BoxGeometry(6, 6, 2)}
        material={new MeshStandardMaterial({ color: windowColor })}
        position={[10, 13, 5]}
      />

      {/* Door */}
      <mesh
        geometry={new BoxGeometry(8, 12, 2)}
        material={new MeshStandardMaterial({ color: doorColor })}
        position={[0, 6, 5]}
      />
    </group>
  );
};

export const House3 = ({position }) => {
  const wallColor = '#E5E5E5';
  const roofColor = '#BFBFBF';
  const windowColor = '#FFFFFF';
  const doorColor = '#6E2C00';
  
  const houseGroup = React.useRef();
  
  React.useEffect(() => {
  houseGroup.current.rotation.y = Math.PI / 4;
  }, []);
  
  return (
  <group position={position} ref={houseGroup}>
  {/* Walls */}
  <mesh
  geometry={new BoxGeometry(25, 20, 25)}
  material={new MeshStandardMaterial({ color: wallColor })}
  position={[0, 10, 0]}
  />
    {/* Roof */}
    <mesh
      geometry={new BoxGeometry(27, 2, 27)}
      material={new MeshStandardMaterial({ color: roofColor })}
      position={[0, 21, 0]}
    />
  
    {/* Window 1 */}
    <mesh
      geometry={new BoxGeometry(6, 6, 2)}
      material={new MeshStandardMaterial({ color: windowColor })}
      position={[-8, 13, -8]}
    />
  
    {/* Window 2 */}
    <mesh
      geometry={new BoxGeometry(6, 6, 2)}
      material={new MeshStandardMaterial({ color: windowColor })}
      position={[8, 13, -8]}
    />
  
    {/* Window 3 */}
    <mesh
      geometry={new BoxGeometry(6, 6, 2)}
      material={new MeshStandardMaterial({ color: windowColor })}
      position={[-8, 13, 8]}
    />
  
    {/* Window 4 */}
    <mesh
      geometry={new BoxGeometry(6, 6, 2)}
      material={new MeshStandardMaterial({ color: windowColor })}
      position={[8, 13, 8]}
    />
  
    {/* Door */}
    <mesh
      geometry={new BoxGeometry(8, 12, 2)}
      material={new MeshStandardMaterial({ color: doorColor })}
      position={[0, 6, 12.5]}
    />
  </group>
  );
  };

  export function Building({ width, height, depth, color, position }) {
    const towerRadius = width / 4;
    const towerHeight = height / 2;
    const towerColor = color === 'gray' ? 'white' : 'gray';
  
    return (
      <group position={position}>
        <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
          <meshStandardMaterial color={color} />
        </Box>
        <Cylinder args={[towerRadius, towerRadius, towerHeight, 32]} position={[0, height + towerHeight / 2, 0]}>
          <meshStandardMaterial color={towerColor} />
        </Cylinder>
        <Cone args={[towerRadius, towerHeight, 32]} position={[0, height + towerHeight * 1.5, 0]}>
          <meshStandardMaterial color={towerColor} />
        </Cone>
      </group>
    );
  }
  
  export const Building2 = ({ position }) => {
    return (
      <>
        {/* Main structure */}
        <Sphere args={[1, 32, 32]} position={[position[0], position[1], 0]}>
          {/* Inner cylinder */}
          <Cylinder args={[0.5, 0.5, 2, 32]} position={[0, 0, -1]} />
          {/* Top cone */}
          <Cone args={[0.5, 1, 32]} position={[0, 0, 1.5]} />
          {/* Bottom cone */}
          <Cone args={[0.5, 1, 32]} position={[0, 0, -1.5]} />
        </Sphere>
      </>
    );
  };


export default Acropolis;