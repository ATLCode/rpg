import { type GameItem } from "../types/item.types";
import { AbilityId } from "./abilities";
import { SpotType, type Spot } from "~/types/spot.types";

import { SkillId } from "~/types/ability.types";

export type WeightedGameItem = WeightedObject<GameItem>;

// Should itemId actually be abilityId here? So we pick ability to run that then gives the item, xp etc.

/*
Spots shouldn't have products array of WeightedGameItems, they should have abilities array of weighted abilities.
First we choose ability, then that ability will give us the item, xp everything else.

*/

export enum SpotId {
  Bedroll = "Bedroll",
  Campfire = "Campfire",
  IronVein = "IronVein",
  SmallFishingSpot = "SmallFishingSpot",
  OakTree = "OakTree",
}

export const spots: Record<SpotId, Spot> = {
  [SpotId.Bedroll]: {
    id: SpotId.Bedroll,
    spotType: SpotType.Sleeping,
    name: "Bedroll",
    img: "/sprites/bedroll.png",
    skillId: null,
  },
  [SpotId.Campfire]: {
    id: SpotId.Campfire,
    spotType: SpotType.Craft,
    name: "Campfire",
    img: "/sprites/campfire.png",
    skillId: SkillId.Cooking,
    crafDetails: {
      abilities: [],
      interval: 5,
    },
  },
  [SpotId.IronVein]: {
    id: SpotId.IronVein,
    spotType: SpotType.Gather,
    name: "Iron Vein",
    img: "",
    skillId: SkillId.Mining,
    gatherDetails: {
      abilities: [],
      interval: 5,
    },
  },
  [SpotId.SmallFishingSpot]: {
    id: SpotId.SmallFishingSpot,
    spotType: SpotType.Gather,
    name: "Small Fishing Spot",
    img: "/sprites/small_fishing.png",
    skillId: SkillId.Fishing,
    gatherDetails: {
      abilities: [
        { object: AbilityId.FishPanfish, weight: 500 },
        { object: AbilityId.FishBluegill, weight: 100 },
      ],
      interval: 5,
    },
  },
  [SpotId.OakTree]: {
    id: SpotId.OakTree,
    spotType: SpotType.Gather,
    name: "Oak Tree",
    img: "/sprites/spot_oak.png",
    skillId: SkillId.Woodcutting,
    gatherDetails: {
      abilities: [{ object: AbilityId.CutOak, weight: 100 }],
      interval: 5,
    },
  },
};
