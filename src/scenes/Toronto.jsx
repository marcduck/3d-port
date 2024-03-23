import React from "react";
import { NewScene } from "./globe/NewScene";
import { cities } from "../helpers";

const toronto = cities.toronto;

function Toronto() {
  return (
    <NewScene
      modelPath={toronto.modelPath}
      cameraPosition={toronto.cameraPosition}
      cameraRotation={toronto.cameraRotation}
    />
  );
}

export default Toronto;
