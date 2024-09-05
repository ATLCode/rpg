<template>
  <div v-if="!isLoaded">Loading</div>
  <div
    v-else-if="
      currentView === LocationType.Container ||
      currentView === LocationType.World
    "
    class="world-map-container"
  >
    <LMap
      ref="map"
      v-model:zoom="zoom"
      :crs="crs"
      :center="[height / 2, width / 2]"
      :min-zoom="-1"
      :max-zoom="1"
      :max-bounds="maxBounds"
      :options="{ attributionControl: false }"
    >
      <l-image-overlay
        :url="props.location.mapImg!"
        :bounds="bounds"
      ></l-image-overlay>

      <l-marker
        v-for="marker in markers"
        :key="marker.locationId"
        :lat-lng="[marker.y, marker.x]"
        @click="clickMarker(marker.locationId)"
      >
        <l-icon icon-url="/icons/circle.png" :icon-size="[30, 30]"></l-icon>
        <l-popup v-if="locationStore.currentArea.type === LocationType.World">
          {{ locations[marker.locationId].name }}
          <div v-if="marker.locationId === locationStore.currentLocationId">
            <AButton @click="locationStore.enterArea()">ENTER</AButton>
          </div>
          <div
            v-if="
              !(marker.locationId === locationStore.currentLocationId) &&
              locationStore.currentAreaId === LocationId.WorldMap
            "
          >
            <AButton
              @click="locationStore.travelPath(locationStore.selectedPath)"
              >TRAVEL</AButton
            >
          </div>
        </l-popup>
        <l-popup v-else>
          {{ locationStore.selectedLocation.name }}
          <div v-if="locationStore.selectedLocation.type === LocationType.Exit">
            <AButton @click="locationStore.exitArea()">EXIT</AButton>
          </div>
          <div
            v-if="
              locationStore.selectedLocation.type === LocationType.Interface
            "
          >
            <AButton @click="openLocation(locationStore.selectedLocationId)"
              >OPEN</AButton
            >
          </div>
        </l-popup>
      </l-marker>

      <l-marker
        :lat-lng="[
          locationStore.playerCoordinates.y - 25,
          locationStore.playerCoordinates.x,
        ]"
      >
        <l-icon icon-url="/icons/21.png" :icon-size="[40, 40]"></l-icon>
      </l-marker>
    </LMap>
  </div>
  <div v-else-if="currentView === LocationType.Interface">
    <LocationInterface @back="currentView = LocationType.Container" />
  </div>
</template>

<script lang="ts" setup>
import { CRS } from "leaflet";
import type { PropType } from "vue";
import { LocationId, LocationType, locations } from "@/game/locations";
import type { Location } from "@/game/locations";
import { useLocationStore } from "@/stores/location";

const locationStore = useLocationStore();

const props = defineProps({
  location: {
    type: Object as PropType<Location>,
    default: null,
  },
});

function clickMarker(markerLocationId: number) {
  if (locationStore.currentArea.type === LocationType.World) {
    locationStore.selectPath(markerLocationId);
  } else {
    locationStore.changeSelectedLocation(markerLocationId);
  }
}

function openLocation(locationId: number) {
  locationStore.goToLocation(locationId);
  currentView.value = locationStore.currentLocation.type;
}

const currentView = ref<LocationType>(LocationType.Container);

const isLoaded = ref(true);
const markers = ref(props.location.mapMarkers || []);
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
  () => props.location.mapImg,
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
updateImageSize(props.location.mapImg!);
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
