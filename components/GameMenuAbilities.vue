<template>
  <div
    v-for="ability in skillStore.abilities"
    :key="ability.name"
    class="abilities-container"
  >
    {{ ability.name }}
  </div>
</template>
<script lang="ts" setup>
import { useSkillStore } from "@/stores/skill";

const skillStore = useSkillStore();
</script>
<style lang="scss" scoped>
.abilities-container {
}
</style>
