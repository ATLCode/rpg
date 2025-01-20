import type { Coordinates } from "./general.types";
import type { SkillId } from "./skill.types";
import type { ItemProperty } from "./item.types";
import type { AbilityId } from "~/game/abilities";

export enum DamageType {
  Blunt = "Blunt",
  Slash = "Slash",
  Pierce = "Pierce",
}
export enum EffectType {
  Damage = "Damage",
  Heal = "Heal",
  Stun = "Stun",
  Poison = "Poison",
  Move = "Move",
}

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
export enum AbilityType {
  Targeted = "Targeted",
  Shaped = "Shaped",
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
  cost: AbilityCost;
  skillId: SkillId | null;
  levelReq: number;
  isAutomatic: boolean; // Do you get this ability automatically with level up
  xp: number;
  energyCost: number;
  itemPropertyReq?: ItemProperty[];
  effects: Effect[];
  abilityType: AbilityType;
  shape?: AbilityShapeInfo;
  target?: AbilityTargetInfo;
};
