import React from "react";
import Tree from "./Tree";
import ForestOverview from "./ForestOverview";

function Forest() {
  return (
    <div className="pt-[3.75rem]">
      <h1>Forest</h1>
      <ForestOverview />
      <Tree />
    </div>
  );
}

export default Forest;
