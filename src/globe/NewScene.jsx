export default NewScene = ({ modelPath }) => {
  const { scene } = useLoader(GLTFLoader, modelPath);
  return <primitive object={scene} />;
};
