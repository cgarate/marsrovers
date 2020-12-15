import { NO_SPACE_FOR_LANDING } from "./constants";
import { OrientationStringTypes } from "./rover.types";
import { moveRover, rotateRover } from "./utils";

export const landRoverJourney = (
  plateauSizeX: number,
  plateauSizeY: number,
) => (
  landingX: number,
  landingY: number,
  orientation: OrientationStringTypes,
) => (instructionSet: string) => {
  let currentOrientation = orientation;
  let currentX = landingX;
  let currentY = landingY;

  // validate landing fits in plateau size
  const isLandingPossible =
    plateauSizeX >= landingX && plateauSizeY >= landingY;
  if (!isLandingPossible) return NO_SPACE_FOR_LANDING;

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
  const result = { currentX, currentY, currentOrientation };
  return result;
};

const landRoverA = landRoverJourney(5, 5)(1, 2, "N")("LMLMLMLMM");
const landRoverB = landRoverJourney(5, 5)(3, 3, "E")("MMRMMRMRRM");
