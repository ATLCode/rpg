<template>
  <div v-if="!isLoaded">Loading</div>
  <div v-else class="map-game-container">
    <LMap
      ref="map"
      v-model:zoom="zoom"
      :crs="crs"
      :center="[height / 2, width / 2]"
      :min-zoom="0"
      :max-zoom="0"
      :max-bounds="maxBounds"
      :options="{ attributionControl: false, zoomControl: false }"
    >
      <l-image-overlay
        :url="maps[locationStore.playerLocation.mapId].img"
        :bounds="bounds"
      ></l-image-overlay>

      <l-marker
        v-for="pinId in maps[locationStore.playerLocation.mapId].pins"
        :key="pinId"
        :lat-lng="[pins[pinId].coordinates.y, pins[pinId].coordinates.x]"
        @click="clickPin(pins[pinId])"
      >
        <l-icon :icon-url="pins[pinId].icon" :icon-size="[40, 40]"></l-icon>
      </l-marker>
      <l-marker
        :lat-lng="[
          pins[locationStore.playerLocation.pinId].coordinates.y - 25,
          pins[locationStore.playerLocation.pinId].coordinates.x - 25,
        ]"
      >
        <l-icon icon-url="/icons/21.png" :icon-size="[40, 40]"></l-icon>
      </l-marker>
    </LMap>
    <PinTravel v-model="pinTravelOpen" />
    <PinAccess v-model="pinAccessOpen" />
    <PinSpot v-model="pinSpotOpen" />
  </div>
</template>

<script lang="ts" setup>
import { CRS } from "leaflet";
import { maps, pins } from "@/game/locations";
import { useLocationStore } from "@/stores/location";
import { PinType, type Pin } from "~/types/location.types";

const locationStore = useLocationStore();

// PINS
const pinTravelOpen = ref(false);
const pinAccessOpen = ref(false);
const pinSpotOpen = ref(false);

function clickPin(clickedPin: Pin) {
  console.log(clickedPin.type);

  locationStore.selectPin(clickedPin);

  if (!(maps[locationStore.playerLocation.mapId].mapScale === "World")) {
    locationStore.goToLocation({
      mapId: locationStore.playerLocation.mapId,
      pinId: clickedPin.id,
    });
  }
  if (clickedPin.type === PinType.Travel) {
    pinTravelOpen.value = true;
  }
  if (clickedPin.type === PinType.Access) {
    pinAccessOpen.value = true;
  }
  if (clickedPin.type === PinType.Spot) {
    pinSpotOpen.value = true;
  }
  if (!(clickedPin.type === PinType.Spot)) {
    pinSpotOpen.value = false;
  }
}

// MAP SETTINGS
const isLoaded = ref(true);
const crs = CRS.Simple;
const width = ref(4000);
const height = ref(3000);
const zoom = ref(0);
const bounds = computed(
  () =>
    [
      [0, 0],
      [height.value, width.value],
    ] as L.LatLngBoundsLiteral
);
const maxBounds = computed(() => [
  [-500, -500],
  [height.value + 500, width.value + 500],
]);

watch(
  () => locationStore.playerLocation.mapId,
  (newMapId) => {
    if (!newMapId) {
      return;
    }
    updateImageSize(maps[newMapId].img);
  }
);

function updateImageSize(imageUrl: string) {
  if (!imageUrl) {
    return;
  }
  isLoaded.value = false;
  const img = new Image();
  img.onload = function () {
    height.value = img.height;
    width.value = img.width;
    isLoaded.value = true;
  };
  img.src = imageUrl;
}
updateImageSize(maps[locationStore.playerLocation.mapId].img);
</script>
<style lang="scss" scoped>
.map-game-container {
  height: 100%;
  width: 100%;
  z-index: 100;
}
.leaflet-container {
  background-color: var(--elevation0);
}
.leaflet-control-attribution leaflet-control {
  display: none !important;
}
</style>
