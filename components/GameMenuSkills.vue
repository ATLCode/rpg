<template>
  <div class="skills-container">
    <div v-for="skill in skillStore.skills" :key="skill.id">
      <div>Skill:{{ skill.name }}</div>
      <div>Level:{{ skill.currentLevel }}</div>
      <div>Exp:{{ skill.currentExp }}</div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSkillStore } from "@/stores/skill";

const skillStore = useSkillStore();
</script>

<style lang="scss" scoped></style>
