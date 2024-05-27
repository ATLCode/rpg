import { EquipSlot, ItemId, type Item } from "~/game/items";
import { items } from "~/game/items";
import type { WeightedItem } from "~/game/spots";

export enum GameState {
  Normal = "Normal",
  Travel = "Travel",
  Combat = "Combat",
}

export type InventoryItem = {
  inventoryIndex: number;
  id: ItemId;
  item: Item;
  currentStackSize: number;
};

export type Unit = {
  currentHealth: number;
  maxHealth: number;
  // resistances
};

export type Gear = Record<EquipSlot, InventoryItem | null>;

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");

  const gameState = ref<GameState>(GameState.Normal);

  const playerUnit = ref<Unit>({ currentHealth: 10, maxHealth: 10 });
  const playerGroup = ref<Unit[]>([playerUnit.value]);

  // Like this or should each slot have id etc?

  const gear = ref<Gear>({
    [EquipSlot.Head]: null,
    [EquipSlot.Torso]: null,
    [EquipSlot.Legs]: null,
    [EquipSlot.Hands]: null,
    [EquipSlot.Feet]: null,
    [EquipSlot.MainHand]: null,
    [EquipSlot.OffHand]: null,
    [EquipSlot.Neck]: null,
    [EquipSlot.Fingers]: null,
    [EquipSlot.Back]: null,
    [EquipSlot.Ammo]: null,
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

    inventory.value = inventory.value.map((inventoryItem, index) => {
      if (!inventoryItem && !added) {
        inventoryItem = {
          inventoryIndex: index,
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

  function removeSpecificItemFromInventory(item: InventoryItem) {
    inventory.value[item.inventoryIndex] = null;
  }

  function removeItemsFromInventory(itemId: ItemId, amount: number = 1) {
    if (itemCountInInventory(itemId) < amount) {
      return;
    }

    let itemsToRemove = amount;

    for (let i = 0; i < inventory.value.length; i++) {
      const invItem = inventory.value[i];

      if (invItem?.id === itemId) {
        if (invItem.currentStackSize > itemsToRemove) {
          invItem.currentStackSize = invItem.currentStackSize - itemsToRemove;
          return;
        } else {
          itemsToRemove = itemsToRemove - invItem.currentStackSize;
          removeSpecificItemFromInventory(invItem);
        }
      }
    }
  }

  function equipItem(inventoryItem: InventoryItem) {
    const equipSlot = inventoryItem.item.equipSlot;

    if (!equipSlot) {
      throw new Error("This item can't be equipped");
    }

    const equippedBefore = gear.value[equipSlot];

    gear.value[equipSlot] = inventoryItem;
    removeSpecificItemFromInventory(inventoryItem);

    if (equippedBefore) {
      addItemToInventory(equippedBefore.id);
    }
  }

  function unequipItem(inventoryItem: InventoryItem) {
    const equipSlot = inventoryItem.item.equipSlot;

    if (!equipSlot) {
      throw new Error("This item doesn't have equip slot");
    }

    addItemToInventory(inventoryItem.id);
    gear.value[equipSlot] = null;
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

  function itemCountInInventory(itemId: ItemId) {
    let count = 0;
    for (let i = 0; i < inventory.value.length; i++) {
      const invItem = inventory.value[i];
      if (invItem?.id === itemId) {
        count += invItem.currentStackSize;
      }
    }
    return count;
  }

  return {
    characterName,
    gameState,
    gear,
    inventory,
    getItemById,
    addItemToInventory,
    equipItem,
    unequipItem,
    removeItemsFromInventory,
    removeSpecificItemFromInventory,
    chooseWeightedItem,
    itemCountInInventory,
    playerUnit,
    playerGroup,
  };
});
