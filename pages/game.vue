<template>
  <div class="game-container">
    <div class="game-bar">
      <div>{{ playerStore.name }}</div>
      <div>{{ playerStore.currentLocation.name }}</div>
    </div>
    <h1>{{ area.name }}</h1>
    <div class="alt-map">
      <div class="locations">
        <div
          v-for="location in locations"
          :key="location.id"
          class="location-card"
          :class="{
            active: location.id === selectedLocation.id,
            path: hasPath(location.id),
          }"
          @click="selectedLocation = playerStore.getLocationById(location.id)"
        >
          <div>{{ location.name }}</div>
          <div v-if="location.id === playerStore.currentLocation.id">
            <img src="../assets/icons/helmet.svg" class="character" alt="" />
          </div>
        </div>
      </div>
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

const area = playerStore.showArea();
const locations = playerStore.showLocations();
const paths = playerStore.showPaths();
const selectedLocation = ref(playerStore.currentLocation);

// Some issue with this function. Want to return false unless you can travel there from the current location but not highlight the current location
function hasPath(locationId: number) {
  return false;
}

const selectedPath = computed(() => {
  return paths.find((path) =>
    path.locations.includes(selectedLocation.value.id)
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
  .locations {
    padding: 1rem;
  }
  .location-card {
    height: 100px;
    width: 30vw;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    &.active {
      font-weight: bold;
      background-color: var(--elevation1);
    }
    &.path {
      filter: drop-shadow(0 0 5px white);
    }
    .character {
      height: 50px;
    }
  }
}
</style>
