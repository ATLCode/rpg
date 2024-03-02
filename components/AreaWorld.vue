<template>
  <div class="world-container">
    <h1>{{ playerStore.currentArea.name }}</h1>
    <div class="world-info">
      <div class="locations">
        <div
          v-for="location in playerStore.currentLocations"
          :key="location.id"
          class="location-card"
          :class="{
            active: location.id === props.selectedLocation.id,
          }"
          @click="$emit('changeSelectedLocation', location.id)"
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
        <PathInfo
          v-if="
            !(props.selectedLocation.id === playerStore.currentLocation.id) &&
            playerStore.currentArea.id === 0
          "
          :path="selectedPath"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
import { type Location } from "@/game/locations";
const playerStore = usePlayerStore();

defineEmits(["changeSelectedLocation"]);
const props = defineProps<{
  selectedLocation: Location;
}>();

const paths = playerStore.currentPaths;

const selectedPath = computed(() => {
  return paths.find((path) =>
    path.locations.includes(playerStore.currentLocation.id)
  );
});
</script>

<style lang="scss" scoped>
.world-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
}
.world-info {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
}
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
</style>
