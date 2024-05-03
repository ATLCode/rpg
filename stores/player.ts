import { defaults } from "~/game/defaults";
import { type Item } from "~/game/items";
import { items } from "~/game/items";

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
  const inventory = ref<(Item | null)[]>([
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
    null,
  ]);

  function getItemById(itemId: number) {
    const result = items.find((item) => item.id === itemId);
    if (!result) {
      throw new Error(`Can't find location with id: ${itemId}`);
    }
    return result;
  }

  function addItemToInventory(itemId: number) {
    let added = false;
    const mappedInventory = inventory.value.map((element) => {
      if (element === null && added === false) {
        added = true;
        return getItemById(itemId);
      }
      return element;
    });
    if (added === false) {
      console.log("Can't add item to invetory. Your inventory is full.");
    }
    inventory.value = mappedInventory;
    console.log(mappedInventory);
  }

  return {
    characterName,
    gameState,
    gear,
    inventory,
    getItemById,
    addItemToInventory,
  };
});
