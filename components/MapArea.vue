<template>
  <div v-if="!isLoaded">Loading</div>
  <div v-else class="area-map-container">
    <LMap
      ref="map"
      v-model:zoom="zoom"
      :crs="crs"
      :center="[height / 2, width / 2]"
      :min-zoom="-0.8"
      :max-zoom="-0.8"
      :max-bounds="maxBounds"
      :options="{ attributionControl: false, zoomControl: false }"
    >
      <l-image-overlay
        :url="locationStore.playerLocation.worldLocation.mapImg"
        :bounds="bounds"
      ></l-image-overlay>
      <l-marker
        v-for="areaLocationId in locationStore.playerLocation.worldLocation
          .locations"
        :key="areaLocationId"
        :lat-lng="[
          areaLocations[areaLocationId].coordinates?.y,
          areaLocations[areaLocationId].coordinates?.x,
        ]"
        @click="clickMarker(areaLocationId)"
      >
        <l-icon
          :icon-url="areaLocationMarker(areaLocationId)"
          :icon-size="[40, 40]"
        ></l-icon>
      </l-marker>
      <l-marker
        :lat-lng="[
          locationStore.playerCoordinates.y - 40,
          locationStore.playerCoordinates.x - 40,
        ]"
      >
        <l-icon icon-url="/icons/21.png" :icon-size="[40, 40]"></l-icon>
      </l-marker>
    </LMap>
    <ModalSpot />
    <ModalContainer
      v-model="modalContainerOpen"
      :area-location="locationStore.playerLocation.areaLocation"
    />
    <ModalExit
      v-model="modalExitOpen"
      :location="locationStore.playerLocation.areaLocation"
    />
  </div>
</template>
<script lang="ts" setup>
import { CRS } from "leaflet";
import { useLocationStore } from "@/stores/location";
import { useSpotStore } from "@/stores/spot";
import { AreaLocationId, areaLocations } from "~/game/locations";
import { ContainerType, LocationType } from "~/types/location.types";
import { spots } from "~/game/spots";
import { SkillId } from "~/types/ability.types";

const locationStore = useLocationStore();
const spotStore = useSpotStore();

const width = ref(4000);
const height = ref(3000);
const crs = CRS.Simple;
const zoom = ref(0);
const modalContainerOpen = ref(false);
const modalExitOpen = ref(false);

function clickMarker(areaLocationId: AreaLocationId) {
  const clickedLocation = areaLocations[areaLocationId];
  if (clickedLocation === null) {
    throw new Error("Clicked location is null");
  }
  locationStore.goToLocation({
    worldLocation: locationStore.playerLocation.worldLocation,
    areaLocation: clickedLocation,
    subLocation: null,
  });
  if (clickedLocation.type === LocationType.Spot) {
    spotStore.selectSpot(areaLocations[areaLocationId]);
  }
  if (clickedLocation.type === LocationType.Container) {
    modalContainerOpen.value = true;
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

function areaLocationMarker(aLocationId: AreaLocationId) {
  const location = areaLocations[aLocationId];

  if (location.type === LocationType.Npc) {
    return "/icons/location_npc.png";
  }
  if (location.type === LocationType.Exit) {
    return "/icons/location_exit.png";
  }
  if (location.type === LocationType.Container) {
    console.log(location);
    switch (location.containerDetails!.containerType) {
      case ContainerType.GeneralStore:
        return "/icons/container_general_store.png";
      case ContainerType.Inn:
        return "/icons/container_inn.png";
      case ContainerType.Mine:
        return "/icons/container_mine.png";
      default:
        return "/icons/circle.png";
    }
  }
  if (location.type === LocationType.Spot) {
    console.log(location);
    switch (spots[location.spotId!].skillId) {
      case SkillId.Fishing:
        return "/icons/skill_fishing.png";
      case SkillId.Cooking:
        return "/icons/skill_cooking.png";
      case SkillId.Woodcutting:
        return "/icons/skill_woodcutting.png";
      case SkillId.Mining:
        return "/icons/skill_mining.png";
      default:
        return "/icons/circle.png";
    }
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
