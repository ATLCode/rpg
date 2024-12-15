import type { GameItem, ItemId, ItemProperty } from "./item.types";
import type { AbilityId } from "~/game/abilities";

export enum AbilityType {
  Gather = "Gather",
  Craft = "Craft",
  Disocver = "Discover",
  Perform = "Perform",
  Plant = "Plant",
  Harvest = "Harvest",
  Combat = "Combat",
}
export enum SkillId {
  Fishing = "Fishing",
  Woodcutting = "Woodcutting",
  Cooking = "Cooking",
  Melee = "Melee",
  Ranged = "Ranged",
  Magic = "Magic",
  Mining = "Mining",
}
export enum DamageType {
  Blunt = "Blunt",
  Slashing = "Slashing",
  Piercing = "Piercing",
}
export enum EffectType {
  Damage = "Damage",
  Heal = "Heal",
  Stun = "Stun",
  Poison = "Poison",
}
export type Effect = {
  effectType: EffectType;
  value: number;
  damageType?: DamageType;
};
export type Ingredient = {
  itemId: ItemId;
  amount: number;
};
export type CombatDetails = {
  effects: Effect[];
  actionPointCost: number;
};
export type GatherDetails = {
  product: GameItem;
};
export type CraftingDetails = {
  ingredients: Ingredient[];
  product: GameItem;
};

export type Ability = {
  id: AbilityId;
  abilityType: AbilityType;
  name: string;
  skillId: SkillId;
  levelReq: number;
  isAutomatic: boolean; // Do you get this ability automatically with level up
  xp: number;
  energyCost: number;
  itemPropertyReq?: ItemProperty[];
  combatDetails?: CombatDetails;
  gatherDetails?: GatherDetails;
  craftingDetails?: CraftingDetails;
};
