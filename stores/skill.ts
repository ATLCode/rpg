export const useWorldStore = defineStore("skill", () => {
  type Skill = {
    id: number;
    name: string;
    currentExp: number; // How we do leveling and xp limits?
    currentLevel: number;
    abilities: number[]; // Do we just have abilities completely separately?
  };

  const skills: Skill[] = [
    { id: 1, name: "Fishing", currentExp: 1, currentLevel: 1, abilities: [] },
    { id: 2, name: "Cooking", currentExp: 1, currentLevel: 1, abilities: [] },
    {
      id: 3,
      name: "One Handed",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    {
      id: 4,
      name: "Two Handed",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    { id: 5, name: "Archery", currentExp: 1, currentLevel: 1, abilities: [] },
    {
      id: 6,
      name: "Elemental Magic",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
  ];

  return { skills };
});
