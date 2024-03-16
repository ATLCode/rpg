export enum LocationType {
  World,
  Container,
  Interface,
  Exit,
}

export enum SpotType {
  Resource,
  Cooking,
  Sleeping, // No storage or farming since they need to remember state so should maybe be different? Can add stuff like crafting/smithing etc in future
}
export type Spot = {
  name: string;
  type: SpotType;
  img: string;
  skillId: number; // Verkku: would name be okay here? We could have SkillName enum even?
  levelReq: number;
};

export type Location = {
  id: number;
  name: string;
  parent: number;
  child?: number;
  type: LocationType;
  img: string | null;
  npcs?: number[]; // Only Interfaces
  spots?: Spot[]; // Only Interfaces
};

export const locations: Location[] = [
  {
    id: 0,
    name: "WorldMap",
    parent: 9001,
    type: LocationType.World,
    img: "",
  },
  {
    id: 1,
    name: "City",
    parent: 0,
    child: 5,
    type: LocationType.Container,
    img: "",
  },
  {
    id: 2,
    name: "Forest",
    parent: 0,
    child: 8,
    type: LocationType.Container,
    img: "",
  },
  {
    id: 3,
    name: "Shop",
    parent: 1,
    type: LocationType.Interface,
    img: "",
  },
  {
    id: 4,
    name: "Tavern",
    parent: 1,
    type: LocationType.Interface,
    img: "",
  },
  {
    id: 5,
    name: "City Gate",
    parent: 1,
    type: LocationType.Exit,
    img: "",
  },
  {
    id: 6,
    name: "Forest Pond",
    parent: 2,
    type: LocationType.Interface,
    img: "",
    spots: [
      {
        name: "Small Pond",
        type: SpotType.Resource,
        img: "",
        skillId: 1,
        levelReq: 1,
      },
      {
        name: "Pond Center",
        type: SpotType.Resource,
        img: "",
        skillId: 1,
        levelReq: 10,
      },
    ],
  },
  {
    id: 7,
    name: "Dungeon",
    parent: 2,
    type: LocationType.Container,
    img: "",
  },
  {
    id: 8,
    name: "Forest Edge",
    parent: 2,
    type: LocationType.Exit,
    img: "",
  },
];
