export type Answer = {
  trigger: number;
  text: string;
};

export type Question = {
  id: number;
  isImmediate: boolean;
  isPersistent: boolean;
  triggers: number[];
  text: string;
  answers: Answer[];
};

export type Npc = {
  name: string;
  dialog: {
    questions: Question[];
  };
};

export enum NpcId {
  test,
}

export const npcs: Record<NpcId, Npc> = {
  [NpcId.test]: {
    name: "test",
    dialog: {
      questions: [
        {
          id: 1,
          isImmediate: false,
          isPersistent: false,
          triggers: [],
          text: "What's your name?",
          answers: [
            {
              trigger: 1,
              text: "My name is X",
            },
          ],
        },
      ],
    },
  },
};
