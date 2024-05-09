<template>
  <div class="world-container">
    <div v-if="settingStore.showMap === false" class="world-info">
      <div class="locations">
        <div
          v-for="[locationId, location] in Object.entries(
            locationStore.currentLocations
          ) as unknown as [LocationId, Location][]"
          :key="locationId"
          class="location-card"
          :class="{
            active: locationId === locationStore.selectedLocationId,
          }"
          @click="locationStore.changeSelectedLocation(locationId)"
        >
          <div>{{ location.name }}</div>
          <div
            v-if="
              (locationId as unknown as LocationId) ===
              locationStore.currentLocationId
            "
          >
            <img src="../assets/icons/helmet.svg" class="character" alt="" />
          </div>
        </div>
      </div>
      <div class="selected-location">
        <EnterLocation
          v-if="
            locationStore.selectedLocationId === locationStore.currentLocationId
          "
        />
        <PathInfo
          v-if="
            !(
              locationStore.selectedLocationId ===
              locationStore.currentLocationId
            ) && locationStore.currentAreaId === LocationId.WorldMap
          "
          :path="selectedPath"
        />
      </div>
    </div>
    <div v-else class="world-map">
      <GameMap :location="locationStore.currentArea" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { useSettingStore } from "@/stores/setting";
import { LocationId, type Location } from "~/game/locations";
const locationStore = useLocationStore();
const settingStore = useSettingStore();

const paths = locationStore.currentPaths;

const selectedPath = computed(() => {
  return paths.find((path) =>
    path.locations.includes(locationStore.currentLocationId)
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
.world-map {
  height: 100%;
  width: 100%;
}
</style>
