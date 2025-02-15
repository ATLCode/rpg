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
      coordinates: { x: 0, y: 0 },
    },
    "1;0": {
      coordinates: { x: 1, y: 0 },
    },
    "2;0": {
      coordinates: { x: 2, y: 0 },
    },
    "3;0": {
      coordinates: { x: 3, y: 0 },
    },
    "4;0": {
      coordinates: { x: 4, y: 0 },
    },
    "5;0": {
      coordinates: { x: 5, y: 0 },
    },
    "6;0": {
      coordinates: { x: 6, y: 0 },
    },
    "7;0": {
      coordinates: { x: 7, y: 0 },
    },
    "8;0": {
      coordinates: { x: 8, y: 0 },
    },
    "9;0": {
      coordinates: { x: 9, y: 0 },
    },
    "10;0": {
      coordinates: { x: 10, y: 0 },
    },
    "0;1": {
      coordinates: { x: 0, y: 1 },
    },
    "1;1": {
      coordinates: { x: 1, y: 1 },
    },
    "2;1": {
      coordinates: { x: 2, y: 1 },
    },
    "3;1": {
      coordinates: { x: 3, y: 1 },
    },
    "4;1": {
      coordinates: { x: 4, y: 1 },
    },
    "5;1": {
      coordinates: { x: 5, y: 1 },
    },
    "6;1": {
      coordinates: { x: 6, y: 1 },
    },
    "7;1": {
      coordinates: { x: 7, y: 1 },
    },
    "8;1": {
      coordinates: { x: 8, y: 1 },
    },
    "9;1": {
      coordinates: { x: 9, y: 1 },
    },
    "10;1": {
      coordinates: { x: 10, y: 1 },
    },
    "0;2": {
      coordinates: { x: 0, y: 2 },
    },
    "1;2": {
      coordinates: { x: 1, y: 2 },
    },
    "2;2": {
      coordinates: { x: 2, y: 2 },
    },
    "3;2": {
      coordinates: { x: 3, y: 2 },
    },
    "4;2": {
      coordinates: { x: 4, y: 2 },
    },
    "5;2": {
      coordinates: { x: 5, y: 2 },
    },
    "6;2": {
      coordinates: { x: 6, y: 2 },
    },
    "7;2": {
      coordinates: { x: 7, y: 2 },
    },
    "8;2": {
      coordinates: { x: 8, y: 2 },
    },
    "9;2": {
      coordinates: { x: 9, y: 2 },
    },
    "10;2": {
      coordinates: { x: 10, y: 2 },
    },
    "0;3": {
      coordinates: { x: 0, y: 3 },
    },
    "1;3": {
      coordinates: { x: 1, y: 3 },
    },
    "2;3": {
      coordinates: { x: 2, y: 3 },
    },
    "3;3": {
      coordinates: { x: 3, y: 3 },
    },
    "4;3": {
      coordinates: { x: 4, y: 3 },
    },
    "5;3": {
      coordinates: { x: 5, y: 3 },
    },
    "6;3": {
      coordinates: { x: 6, y: 3 },
    },
    "7;3": {
      coordinates: { x: 7, y: 3 },
    },
    "8;3": {
      coordinates: { x: 8, y: 3 },
    },
    "9;3": {
      coordinates: { x: 9, y: 3 },
    },
    "10;3": {
      coordinates: { x: 10, y: 3 },
    },
    "0;4": {
      coordinates: { x: 0, y: 4 },
    },
    "1;4": {
      coordinates: { x: 1, y: 4 },
    },
    "2;4": {
      coordinates: { x: 2, y: 4 },
    },
    "3;4": {
      coordinates: { x: 3, y: 4 },
    },
    "4;4": {
      coordinates: { x: 4, y: 4 },
    },
    "5;4": {
      coordinates: { x: 5, y: 4 },
    },
    "6;4": {
      coordinates: { x: 6, y: 4 },
    },
    "7;4": {
      coordinates: { x: 7, y: 4 },
    },
    "8;4": {
      coordinates: { x: 8, y: 4 },
    },
    "9;4": {
      coordinates: { x: 9, y: 4 },
    },
    "10;4": {
      coordinates: { x: 10, y: 4 },
    },
    "0;5": {
      coordinates: { x: 0, y: 5 },
    },
    "1;5": {
      coordinates: { x: 1, y: 5 },
    },
    "2;5": {
      coordinates: { x: 2, y: 5 },
    },
    "3;5": {
      coordinates: { x: 3, y: 5 },
    },
    "4;5": {
      coordinates: { x: 4, y: 5 },
    },
    "5;5": {
      coordinates: { x: 5, y: 5 },
    },
    "6;5": {
      coordinates: { x: 6, y: 5 },
    },
    "7;5": {
      coordinates: { x: 7, y: 5 },
    },
    "8;5": {
      coordinates: { x: 8, y: 5 },
    },
    "9;5": {
      coordinates: { x: 9, y: 5 },
    },
    "10;5": {
      coordinates: { x: 10, y: 5 },
    },
    "0;6": {
      coordinates: { x: 0, y: 6 },
    },
    "1;6": {
      coordinates: { x: 1, y: 6 },
    },
    "2;6": {
      coordinates: { x: 2, y: 6 },
    },
    "3;6": {
      coordinates: { x: 3, y: 6 },
    },
    "4;6": {
      coordinates: { x: 4, y: 6 },
    },
    "5;6": {
      coordinates: { x: 5, y: 6 },
    },
    "6;6": {
      coordinates: { x: 6, y: 6 },
    },
    "7;6": {
      coordinates: { x: 7, y: 6 },
    },
    "8;6": {
      coordinates: { x: 8, y: 6 },
    },
    "9;6": {
      coordinates: { x: 9, y: 6 },
    },
    "10;6": {
      coordinates: { x: 10, y: 6 },
    },
  },
};
