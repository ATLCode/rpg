import { defaults } from "~/game/defaults";
import { type Item } from "~/game/items";

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");
  enum GameState {
    Normal = "Normal",
    Traveling = "Traveling",
    Combat = "Combat",
  }

  const gameState = ref<GameState>(GameState.Normal);

  // Like this or should each slot have id etc?
  type Gear = {
    head: Item | null;
    torso: Item | null;
    legs: Item | null;
    hands: Item | null;
    feet: Item | null;
    mainHand: Item | null;
    offHand: Item | null;
    neck: Item | null;
    fingers: Item | null;
    back: Item | null;
  };

  const gear = ref<Gear>({
    head: null,
    torso: null,
    legs: null,
    hands: null,
    feet: null,
    mainHand: null,
    offHand: null,
    neck: null,
    fingers: null,
    back: null,
  });

  // Iventory as array of either item ids or nulls (or should there be item that's essentially empty?), this way we can handle moving items not next to eachother
  const inventory = ref<(number | null)[]>([
    1,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  return {
    characterName,
    gameState,
    gear,
    inventory,
  };
});
