import { useBox, useCompoundBody } from '@react-three/cannon';
import { useGLTF, Sparkles } from '@react-three/drei';

const RoomModel = ({ ...props }) => {
  const gltf = useGLTF(`./models/${"room"}.glb`);
  const [ref] = useBox((index) => ({
    type: 'Static',
    mass: 1,
    args: props.args,
    position: props.position,

    ...props,
  }));

  return (
    <group ref={ref} {...props} dispose={null} castShadow>
      <Sparkles count={200} scale={[20, 20, 10]} size={3} speed={2} />
      <primitive object={gltf.scene} />
    </group>
  );
};

export default RoomModel;
