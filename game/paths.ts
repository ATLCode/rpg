import { EncounterId, type WeightedEncounter } from "./encounters";
import { LocationId } from "./locations";

export type Path = {
  name: string;
  locations: [LocationId, LocationId];
  encounters: WeightedEncounter[];
  encounterChecks: number;
  reqSkills: null;
  reqItem: null;
  reqQuest: null;
  travelTime: number; // Seconds
  energy: number;
};

export enum PathId {
  ForestPath,
}

export const paths: Record<PathId, Path> = {
  [PathId.ForestPath]: {
    name: "Forest Path",
    locations: [LocationId.Town, LocationId.Forest],
    encounters: [
      { object: EncounterId.Empty, weight: 100 },
      { object: EncounterId.Thief, weight: 500 },
    ],
    encounterChecks: 1,
    reqSkills: null,
    reqItem: null,
    reqQuest: null,
    travelTime: 5,
    energy: 30,
  },
};
