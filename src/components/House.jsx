// From Globescene, not sure if needed
function House({ position, children }) {
  return (
    <group>
      <Box castShadow args={[0.3, 0.3, 0.4]} position={[5, 1, 0]}>
        <meshLambertMaterial color={"grey"} />
      </Box>
    </group>
  );
}
