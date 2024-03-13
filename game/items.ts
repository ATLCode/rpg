export type Item = {
  id: number;
  name: string;
  type: string; // Enum for this: Weapon, Tool, Apparel, Ingredient, Materials, Food, Books, Potions, Ammunition, Misc, Keys,
  subType: string; // Enum for this. Eg. Weapon Type, Tool Type, Ingredient Type etc.
  equipSlot: string | null; // Enum, gear slot name or id
  weight: number;
  stackSize: number;
  value: number;
  rarity: string; // Enum:
  img: string;
};
