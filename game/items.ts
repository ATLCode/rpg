import { AbilityId } from "./abilities";

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

export enum ItemActions {
  Equip,
  Drop,
  Eat,
}

export enum EquipSlot {
  Head,
  Torso,
  Legs,
  Hands,
  Feet,
  MainHand,
  OffHand,
  Neck,
  Fingers,
  Back,
  Ammo,
}

export type Item = {
  name: string;
  type: ItemType;
  property: ItemProperty | null;
  equipSlot: EquipSlot | null; // Enum, gear slot name or id
  weight: number;
  stackSize: number;
  value: number;
  rarity: string; // Enum:
  img: string;
  abilityRequirements?: AbilityId[];
  xp?: number;
  actions?: ItemActions[];
};

// What if item would have craftable key which would include object with abilityRequirements, xp etc.

// Items array to itemst object where key is enum?

export enum ItemId {
  RawPanfish,
  RawBluegill,
  OakLog,
  WoodenSword,
}

export const items: Record<ItemId, Item> = {
  [ItemId.RawPanfish]: {
    name: "Raw Panfish",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/panfish.png",
    xp: 10,
    actions: [ItemActions.Drop],
  },
  [ItemId.RawBluegill]: {
    name: "Raw Bluegill",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/bluegill.png",
    abilityRequirements: [AbilityId.FishBluegill],
    xp: 20,
    actions: [ItemActions.Drop],
  },
  [ItemId.WoodenSword]: {
    name: "Wooden Sword",
    type: ItemType.Equipment,
    property: null,
    equipSlot: EquipSlot.MainHand,
    weight: 1,
    stackSize: 1,
    value: 10,
    rarity: ItemRarity.Normal,
    img: "/items/sword_1.png",
    actions: [ItemActions.Drop, ItemActions.Equip],
  },
  [ItemId.OakLog]: {
    name: "Oak Log",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "/items/oak_log.png",
    xp: 10,
    actions: [ItemActions.Drop],
  },
};
