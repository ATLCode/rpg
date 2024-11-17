import { ItemId } from "../types/item.types";
import { DamageType, EffectType } from "./effects";
import { items } from "./items";
import { AbilityType, SkillId, type Ability } from "~/types/ability.types";

export enum AbilityId {
  CutOak = "CutOak",
  FishPanfish = "FishPanfish",
  FishBluegill = "FishBluegill",
  CookPanfish = "CookPanfish",
  CookBluegill = "CookBluegill",
  BasicPunch = "BasicPunch",
  BasicKick = "BasicKick",
}

export const abilities: Record<AbilityId, Ability> = {
  [AbilityId.CutOak]: {
    id: AbilityId.CutOak,
    abilityType: AbilityType.Gather,
    name: "Cut Oak",
    skillId: SkillId.Woodcutting,
    levelReq: 1,
    isAutomatic: true,
    xp: 3,
    energyCost: 1,
    gatherDetails: {
      product: {
        itemId: ItemId.OakLog,
        item: items[ItemId.OakLog],
        currentStackSize: 1,
      },
    },
  },
  [AbilityId.FishPanfish]: {
    id: AbilityId.FishPanfish,
    abilityType: AbilityType.Gather,
    name: "Fish Panfish",
    skillId: SkillId.Fishing,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 1,
    gatherDetails: {
      product: {
        itemId: ItemId.RawPanfish,
        item: items[ItemId.RawPanfish],
        currentStackSize: 1,
      },
    },
  },
  [AbilityId.FishBluegill]: {
    id: AbilityId.FishBluegill,
    abilityType: AbilityType.Gather,
    name: "Fish Bluegill",
    skillId: SkillId.Fishing,
    levelReq: 5,
    isAutomatic: true,
    xp: 5,
    energyCost: 1,
    gatherDetails: {
      product: {
        itemId: ItemId.RawBluegill,
        item: items[ItemId.RawBluegill],
        currentStackSize: 1,
      },
    },
  },
  [AbilityId.BasicPunch]: {
    id: AbilityId.BasicPunch,
    abilityType: AbilityType.Combat,
    name: "Basic Punch",
    skillId: SkillId.Melee,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 0,
    combatDetails: {
      effects: [
        {
          effectType: EffectType.Damage,
          value: 1,
          damageType: DamageType.Blunt,
        },
      ],
      actionPointCost: 2,
    },
  },
  [AbilityId.BasicKick]: {
    id: AbilityId.BasicKick,
    abilityType: AbilityType.Combat,
    name: "Basic Kick",
    skillId: SkillId.Melee,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 0,
    combatDetails: {
      effects: [
        {
          effectType: EffectType.Damage,
          value: 2,
          damageType: DamageType.Blunt,
        },
      ],
      actionPointCost: 2,
    },
  },
  [AbilityId.CookPanfish]: {
    id: AbilityId.CookPanfish,
    abilityType: AbilityType.Craft,
    name: "Cook Panfish",
    skillId: SkillId.Cooking,
    levelReq: 1,
    isAutomatic: true,
    xp: 10,
    energyCost: 5,
    craftingDetails: {
      ingredients: [ItemId.RawPanfish],
      product: {
        itemId: ItemId.CookedPanfish,
        item: items[ItemId.CookedPanfish],
        currentStackSize: 1,
      },
    },
  },
  [AbilityId.CookBluegill]: {
    id: AbilityId.CookPanfish,
    abilityType: AbilityType.Craft,
    name: "Cook Panfish",
    skillId: SkillId.Cooking,
    levelReq: 5,
    isAutomatic: true,
    xp: 10,
    energyCost: 5,
    craftingDetails: {
      ingredients: [ItemId.RawBluegill],
      product: {
        itemId: ItemId.CookedBluegill,
        item: items[ItemId.CookedBluegill],
        currentStackSize: 1,
      },
    },
  },
};
