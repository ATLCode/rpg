import { ItemId } from "./items";
import { SkillId } from "~/stores/skill";
import type { WeightedObject } from "~/utils/weight-calculation";

export type WeightedItem = WeightedObject<ItemId>;

// Should itemId actually be abilityId here? So we pick ability to run that then gives the item, xp etc.

export type SpotResource = {
  name: string;
  img: string;
  skillId: SkillId;
  products?: WeightedItem[];
  interval: number;
};
export type SpotRefining = {
  name: string;
  img: string;
  skillId: SkillId;
  interval: number;
};
export type SpotSleeping = {
  name: string;
  img: string;
  skillId: SkillId;
  products?: WeightedItem[];
  interval: number;
};

export enum ResourceSpotId {
  IronOre = "IronOre",
  SmallFishingSpot = "SmallFishingSpot",
  OakTree = "OakTree",
}
export enum RefiningSpotId {
  Campfire = "Campfire",
}
export enum SleepingSpotId {}

export const resourceSpots: Record<ResourceSpotId, SpotResource> = {
  [ResourceSpotId.IronOre]: {
    name: "",
    img: "",
    skillId: SkillId.Archery,
    interval: 1,
  },
  [ResourceSpotId.SmallFishingSpot]: {
    name: "Small Fishing Spot",
    img: "/sprites/small_fishing.png",
    skillId: SkillId.Fishing,
    products: [
      {
        id: ItemId.RawPanfish,
        weight: 1000,
      },
      {
        id: ItemId.RawBluegill,
        weight: 300,
      },
      {
        id: ItemId.WoodenSword,
        weight: 100,
      },
      {
        id: ItemId.IronSword,
        weight: 100,
      },
      {
        id: ItemId.LeatherBoots,
        weight: 100,
      },
    ],
    interval: 3,
  },
  [ResourceSpotId.OakTree]: {
    name: "Oak Tree",
    img: "/sprites/spot_oak.png",
    skillId: SkillId.Woodcutting,
    products: [{ id: ItemId.OakLog, weight: 100 }],
    interval: 3,
  },
};
export const refiningSpots: Record<RefiningSpotId, SpotRefining> = {
  [RefiningSpotId.Campfire]: {
    name: "Campfire",
    img: "/sprites/campfire.png",
    skillId: SkillId.Cooking,
    interval: 3,
  },
};
