import { AbilityId } from "./abilities";
import { items } from "./items";
import { CombatSide, type Unit } from "~/types/combat.types";
import { ItemId } from "~/types/item.types";

export enum UnitId {
  Thief = "Thief",
  Guard = "Guard",
}

export const units: Record<UnitId, Unit> = {
  [UnitId.Thief]: {
    side: CombatSide.Enemy,
    name: "Thief",
    img: "/npcs/27.png",
    currentHealth: 10,
    maxHealth: 10,
    position: null,
    abilities: [
      AbilityId.BasicKick,
      AbilityId.Move,
      AbilityId.Bullseye,
      AbilityId.HealSelf,
      AbilityId.PykeUlt,
    ],
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
    hasMainAction: true,
    hasSideAction: true,
    resistances: {
      blunt: 1,
      slash: 1,
      pierce: 0,
    },
    cooldowns: [],
  },
  [UnitId.Guard]: {
    side: CombatSide.Enemy,
    name: "Guard",
    img: "/npcs/27.png",
    currentHealth: 10,
    maxHealth: 10,
    position: null,
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
    hasMainAction: true,
    hasSideAction: true,
    resistances: {
      blunt: 1,
      slash: 1,
      pierce: 0,
    },
    cooldowns: [],
  },
};
