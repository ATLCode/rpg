<template>
  <div v-if="!isLoaded">Loading</div>
  <div v-else class="area-map-container">
    <LMap
      ref="map"
      v-model:zoom="zoom"
      :crs="crs"
      :center="[height / 2, width / 2]"
      :min-zoom="-1"
      :max-zoom="-1"
      :max-bounds="maxBounds"
      :options="{ attributionControl: false, zoomControl: false }"
    >
      <l-image-overlay
        :url="
          locationStore.playerLocation.areaLocation!.containerDetails!.mapImg
        "
        :bounds="bounds"
      ></l-image-overlay>
      <l-marker
        v-for="subLocationId in locationStore.playerLocation.areaLocation!
          .containerDetails!.locations"
        :key="subLocationId"
        :lat-lng="[
          subLocations[subLocationId].coordinates?.y,
          subLocations[subLocationId].coordinates?.x,
        ]"
        @click="clickMarker(subLocationId)"
      >
        <l-icon
          :icon-url="subLocationMarker(subLocationId)"
          :icon-size="[40, 40]"
        ></l-icon>
      </l-marker>
      <l-marker
        :lat-lng="[
          locationStore.playerCoordinates.y - 50,
          locationStore.playerCoordinates.x - 50,
        ]"
      >
        <l-icon icon-url="/icons/21.png" :icon-size="[40, 40]"></l-icon>
      </l-marker>
    </LMap>
    <ModalSpot />
    <ModalExit
      v-model="modalExitOpen"
      :location="locationStore.playerLocation.subLocation"
    />
  </div>
</template>
<script lang="ts" setup>
import { CRS } from "leaflet";
import { useLocationStore } from "@/stores/location";
import { useSpotStore } from "@/stores/spot";
import { subLocations, SubLocationId } from "~/game/locations";
import { LocationType } from "~/types/location.types";

const locationStore = useLocationStore();
const spotStore = useSpotStore();

const width = ref(4000);
const height = ref(3000);
const crs = CRS.Simple;
const zoom = ref(0);

const modalExitOpen = ref(false);

function clickMarker(subLocationId: SubLocationId) {
  const clickedLocation = subLocations[subLocationId];
  if (clickedLocation === null) {
    throw new Error("Clicked location is null");
  }
  locationStore.goToLocation({
    worldLocation: locationStore.playerLocation.worldLocation,
    areaLocation: locationStore.playerLocation.areaLocation,
    subLocation: clickedLocation,
  });

  if (clickedLocation.type === LocationType.Spot) {
    spotStore.selectSpot(subLocations[subLocationId]);
  }
  if (clickedLocation.type === LocationType.Exit) {
    modalExitOpen.value = true;
  }
}

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

const isLoaded = ref(true);
watch(
  () => locationStore.playerLocation.worldLocation.mapImg,
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
updateImageSize(locationStore.playerLocation.worldLocation.mapImg!);

function subLocationMarker(subLocactionId: SubLocationId) {
  const location = subLocations[subLocactionId];

  if (location.type === LocationType.Npc) {
    return "/icons/location_npc.png";
  }
  if (location.type === LocationType.Exit) {
    return "/icons/location_exit.png";
  }
  if (location.type === LocationType.Spot) {
    return "/icons/circle.png";
  }

  return "/icons/circle.png";
}
</script>
<style lang="scss" scoped>
.area-map-container {
  height: 100%;
  width: 100%;
  z-index: 100;
  overflow: hidden;
}
.leaflet-container {
  background-color: var(--elevation0);
}
</style>
