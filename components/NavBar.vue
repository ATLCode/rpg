<template>
  <div class="nav">
    <div>{{ playerStore.name }}</div>
    <div>Area: {{ playerStore.currentLocation }}</div>
    <div><AButton>Inventory</AButton></div>
    <div><AButton>Skills</AButton></div>
    <div><AButton>Abilities</AButton></div>
    <div><AButton>Settings</AButton></div>
    <div><AButton>Quit</AButton></div>
    <ASpacer />
    <div><AButton>Camp</AButton></div>
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
