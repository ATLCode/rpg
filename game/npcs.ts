import { ItemId, type stockSlot } from "../types/item.types";
import { items } from "./items";
import { shops } from "./shops";

export type NpcResponse = {
  // Requirements
  trigger: number; // What are these? Maybe delete?
  text: string;
  // PlayerOptions
};

export type PlayerOption = {
  id: number;
  isImmediate: boolean;
  isPersistent: boolean;
  triggers: number[];
  text: string;
  // Requirements (have done this quest, have this skill etc)
  npcResponse: NpcResponse[];
};

export type ShopItem = {
  itemId: ItemId;
  currentStackSize: number;
  maximumStackSize: number;
  // could potentially have restockAmount, depends how I code restocking
  // Could have priceAdjustment for specific shop essentially
};

export enum NpcAction {
  Talk = "Talk",
  Shop = "Shop",
}

export enum NpcId {
  Harold,
}

export type Npc = {
  id: NpcId;
  name: string;
  title: string;
  img: string;
  // unit
  actions: NpcAction[];
  dialog: {
    // Greeting
    playerOption: PlayerOption[];
  };
  shop?: Shop;
};

export enum TransactionType {
  Buy = "Buy",
  Sell = "Sell",
}

export const npcs: Record<NpcId, Npc> = {
  [NpcId.Harold]: {
    id: NpcId.Harold,
    name: "Harold",
    title: "Shopkeepper",
    img: "/npcs/11.png",
    actions: [NpcAction.Shop],
    dialog: {
      playerOption: [
        {
          id: 1,
          isImmediate: false,
          isPersistent: false,
          triggers: [],
          text: "What's your name?",
          npcResponse: [
            {
              trigger: 1,
              text: "My name is X",
            },
          ],
        },
      ],
    },
    shop: shops.HaroldsShop,
  },
};
