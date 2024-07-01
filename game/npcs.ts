import { ItemId } from "./items";

export type Answer = {
  trigger: number;
  text: string;
};

export type Question = {
  id: number;
  isImmediate: boolean;
  isPersistent: boolean;
  triggers: number[];
  text: string;
  answers: Answer[];
};

export type ShopItem = {
  itemId: ItemId;
  currentStackSize: number;
  maximumStackSize: number;
  // could potentially have restockAmount, depends how I code restocking
  // Could have priceAdjustment for specific shop essentially
};

export type Shop = {
  currentMoney: number;
  maximumMoney: number;
  stock: ShopItem[];
};

export enum NpcAction {
  Talk = "Talk",
  Shop = "Shop",
}

export type Npc = {
  name: string;
  title: string;
  img: string;
  // unit
  actions: NpcAction[];
  dialog: {
    questions: Question[];
  };
  shop?: Shop;
};

export enum NpcId {
  Harold,
}

export const npcs: Record<NpcId, Npc> = {
  [NpcId.Harold]: {
    name: "Harold",
    title: "Innkeeper",
    img: "/npcs/11.png",
    actions: [NpcAction.Shop],
    dialog: {
      questions: [
        {
          id: 1,
          isImmediate: false,
          isPersistent: false,
          triggers: [],
          text: "What's your name?",
          answers: [
            {
              trigger: 1,
              text: "My name is X",
            },
          ],
        },
      ],
    },
    shop: {
      currentMoney: 500,
      maximumMoney: 1000,
      stock: [
        { itemId: ItemId.IronSword, currentStackSize: 3, maximumStackSize: 3 },
        {
          itemId: ItemId.WoodenSword,
          currentStackSize: 5,
          maximumStackSize: 5,
        },
      ],
    },
  },
};
