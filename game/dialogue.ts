import {
  ChoiceType,
  DialogueNodeType,
  type Dialogue,
} from "~/types/dialogue.types";

export enum DialogueId {
  TestConversation = "TestConversation",
}
export enum NodeId {
  TestGreeting = "TestGreeting",
  TestGoodbye = "TestGoodbye",
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
};
