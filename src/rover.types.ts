export enum OrientationEnum {
  N = 360,
  E = 90,
  S = 180,
  W = 270
}
export type OrientationStringTypes = keyof typeof OrientationEnum;

export enum SideEnum {
  L = -90,
  R = +90
}
export type SideStringTypes = keyof typeof SideEnum;