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
          v-model="skill.currentExp"
          :max="skillStore.levelTresholds[skill.currentLevel]"
          height="2rem"
          width="100%"
        />
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
  </div>
</template>

<script lang="ts" setup>
import { useSkillStore } from "@/stores/skill";

const skillStore = useSkillStore();
</script>

<style lang="scss" scoped>
.skills-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: scroll;
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
