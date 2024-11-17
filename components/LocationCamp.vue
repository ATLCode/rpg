<template>
  <div class="camp-container">
    <div class="camp-header">
      <AButton background-color="var(--elevation1)" @click="$emit('close')"
        >Close</AButton
      >
      <ASpacer />
      <h1>Camp</h1>
      <ASpacer />
    </div>
    <div class="camp-content">
      <div class="camp-map">
        <LMap
          ref="map"
          v-model:zoom="zoom"
          :crs="crs"
          :center="[height / 2, width / 2]"
          :min-zoom="-2"
          :max-zoom="-2"
          :max-bounds="maxBounds"
          :options="{
            attributionControl: false,
            zoomControl: false,
            dragging: false,
          }"
        >
          <l-image-overlay
            url="/maps/Camp.jpeg"
            :bounds="bounds"
          ></l-image-overlay>
          <l-marker
            :lat-lng="[
              camp.cookingSpot.coordinates.y,
              camp.cookingSpot.coordinates.x,
            ]"
            @click="clickCookingSpot"
          >
            <l-icon icon-url="/icons/circle.png" :icon-size="[30, 30]"></l-icon>
          </l-marker>
          <l-marker
            :lat-lng="[
              camp.sleepingSpot.coordinates.y,
              camp.sleepingSpot.coordinates.x,
            ]"
          >
            <l-icon icon-url="/icons/circle.png" :icon-size="[30, 30]"></l-icon>
          </l-marker>
          <l-marker
            :lat-lng="[
              camp.storageSpot.coordinates.y,
              camp.storageSpot.coordinates.x,
            ]"
          >
            <l-icon icon-url="/icons/circle.png" :icon-size="[30, 30]"></l-icon>
          </l-marker>
        </LMap>
      </div>
    </div>
    <AModal v-model="modalCraftingOpen" title="Campfire" closable>
      <ModalCrafting />
    </AModal>
  </div>
</template>

<script lang="ts" setup>
import { CRS } from "leaflet";
import { useLocationStore } from "@/stores/location";
import { useSpotStore } from "@/stores/spot";
import { CampSpot } from "~/types/spot.types";

const locationStore = useLocationStore();
const spotStore = useSpotStore();

defineEmits(["close"]);

// Map Settings
const width = ref(4000);
const height = ref(3000);
const zoom = ref(-2);
const crs = CRS.Simple;
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

// Camp Locations/Spots
const camp = locationStore.camp;

const modalCraftingOpen = ref(false);

function clickCookingSpot() {
  modalCraftingOpen.value = true;
  spotStore.selectCampSpot(CampSpot.Cooking);
}
</script>

<style lang="scss" scoped>
.camp.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 900;
}
.camp-header {
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
}
.camp-content {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.camp-map {
  height: 80vh;
  width: 80vw;
  z-index: 100;
  overflow: hidden;
}
.leaflet-container {
  background-color: var(--elevation0);
}
</style>
