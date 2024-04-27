export enum LocationType {
  World,
  Container,
  Interface,
  Exit,
}

export type Location = {
  id: number;
  name: string;
  parent: number;
  child?: number;
  type: LocationType;
  img: string | null;
  npcs?: number[]; // Only Interfaces
  resourceSpots?: number[]; // Only Interfaces
  cookingSpots?: number[]; // Only Interfaces
  sleepingSpots?: number[]; // Only Interfaces
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
    resourceSpots: [1, 2],
  },
  {
    id: 7,
    name: "Cave",
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
  {
    id: 9,
    name: "Arena",
    parent: 1,
    type: LocationType.Interface,
    img: "",
  },
];
