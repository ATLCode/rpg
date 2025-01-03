// Possible way to do dialog in game

import type { CombatId } from "~/game/combat";
import type { NodeId } from "~/game/dialogue";

export enum ChoiceType {
  NodeId = "NodeId",
  ShopId = "ShopId",
  FightId = "FightId",
  EndDialog = "EndDialog",
  CombatId = "CombatId",
  // Finish conversation option
}

export enum DialogueNodeType {
  Conversation = "Conversation",
  Center = "Center",
}

export type PlayerChoice = {
  text: string;
  type: ChoiceType;
  target: NodeId | CombatId | null;
  // Some key for conditionally showing it if certain things are true
};

export type DialogueNode = {
  id: NodeId;
  type: DialogueNodeType;
  text: string[]; // Often only one, but can be multiple before player gets to choose.
  img?: string; // Incase we use something other than default image
  playerChoices: PlayerChoice[];
};

export type Dialogue = {
  nodes: DialogueNode[];
};
