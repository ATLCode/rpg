import { DialogueId } from "./dialogue";

export type Encounter = {
  dialogueId: DialogueId;
  img: string;
};
export enum EncounterId {
  ForestBandit = "ForestBandit",
}

export type WeightedEncounter = WeightedObject<EncounterId>;

export const encounters: Record<EncounterId, Encounter> = {
  [EncounterId.ForestBandit]: {
    dialogueId: DialogueId.TestEncounter,
    img: "/npcs/27.png",
  },
};
