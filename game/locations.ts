export type Location = {
  id: number;
  name: string;
  parent: number;
  child?: number;
  type: string; // Change to enum later
  img: string | null;
};

export const locations: Location[] = [
  {
    id: 0,
    name: "WorldMap",
    parent: 9001,
    type: "world",
    img: "",
  },
  {
    id: 1,
    name: "City",
    parent: 0,
    child: 5,
    type: "container",
    img: "",
  },
  {
    id: 2,
    name: "Forest",
    parent: 0,
    child: 8,
    type: "container",
    img: "",
  },
  {
    id: 3,
    name: "Shop",
    parent: 1,
    type: "interface",
    img: "",
  },
  {
    id: 4,
    name: "Tavern",
    parent: 1,
    type: "interface",
    img: "",
  },
  {
    id: 5,
    name: "City Gate",
    parent: 1,
    type: "exit",
    img: "",
  },
  {
    id: 6,
    name: "Forest Pond",
    parent: 2,
    type: "interface",
    img: "",
  },
  {
    id: 7,
    name: "Dungeon",
    parent: 2,
    type: "container",
    img: "",
  },
  {
    id: 8,
    name: "Forest Edge",
    parent: 2,
    type: "exit",
    img: "",
  },
];
