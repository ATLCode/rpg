<template>
  <div class="area-container">
    <div v-if="currentView === LocationType.Container" class="locations">
      <h1>{{ playerStore.currentArea.name }}</h1>
      <div
        v-for="location in playerStore.currentLocations"
        :key="location.id"
        class="location-card"
        @click="openLocation(location.id)"
      >
        <div class="location-icon"></div>
        <div class="location-name">{{ location.name }}</div>
      </div>
    </div>
    <LocationInterface
      v-if="currentView === LocationType.Interface"
      @back="currentView = LocationType.Container"
    />
    <LocationExit
      v-if="currentView === LocationType.Exit"
      @back="currentView = LocationType.Container"
    />
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
import { LocationType } from "~/game/locations";
const playerStore = usePlayerStore();

const currentView = ref<LocationType>(LocationType.Container);

function openLocation(locationId: number) {
  playerStore.goToLocation(locationId);
  currentView.value = playerStore.currentLocation.type;
}
</script>

<style lang="scss" scoped>
.area-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.locations {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
.location-card {
  height: 100px;
  width: 30vw;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  &:hover {
    background-color: var(--elevation1);
    cursor: pointer;
  }
  .location-name {
    text-align: center;
  }
}
</style>
