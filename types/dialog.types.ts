// Possible way to do dialog in game

export enum ChoiceActionType {
  NodeId = "NodeId",
  ShopId = "ShopId",
  FightId = "FightId",
  // Go back to start option
  // Finish conversation option
}

export type PlayerChoice = {
  text: string;
  choiceActionType: ChoiceActionType;
  choiceAction: any;
};

export type DialogNode = {
  id: string;
  isCenter: false;
  text: string[]; // Often only one, but can be multiple before player gets to choose.
  img: string | null;
  playerChoice: PlayerChoice[];
};
