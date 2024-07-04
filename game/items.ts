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
  Sell = "Sell",
  Buy = "Buy",
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

// What if item would have craftable key which would include object with abilityRequirements, xp etc.

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

export const items: Record<ItemId, Item> = {
  [ItemId.RawPanfish]: {
    name: "Raw Panfish",
    type: ItemType.Resource,
    properties: null,
    equipSlot: null,
    weight: 1,
    maxStackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/panfish.png",
    xp: 10,
    actions: [ItemAction.Drop],
  },
  [ItemId.RawBluegill]: {
    name: "Raw Bluegill",
    type: ItemType.Resource,
    properties: null,
    equipSlot: null,
    weight: 1,
    maxStackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/bluegill.png",
    xp: 20,
    actions: [ItemAction.Drop],
  },
  [ItemId.WoodenSword]: {
    name: "Wooden Sword",
    type: ItemType.Equipment,
    properties: [ItemProperty.Weapon, ItemProperty.OneHanded],
    equipSlot: EquipSlot.MainHand,
    weight: 1,
    maxStackSize: 1,
    value: 10,
    rarity: ItemRarity.Normal,
    img: "/items/sword_01.png",
    actions: [ItemAction.Equip, ItemAction.Unequip, ItemAction.Drop],
  },
  [ItemId.IronSword]: {
    name: "Iron Sword",
    type: ItemType.Equipment,
    properties: null,
    equipSlot: EquipSlot.MainHand,
    weight: 1,
    maxStackSize: 1,
    value: 10,
    rarity: ItemRarity.Normal,
    img: "/items/sword_02.png",
    actions: [ItemAction.Equip, ItemAction.Unequip, ItemAction.Drop],
  },
  [ItemId.LeatherBoots]: {
    name: "Leather Boots",
    type: ItemType.Equipment,
    properties: null,
    equipSlot: EquipSlot.Feet,
    weight: 1,
    maxStackSize: 1,
    value: 10,
    rarity: ItemRarity.Normal,
    img: "/items/boots_01.png",
    actions: [ItemAction.Equip, ItemAction.Unequip, ItemAction.Drop],
  },
  [ItemId.OakLog]: {
    name: "Oak Log",
    type: ItemType.Resource,
    properties: null,
    equipSlot: null,
    weight: 1,
    maxStackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/oak_log.png",
    xp: 10,
    actions: [ItemAction.Drop],
  },
  [ItemId.CookedBluegill]: {
    name: "Cooked Bluegill",
    type: ItemType.Food,
    properties: null,
    equipSlot: null,
    weight: 1,
    maxStackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/cooked_bluegill.png",
    xp: 10,
    actions: [ItemAction.Drop],
  },
  [ItemId.CookedPanfish]: {
    name: "Cooked Panfish",
    type: ItemType.Food,
    properties: null,
    equipSlot: null,
    weight: 1,
    maxStackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/cooked_panfish.png",
    xp: 10,
    actions: [ItemAction.Drop],
  },
  [ItemId.Gold]: {
    name: "Gold",
    type: ItemType.Currency,
    properties: null,
    equipSlot: null,
    weight: 1,
    maxStackSize: 1000000000,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/cooked_panfish.png",
    actions: [ItemAction.Drop],
  },
};
