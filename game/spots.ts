import { GameItemType, ItemId, type GameItem } from "../types/item.types";
import { items } from "./items";
import { SkillId } from "~/game/abilities";

export type WeightedGameItem = WeightedObject<GameItem>;

// Should itemId actually be abilityId here? So we pick ability to run that then gives the item, xp etc.

export type SpotResource = {
  name: string;
  img: string;
  skillId: SkillId;
  products?: WeightedGameItem[];
  interval: number;
  energy: number;
};
export type SpotRefining = {
  name: string;
  img: string;
  skillId: SkillId;
  interval: number;
  energy: number;
};
export type SpotSleeping = {
  name: string;
  img: string;
  interval: number;
  energyRestore: number;
};

export enum ResourceSpotId {
  IronOre = "IronOre",
  SmallFishingSpot = "SmallFishingSpot",
  OakTree = "OakTree",
}
export enum RefiningSpotId {
  Campfire = "Campfire",
}
export enum SleepingSpotId {
  Bedroll = "Bedroll",
}

export const resourceSpots: Record<ResourceSpotId, SpotResource> = {
  [ResourceSpotId.IronOre]: {
    name: "",
    img: "",
    skillId: SkillId.Ranged,
    interval: 1,
    energy: 10,
  },
  [ResourceSpotId.SmallFishingSpot]: {
    name: "Small Fishing Spot",
    img: "/sprites/small_fishing.png",
    skillId: SkillId.Fishing,
    products: [
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.RawPanfish,
          item: items[ItemId.RawPanfish],
          currentStackSize: 1,
        },
        weight: 1000,
      },
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.RawBluegill,
          item: items[ItemId.RawBluegill],
          currentStackSize: 1,
        },
        weight: 300,
      },
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.WoodenSword,
          item: items[ItemId.WoodenSword],
          currentStackSize: 1,
        },
        weight: 100,
      },
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.IronSword,
          item: items[ItemId.IronSword],
          currentStackSize: 1,
        },
        weight: 100,
      },
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.LeatherBoots,
          item: items[ItemId.LeatherBoots],
          currentStackSize: 1,
        },
        weight: 100,
      },
    ],
    interval: 3,
    energy: 10,
  },
  [ResourceSpotId.OakTree]: {
    name: "Oak Tree",
    img: "/sprites/spot_oak.png",
    skillId: SkillId.Woodcutting,
    products: [
      {
        id: {
          type: GameItemType.Loot,
          index: 0,
          itemId: ItemId.OakLog,
          item: items[ItemId.OakLog],
          currentStackSize: 1,
        },
        weight: 100,
      },
    ],
    interval: 3,
    energy: 20,
  },
};
export const refiningSpots: Record<RefiningSpotId, SpotRefining> = {
  [RefiningSpotId.Campfire]: {
    name: "Campfire",
    img: "/sprites/campfire.png",
    skillId: SkillId.Cooking,
    interval: 3,
    energy: 15,
  },
};
export const sleepingSpots: Record<SleepingSpotId, SpotSleeping> = {
  [SleepingSpotId.Bedroll]: {
    name: "Bedroll",
    img: "/sprites/bedroll.png",
    interval: 3,
    energyRestore: 100,
  },
};
