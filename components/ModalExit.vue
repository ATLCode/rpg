<template>
  <AModal v-model="model" :title="props.location?.name" closable>
    <div class="info-container">
      <div v-if="locationStore.playerLocation.subLocation">
        {{ `Exit to ${locationStore.playerLocation.areaLocation?.name}` }}
      </div>
      <div v-else>Head back to the world</div>
      <div>
        <AButton @click="exit">Exit</AButton>
      </div>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { useSpotStore } from "@/stores/spot";
import {
  type AreaLocation,
  type PlayerLocation,
  type SubLocation,
} from "~/types/location.types";

const locationStore = useLocationStore();
const spotStore = useSpotStore();

const model = defineModel({ type: Boolean });

const props = defineProps({
  location: {
    type: Object as PropType<AreaLocation | SubLocation | null>,
    default: null,
  },
});

function exit() {
  const currentLocation = locationStore.playerLocation;
  const toAreaLocation: PlayerLocation = {
    worldLocation: currentLocation.worldLocation,
    areaLocation: currentLocation.areaLocation,
    subLocation: null,
  };
  const toWorldLocation: PlayerLocation = {
    worldLocation: currentLocation.worldLocation,
    areaLocation: null,
    subLocation: null,
  };
  if (currentLocation.subLocation) {
    locationStore.goToLocation(toAreaLocation);
  } else {
    locationStore.goToLocation(toWorldLocation);
  }
  spotStore.$reset();
}
</script>

<style lang="scss" scoped>
.info-container {
  z-index: 999;
  position: absolute;
  width: 500px;
  height: 500px;
  background-color: var(--elevation1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  gap: 1rem;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
