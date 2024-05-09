import { LocationId } from "./locations";

export type Path = {
  name: string;
  locations: [LocationId, LocationId];
  encounters: number[]; // Give type later
  reqSkills: null;
  reqItem: null;
  reqQuest: null;
  travelTime: number; // Seconds
};

export enum PathId {
  ForestPath,
}

export const paths: Record<PathId, Path> = {
  [PathId.ForestPath]: {
    name: "Forest Path",
    locations: [LocationId.Town, LocationId.Forest],
    encounters: [],
    reqSkills: null,
    reqItem: null,
    reqQuest: null,
    travelTime: 1,
  },
};
