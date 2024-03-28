import React, { useState, useEffect } from "react";

const ForestOverview = () => {
  const [forest, setForest] = useState([]);

  useEffect(() => {
    const savedForest = localStorage.getItem("userForest");
    if (savedForest) {
      setForest(JSON.parse(savedForest));
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Forest</h2>
      <div className="grid grid-cols-3 gap-4">
        {forest.map((tree, index) => (
          <div key={index} className="p-2 border rounded-lg">
            <img
              src={"https://img.icons8.com/color/48/deciduous-tree.png"}
              alt={`Tree Stage ${tree.stage}`}
              className="w-full h-32 object-cover"
            />
            <div className="text-center mt-2">Tree {index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForestOverview;
