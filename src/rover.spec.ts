const NO_SPACE_FOR_LANDING = require("./constants");

import { landRoverJourney } from "./landRoverJourney";
import { OrientationStringTypes } from "./rover.types";

const instructions = [
  {
    description: "Rover 1",
    plateau: [5, 5],
    landingCoordinatesAndOrientation: [1, 2, "N"],
    instructionSet: "LMLMLMLMM",
    expectedResult: [1, 3, "N"],
  },
  {
    description: "Rover 2",
    plateau: [5, 5],
    landingCoordinatesAndOrientation: [3, 3, "E"],
    instructionSet: "MMRMMRMRRM",
    expectedResult: [5, 1, "E"],
  },
];

describe("Rover Tests", () => {
  it("should return a message indicating plateau is not big enough for landing coordinates", () => {
    const expected = NO_SPACE_FOR_LANDING;
    const result = landRoverJourney(1, 1)(1, 2, "N")("LMRLM");
    expect(result).toBe(expected);
  });

  instructions.map((instruction) => {
    const {
      plateau,
      description,
      landingCoordinatesAndOrientation,
      instructionSet,
      expectedResult,
    } = instruction;
    it(`should test ${description}'s journey`, () => {
      const expected = expectedResult;
      const result = landRoverJourney(plateau[0], plateau[1])(
        landingCoordinatesAndOrientation[0] as number,
        landingCoordinatesAndOrientation[1] as number,
        landingCoordinatesAndOrientation[2] as OrientationStringTypes,
      )(instructionSet);
      expect(result).toBe(expected);
    });
  });
});
