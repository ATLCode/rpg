import { useNotificationStore, NotificationType } from "@/stores/notification";
import type { AbilityId } from "~/game/abilities";
import { defaults } from "~/game/defaults";
import { type Ability } from "~/types/ability.types";
import type { SkillId } from "~/types/skill.types";

export type Skill = {
  id: SkillId;
  name: string;
  currentExp: number; // How we do leveling and xp limits?
  currentLevel: number;
  img: string;
};

export const useSkillStore = defineStore("skill", () => {
  const skills = ref(defaults.startingSkills);

  // We can't have last level end and new level start at same exp. Have to clear it up in our code.

  const levelTresholds: Record<number, number> = {
    1: 0,
    2: 51,
    3: 101,
    4: 151,
    5: 201,
    6: 251,
    7: 301,
    8: 351,
    9: 401,
    10: 451,
  };

  const playerAbilities = ref<Ability[]>(defaults.startingAbilities);

  const playerAbilityIds = computed(() => {
    const ids: AbilityId[] = [];
    for (const item of playerAbilities.value) {
      ids.push(item.id);
    }
    return ids;
  });

  function giveSkillExp(skillId: SkillId, amount: number) {
    const skill = skills.value[skillId];
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

  function levelBracketGap(skillId: SkillId) {
    const currentLevel = skills.value[skillId].currentLevel;
    const currentBracketStart = levelTresholds[currentLevel];
    const currentBracketEnd = levelTresholds[currentLevel + 1];
    return currentBracketEnd - currentBracketStart;
  }

  function levelBracketProgress(skillId: SkillId) {
    const currentLevel = skills.value[skillId].currentLevel;
    const currentBracketStart = levelTresholds[currentLevel];
    const currentExp = skills.value[skillId].currentExp;
    return currentExp - currentBracketStart;
  }

  function checkLevelUp(
    skillId: SkillId,
    currentExp: number,
    levelToCheck: number
  ) {
    if (currentExp >= levelTresholds[levelToCheck]) {
      const newLevel = levelUp(skillId);
      checkLevelUp(skillId, currentExp, newLevel + 1);
    }
  }

  function levelUp(skillId: SkillId) {
    const skill = skills.value[skillId];
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

  function $reset() {
    skills.value = defaults.startingSkills;
    playerAbilities.value = defaults.startingAbilities;
  }

  return {
    skills,
    giveSkillExp,
    levelTresholds,
    playerAbilities,
    playerAbilityIds,
    levelBracketGap,
    levelBracketProgress,
    $reset,
  };
});
