import React from "react";

// Function to generate random integer within a specific range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate buildings with non-overlapping widths
function generateBuildings(numBuildings = 100) {
  const buildings = [];

  // Helper function to check if a building overlaps with existing buildings
  function doesOverlap(newBuilding) {
    for (const existingBuilding of buildings) {
      const xOverlap =
        Math.abs(newBuilding.position.x - existingBuilding.position.x) <
        (newBuilding.width + existingBuilding.width) / 2;
      const yOverlap =
        Math.abs(newBuilding.position.y - existingBuilding.position.y) <
        (newBuilding.height + existingBuilding.height) / 2;
      if (xOverlap && yOverlap) {
        return true;
      }
    }
    return false;
  }

  // Generate buildings
  for (let i = 0; i < numBuildings; i++) {
    const width = getRandomInt(15, 35); // Random width between 15 and 35 meters
    const height = getRandomInt(12, 22); // Random height between 12 and 22 meters
    const length = getRandomInt(20, 45); // Random length between 20 and 45 meters
    const rotation = getRandomInt(0, 359); // Random rotation between 0 and 359 degrees

    let newBuilding;
    let isOverlap = true;

    // Generate buildings until a non-overlapping one is found
    while (isOverlap) {
      const position = {
        x: getRandomInt(0, 200), // Assuming a grid size of 200 meters
        y: getRandomInt(0, 200),
      };

      newBuilding = { width, height, length, rotation, position };
      isOverlap = doesOverlap(newBuilding);
    }

    buildings.push(newBuilding);
  }

  return buildings;
}

// Generate 100 non-overlapping buildings
const buildings = generateBuildings(100);
console.log(buildings);

export default generateBuildings;
