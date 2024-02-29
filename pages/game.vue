<template>
  <div class="game-container">
    <div class="game-bar">
      <div>{{ playerStore.name }}</div>
      <div>{{ playerStore.currentLocation.name }}</div>
    </div>
    <h1>{{ playerStore.currentArea.name }}</h1>
    <div class="alt-map">
      <AltLocations
        :selected-location="selectedLocation"
        @change-selected-location="changeSelectedLocation"
      />
      <div class="selected-location">
        <EnterLocation
          v-if="selectedLocation.id === playerStore.currentLocation.id"
        />
        <GameTravel
          v-if="!(selectedLocation.id === playerStore.currentLocation.id)"
          :path="selectedPath"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();

// Test
const paths = playerStore.currentPaths;

const selectedLocation = ref(playerStore.currentLocation);
function changeSelectedLocation(locationId: number) {
  selectedLocation.value = playerStore.getLocationById(locationId);
}

const selectedPath = computed(() => {
  return paths.find((path) =>
    path.locations.includes(playerStore.currentLocation.id)
  );
});

definePageMeta({ middleware: ["auth"], layout: "game" });
</script>
<style lang="scss" scoped>
.game-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
.game-bar {
  display: flex;
  gap: 1rem;
}
.alt-map {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
}
</style>
