import type { GameItem, WeightedLoot } from "./item.types";
import type { AbilityId } from "~/game/abilities";

export enum CombatSide {
  Player = "Player",
  Enemy = "Enemy",
}
export enum CombatStage {
  Setup = "Setup",
  Ongoing = "Ongoing",
  Finished = "Finished",
}

export type Unit = {
  isPlayer?: boolean;
  side: CombatSide;
  name: string;
  img: string;
  currentHealth: number;
  maxHealth: number;
  abilities: AbilityId[];
  drops?: WeightedLoot[];
  position: { x: number; y: number } | null;
  // resistances
  onTurnStart?: () => void;
};

export type Combat = {
  enemyGroup: Unit[];
};

export type Drop = {
  id: string;
  gameItem: GameItem;
};

export type CombatReturn = {
  gameState: GameState;
};

export type CombatTile = {
  test: string;
  unit?: Unit;
  // Others stuff here
};

export type CombatGrid = Record<string, CombatTile>;

export type Entity = {
  unit?: Unit;
  hasTurn: boolean;
  parent?: Unit;
};

export type CombatState = {
  grid: CombatGrid;
  entities: Unit[];
  currentTurn: {
    unitIndex: number;
  };
  rewards: {
    meleeExp: number;
    rangedExp: number;
    magicExp: number;
    drops: Drop[];
    selectedDrops: Drop[];
  };
  result: {
    isOver: boolean;
    isWon: boolean;
  };
};
