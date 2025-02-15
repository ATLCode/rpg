import type { Coordinates } from "./general.types";
import type {
  GameItem,
  WeightedLoot,
  ItemPropertyRequirement,
} from "./item.types";
import type { SkillId } from "./skill.types";
import type { AbilityId } from "~/game/abilities";

// TODO Combine combat and ability types
// Ask from Julius, resistances how sounds? Ideas on ability cost? Best way to do cooldowns?
// Also how should I do with stuff like abilities shape and target stuff? Do I need the ability type at all when I can just check if it has that key?
// Similarly on item type should I have key like "equippable" and in it have equip slot, resistances etc.

export enum CombatSide {
  Player = "Player",
  Enemy = "Enemy",
}
export enum CombatStage {
  Setup = "Setup",
  Ongoing = "Ongoing",
  Finished = "Finished",
}

export enum DamageType {
  Blunt = "Blunt",
  Slash = "Slash",
  Pierce = "Pierce",
}

export type Resistances = {
  blunt: number;
  slash: number;
  pierce: number;
};

export type AbilityCooldown = {
  abilityId: AbilityId;
  cooldown: number; // rounds
};

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
  resistances: Resistances;
  cooldowns: AbilityCooldown[];
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

export enum EffectType {
  Damage = "Damage",
  Heal = "Heal",
  Stun = "Stun",
  Poison = "Poison",
  Move = "Move",
}

export type CombatDrop = {
  id: string;
  effectType: EffectType;
  value?: number;
  timeout: number;
  coordinates: Coordinates;
};

export enum ShapeDirection {
  Top = "Top",
  Right = "Right",
  Bottom = "Bottom",
  Left = "Left",
  TopRight = "TopRight",
  BottomRight = "BottomRighst",
  TopLeft = "TopLeft",
  BottomLeft = "BottomLeft",
}

export enum AbilityCost {
  MainAction = "MainAction",
  SideAction = "SideAction",
}

export type Effect = {
  effectType: EffectType;
  value?: number;
  damageType?: DamageType;
};

// Shape effect is what's done for first effect in the ability, second effect looks for tiles to apply from the second shapeEffect and so on
// This allows us to have abilities like "dash 3 squares and do damage to square in front of you" etc. since we can have multiple effects and shapes in 1 ability
export type ShapeEffect = {
  coordinates: Coordinates[];
};

export type AbilityShape = {
  direction: ShapeDirection;
  shapeEffects: ShapeEffect[];
};

export type AbilityShapeInfo = {
  originRange: number;
  shapes: AbilityShape[];
};
export type AbilityTargetInfo = {
  range: number;
  effectRange: number;
};
// Ability can be either targeted or shaped
// If targeted, it doesn't need originRange, shapes etc.
// Targeted might later also have path requirement for projectiles or just separate ability type for that

export type Ability = {
  id: AbilityId;
  name: string;
  img: string;
  skillId: SkillId | null;
  levelReq: number;
  isAutomatic: boolean; // Do you get this ability automatically with level up
  xp: number;
  actionCost: AbilityCost;
  energyCost: number;
  cooldown: number; // Rounds
  itemPropertyReq: ItemPropertyRequirement[];
  effects: Effect[];
  shape?: AbilityShapeInfo;
  target?: AbilityTargetInfo;
};
