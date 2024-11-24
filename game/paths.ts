import { EncounterId, type WeightedEncounter } from "./encounters";
import { PinId } from "./locations";

export type Path = {
  name: string;
  locations: [PinId, PinId];
  encounters: WeightedEncounter[];
  encounterChecks: number;
  reqSkills: null;
  reqItem: null;
  reqQuest: null;
  travelTime: number; // Seconds
  energyCost: number;
  timeCost: number;
};

export enum PathId {
  ForestPath = "ForestPath",
  MountainPath = "MountainPath",
}

export const paths: Record<PathId, Path> = {
  [PathId.ForestPath]: {
    name: "Forest Path",
    locations: [PinId.Town, PinId.Forest],
    encounters: [
      { object: EncounterId.Empty, weight: 100 },
      { object: EncounterId.Thief, weight: 500 },
    ],
    encounterChecks: 1,
    reqSkills: null,
    reqItem: null,
    reqQuest: null,
    travelTime: 5,
    energyCost: 30,
    timeCost: 120,
  },
  [PathId.MountainPath]: {
    name: "Mountain Path",
    locations: [PinId.Forest, PinId.Mountain],
    encounters: [
      { object: EncounterId.Empty, weight: 100 },
      { object: EncounterId.Thief, weight: 500 },
    ],
    encounterChecks: 1,
    reqSkills: null,
    reqItem: null,
    reqQuest: null,
    travelTime: 5,
    energyCost: 30,
    timeCost: 120,
  },
};
