/* 
Encounter types:
-Straight combat
-Scenario and Multiple choice question ("You see X thing, what do you do? 2-5 options or something?", How to resolve?)
*/
import { units } from "./units";
import type { Unit } from "~/stores/player";

export type Encounter = {
  enemyGroup: Unit[];
};
export type WeightedEncounter = WeightedObject<Encounter>;

export enum EncounterId {
  Thief = "Thief",
  Guards = "Guards",
}

export const encounters: Record<EncounterId, Encounter> = {
  [EncounterId.Guards]: {
    enemyGroup: [units.Guard, units.Guard],
  },
  [EncounterId.Thief]: {
    enemyGroup: [units.Thief],
  },
};
