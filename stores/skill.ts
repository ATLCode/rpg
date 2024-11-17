import { useNotificationStore, NotificationType } from "@/stores/notification";
import type { AbilityId } from "~/game/abilities";
import { defaults } from "~/game/defaults";
import { AbilityType, type Ability, type SkillId } from "~/types/ability.types";

export type Skill = {
  name: string;
  currentExp: number; // How we do leveling and xp limits?
  currentLevel: number;
  img: string;
};

export const useSkillStore = defineStore("skill", () => {
  const skills = ref(defaults.startingSkills);

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

  const playerAbilities = ref<Ability[]>(defaults.startingAbilities);

  const playerAbilityIds = computed(() => {
    const ids: AbilityId[] = [];
    for (const item of playerAbilities.value) {
      ids.push(item.id);
    }
    return ids;
  });

  const combatAbilities = computed(() =>
    playerAbilities.value.filter(
      (ability: Ability) => ability.abilityType === AbilityType.Combat
    )
  );

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
    combatAbilities,
    $reset,
  };
});
