import type { GameItem, ItemId, ItemProperty } from "./item.types";
import type { SkillId } from "./skill.types";
import type { ActionId } from "~/game/actions";

export enum ActionType {
  Gather = "Gather",
  Craft = "Craft",
  Disocver = "Discover",
  Perform = "Perform",
  Plant = "Plant",
  Harvest = "Harvest",
}
export type Ingredient = {
  itemId: ItemId;
  amount: number;
};
export type GatherDetails = {
  product: GameItem;
};
export type CraftingDetails = {
  ingredients: Ingredient[];
  product: GameItem;
};

export type Action = {
  id: ActionId;
  actionType: ActionType;
  name: string;
  skillId: SkillId;
  levelReq: number;
  isAutomatic: boolean; // Do you get this ability automatically with level up
  xp: number;
  energyCost: number;
  itemPropertyReq?: ItemProperty[];
  gatherDetails?: GatherDetails;
  craftingDetails?: CraftingDetails;
};
