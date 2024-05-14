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
  title: string;
  img: string;
  // unit
  dialog: {
    questions: Question[];
  };
};

export enum NpcId {
  Harold,
}

export const npcs: Record<NpcId, Npc> = {
  [NpcId.Harold]: {
    name: "Harold",
    title: "Innkeeper",
    img: "/npcs/11.png",
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
