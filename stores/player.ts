import { ItemId, type Item } from "~/game/items";
import { items } from "~/game/items";
import type { WeightedItem } from "~/game/spots";

export enum GameState {
  Normal = "Normal",
  Travel = "Travel",
  Combat = "Combat",
}

export type InventoryItem = {
  id: ItemId;
  item: Item;
  currentStackSize: number;
};

export type Gear = {
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
  ammo: Item | null;
};

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");

  const gameState = ref<GameState>(GameState.Normal);

  // Like this or should each slot have id etc?

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
    ammo: null,
  });

  // Iventory as array of either item ids or nulls (or should there be item that's essentially empty?), this way we can handle moving items not next to eachother
  const inventory = ref<(InventoryItem | null)[]>(new Array(28).fill(null));

  function getItemById(itemId: ItemId) {
    const result = items[itemId];
    if (!result) {
      throw new Error(`Can't find item with id: ${itemId}`);
    }
    return result;
  }

  function addItemToInventory(itemId: ItemId) {
    const item = items[itemId];
    let added = false;
    if (item.stackSize > 1) {
      inventory.value = inventory.value.map((inventoryItem) => {
        if (
          inventoryItem &&
          inventoryItem.id === itemId &&
          item.stackSize > inventoryItem.currentStackSize &&
          !added
        ) {
          inventoryItem.currentStackSize += 1;
          added = true;
        }
        return inventoryItem;
      });
    }

    inventory.value = inventory.value.map((inventoryItem) => {
      if (!inventoryItem && !added) {
        inventoryItem = {
          id: itemId,
          item,
          currentStackSize: 1,
        };
        added = true;
      }
      return inventoryItem;
    });

    if (!added) {
      throw new Error("No space in inventory");
    }
  }

  function chooseWeightedItem(weightedItems: WeightedItem[]) {
    const totalWeight = weightedItems.reduce(
      (acc, curr) => curr.weight + acc,
      0
    );

    const magicNumber = Math.ceil(Math.random() * totalWeight);
    let itemFound = false;
    const itemId: ItemId = weightedItems.reduce(
      (acc: ItemId | number, curr) => {
        if (itemFound) {
          return acc;
        }
        const weightToCheck = curr.weight + acc;
        if (magicNumber > weightToCheck) {
          return weightToCheck;
        }
        itemFound = true;
        return curr.itemId;
      },
      0
    );
    return itemId;
  }

  return {
    characterName,
    gameState,
    gear,
    inventory,
    getItemById,
    addItemToInventory,
    chooseWeightedItem,
  };
});
