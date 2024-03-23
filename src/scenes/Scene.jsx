import { useState } from "react";
// import DefaultScene from "./scene/DefaultScene";

import GlobeScene from "./globe/GlobeScene";
import CanvasContainer from "../components/CanvasContainer";

function Scene() {
  return (
    <CanvasContainer>
      <GlobeScene />
    </CanvasContainer>
  );
}

export default Scene;
