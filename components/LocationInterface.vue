<template>
  <div class="interface-container">
    <div class="interface-bar">
      <AButton
        class="exit-btn"
        background-color="--elevation1"
        @click="$emit('back')"
        >Back to {{ playerStore.currentArea.name }}</AButton
      >
      <h1>
        {{ playerStore.currentArea.name }} -
        {{ playerStore.currentLocation.name }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();

defineEmits(["back"]);
</script>

<style lang="scss" scoped>
.interface-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.exit-btn {
  position: absolute;
  left: 1rem;
}
</style>
