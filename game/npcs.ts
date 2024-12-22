import { DialogueId } from "./dialogue";

export enum NpcAction {
  Talk = "Talk",
  Shop = "Shop",
}

export enum NpcId {
  Harold = "Harold",
}

export type Npc = {
  id: NpcId;
  name: string;
  title: string;
  img: string;
  // unit
  actions: NpcAction[];
  dialogueId: DialogueId;
};

export enum TransactionType {
  Buy = "Buy",
  Sell = "Sell",
}

export const npcs: Record<NpcId, Npc> = {
  [NpcId.Harold]: {
    id: NpcId.Harold,
    name: "Harold",
    title: "Shopkeepper",
    img: "/npcs/11.png",
    actions: [NpcAction.Shop],
    dialogueId: DialogueId.TestConversation,
  },
};
