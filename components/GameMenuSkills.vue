<template>
  <div class="skills-container">
    <div
      v-for="skill in skillStore.skills"
      :key="skill.name"
      class="skill-info"
    >
      <div>{{ skill.name }}</div>
      <div>Lv{{ skill.currentLevel }}</div>
      <div>
        Exp:{{ skill.currentExp }} /
        {{ skillStore.levelTresholds[skill.currentLevel + 1] }}
      </div>
      <div>
        Exp left:
        {{
          skillStore.levelTresholds[skill.currentLevel + 1] - skill.currentExp
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSkillStore } from "@/stores/skill";

const skillStore = useSkillStore();
</script>

<style lang="scss" scoped>
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
.skill-info {
  border: 1px solid grey;
  padding: 0.5rem;
}
</style>
