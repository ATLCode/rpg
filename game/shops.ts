import { items } from "./items";
import {
  ItemId,
  PriceModifierType,
  type PriceModifier,
  type stockSlot,
} from "~/types/item.types";

export type Shop = {
  currentMoney: number;
  maximumMoney: number;
  taxes: PriceModifier[];
  discounts: PriceModifier[];
  stock: stockSlot[];
};

export enum ShopId {
  HaroldsShop = "HaroldsShop",
}

export const shops: Record<ShopId, Shop> = {
  [ShopId.HaroldsShop]: {
    currentMoney: 500,
    maximumMoney: 1000,
    taxes: [{ type: PriceModifierType.ShopMargin, pct: 10 }],
    discounts: [],
    stock: [
      {
        gameItem: {
          itemId: ItemId.IronSword,
          item: items[ItemId.IronSword],
          currentStackSize: 1,
        },
        shopStackSize: 3,
        maxSize: 3,
      },
      {
        gameItem: {
          itemId: ItemId.WoodenSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        shopStackSize: 5,
        maxSize: 5,
      },
    ],
  },
};
