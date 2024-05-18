import { ItemId } from "./items";
import { SkillId } from "~/stores/skill";

export type WeightedItem = {
  itemId: ItemId;
  weight: number;
};

export type SpotResource = {
  name: string;
  img: string;
  skillId: SkillId;
  levelReq?: number;
  products?: WeightedItem[];
  interval: number;
};
export type SpotCooking = {
  name: string;
  img: string;
  skillId: SkillId;
  levelReq?: number;
  products?: WeightedItem[];
  interval: number;
};
export type SpotSleeping = {
  name: string;
  img: string;
  skillId: SkillId;
  levelReq?: number;
  products?: WeightedItem[];
  interval: number;
};

export enum ResourceSpotId {
  UndefinedSpot,
  SmallFishingSpot,
  OakTree,
}
export enum CookingSpotId {}
export enum SleepingSpotId {}

export const resourceSpots: Record<ResourceSpotId, SpotResource> = {
  [ResourceSpotId.UndefinedSpot]: {
    name: "",
    img: "",
    skillId: SkillId.Archery,
    interval: 1,
  },
  [ResourceSpotId.SmallFishingSpot]: {
    name: "Small Fishing Spot",
    img: "",
    skillId: SkillId.Fishing,
    products: [
      {
        itemId: ItemId.RawPanfish,
        weight: 1000,
      },
      {
        itemId: ItemId.RawBluegill,
        weight: 300,
      },
      {
        itemId: ItemId.WoodenSword,
        weight: 100,
      },
      {
        itemId: ItemId.IronSword,
        weight: 100,
      },
      {
        itemId: ItemId.LeatherBoots,
        weight: 100,
      },
    ],
    interval: 3,
  },
  [ResourceSpotId.OakTree]: {
    name: "Oak Tree",
    img: "/sprites/spot_oak.png",
    skillId: SkillId.Woodcutting,
    products: [{ itemId: ItemId.OakLog, weight: 100 }],
    interval: 3,
  },
};
export const cookingSpots: SpotCooking[] = [];
export const sleepingSpots: SpotSleeping[] = [];
