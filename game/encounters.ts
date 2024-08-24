/* 
Encounter types:
-Straight combat
-Scenario and Multiple choice question ("You see X thing, what do you do? 2-5 options or something?", How to resolve?)
*/
import { ItemId } from "../types/item.types";
import { units } from "./units";
import type { Unit } from "~/stores/player";

export type WeightedItem = WeightedObject<ItemId>;

export type Encounter = {
  enemyGroup: Unit[];
};

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
