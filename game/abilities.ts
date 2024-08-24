import { GameItemType, ItemId, type GameItem } from "../types/item.types";
import { items } from "./items";

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

export enum SkillId {
  Fishing = "Fishing",
  Woodcutting = "Woodcutting",
  Cooking = "Cooking",
  Melee = "Melee",
  Ranged = "Ranged",
  Magic = "Magic",
}

export enum AbilityId {
  CutOak = "CutOak",
  FishPanfish = "FishPanfish",
  FishBluegill = "FishBluegill",
  CookPanfish = "CookPanfish",
  CookBluegill = "CookBluegill",
  BasicPunch = "BasicPunch",
  BasicKick = "BasicKick",
}

export type Ability = {
  id: AbilityId;
  name: string;
  skillId: SkillId;
  levelReq: number;
  isActive: boolean;
  isAutomatic: boolean;
  effects?: Effect[];
  itemPropertyReq?: number[];
  xp?: number;
  product?: GameItem;
  ingredients?: ItemId[];
  cost?: number;
};

/*
Should we do this with all skills? Like chopping X wood would be ability and so on?
Abilities could have follwing keys:
isAutomatic (You get this ability as you level up)
isCombat (Shows up during combat)
*/

export const abilities: Record<AbilityId, Ability> = {
  [AbilityId.CutOak]: {
    id: AbilityId.CutOak,
    name: "Cut Oak",
    skillId: SkillId.Fishing,
    levelReq: 1,
    isActive: false,
    isAutomatic: true,
  },
  [AbilityId.FishPanfish]: {
    id: AbilityId.FishPanfish,
    name: "Fish Panfish",
    skillId: SkillId.Fishing,
    levelReq: 1,
    isActive: false,
    isAutomatic: true,
  },
  [AbilityId.FishBluegill]: {
    id: AbilityId.FishBluegill,
    name: "Fish Bluegill",
    skillId: SkillId.Fishing,
    levelReq: 5,
    isActive: false,
    isAutomatic: true,
  },
  [AbilityId.BasicPunch]: {
    id: AbilityId.BasicPunch,
    name: "Basic Punch",
    skillId: SkillId.Melee,
    levelReq: 1,
    isActive: true,
    isAutomatic: true,
    effects: [
      {
        effectType: EffectType.Damage,
        value: 1,
        damageType: DamageType.Blunt,
      },
    ],
    cost: 2,
    xp: 5,
  },
  [AbilityId.BasicKick]: {
    id: AbilityId.BasicKick,
    name: "Basic Kick",
    skillId: SkillId.Melee,
    levelReq: 1,
    isActive: true,
    isAutomatic: true,
    effects: [
      {
        effectType: EffectType.Damage,
        value: 5,
        damageType: DamageType.Blunt,
      },
    ],
    cost: 3,
    xp: 10,
  },
  [AbilityId.CookPanfish]: {
    id: AbilityId.CookPanfish,
    name: "Cook Panfish",
    skillId: SkillId.Cooking,
    xp: 10,
    ingredients: [ItemId.RawPanfish],
    product: {
      type: GameItemType.Loot,
      index: 0,
      itemId: ItemId.CookedPanfish,
      item: items[ItemId.CookedPanfish],
      currentStackSize: 1,
    },
    levelReq: 1,
    isActive: false,
    isAutomatic: true,
  },
  [AbilityId.CookBluegill]: {
    id: AbilityId.CookBluegill,
    name: "Cook Bluegill",
    skillId: SkillId.Cooking,
    xp: 10,
    ingredients: [ItemId.RawBluegill],
    product: {
      type: GameItemType.Loot,
      index: 0,
      itemId: ItemId.CookedBluegill,
      item: items[ItemId.CookedBluegill],
      currentStackSize: 1,
    },
    levelReq: 5,
    isActive: false,
    isAutomatic: true,
  },
};
