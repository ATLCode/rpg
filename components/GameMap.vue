<template>
  <div v-if="!isLoaded">Loading</div>
  <div v-else class="world-map-container">
    <LMap
      ref="map"
      v-model:zoom="zoom"
      :crs="crs"
      :center="[height / 2, width / 2]"
      :min-zoom="-1"
      :max-zoom="1"
      :max-bounds="maxBounds"
    >
      <l-image-overlay
        :url="props.location.mapImg!"
        :bounds="bounds"
      ></l-image-overlay>

      <l-marker
        v-for="marker in markers"
        :key="marker.locationId"
        :lat-lng="[marker.y, marker.x]"
        @click="locationStore.selectPath(marker.locationId)"
      >
        <l-popup
          >{{ locationStore.getLocationById(marker.locationId).name }}
          <div v-if="marker.locationId === locationStore.currentLocation.id">
            <AButton @click="locationStore.enterArea()">ENTER</AButton>
          </div>
          <div
            v-if="
              !(marker.locationId === locationStore.currentLocation.id) &&
              locationStore.currentArea.id === 0
            "
          >
            <AButton
              @click="locationStore.travelPath(locationStore.selectedPath!)"
              >TRAVEL</AButton
            >
          </div>
        </l-popup>
      </l-marker>
      <l-marker
        :lat-lng="[
          locationStore.playerCoordinates.y - 20,
          locationStore.playerCoordinates.x,
        ]"
      >
        <l-icon icon-url="/icons/player.svg" :icon-size="[40, 40]"></l-icon>
      </l-marker>

      <!--
         <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
     
      <l-marker
        v-for="(marker, idx) in markers"
        :key="idx"
        :lat-lng="marker.coordinates"
        ><l-popup>{{ idx }}</l-popup></l-marker
      >

      -->
    </LMap>
  </div>
</template>

<script lang="ts" setup>
import { CRS } from "leaflet";
import type { PropType } from "vue";
import type { Location } from "@/game/locations";
import { useLocationStore } from "@/stores/location";
const locationStore = useLocationStore();

const props = defineProps({
  location: {
    type: Object as PropType<Location>,
    default: null,
  },
});

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
</style>
