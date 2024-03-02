<template>
  <div class="exit-container">
    <div class="exit-bar">
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

    <div class="exit-content">
      <AButton @click="playerStore.exitArea()"
        >Exit {{ playerStore.currentArea.name }}</AButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();

defineEmits(["back"]);
</script>

<style lang="scss" scoped>
.exit-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.exit-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .exit-btn {
    position: absolute;
    left: 1rem;
  }
}

.exit-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
