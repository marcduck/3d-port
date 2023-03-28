import { Canvas } from '@react-three/fiber';
import { Loader, PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import Lights from '../components/Lights';
import Floor from '../components/Floor';
import { Perf } from 'r3f-perf';
import GlobeScene from '../scene/GlobeScene';

function ForestScene(){
  return <>
    <Perf />
    <Lights />

    <Physics gravity={[0, -9.8, 0]}>
      {children}

      <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
    </Physics>

    <PointerLockControls />
    </>
}



const BasicScene = ({ children }) => {
  const [showPerf, setShowPerf] = useState(false);
  return (
    <>
    <Canvas shadows="soft">
      {showPerf ? <Perf  /> : null}

      <GlobeScene setShowPerf={setShowPerf} showPerf={showPerf} />
      {/* <ForestScene /> */}
    </Canvas>
    <Loader />
    </>
  );
};

export default BasicScene;
