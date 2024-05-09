export enum SkillId {
  Fishing,
  Cooking,
  OneHanded,
  TwoHanded,
  Magic,
  Woodcutting,
  Archery,
}

export const useSkillStore = defineStore("skill", () => {
  type Skill = {
    name: string;
    currentExp: number; // How we do leveling and xp limits?
    currentLevel: number;
    abilities: number[]; // Do we just have abilities completely separately?
  };

  const skills: Record<SkillId, Skill> = {
    [SkillId.Fishing]: {
      name: "Fishing",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Cooking]: {
      name: "Cooking",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.OneHanded]: {
      name: "One Handed",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.TwoHanded]: {
      name: "Two Handed",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Archery]: {
      name: "Archery",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Magic]: {
      name: "Magic",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Woodcutting]: {
      name: "Woodcutting",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
  };

  const levelTresholds: Record<number, number> = {
    2: 50,
    3: 100,
    4: 150,
    5: 200,
    6: 250,
    7: 300,
    8: 350,
    9: 400,
    10: 450,
  };

  function getSkillById(skillId: number) {
    const result = skills.find((skill) => skill.id === skillId);
    return result;
  }

  function giveSkillExp(skillId: SkillId, amount: number) {
    const skill = skills[skillId];
    skill.currentExp += amount;
    checkLevelUp(skillId, skill.currentExp, skill.currentLevel + 1);
  }

  function checkLevelUp(
    skillId: number,
    currentExp: number,
    levelToCheck: number
  ) {
    if (currentExp > levelTresholds[levelToCheck]) {
      const newLevel = levelUp(skillId);
      checkLevelUp(skillId, currentExp, newLevel + 1);
    }
  }

  function levelUp(skillId: SkillId) {
    const skill = skills[skillId];
    skill.currentLevel += 1;

    console.log("New level is", skill.currentLevel, skill.name);
    return skill.currentLevel;
  }

  return { skills, getSkillById, giveSkillExp };
});
