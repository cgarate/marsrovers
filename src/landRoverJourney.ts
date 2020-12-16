const NO_SPACE_FOR_LANDING = require("./constants");
import { OrientationStringTypes } from "./rover.types";
const { moveRover, rotateRover } = require("./utils");

// Playing with partial application
// first function sets the plateauSize
// Second function takes landing coordinates and orientation
// Third function takes instruction set
export const landRoverJourney = (
  plateauSizeX: number,
  plateauSizeY: number,
) => (
  landingX: number,
  landingY: number,
  orientation: OrientationStringTypes,
) => (instructionSet: string): (number | string)[] => {
  // Set the initial values after landing
  let currentOrientation = orientation;
  let currentX = landingX;
  let currentY = landingY;

  // validate landing fits in plateau size
  const isLandingPossible =
    plateauSizeX >= landingX && plateauSizeY >= landingY;
  if (!isLandingPossible) return NO_SPACE_FOR_LANDING;

  // Create an array to loop on the instructions
  const arrInstructions = instructionSet.split("");
  arrInstructions.forEach((instruction) => {
    switch (instruction) {
      case "M":
        const newCoordinates = moveRover(
          currentOrientation,
          currentX,
          currentY,
        );
        currentX = newCoordinates.x;
        currentY = newCoordinates.y;
        break;

      case "L":
        currentOrientation = rotateRover(currentOrientation, "L");
        break;

      case "R":
        currentOrientation = rotateRover(currentOrientation, "R");
        break;

      default:
        break;
    }
  });
  const result = [currentX, currentY, currentOrientation];
  return result;
};
