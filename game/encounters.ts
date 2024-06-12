/* 
Encounter types:
-Straight combat
-Scenario and Multiple choice question ("You see X thing, what do you do? 2-5 options or something?", How to resolve?)
*/
import { AbilityId } from "./abilities";
import type { Unit } from "~/stores/player";

export type Encounter = {
  enemyGroup: Unit[];
  // dropTable
};

export enum EncounterId {
  Thief = "Thief",
  Guards = "Guards",
}

export const encounters: Record<EncounterId, Encounter> = {
  [EncounterId.Guards]: {
    enemyGroup: [
      {
        name: "Guard 1",
        img: "/npcs/27.png",
        currentActionPoints: 3,
        maxActionPoints: 3,
        currentHealth: 10,
        maxHealth: 10,
        abilities: [AbilityId.BasicKick],
      },
      {
        name: "Guard 2",
        img: "/npcs/27.png",
        currentActionPoints: 3,
        maxActionPoints: 3,
        currentHealth: 10,
        maxHealth: 10,
        abilities: [AbilityId.BasicPunch],
      },
    ],
  },
  [EncounterId.Thief]: {
    enemyGroup: [
      {
        name: "Thief",
        img: "/npcs/27.png",
        currentActionPoints: 3,
        maxActionPoints: 3,
        currentHealth: 10,
        maxHealth: 10,
        abilities: [AbilityId.BasicPunch],
      },
    ],
  },
};
