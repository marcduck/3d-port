import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Tree = () => {
  const [growthStage, setGrowthStage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // customize this for different growth times

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft <= 0) {
        setGrowthStage(growthStage + 1);
        setTimeLeft(30); // Reset timer for next stage
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, growthStage]);

  useEffect(() => {
    const savedProgress = localStorage.getItem("treeProgress");
    if (savedProgress) {
      setGrowthStage(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("treeProgress", JSON.stringify(growthStage));
  }, [growthStage]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.img
        src={"https://img.icons8.com/color/48/deciduous-tree.png"} // Replace with actual image paths
        animate={{ scale: 1 + growthStage * 0.2 }} // Scale up based on growth stage
        transition={{ duration: 0.5 }}
        className="w-32 h-32"
      />
      <div className="text-xl font-bold mt-4">
        Time Left: {timeLeft} seconds
      </div>
    </div>
  );
};

export default Tree;
