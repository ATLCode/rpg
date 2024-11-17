<template>
  <div v-if="!isLoaded">Loading</div>
  <div v-else class="world-map-container">
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
        :url="locationStore.worldMap.mapImg"
        :bounds="bounds"
      ></l-image-overlay>

      <l-marker
        v-for="worldLocation in worldLocations"
        :key="worldLocation.name"
        :lat-lng="[worldLocation.coordinates.y, worldLocation.coordinates.x]"
        @click="clickMarker(worldLocation)"
      >
        <l-icon icon-url="/icons/circle.png" :icon-size="[35, 35]"></l-icon>
      </l-marker>
      <l-marker
        :lat-lng="[
          locationStore.playerCoordinates.y - 25,
          locationStore.playerCoordinates.x - 25,
        ]"
      >
        <l-icon icon-url="/icons/21.png" :icon-size="[40, 40]"></l-icon>
      </l-marker>
    </LMap>
    <ModalWorldLocationInfo
      v-show="locationStore.selectedLocation"
      :world-location="locationStore.selectedLocation"
      @close="locationStore.selectedLocation = null"
    />
  </div>
</template>

<script lang="ts" setup>
import { CRS } from "leaflet";
import { worldLocations } from "@/game/locations";
import { useLocationStore } from "@/stores/location";
import type { WorldLocation } from "~/types/location.types";

const locationStore = useLocationStore();

function clickMarker(clickedWorldLocation: WorldLocation) {
  locationStore.selectedLocation = clickedWorldLocation;
  if (clickedWorldLocation !== locationStore.playerLocation.worldLocation) {
    locationStore.selectPath(clickedWorldLocation.id);
  }
}

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
  () => locationStore.worldMap.mapImg,
  (newUrl) => {
    updateImageSize(newUrl!);
  }
);
function updateImageSize(imageUrl: string) {
  isLoaded.value = false;
  const img = new Image();
  img.onload = function () {
    height.value = img.height;
    width.value = img.width;
    isLoaded.value = true;
  };
  img.src = imageUrl;
}
updateImageSize(locationStore.worldMap.mapImg);
</script>
<style lang="scss" scoped>
.world-map-container {
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
