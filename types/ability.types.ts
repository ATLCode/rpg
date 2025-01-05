import type { GameItem, ItemId, ItemProperty } from "./item.types";
import type { AbilityId } from "~/game/abilities";
import type { SkillId } from "./skill.types";

export enum AbilityType {
  Combat = "Combat",
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
export enum CombatActionType {
  MainAction = "MainAction",
  SideAction = "SideAction",
}
export type Effect = {
  effectType: EffectType;
  value: number;
  damageType?: DamageType;
};

export type CombatDetails = {
  effects: Effect[];
  actionType: CombatActionType;
};

export type Ability = {
  id: AbilityId;
  abilityType: AbilityType;
  name: string;
  img: string;
  skillId: SkillId | null;
  levelReq: number;
  isAutomatic: boolean; // Do you get this ability automatically with level up
  xp: number;
  energyCost: number;
  itemPropertyReq?: ItemProperty[];
  combatDetails?: CombatDetails;
};
