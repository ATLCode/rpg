<template>
  <div class="enter-container">
    <AButton @click="playerStore.enterLocation()">Enter</AButton>
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped>
.enter-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
