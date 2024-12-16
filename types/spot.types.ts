import type { SkillId } from "./ability.types";
import type { SpotId } from "~/game/spots";
import type { AbilityId } from "~/game/abilities";

export type WeightedAbilityId = WeightedObject<AbilityId>;

export enum SpotType {
  Craft = "Craft",
  Gather = "Gather",
  Rest = "Rest",
}

export type SpotGatherDetails = {
  abilities: WeightedAbilityId[];
  // extraDrops: WeightedSomething[];
  interval: number;
};
export type SpotCraftDetails = {
  abilities: AbilityId[];
  interval: number;
};

export type Spot = {
  id: SpotId;
  spotType: SpotType;
  name: string;
  img: string;
  skillId: SkillId | null;
  gatherDetails?: SpotGatherDetails;
  crafDetails?: SpotCraftDetails;
};

export enum CampSpot {
  Cooking = "Cooking",
  Sleeping = "Sleeping",
  Storage = "Storage",
}
