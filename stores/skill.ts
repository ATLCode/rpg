import { useNotificationStore, NotificationType } from "@/stores/notification";
import { type Ability } from "~/game/abilities";

export enum SkillId {
  Fishing = "Fishing",
  Woodcutting = "Woodcutting",
  Cooking = "Cooking",
  OneHanded = "OneHanded",
  Archery = "Archery",
  Elemental = "Elemental",
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
    [SkillId.Woodcutting]: {
      name: "Woodcutting",
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
    [SkillId.Archery]: {
      name: "Archery",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Elemental]: {
      name: "Elemental",
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

  const abilities = ref<Ability[]>([]);

  function giveSkillExp(skillId: SkillId, amount: number) {
    console.log("Test");
    const skill = skills[skillId];
    skill.currentExp += amount;

    const notificationStore = useNotificationStore();
    notificationStore.showNotification(
      NotificationType.Drop,
      `${skill.name} ${amount}xp`,
      false,
      1000
    );
    checkLevelUp(skillId, skill.currentExp, skill.currentLevel + 1);
  }

  function checkLevelUp(
    skillId: SkillId,
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
    const notificationStore = useNotificationStore();
    notificationStore.showNotification(
      NotificationType.Level,
      `${skill.name} level increased to ${skill.currentLevel}`,
      false,
      5000
    );

    checkAbilities(skillId);

    return skill.currentLevel;
  }

  function checkAbilities(skillId: SkillId) {
    console.log(skillId);
  }

  return { skills, giveSkillExp, levelTresholds, abilities };
});
