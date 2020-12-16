import {
  OrientationEnum,
  OrientationStringTypes,
  SideEnum,
  SideStringTypes,
} from "./rover.types";

// This function will advance positively or negatively the rover in the corresponding axis
export const moveRover = (
  orientation: OrientationStringTypes,
  currentX: number,
  currentY: number,
) => {
  const coordinates = { x: currentX, y: currentY };
  // Orientation defines the axis we are moving on and the sign applied to the operation
  switch (orientation) {
    case "N":
      return { ...coordinates, y: currentY + 1 };
    case "S":
      return { ...coordinates, y: currentY - 1 };
    case "E":
      return { ...coordinates, x: currentX + 1 };
    case "W":
      return { ...coordinates, x: currentX - 1 };
    default:
      return coordinates;
  }
};

// By assigning values to each orientation we can rotate the rover by adding the value of the current orientation to the new orientation
export const rotateRover = (
  orientation: OrientationStringTypes,
  rotateTo: SideStringTypes,
) => {
  // Since we set N to be 360 we adjust for this one manually
  if (orientation === "N" && rotateTo === "R") {
    return "E";
  }
  let newPositionDegrees = OrientationEnum[orientation] + SideEnum[rotateTo];

  // Same here, if we are back to 0, we know it's N and its matched value should be 360
  if (newPositionDegrees === 0) {
    newPositionDegrees = 360;
  }
  return OrientationEnum[newPositionDegrees] as OrientationStringTypes;
};
