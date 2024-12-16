<template>
  <div class="skills-container">
    <div
      v-for="skill in skillStore.skills"
      :key="skill.name"
      class="skill-info"
    >
      <div class="skill-icon-container">
        <img
          :src="skill.img"
          :alt="`${skill.name} icon`"
          class="skill-icon-img"
        />
      </div>
      <div class="skill-details">
        <div>{{ skill.name }}</div>
        <div>Lv{{ skill.currentLevel }}</div>
        <AProgressLinear
          :value="skillStore.levelBracketProgress(skill.id)"
          :max="skillStore.levelBracketGap(skill.id)"
          height="2rem"
          width="100%"
        />
        <div>
          Exp:{{ skill.currentExp }} /
          {{ skillStore.levelTresholds[skill.currentLevel + 1] }}
        </div>
        <div>
          Exp left:
          {{ expLeft(skill) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSkillStore } from "@/stores/skill";
import { SkillId } from "~/types/ability.types";

const skillStore = useSkillStore();

skillStore.levelBracketGap(SkillId.Fishing);

function expLeft(skill: Skill) {
  return skillStore.levelTresholds[skill.currentLevel + 1] - skill.currentExp;
}
</script>

<style lang="scss" scoped>
.skills-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--elevation1);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: var(--elevation2);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--elevation3);
}

.skill-info {
  border: 1px solid grey;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  width: 100%;
}
.skill-icon-container {
  padding: 1rem;
}
.skill-icon-img {
  height: 64px;
}
.skill-details {
  width: 100%;
}
</style>
