import { ActionType, type Action } from "~/types/action.types";
import { ItemId } from "~/types/item.types";
import { SkillId } from "~/types/skill.types";
import { items } from "./items";

export enum ActionId {
  CutOak = "CutOak",
  FishPanfish = "FishPanfish",
  FishBluegill = "FishBluegill",
  CookPanfish = "CookPanfish",
  CookBluegill = "CookBluegill",
}

export const actions: Record<ActionId, Action> = {
  [ActionId.CutOak]: {
    id: ActionId.CutOak,
    actionType: ActionType.Gather,
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
  [ActionId.FishPanfish]: {
    id: ActionId.FishPanfish,
    actionType: ActionType.Gather,
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
  [ActionId.FishBluegill]: {
    id: ActionId.FishBluegill,
    actionType: ActionType.Gather,
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
  [ActionId.CookPanfish]: {
    id: ActionId.CookPanfish,
    actionType: ActionType.Craft,
    name: "Cook Panfish",
    skillId: SkillId.Cooking,
    levelReq: 1,
    isAutomatic: true,
    xp: 10,
    energyCost: 5,
    craftingDetails: {
      ingredients: [{ itemId: ItemId.RawPanfish, amount: 2 }],
      product: {
        itemId: ItemId.CookedPanfish,
        item: items[ItemId.CookedPanfish],
        currentStackSize: 1,
      },
    },
  },
  [ActionId.CookBluegill]: {
    id: ActionId.CookPanfish,
    actionType: ActionType.Craft,
    name: "Cook Panfish",
    skillId: SkillId.Cooking,
    levelReq: 5,
    isAutomatic: true,
    xp: 10,
    energyCost: 5,
    craftingDetails: {
      ingredients: [{ itemId: ItemId.RawBluegill, amount: 2 }],
      product: {
        itemId: ItemId.CookedBluegill,
        item: items[ItemId.CookedBluegill],
        currentStackSize: 1,
      },
    },
  },
};
