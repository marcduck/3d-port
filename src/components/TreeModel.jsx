import { useBox, useCompoundBody } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

const TreeModel = ({ ...props }) => {
  const { nodes, materials } = useGLTF(`./models/${"tree"}.gltf`);
  const [ref] = useBox((index) => ({
    type: "Static",
    mass: 1,
    args: props.args,
    position: props.position,

    ...props,
  }));

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        scale={props.scale}
        castShadow
        receiveShadow
        geometry={nodes["tree-beech"].geometry}
        material={materials.color_main}
      />
    </group>
  );
};

export default TreeModel;
