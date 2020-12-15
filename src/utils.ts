import { OrientationEnum, OrientationStringTypes, SideEnum, SideStringTypes } from "./rover.types";

export const moveRover = (
  orientation: OrientationStringTypes,
  currentX: number,
  currentY: number
) => {
  const coordinates = { x: currentX, y: currentY };
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

export const rotateRover = (
  orientation: OrientationStringTypes,
  rotateTo: SideStringTypes
) => {
  if (orientation === "N" && rotateTo === "R") {
    return "E";
  }
  let newPositionDegrees = OrientationEnum[orientation] + SideEnum[rotateTo];
  if (newPositionDegrees === 0) {
    newPositionDegrees = 360;
  }
  return OrientationEnum[newPositionDegrees];
};