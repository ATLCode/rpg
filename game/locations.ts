type Location = {
  id: number;
  name: string;
  parent: number | null;
  type: string; // Change to enum later
  img: string | null;
};

export const locations: Location[] = [
  {
    id: 1,
    name: "City",
    parent: null,
    type: "container",
    img: "",
  },
  {
    id: 2,
    name: "Forest",
    parent: null,
    type: "container",
    img: "",
  },
];
