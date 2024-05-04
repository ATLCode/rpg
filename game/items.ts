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

export type Item = {
  id: number;
  name: string;
  type: ItemType;
  property: ItemProperty | null;
  equipSlot: string | null; // Enum, gear slot name or id
  weight: number;
  stackSize: number;
  value: number;
  rarity: string; // Enum:
  img: string;
  levelReq?: number;
  xp?: number;
};

export const items: Item[] = [
  {
    id: 5,
    name: "Raw Panfish",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "",
    levelReq: 1,
    xp: 10,
  },
  {
    id: 6,
    name: "Raw Bluegill",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "",
    levelReq: 5,
    xp: 20,
  },
  {
    id: 7,
    name: "Normal Log",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "",
    levelReq: 1,
    xp: 10,
  },
];

// Items array to itemst object where key is enum?

enum itemIds {
  NormalLog = "Normal Log",
  SuperLog = "Super Log",
}

export const itemsTest: Record<itemIds, any> = {
  [itemIds.NormalLog]: {
    id: 7,
    name: "Normal Log",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "",
    levelReq: 1,
    xp: 10,
  },
  [itemIds.SuperLog]: {
    id: 7,
    name: "Normal Log",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "",
    levelReq: 1,
    xp: 10,
  },
};
