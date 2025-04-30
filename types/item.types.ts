import type { Resistances } from "./combat.types";

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
  Blade = "Blade",
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
  Head = 0,
  Torso = 1,
  Legs = 2,
  Hands = 3,
  Feet = 4,
  MainHand = 5,
  OffHand = 6,
  Neck = 7,
  Fingers = 8,
  Back = 9,
  Ammo = 10,
}

export enum ContextMode {
  Inventory = "Inventory",
  Gear = "Gear",
}

export type ItemPropertyRequirement = {
  property: ItemProperty;
  container: "Inventory" | "Gear";
  slot: number | "Any";
};

export type EquipInfo = {
  equipSlot: EquipSlot;
  resistances: Resistances;
};

export type Item = {
  name: string;
  type: ItemType;
  properties: ItemProperty[];
  weight: number;
  maxStackSize: number;
  value: number;
  rarity: string; // Enum:
  img: string;
  xp?: number;
  actions?: ItemAction[];
  equip?: EquipInfo;
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
  PlayerInventory = "PlayerInventory",
  PlayerGear = "PlayerGear",
}
export type ItemContainer = {
  id: ItemContainerId;
  maxSize: number;
  slots: (GameItem | null)[];
};

export type Gear = Record<EquipSlot, GameItem | null>;
