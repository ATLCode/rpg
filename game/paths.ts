export type Path = {
  id: number;
  name: string;
  locations: [number, number];
  encounters: number[]; // Give type later
  reqSkills: null;
  reqItem: null;
  reqQuest: null;
};

export const paths: Path[] = [
  {
    id: 1,
    name: "Forest Path",
    locations: [1, 2],
    encounters: [],
    reqSkills: null,
    reqItem: null,
    reqQuest: null,
  },
];
