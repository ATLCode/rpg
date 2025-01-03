import { AbilityId } from "./abilities";
import { items } from "./items";
import type { Unit } from "~/types/combat.types";
import { ItemId } from "~/types/item.types";

export enum UnitId {
  Thief = "Thief",
  Guard = "Guard",
}

export const units: Record<UnitId, Unit> = {
  [UnitId.Thief]: {
    name: "Thief",
    img: "/npcs/27.png",
    currentActionPoints: 3,
    maxActionPoints: 3,
    currentHealth: 10,
    maxHealth: 10,
    abilities: [AbilityId.BasicKick],
    drops: [
      {
        object: {
          itemId: ItemId.WoodenSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        weight: 300,
      },
      {
        object: {
          itemId: ItemId.IronSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        weight: 100,
      },
    ],
  },
  [UnitId.Guard]: {
    name: "Guard",
    img: "/npcs/27.png",
    currentActionPoints: 3,
    maxActionPoints: 3,
    currentHealth: 10,
    maxHealth: 10,
    abilities: [AbilityId.BasicPunch],
    drops: [
      {
        object: {
          itemId: ItemId.WoodenSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        weight: 300,
      },
      {
        object: {
          itemId: ItemId.IronSword,
          item: items[ItemId.IronSword],
          currentStackSize: 1,
        },
        weight: 100,
      },
    ],
  },
};
