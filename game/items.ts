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
};

export const items: Item[] = [
  {
    id: 5,
    name: "RawFish",
    type: ItemType.Resource,
    property: null,
    equipSlot: null,
    weight: 1,
    stackSize: 10,
    value: 1,
    rarity: ItemRarity.Normal,
    img: "",
  },
];
