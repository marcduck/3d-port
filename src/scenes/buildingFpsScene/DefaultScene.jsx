import React, { useEffect, useRef, useState } from "react";
import { Sky, SoftShadows } from "@react-three/drei";

import { Physics, usePlane, useBox, Debug } from "@react-three/cannon";
import BaseScene from "../../ui/BaseScene";
import BaseBox from "../../ui/BaseBox";
import BaseCharacter from "../../ui/BaseCharacter";
// import TreeModel from "../components/TreeModel";

function DefaultScene({ children }) {
  // const [trees, setTrees] = useState([]);
  // const [rocks, setRocks] = useState([]);

  // useEffect(() => {
  //   // generate some trees and rocks
  //   const r = 100;
  //   const treePositions = Array(30)
  //     .fill()
  //     .map(() => [Math.random() * 2 * r - r, 0, Math.random() * 2 * r - r]);
  //   setTrees(treePositions);
  // }, []);

  return (
    <>
      <BaseScene>
        <BaseBox
          text={false}
          position={[0, 0.5, 0]}
          args={[2, 1, 2]}
          color="red"
        />
        <BaseBox
          text={false}
          position={[5, 1, 0]}
          args={[1.5, 2, 1.3]}
          color="orange"
        />
        <BaseBox
          text={false}
          position={[0, 0.5, 5]}
          args={[3, 1, 1.3]}
          color="green"
        />
        <BaseBox
          text={false}
          position={[2, 0.5, 5]}
          args={[3, 1, 1.3]}
          color="green"
        />

        <BaseCharacter
          controls
          position={[0, 2, 0]}
          args={[0.5]}
          color="yellow"
        />
        <pointLight position={[3, 1, -3]} intensity={0.5} />
        <light position={[1, 1, 0.5]} intensity={2.5} />
        <light position={[0, 0, 0]} intensity={2.5} />
        {/* {trees.map((position, i) => (
          <TreeModel
            key={i}
            scale={0.5 + Math.random() * 0.5}
            position={position}
          />
        ))} */}

        {children}
        <Sky />
      </BaseScene>
    </>
  );
}

export default DefaultScene;
