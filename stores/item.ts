import { defaults } from "~/game/defaults";
import { itemContainers, items } from "~/game/items";
import type { Resistances } from "~/types/combat.types";
import {
  EquipSlot,
  ItemContainerId,
  ItemId,
  type GameItem,
  type ItemContainer,
} from "~/types/item.types";

export const useItemStore = defineStore("item", () => {
  const playerItemContainers = ref<ItemContainer[]>(
    defaults.startingItemContainers
  );
  const playerInventory = computed(() => {
    return playerItemContainers.value.find(
      (container) => container.id === ItemContainerId.PlayerInventory
    );
  });

  const playerGear = computed(() => {
    return playerItemContainers.value.find(
      (container) => container.id === ItemContainerId.PlayerGear
    );
  });

  const playerGearResistances = computed(() => {
    if (!playerGear.value) {
      throw new Error("Can't find player gear");
    }

    const gearResistances: Resistances = {
      blunt: 0,
      slash: 0,
      pierce: 0,
    };

    for (const gear of playerGear.value.slots) {
      if (gear && gear.item.equip) {
        gearResistances.blunt += gear.item.equip.resistances.blunt;
        gearResistances.slash += gear.item.equip.resistances.slash;
        gearResistances.pierce += gear.item.equip.resistances.pierce;
      }
    }

    return gearResistances;
  });

  // TODO Julius, should context menu actions be specified in each item or programmatically decided? I feel programmatically.

  function getItemById(itemId: ItemId) {
    const result = items[itemId];
    if (!result) {
      throw new Error(`Can't find item with id: ${itemId}`);
    }
    return result;
  }

  function hasRoomForItems(itemId: ItemId, amount: number = 1) {
    if (!playerInventory.value) {
      throw new Error("Cannot find player inventory");
    }

    const item = items[itemId];
    let space = 0;

    for (const slot of playerInventory.value.slots) {
      if (slot === null) {
        space += item.maxStackSize;
      } else if (slot.itemId === itemId) {
        space += item.maxStackSize - slot.currentStackSize;
      }
    }
    if (space >= amount) {
      return true;
    } else {
      return false;
    }
  }

  function hasEnoughItems(itemId: ItemId, amount: number = 1) {
    if (itemCountInInventory(itemId) >= amount) {
      return true;
    } else {
      return false;
    }
  }

  function itemCountInInventory(itemId: ItemId) {
    let count = 0;
    for (let i = 0; i < playerInventory.value!.slots.length; i++) {
      const invItem = playerInventory.value!.slots[i];
      if (invItem?.itemId === itemId) {
        count += invItem.currentStackSize;
      }
    }
    return count;
  }

  function addItemsToInventory(gameItem: GameItem, amount = 1) {
    if (!hasInventorySpace(gameItem, amount)) {
      throw new Error("No inv space");
    }

    let itemsToAdd = amount;

    do {
      const maxStackSize = gameItem.item.maxStackSize;
      const invItems = playerInventory.value!.slots.filter(
        (invItem) => invItem?.itemId === gameItem.itemId
      );
      const nonFullStack = invItems.find(
        (item) => (item?.currentStackSize || 0) < maxStackSize
      );
      const currentStackSize = nonFullStack?.currentStackSize || 0;
      const spaceLeftInStack = maxStackSize - currentStackSize;
      if (nonFullStack && spaceLeftInStack >= itemsToAdd) {
        nonFullStack.currentStackSize = currentStackSize + itemsToAdd;
        itemsToAdd = 0;
      } else {
        const thereWillBeFullStack = itemsToAdd >= maxStackSize;
        let nextStackSize = 0;
        if (thereWillBeFullStack) {
          nextStackSize = maxStackSize;
        } else {
          nextStackSize = itemsToAdd;
        }
        let added = false;
        playerInventory.value!.slots = playerInventory.value!.slots.map(
          (inventoryItem) => {
            if (!inventoryItem && !added) {
              inventoryItem = {
                itemId: gameItem.itemId,
                item: gameItem.item,
                currentStackSize: nextStackSize,
              };
              added = true;
            }
            return inventoryItem;
          }
        );

        itemsToAdd = itemsToAdd - nextStackSize;
      }
    } while (itemsToAdd > 0);
  }
  function removeItemFromInventoryByIndex(index: number) {
    const inventory = itemContainers[ItemContainerId.PlayerInventory];
    const invSlot = inventory.slots[index];
    if (invSlot === null || invSlot.currentStackSize === 1) {
      playerInventory.value!.slots[index] = null;
    } else {
      invSlot.currentStackSize -= 1;
    }
  }

  function removeItemsFromInventoryById(itemId: ItemId, amount: number = 1) {
    if (itemCountInInventory(itemId) < amount) {
      return;
    }

    const inventory = itemContainers[ItemContainerId.PlayerInventory];
    let itemsToRemove = amount;

    for (let i = 0; i < inventory!.slots.length; i++) {
      const invItem = inventory!.slots[i];

      if (invItem?.itemId === itemId) {
        if (invItem.currentStackSize > itemsToRemove) {
          invItem.currentStackSize = invItem.currentStackSize - itemsToRemove;
          return;
        } else {
          itemsToRemove = itemsToRemove - invItem.currentStackSize;
          inventory!.slots[i] = null;
        }
      }
    }
  }

  function equipItem(index: number) {
    if (!playerInventory.value || !playerInventory.value.slots[index]) {
      throw new Error("Can't accesss to the item");
    }
    if (!playerGear.value) {
      throw new Error("Can't access player gear");
    }

    const itemToEquip = playerInventory.value.slots[index];

    const equipSlot = itemToEquip.item.equip?.equipSlot;

    if (!equipSlot) {
      throw new Error("This item can't be equipped");
    }

    const equippedBefore = playerGear.value.slots[equipSlot];

    playerGear.value.slots[equipSlot] = itemToEquip;
    removeItemFromInventoryByIndex(index);

    if (equippedBefore) {
      addItemsToInventory(equippedBefore);
    }
  }
  function unequipItem(index: number) {
    if (!playerGear.value) {
      throw new Error("Can't find player's gear");
    }
    const itemToRemove = playerGear.value.slots[index];
    if (!itemToRemove) {
      throw new Error("Can't find item to unequip");
    }
    addItemsToInventory(itemToRemove, 1);
    playerGear.value.slots[index] = null;
  }
  /*
  function buyItems(quantity: number, npc: Npc) {

    if (!selectedItem.value) {
      return;
    }

    const shop = npc.shop;
    if (!shop) {
      console.log("Can't find the npc or npc doesn't have a shop");
      return;
    }
    const stockItem = shop.stock.find(
      (item) => item.itemId === selectedItem.value?.itemId
    );
    if (!stockItem) {
      console.log("Can't find the stockItem");
      return;
    }

    const price = calclulatePrice(
      selectedItem.value,
      shop,
      TransactionType.Buy
    );
    const totalCost = price * quantity;

    if (!checkGold(totalCost) || !checkStock(quantity, stockItem)) {
      console.log("You don't have enough gold or items in shop");
      return;
    }
    // Remove gold from player inventory
    removeItemsFromInventoryById(ItemId.Gold, totalCost);

    // Remove item from shop stock

    stockItem.currentStackSize -= quantity;

    // Add gold to shop stock

    shop.currentMoney += totalCost;

    // Add item to inventory
    addItemsToInventory(selectedItem.value, quantity);
  
  }

  function sellItems(quantity: number, npc: Npc) {
    if (!selectedItem.value) {
      console.log("Can't sell the selected item");
      return;
    }
    const shop = npc.shop;
    if (!shop) {
      console.log("Can't access the shop");
      return;
    }

    const price = calclulatePrice(
      selectedItem.value,
      shop,
      TransactionType.Sell
    );
    const totalValue = price * quantity;
    // Remove item from player inventory, needs more work
    removeItemFromInventoryByIndex(selectedItem.value);
    // Remove gold from shop
    shop.currentMoney -= totalValue;
    // Add item to shop stock? Can you sell items not in stock?

    // Add gold to inventory

    addItemsToInventory(
      {
        currentStackSize: 1,
        item: items[ItemId.Gold],
        itemId: ItemId.Gold,
      },
      totalValue
    );
  }


  function calclulatePrice(item: GameItem, shop: Shop, type: TransactionType) {
    const value = item.item.value;

    // Shop Modifiers

    const shopTaxesPct = shop.taxes.reduce((acc, curr) => curr.pct + acc, 0);

    const shopDiscountsPct = shop.discounts.reduce(
      (acc, curr) => curr.pct + acc,
      0
    );

    // General Modifiers (Speech skill later etc)

    const generalTaxesPct = 0;
    const generalDiscountsPct = 0;

    const totalTaxes = shopTaxesPct + generalTaxesPct;
    const totalDiscounts = shopDiscountsPct + generalDiscountsPct;
    const totalModifierPct = totalTaxes - totalDiscounts;
    const modifierAmount = value * (totalModifierPct / 100);

    if (type === TransactionType.Buy) {
      return value + modifierAmount;
    } else {
      return value - modifierAmount;
    }
  }

  function checkGold(price: number) {
    const gold = playerInventory.value?.slots.find(
      (item) => item?.itemId === ItemId.Gold
    );
    return gold && gold?.currentStackSize >= price;
  }

  function checkStock(quantity: number, stockItem: GameItem) {
    return stockItem.currentStackSize >= quantity;
  }
  */

  function hasInventorySpace(item: GameItem, amount: number): boolean {
    if (!playerInventory.value) {
      throw new Error("Can't find player inventory");
    }

    const maxStackSize = item.item.maxStackSize;
    const invItems = playerInventory.value.slots.filter(
      (invItem) => invItem?.itemId === item.itemId
    );

    const nonFullStack = invItems.find(
      (item) => (item?.currentStackSize || 0) < maxStackSize
    );
    const currentStackSize = nonFullStack?.currentStackSize || 0;
    const emptySlots = playerInventory.value?.slots.filter(
      (slot) => slot === null
    );
    const emptySpace =
      emptySlots.length * item.item.maxStackSize +
      item.item.maxStackSize -
      currentStackSize;
    return amount <= emptySpace;
  }

  function $reset() {}
  return {
    $reset,
    playerItemContainers,
    playerInventory,
    playerGear,
    hasRoomForItems,
    hasEnoughItems,
    itemCountInInventory,
    addItemsToInventory,
    equipItem,
    unequipItem,
    removeItemsFromInventoryById,
    removeItemFromInventoryByIndex,
    getItemById,
    playerGearResistances,
  };
});
