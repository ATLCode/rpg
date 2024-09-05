import {
  EquipSlot,
  ItemId,
  GameItemType,
  type GameItem,
  type WeightedLoot,
} from "../types/item.types";
import type { AbilityId } from "~/game/abilities";
import { items } from "~/game/items";
import { TransactionType, type Npc, type Shop } from "~/game/npcs";

export type Unit = {
  isPlayer?: boolean;
  name: string;
  img: string;
  currentActionPoints: number;
  maxActionPoints: number;
  currentHealth: number;
  maxHealth: number;
  abilities: AbilityId[];
  drops?: WeightedLoot[];
  // resistances
};

export type Gear = Record<EquipSlot, GameItem | null>;

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");

  const energy = ref(100);
  /*
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
  */
  const playerGroup = ref<Unit[]>([
    {
      isPlayer: true,
      name: characterName.value,
      img: "/icons/21.png",
      currentActionPoints: 3,
      maxActionPoints: 3,
      currentHealth: 10,
      maxHealth: 10,
      abilities: [],
    },
  ]);

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
  const inventory = ref<(GameItem | null)[]>(new Array(28).fill(null));

  const selectedItem = ref<GameItem | null>(null);

  function getItemById(itemId: ItemId) {
    const result = items[itemId];
    if (!result) {
      throw new Error(`Can't find item with id: ${itemId}`);
    }
    return result;
  }

  function addItemsToInventory(gameItem: GameItem, amount = 1) {
    if (!hasInventorySpace(gameItem, amount)) {
      throw new Error("No inv space");
    }

    let itemsToAdd = amount;

    do {
      const maxStackSize = gameItem.item.maxStackSize;
      const invItems = inventory.value.filter(
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
        inventory.value = inventory.value.map((inventoryItem, index) => {
          if (!inventoryItem && !added) {
            inventoryItem = {
              type: GameItemType.Inventory,
              index,
              itemId: gameItem.itemId,
              item: gameItem.item,
              currentStackSize: nextStackSize,
            };
            added = true;
          }
          return inventoryItem;
        });

        itemsToAdd = itemsToAdd - nextStackSize;
      }
    } while (itemsToAdd > 0);
  }

  function removeSpecificItemFromInventory(item: GameItem) {
    inventory.value[item.index] = null;
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

  function equipItem(inventoryItem: GameItem) {
    const equipSlot = inventoryItem.item.equipSlot;

    if (!equipSlot) {
      throw new Error("This item can't be equipped");
    }

    const equippedBefore = gear.value[equipSlot];

    gear.value[equipSlot] = inventoryItem;
    removeSpecificItemFromInventory(inventoryItem);

    if (equippedBefore) {
      addItemsToInventory(equippedBefore);
    }
  }

  function unequipItem(inventoryItem: GameItem) {
    const equipSlot = inventoryItem.item.equipSlot;

    if (!equipSlot) {
      throw new Error("This item doesn't have equip slot");
    }

    addItemsToInventory(inventoryItem);
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

  function buyItems(quantity: number, npc: Npc) {
    console.log(selectedItem.value);
    console.log(quantity);
    console.log(npc);
    if (!selectedItem.value) {
      console.log("Item doesn't have value");
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
    removeItemsFromInventory(ItemId.Gold, totalCost);

    // Remove item from shop stock

    stockItem.currentStackSize -= quantity;

    // Add gold to shop stock

    shop.currentMoney += totalCost;

    // Add item to inventory
    addItemsToInventory(selectedItem.value, quantity);
  }

  function sellItems(quantity: number, npc: Npc) {
    if (
      !selectedItem.value ||
      !(selectedItem.value.type === GameItemType.Inventory)
    ) {
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
    removeSpecificItemFromInventory(selectedItem.value);
    // Remove gold from shop
    shop.currentMoney -= totalValue;
    // Add item to shop stock? Can you sell items not in stock?

    // Add gold to inventory

    addItemsToInventory(
      {
        currentStackSize: 1,
        index: 0,
        item: items[ItemId.Gold],
        itemId: ItemId.Gold,
        type: GameItemType.Inventory,
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
    const gold = inventory.value.find((item) => item?.itemId === ItemId.Gold);
    return gold && gold?.currentStackSize >= price;
  }

  function checkStock(quantity: number, stockItem: GameItem) {
    return stockItem.currentStackSize >= quantity;
  }

  function hasInventorySpace(item: GameItem, amount: number): boolean {
    const maxStackSize = item.item.maxStackSize;
    const invItems = inventory.value.filter(
      (invItem) => invItem?.itemId === item.itemId
    );
    const nonFullStack = invItems.find(
      (item) => (item?.currentStackSize || 0) < maxStackSize
    );
    const currentStackSize = nonFullStack?.currentStackSize || 0;
    const emptySlots = inventory.value.filter((slot) => slot === null);
    const emptySpace =
      emptySlots.length * item.item.maxStackSize +
      item.item.maxStackSize -
      currentStackSize;
    return amount <= emptySpace;
  }

  function $reset() {
    inventory.value = new Array(28).fill(null);
    /*
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
    */
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
    playerGroup.value = [
      {
        isPlayer: true,
        name: characterName.value,
        img: "/icons/21.png",
        currentActionPoints: 3,
        maxActionPoints: 3,
        currentHealth: 10,
        maxHealth: 10,
        abilities: [],
      },
    ];
    energy.value = 100;
  }

  return {
    characterName,
    energy,
    gear,
    inventory,
    selectedItem,
    playerGroup,
    getItemById,
    addItemsToInventory,
    equipItem,
    unequipItem,
    removeItemsFromInventory,
    removeSpecificItemFromInventory,
    itemCountInInventory,
    useEnergy,
    sellItems,
    buyItems,
    calclulatePrice,
    $reset,
  };
});
