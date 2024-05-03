export type SpotResource = {
  id: number;
  name: string;
  img: string;
  skillId: number; // Verkku: would name be okay here? We could have SkillName enum even?
  levelReq: number;
  products: number[]; // itemId
  interval: number; // In seconds or something the time it takes for 1 resource gathering attempt
};
export type SpotCooking = {
  id: number;
  name: string;
  img: string;
  skillId: number; // Verkku: would name be okay here? We could have SkillName enum even?
  levelReq: number;
  products: number[]; // itemId
  interval: number; // In seconds or something the time it takes for 1 resource gathering attempt
};
export type SpotSleeping = {
  id: number;
  name: string;
  img: string;
  skillId: number; // Verkku: would name be okay here? We could have SkillName enum even?
  levelReq: number;
  products?: number[]; // itemId
  interval: number; // In seconds or something the time it takes for 1 resource gathering attempt
};

export const resourceSpots: SpotResource[] = [
  {
    id: 1,
    name: "Small Fishing Spot",
    img: "",
    skillId: 1,
    levelReq: 1,
    products: [5, 6],
    interval: 10,
  },
  {
    id: 2,
    name: "Normal Tree",
    img: "",
    skillId: 7,
    levelReq: 1,
    products: [7],
    interval: 10,
  },
];
export const cookingSpots: SpotCooking[] = [];
export const sleepingSpots: SpotSleeping[] = [];
