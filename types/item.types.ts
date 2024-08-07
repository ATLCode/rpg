export enum ItemType {
  Equipment = "Equipment",
  Key = "Key",
  Food = "Food",
  Miscellaneous = "Miscellaneous",
  Potion = "Potion",
  Book = "Book",
  Container = "Container",
  Resource = "Resource",
  Ingredient = "Ingredient",
  Currency = "Currency",
}

export enum ItemProperty {
  Weapon = "Weapon",
  OneHanded = "One Handed",
  TwoHanded = "Two Handed",
  Tool = "Tool",
}

export enum ItemRarity {
  Normal = "Normal",
  Rare = "Rare",
}

export enum ItemAction {
  Equip = "Equip",
  Unequip = "Unequip",
  Drop = "Drop",
  Eat = "Eat",
  Buy = "Buy",
  Sell = "Sell",
}

export enum EquipSlot {
  Head = "Head",
  Torso = "Torso",
  Legs = "Legs",
  Hands = "Hands",
  Feet = "Feet",
  MainHand = "MainHand",
  OffHand = "OffHand",
  Neck = "Neck",
  Fingers = "Fingers",
  Back = "Back",
  Ammo = "Ammo",
}

export enum ContextMode {
  Inventory = "Inventory",
  Gear = "Gear",
}

export type Item = {
  name: string;
  type: ItemType;
  properties: ItemProperty[] | null;
  equipSlot: EquipSlot | null; // Enum, gear slot name or id
  weight: number;
  maxStackSize: number;
  value: number;
  rarity: string; // Enum:
  img: string;
  xp?: number;
  actions?: ItemAction[];
};

export enum ItemId {
  RawPanfish = "RawPanfish",
  RawBluegill = "RawBluegill",
  OakLog = "OakLog",
  WoodenSword = "WoodenSword",
  IronSword = "IronSword",
  LeatherBoots = "LeatherBoots",
  CookedBluegill = "CookedBluegill",
  CookedPanfish = "CookedPanfish",
  Gold = "Gold",
}

export enum GameItemType {
  Inventory = "Inventory",
  Shop = "Shop",
}

export type GameItem = {
  type: GameItemType;
  index: number;
  itemId: ItemId;
  item: Item;
  currentStackSize: number;
  shopMaxStackSize?: number;
};

/*
Old type for inventory item, now combined with shopItem type to GameItem

export type InventoryItem = {
  inventoryIndex: number;
  itemId: ItemId;
  item: Item;
  currentStackSize: number;
};
*/
