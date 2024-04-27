<template>
  <div class="game-container">
    <NavBar />
    <div class="area">
      <AreaWorld
        v-if="locationStore.currentArea.type === LocationType.World"
        :selected-location="selectedLocation"
        @change-selected-location="changeSelectedLocation"
      />
      <AreaLocation
        v-if="locationStore.currentArea.type === LocationType.Container"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { LocationType } from "~/game/locations";
const locationStore = useLocationStore();

const selectedLocation = ref(locationStore.currentLocation);
function changeSelectedLocation(locationId: number) {
  selectedLocation.value = locationStore.getLocationById(locationId);
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

.area {
  height: 100%;
  width: 100%;
}
</style>
