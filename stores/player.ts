import type { AbilityId } from "~/game/abilities";
import { EquipSlot, ItemId, type Item } from "~/game/items";
import { items } from "~/game/items";
export type WeightedItem = WeightedObject<ItemId>;

export enum GameState {
  Normal = "Normal",
  Travel = "Travel",
  Combat = "Combat",
}

export type InventoryItem = {
  inventoryIndex: number;
  itemId: ItemId;
  item: Item;
  currentStackSize: number;
};

export type Unit = {
  isPlayer?: boolean;
  name: string;
  img: string;
  currentActionPoints: number;
  maxActionPoints: number;
  currentHealth: number;
  maxHealth: number;
  abilities: AbilityId[];
  drops?: WeightedItem[];
  // resistances
};

export type Gear = Record<EquipSlot, InventoryItem | null>;

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");

  const gameState = ref<GameState>(GameState.Normal);

  const energy = ref(100);

  const playerUnit = ref<Unit>({
    isPlayer: true,
    name: characterName.value,
    img: "/icons/21.png",
    currentActionPoints: 3,
    maxActionPoints: 3,
    currentHealth: 10,
    maxHealth: 10,
    abilities: [],
  });
  const playerGroup = ref<Unit[]>([playerUnit.value]);

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
    // Should we have optional parameter amount that defaults to 1, hard to code though
    // Parametri tai ei erroria
    const item = items[itemId];
    let added = false;
    if (item.maxStackSize > 1) {
      inventory.value = inventory.value.map((inventoryItem) => {
        if (
          inventoryItem &&
          inventoryItem.itemId === itemId &&
          item.maxStackSize > inventoryItem.currentStackSize &&
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
          itemId,
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

      if (invItem?.itemId === itemId) {
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
      addItemToInventory(equippedBefore.itemId);
    }
  }

  function unequipItem(inventoryItem: InventoryItem) {
    const equipSlot = inventoryItem.item.equipSlot;

    if (!equipSlot) {
      throw new Error("This item doesn't have equip slot");
    }

    addItemToInventory(inventoryItem.itemId);
    gear.value[equipSlot] = null;
  }

  function itemCountInInventory(itemId: ItemId) {
    let count = 0;
    for (let i = 0; i < inventory.value.length; i++) {
      const invItem = inventory.value[i];
      if (invItem?.itemId === itemId) {
        count += invItem.currentStackSize;
      }
    }
    return count;
  }

  function useEnergy(amount: number) {
    if (energy.value < amount) {
      throw new Error("Not enough energy for the action");
    }
    energy.value -= amount;
  }

  function buyItem() {}

  function sellItem(item: InventoryItem) {
    // How do we get npc/shop here, so we can reduce gold?
    const value = item.item.value;
    for (let i = 0; i < value; i++) {
      addItemToInventory(ItemId.Gold);
    }

    removeSpecificItemFromInventory(item);
  }

  function $reset() {
    inventory.value = new Array(28).fill(null);
    playerUnit.value = {
      isPlayer: true,
      name: characterName.value,
      img: "/icons/21.png",
      currentActionPoints: 3,
      maxActionPoints: 3,
      currentHealth: 10,
      maxHealth: 10,
      abilities: [],
    };
    gear.value = {
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
    };
    playerGroup.value = [playerUnit.value];
    energy.value = 100;
  }

  return {
    characterName,
    gameState,
    energy,
    gear,
    inventory,
    playerUnit,
    playerGroup,
    getItemById,
    addItemToInventory,
    equipItem,
    unequipItem,
    removeItemsFromInventory,
    removeSpecificItemFromInventory,
    itemCountInInventory,
    useEnergy,
    sellItem,
    buyItem,
    $reset,
  };
});
