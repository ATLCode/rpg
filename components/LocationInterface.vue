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
    <div class="interface-content">
      <CardSpot
        v-for="spot in playerStore.currentLocation.spots"
        :key="spot.name"
        :spot="spot"
      />
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
  flex-direction: column;
  justify-content: center;
}
.interface-bar {
  display: flex;
  justify-content: center;
  height: 100px;
}
.interface-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  gap: 1rem;
  padding: 1rem;
}
.exit-btn {
  position: absolute;
  left: 1rem;
}
</style>
