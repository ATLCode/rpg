import type { GameItem, WeightedLoot } from "./item.types";
import type { AbilityId } from "~/game/abilities";

export type Unit = {
  isPlayer?: boolean;
  name: string;
  img: string;
  currentActionPoints: number;
  maxActionPoints: number;
  currentHealth: number;
  maxHealth: number;
  abilities: AbilityId[];
  drops?: WeightedLoot[];
  // resistances
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

export type CombatState = {
  grid: CombatGrid;
  playerGroup: Unit[];
  enemyGroup: Unit[];
  playerGroupTurn: boolean;
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
