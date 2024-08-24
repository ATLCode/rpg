import { AbilityId } from "./abilities";
import { items } from "./items";
import { GameItemType, ItemId } from "~/types/item.types";

export enum UnitId {
  Thief = "Thief",
  Guard = "Guard",
}

export const units: Record<UnitId, Unit> = {
  [UnitId.Thief]: {
    name: "Guard 1",
    img: "/npcs/27.png",
    currentActionPoints: 3,
    maxActionPoints: 3,
    currentHealth: 10,
    maxHealth: 10,
    abilities: [AbilityId.BasicKick],
    drops: [
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.WoodenSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        weight: 300,
      },
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.IronSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        weight: 100,
      },
    ],
  },
  [UnitId.Guard]: {
    name: "Thief",
    img: "/npcs/27.png",
    currentActionPoints: 3,
    maxActionPoints: 3,
    currentHealth: 10,
    maxHealth: 10,
    abilities: [AbilityId.BasicPunch],
    drops: [
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.WoodenSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        weight: 300,
      },
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.IronSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        weight: 100,
      },
    ],
  },
};
