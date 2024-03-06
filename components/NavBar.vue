<template>
  <div class="nav">
    {{ playerStore.name }} area: {{ playerStore.currentLocation }}
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  gap: 1rem;
}
</style>
