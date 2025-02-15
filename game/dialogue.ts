import { CombatId } from "./combat";
import {
  ChoiceType,
  DialogueNodeType,
  type Dialogue,
} from "~/types/dialogue.types";

export enum DialogueId {
  TestConversation = "TestConversation",
  TestEncounter = "TestEncounter",
}
export enum NodeId {
  TestGreeting = "TestGreeting",
  TestGoodbye = "TestGoodbye",
  TestAmbush = "TestAmbush",
}

export const dialogues: Record<DialogueId, Dialogue> = {
  [DialogueId.TestConversation]: {
    nodes: [
      {
        id: NodeId.TestGreeting,
        type: DialogueNodeType.Conversation,
        text: ["Hey!", "How are you doing?"],
        playerChoices: [
          {
            text: "Hello there! I'm doing good!",
            type: ChoiceType.NodeId,
            target: NodeId.TestGoodbye,
          },
        ],
      },
      {
        id: NodeId.TestGoodbye,
        type: DialogueNodeType.Conversation,
        text: ["Good to hear!", "See you around!"],
        playerChoices: [
          {
            text: "Goodbye!",
            type: ChoiceType.EndDialog,
            target: null,
          },
        ],
      },
    ],
  },
  [DialogueId.TestEncounter]: {
    nodes: [
      {
        id: NodeId.TestAmbush,
        type: DialogueNodeType.Center,
        text: [
          "As you are traveling you suddenly see a figure step out behind a tree",
          "You see in front of you a bandit demanding that you give all your valuables",
        ],
        playerChoices: [
          {
            text: "Give up your items",
            type: ChoiceType.EndDialog,
            target: null,
          },
          {
            text: "Fight back",
            type: ChoiceType.CombatId,
            target: CombatId.Thief,
          },
        ],
      },
    ],
  },
};
