import type { Coordinates } from "./general.types";
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
  position: Coordinates | null;
  hasMainAction: boolean;
  hasSideAction: boolean;
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
  coordinates: Coordinates;
  // Others stuff here
};

export type CombatGrid = Record<string, CombatTile>;

export type Entity = {
  name: string;
  parent?: Unit;
};

export type CombatState = {
  grid: CombatGrid;
  units: Unit[];
  entities: Entity[];
  turnOrder: Unit[];
  currentTurnIndex: number;
  currentRound: number;
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
