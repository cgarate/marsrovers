export enum OrientationEnum {
  N = 360,
  E = 90,
  S = 180,
  W = 270,
}
export type OrientationStringTypes = keyof typeof OrientationEnum;

export enum SideEnum {
  L = -90,
  R = +90,
}
export type SideStringTypes = keyof typeof SideEnum;

export interface InstructionsType {
  plateauSizeX?: number;
  plateauSizeY?: number;
  roverName?: string;
  landingX?: number;
  landingY?: number;
  orientation?: OrientationStringTypes;
  instructionSet?: string;
}
