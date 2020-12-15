import { NO_SPACE_FOR_LANDING } from "./constants";
import { landRoverJourney } from "./rover";

const instructions = [
  {
    plateau: [5, 5],
    landingCoordinatesAndOrientation: [1, 2, "N"],
    instructionSet: "LMLMLMLMM",
  },
  {
    plateau: [5, 5],
    landingCoordinatesAndOrientation: [3, 3, "E"],
    instructionSet: "MMRMMRMRRM",
  },
];

describe("Rover Tests", () => {
  it("should return a message indicating plateau is not big enough for landing coordinates", () => {
    const expected = NO_SPACE_FOR_LANDING;
    const result = landRoverJourney(1, 1)(1, 2, "N")("LMRLM");
    expect(result).toBe(expected);
  });
});
