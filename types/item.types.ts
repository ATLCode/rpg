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

// Should I have utils function create game items for cases like products in abilities etc?
// Game item and mainly inventory part feels wrong as well though, game item idea itself is good, but why it contains data about where in the inventory it is

export type GameItem = {
  itemId: ItemId;
  item: Item;
  currentStackSize: number;
};

export type WeightedItem = WeightedObject<ItemId>;
export type WeightedLoot = WeightedObject<GameItem>;

export type stockSlot = {
  gameItem: GameItem;
  shopStackSize: number;
  maxSize: number;
};

export enum PriceModifierType {
  ShopMargin = "ShopMargin",
}

export type PriceModifier = {
  type: PriceModifierType;
  pct: number;
};

export enum ItemContainerId {
  playerInventory = "PlayerInventory",
}
export type ItemContainer = {
  id: ItemContainerId;
  maxSize: number;
  slots: (GameItem | null)[];
};

export type Gear = Record<EquipSlot, GameItem | null>;
