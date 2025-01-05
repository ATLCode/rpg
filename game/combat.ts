import { units } from "./units";
import type { Combat, CombatGrid } from "~/types/combat.types";

export enum CombatId {
  Thief = "Thief",
}

export const combats: Record<CombatId, Combat> = {
  [CombatId.Thief]: {
    enemyGroup: [units.Thief],
  },
};

export enum CombatGridId {
  Basic = "Basic",
}

export const combatGrids: Record<CombatGridId, CombatGrid> = {
  [CombatGridId.Basic]: {
    "0;0": {
      test: "0",
    },
    "0;1": {
      test: "a",
    },
    "0;2": {
      test: "a",
    },
    "0;3": {
      test: "a",
    },
    "0;4": {
      test: "a",
    },
    "0;5": {
      test: "a",
    },
    "0;6": {
      test: "a",
    },
    "0;7": {
      test: "a",
    },
    "0;8": {
      test: "a",
    },
    "0;9": {
      test: "a",
    },
    "0;10": {
      test: "a",
    },
    "1;0": {
      test: "1",
    },
    "1;1": {
      test: "a",
    },
    "1;2": {
      test: "a",
    },
    "1;3": {
      test: "a",
    },
    "1;4": {
      test: "a",
    },
    "1;5": {
      test: "a",
    },
    "1;6": {
      test: "a",
    },
    "1;7": {
      test: "a",
    },
    "1;8": {
      test: "a",
    },
    "1;9": {
      test: "a",
    },
    "1;10": {
      test: "a",
    },
    "2;0": {
      test: "2",
    },
    "2;1": {
      test: "a",
    },
    "2;2": {
      test: "a",
    },
    "2;3": {
      test: "a",
    },
    "2;4": {
      test: "a",
    },
    "2;5": {
      test: "a",
    },
    "2;6": {
      test: "a",
    },
    "2;7": {
      test: "a",
    },
    "2;8": {
      test: "a",
    },
    "2;9": {
      test: "a",
    },
    "2;10": {
      test: "a",
    },
    "3;0": {
      test: "3",
    },
    "3;1": {
      test: "a",
    },
    "3;2": {
      test: "a",
    },
    "3;3": {
      test: "a",
    },
    "3;4": {
      test: "a",
    },
    "3;5": {
      test: "a",
    },
    "3;6": {
      test: "a",
    },
    "3;7": {
      test: "a",
    },
    "3;8": {
      test: "a",
    },
    "3;9": {
      test: "a",
    },
    "3;10": {
      test: "a",
    },
    "4;0": {
      test: "4",
    },
    "4;1": {
      test: "a",
    },
    "4;2": {
      test: "a",
    },
    "4;3": {
      test: "a",
    },
    "4;4": {
      test: "a",
    },
    "4;5": {
      test: "a",
    },
    "4;6": {
      test: "a",
    },
    "4;7": {
      test: "a",
    },
    "4;8": {
      test: "a",
    },
    "4;9": {
      test: "a",
    },
    "4;10": {
      test: "a",
    },
    "5;0": {
      test: "5",
    },
    "5;1": {
      test: "a",
    },
    "5;2": {
      test: "a",
    },
    "5;3": {
      test: "a",
    },
    "5;4": {
      test: "a",
    },
    "5;5": {
      test: "a",
    },
    "5;6": {
      test: "a",
    },
    "5;7": {
      test: "a",
    },
    "5;8": {
      test: "a",
    },
    "5;9": {
      test: "a",
    },
    "5;10": {
      test: "a",
    },
    "6;0": {
      test: "6",
    },
    "6;1": {
      test: "a",
    },
    "6;2": {
      test: "a",
    },
    "6;3": {
      test: "a",
    },
    "6;4": {
      test: "a",
    },
    "6;5": {
      test: "a",
    },
    "6;6": {
      test: "a",
    },
    "6;7": {
      test: "a",
    },
    "6;8": {
      test: "a",
    },
    "6;9": {
      test: "a",
    },
    "6;10": {
      test: "a",
    },
  },
};

