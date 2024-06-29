<template>
  <div>
    <div
      v-for="ability in skillStore.abilities"
      :key="ability.name"
      class="abilities-container"
    >
      {{ ability.name }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSkillStore } from "@/stores/skill";

const skillStore = useSkillStore();
</script>
<style lang="scss" scoped>
.abilities-container {
  padding: 1rem;
  width: 100%;
  display: flex;
  gap: 1rem;
}
</style>
