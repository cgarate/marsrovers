const readline = require("readline");
const fs = require("fs");
import { landRoverJourney } from "./landRoverJourney";
import { InstructionsType } from "./rover.types";

const processInstructionsFromFile = async (
  fileName: string,
): Promise<InstructionsType[]> => {
  const fileStream = fs.createReadStream(fileName);
  const streamOfLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let roverMissionDetails: InstructionsType = {};
  const roverMissions: InstructionsType[] = [];

  for await (const line of streamOfLines) {
    if (line.includes("Plateau")) {
      const plateauSize = line.split(":")[1].split(" ");
      roverMissionDetails = {
        plateauSizeX: Number(plateauSize[0]),
        plateauSizeY: Number(plateauSize[1]),
      };
    }

    if (line.includes("Landing")) {
      const roverLandingArray = line.split(":");
      const roverName = roverLandingArray[0].split(" ")[0];
      const roverLandingCoordsAndOrient = roverLandingArray[1].split(" ");

      roverMissionDetails = {
        ...roverMissionDetails,
        roverName: roverName,
        landingX: Number(roverLandingCoordsAndOrient[0]),
        landingY: Number(roverLandingCoordsAndOrient[1]),
        orientation: roverLandingCoordsAndOrient[2],
      };
    }

    if (line.includes("Instructions")) {
      const roverInstructions = line.split(":");
      const instructions = roverInstructions[1];

      roverMissionDetails = {
        ...roverMissionDetails,
        instructionSet: instructions,
      };
      roverMissions.push(roverMissionDetails);
    }
  }
  return roverMissions;
};

const runRoverInstructions = async () => {
  const argArray = process.argv.slice(2);

  // When reading from a file
  if (argArray[0] === "file") {
    // Parse the file and extract the instructions so we can pass it to the function
    const roverMissionDetails =
      (argArray[1] && (await processInstructionsFromFile(argArray[1]))) || [];

    // Run the function for each of the plans in the array
    const roverFinalPositions = roverMissionDetails.map((roverPlan) => {
      const {
        plateauSizeX,
        plateauSizeY,
        roverName,
        landingX,
        landingY,
        orientation,
        instructionSet,
      } = roverPlan;

      const roverJouney = landRoverJourney(plateauSizeX, plateauSizeY)(
        landingX,
        landingY,
        orientation,
      )(instructionSet);
      console.log(
        `${roverName}: ${roverJouney[0]} ${roverJouney[1]} ${roverJouney[2]}`,
      );
      return roverJouney;
    });
    return roverFinalPositions;
  }
};

runRoverInstructions();
