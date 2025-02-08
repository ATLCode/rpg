import type { SkillId } from "./skill.types";
import type { SpotId } from "~/game/spots";
import type { ActionId } from "~/game/actions";

export type WeightedActionId = WeightedObject<ActionId>;

export enum SpotType {
  Craft = "Craft",
  Gather = "Gather",
  Rest = "Rest",
}

export type SpotGatherDetails = {
  actions: WeightedActionId[];
  // extraDrops: WeightedSomething[];
  interval: number;
};
export type SpotCraftDetails = {
  actions: ActionId[];
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
