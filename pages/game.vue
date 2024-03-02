<template>
  <div class="game-container">
    <div class="game-bar">
      <div>{{ playerStore.name }} {{ playerStore.currentLocation }}</div>
    </div>
    <div class="area">
      <AreaWorld
        v-if="playerStore.currentArea.type === 'world'"
        :selected-location="selectedLocation"
        @change-selected-location="changeSelectedLocation"
      />
      <AreaContainer v-if="playerStore.currentArea.type === 'container'" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();

const selectedLocation = ref(playerStore.currentLocation);
function changeSelectedLocation(locationId: number) {
  selectedLocation.value = playerStore.getLocationById(locationId);
}

definePageMeta({ middleware: ["auth"], layout: "game" });
</script>
<style lang="scss" scoped>
.game-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}
.game-bar {
  display: flex;
  gap: 1rem;
}
.area {
  height: 100%;
  width: 100%;
}
</style>
